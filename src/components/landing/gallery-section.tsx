"use client";

import { useEffect, useState } from "react";

import { siteConfig } from "../../app/site-config";
import { galleryCategories } from "./gallery-content";

type GalleryImage = {
  src: string;
  alt: string;
  categorySlug: string;
  categoryTitle: string;
  categoryDescription: string;
  imageIndex: number;
  totalInCategory: number;
};

const galleryLeadStyle = {
  marginTop: "0.7rem",
};

const galleryImages: GalleryImage[] = galleryCategories.flatMap((category) =>
  Array.from({ length: category.imageCount }, (_, index) => ({
    src: buildGalleryImagePath(category.slug, index + 1),
    alt: `${category.title} – снимка ${index + 1} от ${category.imageCount}`,
    categorySlug: category.slug,
    categoryTitle: category.title,
    categoryDescription: category.previewDescription,
    imageIndex: index + 1,
    totalInCategory: category.imageCount,
  })),
);

const galleryPreviewCategories = galleryCategories
  .filter((category) => category.showOnGrid)
  .map((category) => ({
    ...category,
    coverSrc: buildGalleryImagePath(category.slug, category.coverIndex ?? 1),
  }));

function buildGalleryImagePath(slug: string, index: number) {
  return `/images/remstroi/gallery/${slug}/${String(index).padStart(2, "0")}.jpg`;
}

function joinClassNames(...classNames: Array<string | false | null | undefined>) {
  return classNames.filter(Boolean).join(" ");
}

function formatImageCount(count: number) {
  return `${count} снимки`;
}

export function GallerySection() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const activeImage = activeIndex === null ? null : galleryImages[activeIndex];
  const activePosition = activeIndex === null ? null : activeIndex + 1;

  useEffect(() => {
    if (activeIndex === null) {
      return;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveIndex(null);
        return;
      }

      if (event.key === "ArrowRight") {
        event.preventDefault();
        setActiveIndex((current) =>
          current === null ? current : (current + 1) % galleryImages.length,
        );
      }

      if (event.key === "ArrowLeft") {
        event.preventDefault();
        setActiveIndex((current) =>
          current === null ? current : (current - 1 + galleryImages.length) % galleryImages.length,
        );
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [activeIndex]);

  const openCategory = (categorySlug: string) => {
    const firstImageIndex = galleryImages.findIndex((image) => image.categorySlug === categorySlug);

    if (firstImageIndex === -1) {
      return;
    }

    setActiveIndex(firstImageIndex);
  };

  const closeModal = () => {
    setActiveIndex(null);
  };

  const showPreviousImage = () => {
    setActiveIndex((current) =>
      current === null ? current : (current - 1 + galleryImages.length) % galleryImages.length,
    );
  };

  const showNextImage = () => {
    setActiveIndex((current) =>
      current === null ? current : (current + 1) % galleryImages.length,
    );
  };

  return (
    <section className="section gallery-section" id="gallery">
      <div className="container">
        <div className="gallery-header reveal">
          <div className="section-eyebrow">Галерия</div>
          <h2 className="headline">
            Нашите проекти
            <br />
            говорят сами
          </h2>
          <p className="lead" style={galleryLeadStyle}>
            Реални снимки от изпълнени обекти. Натиснете върху категория и разгледайте цялата
            галерия.
          </p>
        </div>

        <div className="gallery-grid reveal">
          {galleryPreviewCategories.map((category) => (
            <button
              key={category.slug}
              type="button"
              className={joinClassNames("gal-item", category.gridClass)}
              onClick={() => openCategory(category.slug)}
              aria-label={`Отвори категория ${category.title}`}
            >
              <img
                src={category.coverSrc}
                alt={`${category.title} – представителна снимка`}
                loading="lazy"
              />
              <div className="gal-overlay">
                <div className="gal-overlay-content">
                  <div>
                    <div className="gal-count">{formatImageCount(category.imageCount)}</div>
                    <span className="gal-label">{category.previewTitle}</span>
                    <div className="gal-desc">{category.previewDescription}</div>
                  </div>
                  <span className="gal-open-label">Разгледай</span>
                </div>
              </div>
            </button>
          ))}
        </div>

        <p className="gallery-cta reveal">
          Имате конкретен проект? <strong>Обадете се и обсъдете идеите си с нас</strong> –{" "}
          {siteConfig.phoneDisplay}
        </p>
      </div>

      {activeImage ? (
        <dialog className="gallery-modal" open aria-label={`Галерия ${activeImage.categoryTitle}`}>
          <button
            type="button"
            className="gallery-modal-backdrop"
            aria-label="Затвори галерията"
            onClick={closeModal}
          />
          <div className="gallery-modal-shell">
            <div className="gallery-modal-topbar">
              <div className="gallery-modal-meta">
                <div className="gallery-modal-category">{activeImage.categoryTitle}</div>
                <div className="gallery-modal-counter">
                  Снимка {activePosition} / {galleryImages.length} · {activeImage.imageIndex} /{" "}
                  {activeImage.totalInCategory} в категорията
                </div>
              </div>
              <button
                type="button"
                className="gallery-modal-close"
                aria-label="Затвори"
                onClick={closeModal}
              >
                ✕
              </button>
            </div>

            <div className="gallery-modal-stage">
              <button
                type="button"
                className="gallery-modal-arrow"
                aria-label="Предишна снимка"
                onClick={showPreviousImage}
              >
                ←
              </button>
              <div className="gallery-modal-frame">
                <img
                  key={activeImage.src}
                  src={activeImage.src}
                  alt={activeImage.alt}
                  className="gallery-modal-image"
                />
              </div>
              <button
                type="button"
                className="gallery-modal-arrow"
                aria-label="Следваща снимка"
                onClick={showNextImage}
              >
                →
              </button>
            </div>

            <div className="gallery-modal-footer">
              <div className="gallery-modal-caption">{activeImage.categoryDescription}</div>
              <div className="gallery-modal-hint">
                Използвайте стрелките, клавиатурата или просто затворете с Esc.
              </div>
            </div>
          </div>
        </dialog>
      ) : null}
    </section>
  );
}
