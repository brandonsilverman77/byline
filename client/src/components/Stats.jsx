const stats = [
  { value: '5K+', label: 'Writers' },
  { value: '50K+', label: 'Articles Daily' },
  { value: '10K+', label: 'Readers' },
]

export default function Stats() {
  return (
    <section className="py-24 px-6 relative overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gold-radial-gradient" />

      <div className="max-w-5xl mx-auto relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {stats.map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="font-display text-6xl md:text-7xl font-black bg-gradient-to-r from-byline-gold to-byline-gold-bright bg-clip-text text-transparent mb-2">
                {stat.value}
              </div>
              <div className="text-white/50 text-lg uppercase tracking-wider">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
