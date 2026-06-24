// The Aria logo — a solid forest-green orb with a beige voice waveform.
export function AriaMark({
  size = 28,
  className,
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 56 56"
      fill="none"
      className={className}
      aria-hidden="true"
    >
      <circle cx="28" cy="28" r="27" fill="var(--green)" />
      <rect x="16.8" y="21" width="3.4" height="14" rx="1.7" fill="var(--beige)" />
      <rect x="23.3" y="16" width="3.4" height="24" rx="1.7" fill="var(--beige)" />
      <rect x="29.6" y="19" width="3.4" height="18" rx="1.7" fill="var(--beige)" />
      <rect x="35.9" y="23" width="3.4" height="10" rx="1.7" fill="var(--beige)" />
    </svg>
  );
}
