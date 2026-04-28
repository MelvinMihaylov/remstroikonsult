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
    const formError = document.getElementById("formError");
    const submitButton = contactForm?.querySelector<HTMLButtonElement>('button[type="submit"]');
    const submitLabel = submitButton?.textContent ?? "Изпрати запитване →";
    const defaultFormError =
      formError?.textContent?.trim() ??
      "⚠️ Не успяхме да изпратим запитването. Моля, обадете се на 0896 153 160 или опитайте отново след малко.";

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

    const hideFeedback = () => {
      if (formSuccess instanceof HTMLElement) {
        formSuccess.style.display = "none";
      }

      if (formError instanceof HTMLElement) {
        formError.style.display = "none";
      }
    };

    const onFormSubmit = async (event: Event) => {
      event.preventDefault();

      if (!contactForm || !submitButton || !(formSuccess instanceof HTMLElement)) {
        return;
      }

      hideFeedback();
      submitButton.disabled = true;
      submitButton.textContent = "Изпращане...";

      try {
        const formData = new FormData(contactForm);
        const payload = Object.fromEntries(formData.entries());
        const response = await fetch(contactForm.action, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Accept: "application/json",
          },
          body: JSON.stringify(payload),
        });

        const result = await response.json().catch(() => null);
        const requestFailed =
          !response.ok || result?.success === false || result?.success === "false";

        if (requestFailed) {
          const serviceMessage =
            typeof result?.message === "string"
              ? result.message
              : typeof result?.error === "string"
                ? result.error
                : "";

          if (formError instanceof HTMLElement) {
            formError.textContent = /activate|confirm/i.test(serviceMessage)
              ? "⚠️ FormSubmit изисква еднократно потвърждение на melvin@nula.bg. Проверете входящата поща, активирайте формата и опитайте отново."
              : serviceMessage
                ? `⚠️ ${serviceMessage}`
                : defaultFormError;
            formError.style.display = "block";
          }

          return;
        }

        contactForm.reset();
        formSuccess.style.display = "block";

        if (successTimeout) {
          window.clearTimeout(successTimeout);
        }

        successTimeout = window.setTimeout(() => {
          formSuccess.style.display = "none";
        }, 8000);
      } catch (error) {
        if (formError instanceof HTMLElement) {
          formError.textContent = defaultFormError;
          formError.style.display = "block";
        }

        console.error("Failed to submit contact form:", error);
      } finally {
        submitButton.disabled = false;
        submitButton.textContent = submitLabel;
      }
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
