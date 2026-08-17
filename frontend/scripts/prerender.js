#!/usr/bin/env node
/*
 * Static prerender for Haul Yeah Moving.
 * ------------------------------------------------------------------
 * CRA ships an empty <div id="root"> to crawlers. This script uses
 * Puppeteer to visit every route from public/sitemap.xml against the
 * freshly-built /build output (served with SPA fallback), and writes
 * the rendered HTML back to disk at build/<route>/index.html.
 *
 * Third-party scripts are blocked so pixels/session recordings do NOT
 * fire during the build, and their runtime-injected DOM (Tally iframe,
 * PostHog / Emergent <script> tags) is stripped from every capture.
 *
 * Exit code is non-zero if any route fails.
 */

const fs = require("fs");
const path = require("path");
const http = require("http");
const puppeteer = require("puppeteer");
const serveHandler = require("serve-handler");

const ROOT = path.resolve(__dirname, "..");
const BUILD_DIR = path.join(ROOT, "build");
const SITEMAP = path.join(ROOT, "public", "sitemap.xml");
const ORIGIN = "https://www.haulyeahmoves.com";

// Pristine copy of the CRA shell, taken BEFORE any route is written.
//
// WHY THIS EXISTS (this was a real, shipped bug):
// The static server below SPA-falls-back to /index.html. Because "/" is the
// first entry in sitemap.xml, the loop used to overwrite build/index.html with
// the *prerendered homepage* on iteration 1. Every route after that then booted
// from a shell whose <head> already contained the homepage's hoisted <title>,
// <link rel="canonical"> and og:* tags — and React hoisted the real page's tags
// on top of them. Result: 3 <title> tags and 2 conflicting canonicals on all
// 20 sub-pages, with one canonical pointing at the homepage.
//
// Fix: snapshot the shell here, serve THAT as the SPA fallback, delete it at
// the end so it never ships.
const SHELL_NAME = "__prerender-shell.html";
const SHELL_PATH = path.join(BUILD_DIR, SHELL_NAME);

// Routes that must be prerendered but must NOT appear in sitemap.xml
// (noindex conversion pages). Keeps them out of Google while still giving
// Cloudflare Pages a real static file to serve on a direct hit.
const EXTRA_ROUTES = ["/thank-you", "/404"];

// Hosts we never let load during prerender. Blocking these means:
//   • Meta Pixel never fires PageView
//   • PostHog never registers a session
//   • Tally iframe HTML never loads (so no stale _fbp / attribution bakes in)
//   • Emergent runtime script never registers
//   • Google Fonts CSS is skipped (system fallback is fine for HTML capture;
//     the real browser still loads them via the <link> tag left in <head>).
const BLOCKED_HOSTS = [
  "connect.facebook.net",
  "facebook.com/tr",
  "ap.emergent.sh",
  "assets.emergent.sh",
  "tally.so",
  "fonts.googleapis.com",
];

function log(...args) {
  process.stdout.write(args.join(" ") + "\n");
}

function parseSitemapRoutes(xmlPath) {
  const xml = fs.readFileSync(xmlPath, "utf8");
  const routes = [];
  const re = /<loc>\s*([^<]+?)\s*<\/loc>/g;
  let m;
  while ((m = re.exec(xml)) !== null) {
    let url = m[1];
    if (url.startsWith(ORIGIN)) url = url.slice(ORIGIN.length);
    if (!url.startsWith("/")) url = "/" + url;
    routes.push(url);
  }
  return routes;
}

function startStaticServer(rootDir, port = 0) {
  return new Promise((resolve) => {
    const server = http.createServer((req, res) =>
      serveHandler(req, res, {
        public: rootDir,
        // Serve prerendered files if they exist, then SPA-fallback to the
        // PRISTINE shell (never the live index.html — see SHELL_PATH above).
        rewrites: [{ source: "**", destination: `/${SHELL_NAME}` }],
        cleanUrls: false,
        trailingSlash: false,
      }),
    );
    server.listen(port, "127.0.0.1", () => {
      const { port: actualPort } = server.address();
      resolve({ server, port: actualPort });
    });
  });
}

