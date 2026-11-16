const CLIENT = {
  name: 'Massive',
  logo: '/img/user-logos/massive.svg',
}

/**
 * The client logo is a white-fill SVG from the dark-theme days; masking it keeps
 * it legible on paper and lets it inherit the page ink via `bg-current`.
 */
export function ClientLogo({ className = '' }) {
  return (
    <span
      role="img"
      aria-label={CLIENT.name}
      className={`inline-block h-4 bg-current ${className}`}
      style={{
        aspectRatio: '680 / 76',
        maskImage: `url(${CLIENT.logo})`,
        WebkitMaskImage: `url(${CLIENT.logo})`,
        maskRepeat: 'no-repeat',
        WebkitMaskRepeat: 'no-repeat',
        maskSize: 'contain',
        WebkitMaskSize: 'contain',
        maskPosition: 'center',
        WebkitMaskPosition: 'center',
      }}
    />
  )
}
