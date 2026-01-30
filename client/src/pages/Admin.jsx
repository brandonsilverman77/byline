import { useState } from 'react'
import { useMutation, gql } from '@apollo/client'

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
