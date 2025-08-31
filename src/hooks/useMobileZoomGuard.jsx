import { useEffect } from "react";

// En hook som förhindrar mobil auto-zoom
export default function useMobileZoomGuard() {
  useEffect(() => {
    const meta = document.querySelector('meta[name="viewport"]');
    if (!meta) return;

    const original =
      meta.getAttribute("content") || "width=device-width, initial-scale=1";
    const isMobile = () =>
      Math.min(window.innerWidth, window.innerHeight) <= 820;

    const addNoZoom = () => {
      if (!isMobile()) return;
      if (!/maximum-scale=1/.test(meta.content)) {
        meta.setAttribute(
          "content",
          original + ", maximum-scale=1, user-scalable=no"
        );
      }
    };

    const restoreZoom = () => {
      if (!isMobile()) return;
      // Återställ
      meta.setAttribute("content", original);
      // Om browsern fortfarande tror den är inzoomad → “bumpa” snabbt
      const vv = window.visualViewport;
      if (vv && typeof vv.scale === "number" && vv.scale !== 1) {
        meta.setAttribute("content", original + ", maximum-scale=1");
        requestAnimationFrame(() => meta.setAttribute("content", original));
      }
      // Nudge så layouten reflow:ar tillbaka
      requestAnimationFrame(() => window.scrollTo({ top: window.scrollY }));
    };

    const onFocusIn = (e) => {
      const t = e.target;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.tagName === "SELECT")
      ) {
        addNoZoom();
      }
    };
    const onFocusOut = (e) => {
      const t = e.target;
      if (
        t &&
        (t.tagName === "INPUT" ||
          t.tagName === "TEXTAREA" ||
          t.tagName === "SELECT")
      ) {
        restoreZoom();
      }
    };

    document.addEventListener("focusin", onFocusIn, true);
    document.addEventListener("focusout", onFocusOut, true);

    return () => {
      document.removeEventListener("focusin", onFocusIn, true);
      document.removeEventListener("focusout", onFocusOut, true);
      meta.setAttribute("content", original);
    };
  }, []);
}
