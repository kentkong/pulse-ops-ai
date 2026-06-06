/** Shared yellow brush stroke for hero brand + page title lockups. */
export function HeroBrushStroke({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 520 72"
      preserveAspectRatio="none"
      aria-hidden
    >
      <path
        d="M-24 38 C48 22 118 46 196 34 C274 22 352 44 430 30 C508 16 548 36 560 32 L564 46 C520 54 448 42 372 50 C296 58 220 44 144 52 C68 60 8 48 -24 42 Z"
        fill="#1a1a1a"
        fillOpacity="0.07"
      />
      <path
        d="M-32 42 C36 24 108 50 188 36 C268 22 348 48 428 34 C508 20 552 40 568 36 L572 50 C512 58 432 46 352 54 C272 62 192 48 112 56 C32 64 -8 52 -32 46 Z"
        fill="#f1c40f"
        fillOpacity="0.34"
      />
      <path
        d="M-18 40 C62 30 142 44 222 36 C302 28 382 42 462 34 C502 30 538 38 552 36"
        fill="none"
        stroke="#f1c40f"
        strokeWidth="2.5"
        strokeOpacity="0.22"
        strokeLinecap="round"
      />
      <path
        d="M12 48 C92 54 172 46 252 50 C332 54 412 46 492 48"
        fill="none"
        stroke="#f1c40f"
        strokeWidth="1.5"
        strokeOpacity="0.14"
        strokeLinecap="round"
      />
      <ellipse
        cx="88"
        cy="30"
        rx="10"
        ry="3.5"
        fill="#f1c40f"
        fillOpacity="0.18"
        transform="rotate(-12 88 30)"
      />
      <ellipse
        cx="310"
        cy="52"
        rx="14"
        ry="4"
        fill="#f1c40f"
        fillOpacity="0.14"
        transform="rotate(8 310 52)"
      />
      <ellipse
        cx="470"
        cy="38"
        rx="7"
        ry="2.5"
        fill="#f1c40f"
        fillOpacity="0.16"
        transform="rotate(-6 470 38)"
      />
    </svg>
  );
}
