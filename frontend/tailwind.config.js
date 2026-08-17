/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      borderRadius: {
        // The signage system is square. Radius tokens resolve to 0 so any
        // shadcn ui/ component that ships rounded corners lands in-system.
        lg: "var(--radius)",
        md: "calc(var(--radius))",
        sm: "calc(var(--radius))",
      },
      fontFamily: {
        // font-display = the heavy signage face (headings, buttons, prices).
        // font-sans    = Archivo regular for body copy.
        display: ['"Archivo Black"', "system-ui", "sans-serif"],
        sans: ['"Archivo"', "system-ui", "sans-serif"],
      },
      colors: {
        /* ── Haul Yeah signage palette ──────────────────────────
         * ink / cream / orange are the three real tokens.
         *
         * `navy` is DELIBERATELY kept as a name and repointed at the new
         * near-black. The previous theme used text-navy / bg-navy in dozens
         * of places; repointing means any class missed during the redesign
         * still renders in-system instead of shipping the old blue.
         * Prefer `ink` in new code.
         * ───────────────────────────────────────────────────── */
        ink: {
          DEFAULT: "#121110",
          soft: "#1E1C19",
        },
        navy: {
          DEFAULT: "#121110",
          hover: "#1E1C19",
          deep: "#000000",
        },
        cream: {
          DEFAULT: "#F4EFE3",
          deep: "#E8E0CE",
        },
        tan: "#8A7A5E",
        orange: {
          /* 5.18:1 on white / cream — the ONLY orange allowed to carry or
             sit behind white text. */
          DEFAULT: "#C2410C",
          hover: "#9A3412",
          soft: "#FFF1E9",
          /* 2.84:1 on white — decorative, or behind BLACK text only.
             Never put white text on this value. */
          bright: "#FF6B2C",
        },

        // shadcn tokens (kept intact — remapped in index.css :root)
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
      },
      boxShadow: {
        // Hard offset "signage" shadow — no blur, no softness.
        sign: "6px 6px 0 rgba(0,0,0,0.25)",
        "sign-sm": "3px 3px 0 rgba(0,0,0,0.25)",
        "sign-ink": "6px 6px 0 #121110",
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
