interface IconProps {
  className?: string;
}

/** Glifo de TikTok (Lucide no incluye iconos de marca). SVG ligero, hereda el color con `currentColor`. */
export function TikTokIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
      focusable="false"
    >
      <path d="M16.6 5.82c-1.006-.98-1.55-2.28-1.55-3.62h-3.32v14.4c0 1.55-1.26 2.8-2.8 2.8s-2.8-1.25-2.8-2.8 1.26-2.8 2.8-2.8c.31 0 .6.05.88.14V10.5a6.1 6.1 0 0 0-.88-.06 6.13 6.13 0 0 0-6.13 6.13A6.13 6.13 0 0 0 9.05 22.7a6.13 6.13 0 0 0 6.13-6.13V9.02a9.19 9.19 0 0 0 5.37 1.72V7.42c-1.28 0-2.47-.4-3.45-1.6Z" />
    </svg>
  );
}
