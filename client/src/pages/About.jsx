export default function About() {
  return (
    <div className="min-h-screen pt-24 px-6">
      <div className="max-w-3xl mx-auto py-16">
        <h1 className="font-display text-5xl font-black text-white mb-8">
          About Byline
        </h1>

        <div className="prose prose-invert prose-lg">
          <p className="text-white/70 text-lg leading-relaxed mb-6">
            In an age of endless content, it's easy to lose track of the writers who actually matter to you.
            Publications come and go, writers move between outlets, and great journalism gets lost in the noise.
          </p>

          <p className="text-white/70 text-lg leading-relaxed mb-6">
            <span className="font-display font-bold text-white">Byline</span> was built to solve this problem.
            Instead of following publications, follow the journalists themselves. We track their work across
            every outlet and deliver it straight to your inbox.
          </p>

          <h2 className="font-display text-2xl font-bold text-white mt-12 mb-4">
            How it works
          </h2>

          <p className="text-white/70 text-lg leading-relaxed mb-6">
            Search for your favorite writers by name, Twitter handle, or browse by category.
            Follow them with a single click, and we'll monitor thousands of publications for their bylines.
          </p>

          <p className="text-white/70 text-lg leading-relaxed mb-6">
            Every day, you'll receive a beautifully curated email digest featuring all the new articles
            from the writers you follow. No algorithms, no noise—just the journalism you care about.
          </p>

          <h2 className="font-display text-2xl font-bold text-white mt-12 mb-4">
            Our mission
          </h2>

          <p className="text-white/70 text-lg leading-relaxed mb-6">
            We believe that great journalism deserves great readers. By making it easier to follow
            individual voices, we hope to support the writers who inform, challenge, and inspire us.
          </p>

          <div className="mt-16 pt-8 border-t border-white/10">
            <p className="text-white/40 text-sm">
              Questions? Reach out at{' '}
              <a href="mailto:hello@joinbyline.com" className="text-byline-gold hover:text-byline-gold-bright transition-colors">
                hello@joinbyline.com
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
