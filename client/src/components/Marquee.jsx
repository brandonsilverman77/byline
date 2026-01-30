const publications = [
  'The New York Times',
  'The Atlantic',
  'The Washington Post',
  'Wired',
  'The New Yorker',
  'ESPN',
  'The Guardian',
  'Vox',
]

export default function Marquee() {
  // Duplicate for seamless loop
  const items = [...publications, ...publications]

  return (
    <section className="bg-byline-gold py-6 overflow-hidden">
      <div className="animate-marquee flex whitespace-nowrap">
        {items.map((pub, index) => (
          <span
            key={index}
            className="text-byline-black/80 text-lg md:text-xl font-display font-bold mx-8"
          >
            {pub}
          </span>
        ))}
      </div>
    </section>
  )
}
