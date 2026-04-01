"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useCallback, useEffect, useRef } from "react";
import { VHSTimestamp } from "@/components/VHSTimestamp";
import Link from "next/link";

// Blob URL base — set after uploading assets to Vercel Blob
// Leave empty to serve from /public locally
const ASSET_BASE = process.env.NEXT_PUBLIC_GALLERY_CDN || "";

const IMAGES = Array.from({ length: 559 }, (_, i) => ({
  src: `${ASSET_BASE}/gallery/img-${String(i + 1).padStart(3, "0")}.png`,
  id: i + 1,
}));

const VIDEOS = [
  ...Array.from({ length: 63 }, (_, i) => ({
    src: `${ASSET_BASE}/gallery/vid-${String(i + 1).padStart(3, "0")}.mp4`,
    id: `vid-${i + 1}`,
    format: "mp4" as const,
  })),
  ...Array.from({ length: 71 }, (_, i) => ({
    src: `${ASSET_BASE}/gallery/vid-webm-${String(i + 1).padStart(3, "0")}.webm`,
    id: `webm-${i + 1}`,
    format: "webm" as const,
  })),
];

const TABS = [
  { key: "all", label: "ALL", count: IMAGES.length + VIDEOS.length },
  { key: "images", label: "STILLS", count: IMAGES.length },
  { key: "videos", label: "MOTION", count: VIDEOS.length },
] as const;

type TabKey = (typeof TABS)[number]["key"];

const ITEMS_PER_PAGE = 48;

