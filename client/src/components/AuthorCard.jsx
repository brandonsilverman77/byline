export default function AuthorCard({ author, onFollow, isFollowing }) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-2xl p-6 hover:bg-white/[0.07] transition-all duration-200">
      {/* Author info */}
      <div>
        <h3 className="font-display text-lg font-bold text-white">
          {author.name}
        </h3>

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
