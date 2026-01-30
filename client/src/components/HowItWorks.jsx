const steps = [
  {
    number: 1,
    title: 'Search',
    description: 'Find your favorite writers by name, publication, or browse by topic.',
  },
  {
    number: 2,
    title: 'Follow',
    description: 'Add writers to your feed with one click. We\'ll track their bylines automatically.',
  },
  {
    number: 3,
    title: 'Read',
    description: 'Get a beautiful daily digest every evening with all the new articles.',
  },
]

export default function HowItWorks() {
  return (
    <section className="bg-byline-cream py-24 px-6">
      <div className="max-w-5xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-black text-byline-black text-center mb-16">
          How it works
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
          {steps.map((step) => (
            <div key={step.number} className="text-center">
              <div className="w-16 h-16 rounded-full bg-byline-gold text-byline-black font-display text-2xl font-bold flex items-center justify-center mx-auto mb-6">
                {step.number}
              </div>
              <h3 className="font-display text-2xl font-bold text-byline-black mb-4">
                {step.title}
              </h3>
              <p className="text-byline-black/60 leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