async function resolveChromiumPath() {
  // 1. Explicit override — deploy platforms should set this.
  if (process.env.PUPPETEER_EXECUTABLE_PATH) {
    if (fs.existsSync(process.env.PUPPETEER_EXECUTABLE_PATH)) {
      return { path: process.env.PUPPETEER_EXECUTABLE_PATH, source: "PUPPETEER_EXECUTABLE_PATH" };
    }
    log(
      `[prerender] warn: PUPPETEER_EXECUTABLE_PATH=${process.env.PUPPETEER_EXECUTABLE_PATH} does not exist on disk; falling through`,
    );
  }
  if (process.env.CHROME_PATH && fs.existsSync(process.env.CHROME_PATH)) {
    return { path: process.env.CHROME_PATH, source: "CHROME_PATH" };
  }

  // 2. Puppeteer's own bundled Chromium (downloaded by postinstall on fresh
  //    `yarn install` unless the environment vetoes it).
  try {
    const bundled = puppeteer.executablePath();
    if (bundled && fs.existsSync(bundled)) {
      return { path: bundled, source: "puppeteer bundled" };
    }
  } catch (_) {
    /* puppeteer never downloaded — fall through */
  }

  // 3. Common system Chromium/Chrome binaries.
  const candidates = [
    "/usr/bin/chromium",
    "/usr/bin/chromium-browser",
    "/usr/bin/google-chrome",
    "/usr/bin/google-chrome-stable",
    "/snap/bin/chromium",
    "/opt/google/chrome/chrome",
  ];
  for (const p of candidates) {
    if (fs.existsSync(p)) {
      return { path: p, source: `system fallback (${p})` };
    }
  }

  // 4. Nothing worked — bail loudly so the deploy log tells the operator
  //    exactly what's missing and what to do about it.
  console.error(
    [
      "",
      "════════════════════════════════════════════════════════════════════════",
      "[prerender] ERROR: no usable Chromium binary found on this builder.",
      "════════════════════════════════════════════════════════════════════════",
      "",
      "The prerender script needs a real headless Chromium to render every",
      "route to static HTML. Fix ONE of the following on the build environment:",
      "",
      "  1. Set env var  PUPPETEER_EXECUTABLE_PATH=/path/to/chromium",
      "     e.g. PUPPETEER_EXECUTABLE_PATH=/usr/bin/chromium",
      "",
      "  2. Let puppeteer download its bundled Chromium during `yarn install`.",
      "     Ensure neither  PUPPETEER_SKIP_DOWNLOAD=true  nor",
      "     PUPPETEER_SKIP_CHROMIUM_DOWNLOAD=true  is set at install time,",
      "     and that the builder can reach https://storage.googleapis.com.",
      "",
      "  3. Install a system Chromium/Chrome into one of:",
      "       /usr/bin/chromium",
      "       /usr/bin/chromium-browser",
      "       /usr/bin/google-chrome",
      "       /usr/bin/google-chrome-stable",
      "     e.g. `apt-get install -y chromium` on Debian/Ubuntu.",
      "",
      "  4. TEMPORARY escape hatch if you must ship without SEO HTML:",
      "     run  `yarn build:nossg`  instead of  `yarn build`.",
      "",
      "════════════════════════════════════════════════════════════════════════",
      "",
    ].join("\n"),
  );
  process.exit(2);
}

async function launchBrowser() {
  const { path: executablePath, source } = await resolveChromiumPath();
  log(`[prerender] chromium: ${executablePath}  (${source})`);
  return puppeteer.launch({
    headless: "shell",
    executablePath,
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-gpu",
    ],
  });
}

