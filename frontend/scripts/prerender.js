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
const ORIGIN = "https://haulyeahmoves.com";

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
        // Serve prerendered files if they exist, then SPA-fallback to /index.html
        // so any route the prerender hasn't overwritten yet still boots as SPA.
        rewrites: [{ source: "**", destination: "/index.html" }],
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
      // Tally widget runtime iframes/scripts. The static embed.js loader
      // stays; anything else pointing at tally.so is a runtime child.
      const isTallyRuntime =
        src.includes("tally.so") && !src.endsWith("/widgets/embed.js");
      if (isPosthogRuntime || isPixelRuntime || isTallyRuntime) {
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

    return "<!doctype html>\n" + document.documentElement.outerHTML;
  }, route);

  await page.close();
  return html;
}

function outPathForRoute(route) {
  if (route === "/") return path.join(BUILD_DIR, "index.html");
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

  const routes = parseSitemapRoutes(SITEMAP);
  if (!routes.length) {
    console.error("[prerender] no <loc> entries found in sitemap.xml.");
    process.exit(1);
  }
  log(`[prerender] ${routes.length} routes from sitemap:`, routes.join(", "));

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
