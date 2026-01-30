export default function FinalCTA({ onGetStartedClick }) {
  return (
    <section className="py-24 px-6">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-6">
          Never miss a byline
        </h2>
        <p className="text-white/60 text-lg mb-10 max-w-xl mx-auto">
          Join thousands of readers who follow the writers, not just the publications.
        </p>
        <button
          onClick={onGetStartedClick}
          className="bg-byline-gold hover:bg-byline-gold-bright text-byline-black px-8 py-4 rounded-full text-lg font-semibold transition-colors"
        >
          Get Started
        </button>
      </div>
    </section>
  )
}
