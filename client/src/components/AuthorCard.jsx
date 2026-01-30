export default function AuthorCard({ author, onFollow, isFollowing }) {
  const publications = author.domains?.nodes?.map(d => d.host).slice(0, 3) || []

  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-200">
      <div className="flex items-start gap-4">
        {/* Author image */}
        <div className="flex-shrink-0">
          {author.imageUrl ? (
            <img
              src={author.imageUrl}
              alt={author.name}
              className="w-16 h-16 rounded-full object-cover"
            />
          ) : (
            <div className="w-16 h-16 rounded-full bg-byline-gold/20 flex items-center justify-center">
              <span className="text-byline-gold text-xl font-display font-bold">
                {author.name?.charAt(0) || '?'}
              </span>
            </div>
          )}
        </div>

        {/* Author info */}
        <div className="flex-1 min-w-0">
          <h3 className="font-display text-lg font-bold text-white truncate">
            {author.name}
          </h3>

          {author.twitterHandle && (
            <a
              href={`https://twitter.com/${author.twitterHandle}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-white/40 text-sm hover:text-byline-gold transition-colors"
            >
              @{author.twitterHandle}
            </a>
          )}

          {publications.length > 0 && (
            <p className="text-white/50 text-sm mt-1 truncate">
              {publications.join(' · ')}
            </p>
          )}

          {author.bio && (
            <p className="text-white/40 text-sm mt-2 line-clamp-2">
              {author.bio}
            </p>
          )}
        </div>
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
