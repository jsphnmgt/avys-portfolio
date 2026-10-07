import { useEffect } from "react";

// Keep the document in normal flow so sticky navigation and anchor links work.
export default function usePortfolioMotion(navbarRef) {
  useEffect(() => {
    const app = navbarRef.current?.closest(".app");
    if (!app) return;
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    let stopMotion = () => {};

    const setup = () => {
      stopMotion();
      if (preference.matches || !("IntersectionObserver" in window)) return;
      const scenes = [...app.querySelectorAll(".opening, .green-world, .closing")];
      const targets = [...app.querySelectorAll(".hero-card-stack, .section-heading, section > .display-heading, .project-card, .experience-entry, .education-photo, .education-card, .certificate-card, .contact-card")];
      const groups = [".projects-grid", ".experience-list", ".education-list", ".certificates-grid"];
      groups.forEach(selector => {
        app.querySelectorAll(selector).forEach(group => {
          [...group.children].forEach((element, index) => {
            element.style.setProperty("--reveal-delay", Math.min(index % 3, 2) * 90 + "ms");
          });
        });
      });
      targets.forEach(element => element.setAttribute("data-scroll-reveal", ""));
      const reveal = element => element.classList.add("is-revealed");
      const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            reveal(entry.target);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0, rootMargin: "0px 0px -6% 0px" });
      targets.forEach(element => {
        const bounds = element.getBoundingClientRect();
        if (bounds.top < window.innerHeight && bounds.bottom > 0) reveal(element);
        else observer.observe(element);
      });
      app.classList.add("scroll-motion-ready");

      let paintFrame = 0;
      let scrollFrame = 0;
      let destination = window.scrollY;
      let lastTime = 0;
      const paint = () => {
        paintFrame = 0;
        scenes.forEach(scene => {
          const bounds = scene.getBoundingClientRect();
          if (bounds.bottom < 0 || bounds.top > window.innerHeight) return;
          const distance = window.innerHeight / 2 - (bounds.top + bounds.height / 2);
          scene.style.setProperty("--scene-shift", Math.max(-60, Math.min(60, distance * .055)) + "px");
        });
      };
      const requestPaint = () => {
        if (!paintFrame) paintFrame = requestAnimationFrame(paint);
      };
      const stopScrolling = () => {
        cancelAnimationFrame(scrollFrame);
        scrollFrame = 0;
        destination = window.scrollY;
        lastTime = 0;
      };
      const easeScroll = time => {
        const elapsed = lastTime ? Math.min(time - lastTime, 50) : 16;
        lastTime = time;
        const difference = destination - window.scrollY;
        if (Math.abs(difference) < .75) {
          window.scrollTo({ top: destination, behavior: "instant" });
          scrollFrame = 0;
          lastTime = 0;
          return;
        }
        window.scrollTo({ top: window.scrollY + difference * (1 - Math.exp(-elapsed / 95)), behavior: "instant" });
        scrollFrame = requestAnimationFrame(easeScroll);
      };
      const wheel = event => {
        if (event.defaultPrevented || !event.cancelable || event.ctrlKey || event.metaKey || event.shiftKey || Math.abs(event.deltaX) > Math.abs(event.deltaY)) return;
        if (!window.matchMedia("(min-width: 901px) and (pointer: fine)").matches || document.querySelector("dialog[open]")) return;
        const element = event.target instanceof Element ? event.target : null;
        if (element?.closest("textarea, input, select, [contenteditable], [data-native-scroll]")) return;
        const delta = event.deltaY * (event.deltaMode === 1 ? 16 : event.deltaMode === 2 ? window.innerHeight : 1);
        const limit = Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
        if (!scrollFrame) destination = window.scrollY;
        const next = Math.max(0, Math.min(limit, destination + delta));
        if (next === destination) return;
        event.preventDefault();
        destination = next;
        if (!scrollFrame) scrollFrame = requestAnimationFrame(easeScroll);
      };
      const focus = event => {
        const element = event.target instanceof Element ? event.target.closest("[data-scroll-reveal]") : null;
        if (element) reveal(element);
      };
      const click = event => {
        if (event.target instanceof Element && event.target.closest("a, button")) stopScrolling();
      };
      window.addEventListener("scroll", requestPaint, { passive: true });
      window.addEventListener("resize", requestPaint);
      window.addEventListener("wheel", wheel, { passive: false });
      window.addEventListener("keydown", stopScrolling);
      window.addEventListener("pointerdown", stopScrolling);
      app.addEventListener("focusin", focus);
      app.addEventListener("click", click);
      paint();
      stopMotion = () => {
        observer.disconnect();
        stopScrolling();
        cancelAnimationFrame(paintFrame);
        window.removeEventListener("scroll", requestPaint);
        window.removeEventListener("resize", requestPaint);
        window.removeEventListener("wheel", wheel);
        window.removeEventListener("keydown", stopScrolling);
        window.removeEventListener("pointerdown", stopScrolling);
        app.removeEventListener("focusin", focus);
        app.removeEventListener("click", click);
        app.classList.remove("scroll-motion-ready");
        targets.forEach(element => {
          element.removeAttribute("data-scroll-reveal");
          element.classList.remove("is-revealed");
          element.style.removeProperty("--reveal-delay");
        });
        scenes.forEach(scene => scene.style.removeProperty("--scene-shift"));
      };
    };
    setup();
    preference.addEventListener("change", setup);
    return () => {
      preference.removeEventListener("change", setup);
      stopMotion();
    };
  }, [navbarRef]);
}
