"use client";

import { motion } from "framer-motion";

interface GalleryCardProps {
  index: number;
  title: string;
  subtitle: string;
  color: string;
  tags: string[];
  href?: string;
  aspect?: string;
}

export function GalleryCard({
  index,
  title,
  subtitle,
  color,
  tags,
  href,
  aspect = "aspect-[3/4]",
}: GalleryCardProps) {
  const Wrapper = href ? "a" : "div";
  const wrapperProps = href
    ? { href, target: "_blank" as const, rel: "noopener noreferrer" as const }
    : {};

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.1,
        ease: [0.22, 1, 0.36, 1],
      }}
      whileHover={{ y: -8 }}
      className="group relative"
    >
      <Wrapper {...wrapperProps}>
        <div
          className={`${aspect} ${color} rounded-sm overflow-hidden relative chromatic`}
        >
          <div className="absolute inset-0 flex flex-col justify-end p-5 md:p-6">
            <div className="relative z-10">
              <p className="vhs-timestamp mb-2">
                VOL. {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="text-lg md:text-xl font-bold font-display tracking-wide text-cream leading-tight">
                {title}
              </h3>
              <p className="text-xs md:text-sm text-cream/50 mt-1 font-display italic">
                {subtitle}
              </p>
              <div className="flex flex-wrap gap-1.5 mt-3">
                {tags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="text-[0.6rem] tracking-[0.15em] uppercase text-gold/50 border border-gold/15 px-2 py-0.5 rounded-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-warm-black/95 via-warm-black/30 to-transparent" />
          {/* Hover border + glow */}
          <div className="absolute inset-0 border border-gold/0 group-hover:border-gold/30 transition-all duration-500 rounded-sm" />
          {/* External link indicator */}
          {href && (
            <div className="absolute top-4 right-4 text-gold/0 group-hover:text-gold/60 transition-all duration-500 z-10">
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
              >
                <path d="M7 17L17 7M17 7H7M17 7V17" />
              </svg>
            </div>
          )}
        </div>
      </Wrapper>
    </motion.div>
  );
}
