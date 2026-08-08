import React, { useEffect } from "react";
import Header from "./Header";
import Footer from "./Footer";
import MobileCTABar from "./MobileCTABar";
import { loadTallyScript } from "../../lib/tally";

/**
 * Shared page shell: sticky header + main content + footer + persistent mobile CTA.
 * Also loads the Tally embed script once, globally.
 */
export default function Layout({ children }) {
  useEffect(() => {
    loadTallyScript();
  }, []);

  return (
    <div className="flex min-h-screen flex-col bg-white text-ink">
      <Header />
      <main className="flex-1" data-testid="page-main">
        {children}
      </main>
      <Footer />
      <MobileCTABar />
    </div>
  );
}
