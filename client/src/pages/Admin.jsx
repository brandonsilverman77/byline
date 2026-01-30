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
        allUsers {
          objectId
          email
          status
          createdAt
          subscriptionCount
        }
        activeUsersList {
          objectId
          email
          status
          createdAt
          subscriptionCount
        }
        usersWithSubscriptionsList {
          objectId
          email
          status
          createdAt
          subscriptionCount
        }
        inactiveUsersList {
          objectId
          email
          status
          createdAt
          subscriptionCount
        }
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

function UserListModal({ isOpen, onClose, title, users }) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-byline-black border border-white/10 rounded-2xl p-6 w-full max-w-2xl mx-4 max-h-[80vh] overflow-hidden flex flex-col">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-display text-xl font-bold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="text-white/40 hover:text-white transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="text-white/50 text-sm mb-4">
          {users?.length || 0} users
        </div>

        <div className="overflow-y-auto flex-1">
          <table className="w-full">
            <thead className="sticky top-0 bg-byline-black">
              <tr className="text-left text-white/50 text-sm border-b border-white/10">
                <th className="pb-2 pr-4">Email</th>
                <th className="pb-2 pr-4">Status</th>
                <th className="pb-2 pr-4">Follows</th>
                <th className="pb-2">Joined</th>
              </tr>
            </thead>
            <tbody>
              {users?.map((u) => (
                <tr key={u.objectId} className="border-b border-white/5 hover:bg-white/5">
                  <td className="py-3 pr-4 text-white text-sm">{u.email}</td>
                  <td className="py-3 pr-4">
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      u.status === 'active'
                        ? 'bg-green-500/20 text-green-400'
                        : 'bg-red-500/20 text-red-400'
                    }`}>
                      {u.status}
                    </span>
                  </td>
                  <td className="py-3 pr-4 text-white/70 text-sm">{u.subscriptionCount}</td>
                  <td className="py-3 text-white/50 text-sm">
                    {new Date(u.createdAt).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}

export default function Admin({ user }) {
  const [url, setUrl] = useState('')
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)
  const [selectedStat, setSelectedStat] = useState(null)

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

  const getModalData = () => {
    switch (selectedStat) {
      case 'totalUsers':
        return { title: 'All Users', users: stats?.allUsers }
      case 'activeUsers':
        return { title: 'Active Users', users: stats?.activeUsersList }
      case 'usersWithSubscriptions':
        return { title: 'Users with Subscriptions', users: stats?.usersWithSubscriptionsList }
      case 'inactiveUsers':
        return { title: 'Inactive Users', users: stats?.inactiveUsersList }
      default:
        return { title: '', users: [] }
    }
  }

  // Check if user is admin
  if (!user) {
    return (
      <div className="min-h-screen pt-24 px-6 flex items-center justify-center">
        <p className="text-white/50">Please log in to access the admin panel.</p>
      </div>
    )
  }

  const modalData = getModalData()

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
              <button
                onClick={() => setSelectedStat('totalUsers')}
                className="bg-white/5 rounded-lg p-4 text-left hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="text-3xl font-bold text-byline-gold">{stats.totalUsers}</div>
                <div className="text-white/50 text-sm">Total Users</div>
              </button>
              <button
                onClick={() => setSelectedStat('activeUsers')}
                className="bg-white/5 rounded-lg p-4 text-left hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="text-3xl font-bold text-byline-gold">{stats.activeUsers}</div>
                <div className="text-white/50 text-sm">Active Users</div>
              </button>
              <button
                onClick={() => setSelectedStat('usersWithSubscriptions')}
                className="bg-white/5 rounded-lg p-4 text-left hover:bg-white/10 transition-colors cursor-pointer"
              >
                <div className="text-3xl font-bold text-byline-gold">{stats.usersWithSubscriptions}</div>
                <div className="text-white/50 text-sm">Users with Subs</div>
              </button>
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

      <UserListModal
        isOpen={!!selectedStat}
        onClose={() => setSelectedStat(null)}
        title={modalData.title}
        users={modalData.users}
      />
    </div>
  )
}
