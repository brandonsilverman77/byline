import { useState } from 'react'
import { useMutation, useQuery, gql } from '@apollo/client'

const GET_ADMIN_STATS = gql`
  query GetAdminStats {
    admin {
      stats {
        totalUsers
        activeUsers
        usersWithSubscriptions
        totalSubscriptions
        totalAuthors
        totalFeeds
      }
    }
  }
`

const CREATE_FEED = gql`
  mutation CreateFeed($input: CreateFeedInput!) {
    createFeed(input: $input) {
      errors
    }
  }
`

export default function Admin({ user }) {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const { data: statsData, loading: statsLoading } = useQuery(GET_ADMIN_STATS, {
    skip: !user,
  })
  const stats = statsData?.admin?.stats

  const [createFeed, { loading }] = useMutation(CREATE_FEED, {
    onCompleted: (data) => {
      if (data.createFeed.errors?.length > 0) {
        setError(data.createFeed.errors[0])
      } else {
        setSuccess(true)
        setUrl('')
        setTimeout(() => setSuccess(false), 3000)
      }
    },
    onError: (err) => {
      setError(err.message)
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSuccess(false)

    if (!url) {
      setError('Please enter an RSS feed URL')
      return
    }

    try {
      new URL(url)
    } catch {
      setError('Please enter a valid URL')
      return
    }

    await createFeed({
      variables: {
        input: { url },
      },
    })
  }

  // Check if user is admin
  if (!user) {
    return (
      <div className="min-h-screen pt-24 px-6 flex items-center justify-center">
        <p className="text-white/50">Please log in to access the admin panel.</p>
      </div>
    )
  }

  return (
    <div className="min-h-screen pt-24 px-6">
      <div className="max-w-xl mx-auto py-16">
        <h1 className="font-display text-4xl font-black text-white mb-8">
          Admin Panel
        </h1>

        {/* Stats Section */}
        <div className="bg-white/5 border border-white/10 rounded-2xl p-8 mb-8">
          <h2 className="font-display text-xl font-bold text-white mb-6">
            Platform Stats
          </h2>

          {statsLoading ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="bg-white/5 rounded-lg p-4 animate-pulse">
                  <div className="h-8 bg-white/10 rounded mb-2" />
                  <div className="h-4 bg-white/10 rounded w-2/3" />
                </div>
              ))}
            </div>
          ) : stats ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-3xl font-bold text-byline-gold">{stats.totalUsers}</div>
                <div className="text-white/50 text-sm">Total Users</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-3xl font-bold text-byline-gold">{stats.activeUsers}</div>
                <div className="text-white/50 text-sm">Active Users</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-3xl font-bold text-byline-gold">{stats.usersWithSubscriptions}</div>
                <div className="text-white/50 text-sm">Users with Subscriptions</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-3xl font-bold text-byline-gold">{stats.totalSubscriptions}</div>
                <div className="text-white/50 text-sm">Total Subscriptions</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-3xl font-bold text-byline-gold">{stats.totalAuthors}</div>
                <div className="text-white/50 text-sm">Authors</div>
              </div>
              <div className="bg-white/5 rounded-lg p-4">
                <div className="text-3xl font-bold text-byline-gold">{stats.totalFeeds}</div>
                <div className="text-white/50 text-sm">RSS Feeds</div>
              </div>
            </div>
          ) : (
            <p className="text-white/50">Unable to load stats</p>
          )}
        </div>

        <div className="bg-white/5 border border-white/10 rounded-2xl p-8">
          <h2 className="font-display text-xl font-bold text-white mb-6">
            Add RSS Feed
          </h2>

          <form onSubmit={handleSubmit}>
            {error && (
              <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                {error}
              </div>
            )}

            {success && (
              <div className="mb-4 p-3 bg-green-500/10 border border-green-500/30 rounded-lg text-green-400 text-sm">
                Feed added successfully!
              </div>
            )}

            <div className="mb-6">
              <label htmlFor="url" className="block text-white/70 text-sm mb-2">
                RSS Feed URL
              </label>
              <input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-byline-gold/50 focus:ring-2 focus:ring-byline-gold/20 transition-all"
                placeholder="https://example.com/rss"
              />
            </div>

            <button
              type="submit"
              disabled={loading || !url}
              className={`w-full bg-byline-gold hover:bg-byline-gold-bright text-byline-black py-3 rounded-full font-semibold transition-colors ${
                loading || !url ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {loading ? 'Adding...' : 'Add Feed'}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
