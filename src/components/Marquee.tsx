"use client";

export function Marquee({ words }: { words: string[] }) {
  const doubled = [...words, ...words];
  return (
    <div className="overflow-hidden py-6 border-y border-gold/10">
      <div className="animate-marquee flex whitespace-nowrap">
        {doubled.map((word, i) => (
          <span
            key={i}
            className="mx-8 text-lg tracking-[0.3em] uppercase text-gold/30 font-display"
          >
            {word}
          </span>
        ))}
      </div>
    </div>
  );
}
