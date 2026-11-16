const links = [{ name: 'contact@meldrumlabs.com', href: 'mailto:contact@meldrumlabs.com' }]

/** The quiet footer used on the landing and services pages. */
export function FooterSimple() {
  return (
    <footer className="relative border-t border-[var(--page-rule)]">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-6 py-8 font-spaceMono text-[0.68rem] uppercase tracking-[0.16em] text-[var(--page-muted)] md:flex-row md:items-center md:justify-between md:px-10">
        <p>
          &copy; {new Date().getFullYear()} Meldrum Labs AB &middot; Stockholm
        </p>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {links.map((link) => (
            <li key={link.name}>
              <a href={link.href} className="transition-colors hover:text-[var(--page-ink)]">
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </footer>
  )
}
