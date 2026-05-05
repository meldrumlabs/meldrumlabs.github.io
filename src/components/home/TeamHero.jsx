export function TeamHero() {
  return (
    <section className="max-w-6xl mx-auto px-6 md:px-10 w-full pt-32 md:pt-40 pb-12">
      <div className="max-w-3xl relative">
        {/* Editorial margin line */}
        <div className="absolute -left-6 md:-left-10 top-0 bottom-0 w-px bg-iroh-gray-800/60" />

        <h1 className="text-5xl sm:text-6xl md:text-7xl font-bold tracking-tighter leading-[0.9] text-meldrum-green-400">
          Team
        </h1>

        <p className="mt-8 text-base md:text-lg text-meldrum-orange-400 max-w-xl leading-relaxed">
          Meldrum Labs is a small team of data systems builders shaped by research, open source, and running systems in production.
        </p>
      </div>
    </section>
  )
}
