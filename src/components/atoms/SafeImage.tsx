// src/components/common/SafeImage.tsx
"use client";
import Image from "next/image";
import { useState } from "react";

export default function SafeImage({
  src,
  fallback = "https://avatars.githubusercontent.com/u/39144284",
  alt,
  className,
}: {
  src: string;
  fallback?: string;
  alt: string;
  className?: string;
}) {
  const [imgSrc, setImgSrc] = useState(src);

  return (
    <img
      src={imgSrc}
      onError={() => setImgSrc(fallback)}
      alt={alt}
      className={className}
    />
  );
}
