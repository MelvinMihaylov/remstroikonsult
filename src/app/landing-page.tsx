"use client";

import { type FormEvent, type MouseEvent, useEffect, useRef, useState } from "react";

import {
  contactActivationError,
  contactDefaultError,
  contactSuccessMessage,
} from "../components/landing/content";
import {
  AboutSection,
  ContactSection,
  CtaSection,
  FloatingPhoneButton,
  GallerySection,
  HeroSection,
  PricesSection,
  ReviewsSection,
  ServicesSection,
  SiteFooter,
  SiteHeader,
  TrustBar,
} from "../components/landing/sections";

type SubmissionState = {
  kind: "success" | "error";
  message: string;
} | null;

export default function LandingPage() {
  const rootRef = useRef<HTMLDivElement>(null);
  const navRef = useRef<HTMLElement>(null);
  const mobileMenuRef = useRef<HTMLElement>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const [isNavScrolled, setIsNavScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<SubmissionState>(null);

  useEffect(() => {
    const onScroll = () => {
      setIsNavScrolled(window.scrollY > 30);
    };

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) {
      return;
    }

    const onDocumentClick = (event: globalThis.MouseEvent) => {
      if (!(event.target instanceof Node)) {
        return;
      }

      if (navRef.current?.contains(event.target) || mobileMenuRef.current?.contains(event.target)) {
        return;
      }

      setIsMobileMenuOpen(false);
    };

    document.addEventListener("click", onDocumentClick);

    return () => {
      document.removeEventListener("click", onDocumentClick);
    };
  }, [isMobileMenuOpen]);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) {
      return;
    }

    const revealObserver = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (!entry.isIntersecting) {
            continue;
          }

          entry.target.classList.add("visible");
          revealObserver.unobserve(entry.target);
        }
      },
      { threshold: 0.07 },
    );

    const revealTargets = Array.from(root.querySelectorAll<HTMLElement>(".reveal"));
    for (const element of revealTargets) {
      revealObserver.observe(element);
    }

    return () => {
      revealObserver.disconnect();
    };
  }, []);

  useEffect(() => {
    if (formStatus?.kind !== "success") {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setFormStatus((current) => (current?.kind === "success" ? null : current));
    }, 8000);

    return () => {
      window.clearTimeout(timeoutId);
    };
  }, [formStatus]);

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false);
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((current) => !current);
  };

  const handleAnchorClickCapture = (event: MouseEvent<HTMLDivElement>) => {
    const target = event.target;
    if (!(target instanceof Element)) {
      return;
    }

    const anchor = target.closest('a[href^="#"]');
    if (!(anchor instanceof HTMLAnchorElement)) {
      return;
    }

    const href = anchor.getAttribute("href");
    if (!href || href === "#") {
      return;
    }

    const section = document.querySelector<HTMLElement>(href);
    if (!section) {
      return;
    }

    event.preventDefault();

    const top = section.getBoundingClientRect().top + window.scrollY - 75;
    window.scrollTo({ top, behavior: "smooth" });
    closeMobileMenu();
  };

  const handleFormSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const form = event.currentTarget;

    setFormStatus(null);
    setIsSubmitting(true);

    try {
      const formData = new FormData(form);
      const payload = Object.fromEntries(formData.entries());
      const response = await fetch(form.action, {
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

        setFormStatus({
          kind: "error",
          message: /activate|confirm/i.test(serviceMessage)
            ? contactActivationError
            : serviceMessage
              ? `⚠️ ${serviceMessage}`
              : contactDefaultError,
        });
        return;
      }

      form.reset();
      setFormStatus({ kind: "success", message: contactSuccessMessage });
    } catch (error) {
      setFormStatus({ kind: "error", message: contactDefaultError });
      console.error("Failed to submit contact form:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div ref={rootRef} onClickCapture={handleAnchorClickCapture}>
      <FloatingPhoneButton />
      <SiteHeader
        isNavScrolled={isNavScrolled}
        isMobileMenuOpen={isMobileMenuOpen}
        navRef={navRef}
        mobileMenuRef={mobileMenuRef}
        onToggleMobileMenu={toggleMobileMenu}
        onCloseMobileMenu={closeMobileMenu}
      />
      <HeroSection />
      <TrustBar />
      <AboutSection />
      <ServicesSection />
      <PricesSection />
      <GallerySection />
      <ReviewsSection />
      <CtaSection />
      <ContactSection
        formRef={formRef}
        formStatus={formStatus}
        isSubmitting={isSubmitting}
        onSubmit={handleFormSubmit}
      />
      <SiteFooter />
    </div>
  );
}