export default function GalleryPage() {
  const [activeTab, setActiveTab] = useState<TabKey>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [columns, setColumns] = useState(4);
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const containerRef = useRef<HTMLDivElement>(null);
  const loadMoreRef = useRef<HTMLDivElement>(null);

  // Reset visible count when tab changes
  useEffect(() => {
    setVisibleCount(ITEMS_PER_PAGE);
  }, [activeTab]);

  // Responsive columns
  useEffect(() => {
    const updateColumns = () => {
      if (window.innerWidth < 640) setColumns(2);
      else if (window.innerWidth < 1024) setColumns(3);
      else setColumns(4);
    };
    updateColumns();
    window.addEventListener("resize", updateColumns);
    return () => window.removeEventListener("resize", updateColumns);
  }, []);

  // Infinite scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
        }
      },
      { rootMargin: "600px" }
    );
    if (loadMoreRef.current) observer.observe(loadMoreRef.current);
    return () => observer.disconnect();
  }, [activeTab]);

  // All items for masonry
  const allItemsFull =
    activeTab === "images"
      ? IMAGES.map((img) => ({ ...img, type: "image" as const }))
      : activeTab === "videos"
        ? VIDEOS.map((vid) => ({ ...vid, type: "video" as const }))
        : [
            ...IMAGES.map((img) => ({ ...img, type: "image" as const })),
            ...VIDEOS.map((vid) => ({ ...vid, type: "video" as const })),
          ];

  const allItems = allItemsFull.slice(0, visibleCount);
  const hasMore = visibleCount < allItemsFull.length;

  // Distribute items across columns for masonry effect
  const columnItems: (typeof allItems)[] = Array.from(
    { length: columns },
    () => []
  );
  allItems.forEach((item, i) => {
    columnItems[i % columns].push(item);
  });

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setLightboxIndex(null);
    document.body.style.overflow = "";
  }, []);

  const navigateLightbox = useCallback(
    (direction: 1 | -1) => {
      if (lightboxIndex === null) return;
      const onlyImages = allItems.filter((i) => i.type === "image");
      const next = lightboxIndex + direction;
      if (next >= 0 && next < onlyImages.length) {
        setLightboxIndex(next);
      }
    },
    [lightboxIndex, allItems]
  );

  // Keyboard navigation for lightbox
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") navigateLightbox(1);
      if (e.key === "ArrowLeft") navigateLightbox(-1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [lightboxIndex, closeLightbox, navigateLightbox]);

  // Get flat image index for lightbox
  const imageItems = allItems.filter((i) => i.type === "image");

  return (
    <main className="relative min-h-screen">
      {/* ════════════════════════════════════════════
          HEADER
          ════════════════════════════════════════════ */}
      <header className="sticky top-0 z-50 bg-warm-black/90 backdrop-blur-md border-b border-gold/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            href="/"
            className="font-display text-xl font-bold tracking-wide hover:text-gold transition-colors"
          >
            WILD <span className="italic text-gold">Things</span>
          </Link>

          <div className="flex items-center gap-6">
            {TABS.map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                className={`vhs-timestamp transition-colors duration-300 ${
                  activeTab === tab.key
                    ? "text-gold"
                    : "text-cream/30 hover:text-cream/60"
                }`}
              >
                {tab.label}{" "}
                <span className="text-cream/20">({tab.count})</span>
              </button>
            ))}
          </div>

          <VHSTimestamp />
        </div>
      </header>

      {/* ════════════════════════════════════════════
          GALLERY HERO
          ════════════════════════════════════════════ */}
      <section className="py-20 px-6 text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <p className="vhs-timestamp mb-4 tracking-[0.5em]">THE ARCHIVE</p>
          <h1
            className="font-display font-bold leading-[0.85] tracking-tight"
            style={{ fontSize: "clamp(2.5rem, 8vw, 6rem)" }}
          >
            Creative <span className="italic text-gold">Output</span>
          </h1>
          <p className="mt-4 text-cream/30 font-display italic max-w-lg mx-auto">
            AI-generated art, campaign visuals, product photography, and motion
            — all produced with Make Me Studio
          </p>
        </motion.div>
      </section>

      {/* ════════════════════════════════════════════
          MASONRY GRID
          ════════════════════════════════════════════ */}
      <section
        ref={containerRef}
        className="px-4 md:px-8 lg:px-12 pb-32 max-w-[1800px] mx-auto"
      >
        <div className="flex gap-3 md:gap-4">
          {columnItems.map((column, colIdx) => (
            <div key={colIdx} className="flex-1 flex flex-col gap-3 md:gap-4">
              {column.map((item, itemIdx) => {
                const globalIndex = itemIdx * columns + colIdx;
                const staggerDelay = Math.min(globalIndex * 0.02, 0.5);

                if (item.type === "video") {
                  return (
                    <motion.div
                      key={item.id}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.5,
                        delay: staggerDelay,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="group relative rounded-sm overflow-hidden video-vignette"
                    >
                      <video
                        autoPlay
                        muted
                        loop
                        playsInline
                        className="w-full object-cover"
                      >
                        <source
                          src={item.src}
                          type={
                            item.src.endsWith(".webm")
                              ? "video/webm"
                              : "video/mp4"
                          }
                        />
                      </video>
                      <div className="absolute top-3 left-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <span className="vhs-timestamp">MOTION</span>
                      </div>
                      <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/20 transition-all duration-500 rounded-sm" />
                    </motion.div>
                  );
                }

                // Find this image's index in imageItems for lightbox
                const imageIndex = imageItems.findIndex(
                  (img) => img.id === item.id
                );

                return (
                  <motion.div
                    key={item.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.5,
                      delay: staggerDelay,
                      ease: [0.22, 1, 0.36, 1],
                    }}
                    className="group relative rounded-sm overflow-hidden cursor-pointer"
                    onClick={() => openLightbox(imageIndex)}
                  >
                    <img
                      src={item.src}
                      alt={`Creative work ${item.id}`}
                      className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      loading="lazy"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-warm-black/0 group-hover:bg-warm-black/30 transition-all duration-500" />
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      <span className="vhs-timestamp">
                        NO. {String(item.id).padStart(3, "0")}
                      </span>
                    </div>
                    <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/20 transition-all duration-500 rounded-sm" />
                  </motion.div>
                );
              })}
            </div>
          ))}
        </div>

        {/* Load more trigger */}
        {hasMore && (
          <div ref={loadMoreRef} className="flex justify-center py-16">
            <div className="flex flex-col items-center gap-3">
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="vhs-timestamp"
              >
                LOADING MORE...
              </motion.div>
              <p className="text-cream/20 text-xs font-display">
                {allItems.length} of {allItemsFull.length} pieces
              </p>
            </div>
          </div>
        )}

        {!hasMore && allItems.length > 0 && (
          <div className="text-center py-16">
            <p className="vhs-timestamp">
              END OF ARCHIVE &middot; {allItemsFull.length} PIECES
            </p>
          </div>
        )}
      </section>

      {/* ════════════════════════════════════════════
          LIGHTBOX
          ════════════════════════════════════════════ */}
      <AnimatePresence>
        {lightboxIndex !== null && imageItems[lightboxIndex] && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[10000] bg-warm-black/95 flex items-center justify-center"
            onClick={closeLightbox}
          >
            {/* Close button */}
            <button
              onClick={closeLightbox}
              className="absolute top-6 right-6 text-cream/50 hover:text-gold transition-colors z-10"
            >
              <svg
                width="32"
                height="32"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
              >
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            </button>

            {/* Nav arrows */}
            {lightboxIndex > 0 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox(-1);
                }}
                className="absolute left-6 top-1/2 -translate-y-1/2 text-cream/30 hover:text-gold transition-colors text-4xl font-display z-10"
              >
                &larr;
              </button>
            )}
            {lightboxIndex < imageItems.length - 1 && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  navigateLightbox(1);
                }}
                className="absolute right-6 top-1/2 -translate-y-1/2 text-cream/30 hover:text-gold transition-colors text-4xl font-display z-10"
              >
                &rarr;
              </button>
            )}

            {/* Image */}
            <motion.img
              key={lightboxIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              src={imageItems[lightboxIndex].src}
              alt={`Creative work ${imageItems[lightboxIndex].id}`}
              className="max-h-[85vh] max-w-[90vw] object-contain rounded-sm"
              onClick={(e) => e.stopPropagation()}
            />

            {/* Counter */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2">
              <span className="vhs-timestamp">
                {lightboxIndex + 1} / {imageItems.length}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ════════════════════════════════════════════
          FOOTER
          ════════════════════════════════════════════ */}
      <footer className="border-t border-gold/10 py-8 px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="vhs-timestamp hover:text-gold transition-colors"
          >
            &larr; BACK TO PORTFOLIO
          </Link>
          <p className="vhs-timestamp">
            {allItems.length} PIECES &middot; WILD THINGS STUDIO
          </p>
        </div>
      </footer>
    </main>
  );
}