async function prerenderRoute(browser, port, route) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });

  await page.setRequestInterception(true);
  page.on("request", (req) => {
    const u = req.url();
    if (BLOCKED_HOSTS.some((host) => u.includes(host))) {
      return req.abort();
    }
    req.continue();
  });

  const url = `http://127.0.0.1:${port}${route}`;
  const nav = await page.goto(url, {
    waitUntil: "networkidle0",
    timeout: 45000,
  });
  const status = nav ? nav.status() : 0;
  if (status >= 400) {
    await page.close();
    throw new Error(`nav failed for ${route}: HTTP ${status}`);
  }

  // The Layout wrapper renders <main data-testid="page-main"> — a solid
  // "React has painted" signal for every route.
  await page.waitForSelector('[data-testid="page-main"]', { timeout: 20000 });

  // Extra beat so React 19 flushes any deferred JSON-LD <script> tags and
  // <title>/<meta> hoists have landed into <head>.
  await new Promise((r) => setTimeout(r, 250));

  const html = await page.evaluate((routeIn) => {
    // Remove Tally iframes (injected by tally.so/widgets/embed.js at runtime).
    document
      .querySelectorAll('iframe[src*="tally.so"], iframe[data-tally-src]')
      .forEach((el) => el.remove());
    // Remove runtime-injected PostHog / Meta Pixel / Emergent / Tally-widget
    // <script> tags. Static tags declared in public/index.html stay put; only
    // scripts inserted at runtime by inline bootstraps get stripped so the
    // captured HTML doesn't double-request analytics endpoints on real load.
    document.querySelectorAll("script[src]").forEach((el) => {
      const src = el.getAttribute("src") || "";
      // PostHog runtime bundle. Emitted from the inline bootstrap in
      // public/index.html with api_host = "https://ap.emergent.sh" so the
      // resolved URL is https://ap.emergent.sh/static/array.js. Also cover
      // the direct .i.posthog.com variant defensively.
      const isPosthogRuntime =
        src.endsWith("/static/array.js") &&
        (src.includes("posthog") || src.includes("ap.emergent.sh"));
      // Meta Pixel runtime bundle (fbevents.js) — inserted by the inline
      // fbq bootstrap; the request itself is aborted by the interceptor,
      // but the <script> tag is still in the DOM.
      const isPixelRuntime = src.includes("connect.facebook.net");
      // GA4 loader, injected at runtime by components/site/Layout.jsx.
      // Baking this tag into the static HTML made Layout's own guard
      // short-circuit on real page loads, leaving window.gtag undefined and
      // GA4 collecting nothing. Strip it — the effect re-injects it live.
      const isGa4Runtime = src.includes("googletagmanager.com/gtag/js");
      // Tally widget runtime iframes/scripts. The static embed.js loader
      // stays; anything else pointing at tally.so is a runtime child.
      const isTallyRuntime =
        src.includes("tally.so") && !src.endsWith("/widgets/embed.js");
      if (isPosthogRuntime || isPixelRuntime || isTallyRuntime || isGa4Runtime) {
        el.remove();
      }
    });
    // Trustindex's loader mutates its own <script> tag on load, adding
    // data-ti-widget-inited="true". Clear that so the loader re-runs
    // cleanly on real page load.
    document
      .querySelectorAll(
        'script[data-ti-widget-inited], script[src*="cdn.trustindex.io"]',
      )
      .forEach((el) => el.removeAttribute("data-ti-widget-inited"));

    // ── Singleton <head> tag ASSERTION ───────────────────────────────
    // There must be exactly ONE <title>, one canonical, one description and
    // one of each og:/twitter: property per document.
    //
    // WHY WE FAIL THE BUILD INSTEAD OF AUTO-DEDUPING:
    // An earlier version of this fix deleted the extras and kept the LAST of
    // each. Testing against the previously shipped HTML showed that rule is
    // wrong for <title>: React hoists the page title FIRST and the stale
    // shell titles follow, while for <link rel=canonical> and og:* the
    // correct tag is LAST. There is no position rule that is right for every
    // tag type — so guessing would silently ship the homepage title on all 20
    // sub-pages, which is the exact bug this whole change exists to kill.
    //
    // With the pristine-shell fix above there should be nothing to detect.
    // If this ever throws, the cause is almost always one of:
    //   • a <title>/<meta name=description>/<link rel=canonical> was re-added
    //     to public/index.html (React must own those — see the note there), or
    //   • the SPA fallback stopped pointing at the pristine shell.
    const dupes = [];
    const countBy = (selector, keyOf) => {
      const seen = new Map();
      document.head.querySelectorAll(selector).forEach((el) => {
        const k = keyOf(el);
        seen.set(k, (seen.get(k) || 0) + 1);
      });
      seen.forEach((n, k) => {
        if (n > 1) dupes.push(`${k} ×${n}`);
      });
    };
    countBy("title", () => "<title>");
    countBy('link[rel="canonical"]', () => "<link rel=canonical>");
    countBy("meta[name]", (el) => `meta[name="${el.getAttribute("name")}"]`);
    countBy(
      "meta[property]",
      (el) => `meta[property="${el.getAttribute("property")}"]`,
    );
    if (dupes.length) {
      window.__prerenderDupes = dupes;
    }

    // Diagnostic marker: one look at view-source tells you (a) whether the
    // response is our prerendered artifact vs. an SPA-fallback of /, and
    // (b) which route file the host actually served.
    const head = document.head;
    if (head) {
      // Wipe any prior marker (shouldn't exist, but be safe on double-runs).
      head
        .querySelectorAll('meta[name="x-prerendered"]')
        .forEach((m) => m.remove());
      const marker = document.createElement("meta");
      marker.setAttribute("name", "x-prerendered");
      marker.setAttribute("content", routeIn);
      head.insertBefore(marker, head.firstChild);
    }

    // ── TEXT-NODE BOUNDARY PRESERVATION ──────────────────────────────
    // This is the fix for the React #418 hydration error that fired on
    // EVERY page load of this site.
    //
    // THE PROBLEM
    // We are not doing real SSR — we are snapshotting a live browser DOM and
    // writing document.documentElement.outerHTML to disk. JSX like
    //
    //     {hero.h1Mid}{" "}
    //     <span>{hero.h1Accent}</span>
    //
    // renders as TWO adjacent text nodes ("weekend movers" and " ") followed
    // by an element. outerHTML serialises adjacent text nodes with nothing
    // between them, so the browser reparses them as ONE text node on the next
    // load. React then hydrates, expects two, finds one, and throws:
    //   "Hydration failed because the server rendered text didn't match"
    // React recovers by throwing away the entire prerendered tree and
    // re-rendering it on the client — which is precisely the work the
    // prerender exists to avoid, on all 21 pages.
    //
    // THE FIX
    // ReactDOMServer solves this by emitting an empty comment (<!-- -->)
    // between adjacent text nodes. We do the same thing here, walking the
    // body and inserting a separator wherever two text nodes are siblings.
    // The reparsed DOM then has the same node boundaries React expects.
    //
    // Do this LAST, immediately before serialising — inserting comment nodes
    // earlier would confuse the element queries above.
    (function separateAdjacentTextNodes(root) {
      const walker = document.createTreeWalker(root, NodeFilter.SHOW_ELEMENT);
      const elements = [root];
      let node = walker.nextNode();
      while (node) {
        elements.push(node);
        node = walker.nextNode();
      }
      elements.forEach((el) => {
        // <script> / <style> contents are raw text — never split them.
        const tag = el.tagName;
        if (tag === "SCRIPT" || tag === "STYLE" || tag === "TEXTAREA") return;
        const kids = Array.from(el.childNodes);
        for (let i = 0; i < kids.length - 1; i++) {
          if (
            kids[i].nodeType === Node.TEXT_NODE &&
            kids[i + 1].nodeType === Node.TEXT_NODE
          ) {
            el.insertBefore(document.createComment(""), kids[i + 1]);
          }
        }
      });
    })(document.body);

    return "<!doctype html>\n" + document.documentElement.outerHTML;
  }, route);

  const dupes = await page.evaluate(() => window.__prerenderDupes || []);
  await page.close();

  if (dupes.length) {
    throw new Error(
      `duplicate <head> tags on ${route}: ${dupes.join(", ")}. ` +
        `Check that public/index.html has no <title>/<meta name=description>/` +
        `<link rel=canonical>, and that the SPA fallback still points at ` +
        `${SHELL_NAME}. Do NOT deploy this build — conflicting canonicals ` +
        `make Google distrust all of them.`,
    );
  }

  return html;
}

