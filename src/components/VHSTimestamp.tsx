"use client";

import { useEffect, useState } from "react";

export function VHSTimestamp({ label }: { label?: string }) {
  const [time, setTime] = useState("");

  useEffect(() => {
    const update = () => {
      const now = new Date();
      const h = now.getHours().toString().padStart(2, "0");
      const m = now.getMinutes().toString().padStart(2, "0");
      const s = now.getSeconds().toString().padStart(2, "0");
      setTime(`${h}:${m}:${s}`);
    };
    update();
    const id = setInterval(update, 1000);
    return () => clearInterval(id);
  }, []);

  return (
    <span className="vhs-timestamp">
      {label && <span className="mr-2">{label}</span>}
      <span className="tabular-nums">{time || "00:00:00"}</span>
      <span className="ml-1 animate-pulse">REC</span>
      <span className="inline-block w-2 h-2 rounded-full bg-red-500 ml-1 animate-pulse" />
    </span>
  );
}
