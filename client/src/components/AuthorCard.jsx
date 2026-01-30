function formatArticleFrequency(articlesPerWeek) {
  if (!articlesPerWeek || articlesPerWeek === 0) {
    return null
  }

  // Round to nearest 0.5 for cleaner display
  const rounded = Math.round(articlesPerWeek * 2) / 2

  if (rounded < 0.5) {
    return 'Writes occasionally'
  } else if (rounded < 1) {
    return 'Roughly 1 article every 2 weeks'
  } else if (rounded === 1) {
    return 'Roughly 1 article a week'
  } else if (rounded < 2) {
    return 'Roughly 1-2 articles a week'
  } else if (rounded < 3) {
    return 'Roughly 2 articles a week'
  } else if (rounded < 4) {
    return 'Roughly 3 articles a week'
  } else if (rounded < 5) {
    return 'Roughly 4 articles a week'
  } else if (rounded < 7) {
    return 'Roughly 5-6 articles a week'
  } else {
    return 'Writes daily'
  }
}

export default function AuthorCard({ author, onFollow, isFollowing }) {
  const frequencyText = formatArticleFrequency(author.articlesPerWeek)

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-200">
      {/* Author info */}
      <div>
        <h3 className="font-display text-lg font-bold text-white">
          {author.name}
        </h3>

        {frequencyText && (
          <p className="text-byline-gold/80 text-xs font-medium mt-1">
            {frequencyText}
          </p>
        )}

        {author.bio && (
          <p className="text-white/50 text-sm mt-2 line-clamp-3">
            {author.bio}
          </p>
        )}
      </div>

      {/* Follow button */}
      <button
        onClick={() => onFollow(author)}
        disabled={isFollowing}
        className={`w-full mt-4 py-2.5 rounded-full text-sm font-semibold transition-all duration-200 ${
          author.subscribed
            ? 'bg-white/10 text-white/70 hover:bg-white/15'
            : 'bg-byline-gold hover:bg-byline-gold-bright text-byline-black'
        } ${isFollowing ? 'opacity-50 cursor-not-allowed' : ''}`}
      >
        {isFollowing ? 'Updating...' : author.subscribed ? 'Following' : 'Follow'}
      </button>
    </div>
  )
}
