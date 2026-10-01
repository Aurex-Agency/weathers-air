import { useEffect } from "react";
import { Phone } from "lucide-react";
import PageHero from "@/components/PageHero";
import Seo from "@/components/Seo";
import { BUSINESS } from "@/lib/business";

const PLUGIN_SRC = "https://plugin.contractorcommerce.com?key=nfUq3F32i8k9NoRLYBIY7j3ColNEDftTUhjadzhg";

declare global {
  interface Window {
    CONCOM_LOADER?: {
      run?: () => void;
    };
  }
}

/**
 * The Contractor Commerce plugin scans the DOM once when its script loads.
 * Because this is a single-page app, we make sure the script exists and
 * re-run the loader whenever the shop route mounts so the store hydrates
 * after client-side navigation as well as on a hard refresh.
 */
const Shop = () => {
  useEffect(() => {
    let cancelled = false;
    let retryTimer: number | undefined;
    let attempts = 0;

    const runShopPlugin = (): boolean => {
      if (!cancelled && window.CONCOM_LOADER?.run) {
        window.CONCOM_LOADER.run();
        return true;
      }
      return false;
    };

    const retryRun = () => {
      if (runShopPlugin() || cancelled || attempts >= 24) return;
      attempts += 1;
      retryTimer = window.setTimeout(retryRun, 250);
    };

    const existingScript = document.querySelector<HTMLScriptElement>('script[src^="https://plugin.contractorcommerce.com"]');
    if (!existingScript) {
      const script = document.createElement("script");
      script.src = PLUGIN_SRC;
      script.async = true;
      script.defer = true;
      document.head.appendChild(script);
    }

    retryRun();

    return () => {
      cancelled = true;
      if (retryTimer) window.clearTimeout(retryTimer);
    };
  }, []);

  return (
    <div>
      <Seo
        title="Shop Air Filters & HVAC Supplies"
        description="Order replacement air filters and HVAC supplies online from Weathers Air Conditioning in Columbus, MS, delivered straight to your door."
        path="/shop"
      />
      <PageHero
        headline="Shop Filters & Supplies"
        subheadline="Keep your air clean between service visits. Order replacement filters delivered straight to your door."
      />

      <div className="bg-amber/10 border-b border-amber/20 py-3 text-center px-4">
        <p className="text-sm font-semibold text-foreground">
          Browse and order filters & supplies online, or call{" "}
          <a href={BUSINESS.phone.href} className="underline underline-offset-2 whitespace-nowrap">
            <Phone size={14} className="inline -mt-0.5 mr-1" aria-hidden="true" />
            {BUSINESS.phone.display}
          </a>{" "}
          to order by phone.
        </p>
      </div>

      <section className="py-12 md:py-20 bg-background min-h-[60vh]">
        <div className="container mx-auto px-4">
          <p className="text-sm text-muted-foreground mb-6">The catalog may take a moment to load. If it does not appear, call <a className="underline" href={BUSINESS.phone.href}>{BUSINESS.phone.display}</a> for help ordering.</p>
          {/* Contractor Commerce renders the storefront into this element. */}
          <div id="concom-navigator" navigator-key="m4lqCBqM1hNpcGKw"></div>
        </div>
      </section>
    </div>
  );
};

export default Shop;
