"use client";

import { useEffect } from "react";

import { landingHtml } from "./landing-html";

export default function LandingPage() {
  useEffect(() => {
    const nav = document.getElementById("mainNav");
    const hamburger = document.getElementById("hamburger");
    const mobileMenu = document.getElementById("mobileMenu");
    const contactForm = document.getElementById("contactForm") as HTMLFormElement | null;
    const formSuccess = document.getElementById("formSuccess");

    const closeMobile = () => {
      mobileMenu?.classList.remove("open");
    };

    const onScroll = () => {
      nav?.classList.toggle("scrolled", window.scrollY > 30);
    };

    const onHamburgerClick = () => {
      mobileMenu?.classList.toggle("open");
    };

    const onDocumentClick = (event: MouseEvent) => {
      if (!(event.target instanceof Node) || !nav || !mobileMenu) {
        return;
      }

      if (!nav.contains(event.target) && !mobileMenu.contains(event.target)) {
        closeMobile();
      }
    };

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            return;
          }

          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.07 },
    );

    const revealTargets = Array.from(document.querySelectorAll(".reveal"));
    for (const element of revealTargets) {
      revealObserver.observe(element);
    }

    const anchorHandlers = Array.from(
      document.querySelectorAll<HTMLAnchorElement>('a[href^="#"]'),
    ).map((anchor) => {
      const handler = (event: MouseEvent) => {
        const href = anchor.getAttribute("href");
        if (!href || href === "#") {
          return;
        }

        const target = document.querySelector<HTMLElement>(href);
        if (!target) {
          return;
        }

        event.preventDefault();
        const top = target.getBoundingClientRect().top + window.scrollY - 75;
        window.scrollTo({ top, behavior: "smooth" });
        closeMobile();
      };

      anchor.addEventListener("click", handler);
      return { anchor, handler };
    });

    let successTimeout: number | undefined;

    const onFormSubmit = (event: Event) => {
      event.preventDefault();
      contactForm?.reset();

      if (!formSuccess) {
        return;
      }

      formSuccess.style.display = "block";

      if (successTimeout) {
        window.clearTimeout(successTimeout);
      }

      successTimeout = window.setTimeout(() => {
        formSuccess.style.display = "none";
      }, 8000);
    };

    hamburger?.addEventListener("click", onHamburgerClick);
    contactForm?.addEventListener("submit", onFormSubmit);
    document.addEventListener("click", onDocumentClick);
    window.addEventListener("scroll", onScroll, { passive: true });

    onScroll();

    return () => {
      if (successTimeout) {
        window.clearTimeout(successTimeout);
      }

      hamburger?.removeEventListener("click", onHamburgerClick);
      contactForm?.removeEventListener("submit", onFormSubmit);
      document.removeEventListener("click", onDocumentClick);
      window.removeEventListener("scroll", onScroll);
      revealObserver.disconnect();

      for (const { anchor, handler } of anchorHandlers) {
        anchor.removeEventListener("click", handler);
      }
    };
  }, []);

  // biome-ignore lint/security/noDangerouslySetInnerHtml: landingHtml is a static source-controlled string extracted from the approved reference file.
  return <div dangerouslySetInnerHTML={{ __html: landingHtml }} />;
}
