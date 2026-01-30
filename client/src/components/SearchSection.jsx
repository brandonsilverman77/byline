import { useState, useEffect } from 'react'
import { useQuery, useMutation } from '@apollo/client'
import { GET_CATEGORIES, GET_AUTHORS } from '../graphql/queries'
import { SUBSCRIBE_TO_AUTHOR } from '../graphql/mutations'
import CategoryChips from './CategoryChips'
import AuthorCard from './AuthorCard'

export default function SearchSection({ user, onLoginRequired }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [hasSearched, setHasSearched] = useState(false)
  const [followingAuthorId, setFollowingAuthorId] = useState(null)

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm)
      if (searchTerm) setHasSearched(true)
    }, 300)
    return () => clearTimeout(timer)
  }, [searchTerm])

  const { data: categoriesData, loading: categoriesLoading, error: categoriesError } = useQuery(GET_CATEGORIES)
  const categories = categoriesData?.app?.categories?.nodes || []

  // Log categories for debugging
  console.log('Categories loading:', categoriesLoading)
  console.log('Categories data:', categoriesData)
  console.log('Categories nodes:', categoriesData?.app?.categories?.nodes)
  console.log('Categories array:', categories)
  console.log('Categories error:', categoriesError)

  const shouldFetch = debouncedSearch || selectedCategory
  const { data: authorsData, loading: authorsLoading, error: authorsError } = useQuery(GET_AUTHORS, {
    variables: {
      search: debouncedSearch || undefined,
      categories: selectedCategory ? [selectedCategory] : undefined,
    },
    skip: !shouldFetch,
  })
  const authors = authorsData?.app?.authors?.nodes || []

  // Log authors for debugging
  if (shouldFetch) {
    console.log('Authors query - search:', debouncedSearch, 'category:', selectedCategory)
    console.log('Authors data:', authorsData, 'error:', authorsError)
  }

  const [subscribeToAuthor] = useMutation(SUBSCRIBE_TO_AUTHOR, {
    refetchQueries: ['GetAuthors'],
  })

  const handleFollow = async (author) => {
    if (!user) {
      onLoginRequired()
      return
    }

    setFollowingAuthorId(author.objectId)
    try {
      await subscribeToAuthor({
        variables: {
          input: { authorId: author.objectId },
        },
      })
    } catch (error) {
      console.error('Failed to follow author:', error)
    } finally {
      setFollowingAuthorId(null)
    }
  }

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId)
    if (categoryId) setHasSearched(true)
  }

  const handleSearch = (e) => {
    e.preventDefault()
    setHasSearched(true)
  }

  return (
    <section id="search-section" className="py-24 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-black text-white text-center mb-12">
          Find your <span className="gold-italic">favorite</span> writers
        </h2>

        {/* Search form */}
        <form onSubmit={handleSearch} className="mb-8">
          <div className="flex gap-3">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search by name or publication..."
              className="flex-1 bg-white/5 border border-white/10 rounded-full px-6 py-4 text-white placeholder-white/40 focus:outline-none focus:border-byline-gold/50 focus:ring-2 focus:ring-byline-gold/20 transition-all"
            />
            <button
              type="submit"
              className="bg-byline-gold hover:bg-byline-gold-bright text-byline-black px-8 py-4 rounded-full font-semibold transition-colors flex items-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <span className="hidden sm:inline">Search</span>
            </button>
          </div>
        </form>

        {/* Category chips */}
        <div className="mb-12">
          <CategoryChips
            categories={categories}
            selectedCategory={selectedCategory}
            onSelectCategory={handleCategorySelect}
            loading={categoriesLoading}
          />
        </div>

        {/* Error display */}
        {(categoriesError || authorsError) && (
          <div className="mb-8 p-4 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400">
            <p>Error loading data: {categoriesError?.message || authorsError?.message}</p>
          </div>
        )}

        {/* Results */}
        {hasSearched && (
          <div className="animate-fade-in">
            {authorsLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="bg-white/5 rounded-2xl p-6 animate-pulse">
                    <div className="flex items-start gap-4">
                      <div className="w-16 h-16 rounded-full bg-white/10" />
                      <div className="flex-1">
                        <div className="h-5 bg-white/10 rounded w-3/4 mb-2" />
                        <div className="h-4 bg-white/10 rounded w-1/2" />
                      </div>
                    </div>
                    <div className="h-10 bg-white/10 rounded-full mt-4" />
                  </div>
                ))}
              </div>
            ) : authors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {authors.map((author) => (
                  <AuthorCard
                    key={author.objectId}
                    author={author}
                    onFollow={handleFollow}
                    isFollowing={followingAuthorId === author.objectId}
                  />
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <p className="text-white/50 text-lg">
                  No writers found. Try a different search or category.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </section>
  )
}
