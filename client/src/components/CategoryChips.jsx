export default function CategoryChips({ categories, selectedCategory, onSelectCategory, loading }) {
  if (loading) {
    return (
      <div className="flex flex-wrap justify-center gap-3">
        {[1, 2, 3, 4].map((i) => (
          <div
            key={i}
            className="h-10 w-24 bg-white/5 rounded-full animate-pulse"
          />
        ))}
      </div>
    )
  }

  return (
    <div className="flex flex-wrap justify-center gap-3">
      {categories.map((category) => (
        <button
          key={category.objectId}
          onClick={() => onSelectCategory(
            selectedCategory === category.objectId ? null : category.objectId
          )}
          className={`px-5 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
            selectedCategory === category.objectId
              ? 'bg-byline-gold text-byline-black'
              : 'bg-white/5 text-white/70 hover:bg-white/10 hover:text-white border border-white/10'
          }`}
        >
          {category.label}
        </button>
      ))}
    </div>
  )
}
