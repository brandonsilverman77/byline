export default function Hero({ onGetStartedClick }) {
  const scrollToSearch = () => {
    const searchSection = document.getElementById('search-section')
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Background gradient */}
      <div className="absolute inset-0 gold-radial-gradient" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto animate-fade-in">
        <h1 className="font-display text-5xl md:text-7xl font-black text-white leading-tight mb-6">
          Follow the <span className="gold-italic">writers</span> you love.
        </h1>

        <p className="text-white/60 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
          Track your <span className="gold-italic">favorite</span> journalists across every publication.
          One daily email with all their latest stories. Never miss a byline again.
        </p>

        <button
          onClick={onGetStartedClick}
          className="group bg-byline-gold hover:bg-byline-gold-bright text-byline-black px-8 py-4 rounded-full text-lg font-semibold transition-all duration-300 inline-flex items-center gap-2"
        >
          Start Reading
          <svg
            className="w-5 h-5 group-hover:translate-x-1 transition-transform"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToSearch}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white/40 hover:text-white/70 transition-colors animate-bounce"
      >
        <div className="flex flex-col items-center gap-2">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </button>
    </section>
  )
}