function outPathForRoute(route) {
  if (route === "/") return path.join(BUILD_DIR, "index.html");
  // Cloudflare Pages serves a top-level 404.html with a real HTTP 404 status
  // for any path that matches no file. Without it the host SPA-falls-back to
  // index.html, so every unknown URL returned the full prerendered HOMEPAGE
  // at HTTP 200 — homepage <title>, homepage JSON-LD and a canonical pointing
  // at "/". That is a soft 404 on an unlimited number of URLs.
  // React Router's path="*" renders <NotFound /> for "/404", so this capture
  // is the real 404 view.
  if (route === "/404") return path.join(BUILD_DIR, "404.html");
  const rel = route.replace(/^\/+/, "");
  return path.join(BUILD_DIR, rel, "index.html");
}

async function main() {
  if (!fs.existsSync(BUILD_DIR)) {
    console.error("[prerender] build/ does not exist — run `craco build` first.");
    process.exit(1);
  }
  if (!fs.existsSync(SITEMAP)) {
    console.error("[prerender] public/sitemap.xml missing.");
    process.exit(1);
  }

  const indexPath = path.join(BUILD_DIR, "index.html");
  const indexHtml = fs.readFileSync(indexPath, "utf8");

  // Guard: refuse to run against an already-prerendered build/. Doing so would
  // snapshot a dirty shell and re-introduce the duplicate-<head> bug.
  if (indexHtml.includes('name="x-prerendered"')) {
    console.error(
      "\n[prerender] ERROR: build/index.html is already prerendered.\n" +
        "Run a clean `craco build` first — prerendering on top of a previous\n" +
        "prerender duplicates <title> / <link rel=canonical> in every page.\n",
    );
    process.exit(1);
  }

  fs.writeFileSync(SHELL_PATH, indexHtml, "utf8");
  log(`[prerender] pristine shell snapshotted → ${SHELL_NAME}`);

  const sitemapRoutes = parseSitemapRoutes(SITEMAP);
  if (!sitemapRoutes.length) {
    console.error("[prerender] no <loc> entries found in sitemap.xml.");
    process.exit(1);
  }
  const routes = [...sitemapRoutes, ...EXTRA_ROUTES];
  log(
    `[prerender] ${routes.length} routes (${sitemapRoutes.length} from sitemap`,
    `+ ${EXTRA_ROUTES.length} noindex):`,
    routes.join(", "),
  );

  const { server, port } = await startStaticServer(BUILD_DIR);
  log(`[prerender] static server on http://127.0.0.1:${port}`);

  let browser;
  const failures = [];
  try {
    browser = await launchBrowser();
    for (const route of routes) {
      try {
        const html = await prerenderRoute(browser, port, route);
        const outPath = outPathForRoute(route);
        fs.mkdirSync(path.dirname(outPath), { recursive: true });
        fs.writeFileSync(outPath, html, "utf8");
        log(`[prerender]   ✓ ${route}  →  ${path.relative(ROOT, outPath)}`);
      } catch (err) {
        log(`[prerender]   ✗ ${route}  →  ${err.message}`);
        failures.push({ route, error: err.message });
      }
    }
  } finally {
    if (browser) await browser.close();
    server.close();
    // Never ship the shell — it would be a crawlable duplicate of the homepage.
    if (fs.existsSync(SHELL_PATH)) {
      fs.unlinkSync(SHELL_PATH);
      log(`[prerender] removed ${SHELL_NAME}`);
    }
  }

  if (failures.length) {
    console.error(
      `[prerender] ${failures.length} route(s) failed:`,
      JSON.stringify(failures, null, 2),
    );
    process.exit(1);
  }
  log(`[prerender] done. ${routes.length} pages written.`);
}

main().catch((err) => {
  console.error("[prerender] fatal:", err);
  process.exit(1);
});
