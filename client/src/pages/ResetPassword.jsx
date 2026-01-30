import { useState, useEffect } from 'react'
import { useSearchParams, Link } from 'react-router-dom'
import Nav from '../components/Nav'
import Footer from '../components/Footer'

export default function ResetPassword({ user, onLogout, onLoginRequired }) {
  const [searchParams] = useSearchParams()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (!token) {
      setError('Missing password reset token. Please request a new reset link.')
    }
  }, [token])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!password) {
      setError('Please enter a new password')
      setLoading(false)
      return
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters')
      setLoading(false)
      return
    }

    if (password !== confirmPassword) {
      setError('Passwords do not match')
      setLoading(false)
      return
    }

    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')

      const response = await fetch('/password/update', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken || '',
        },
        body: JSON.stringify({ token, password }),
      })

      const data = await response.json()

      if (response.ok) {
        setSuccess(true)
      } else {
        setError(data.error || 'Something went wrong. Please try again.')
      }
    } catch (err) {
      setError('Network error. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-byline-black">
      <Nav user={user} onLogout={onLogout} onLoginClick={onLoginRequired} />

      <main className="pt-24 pb-16 px-6">
        <div className="max-w-md mx-auto">
          {success ? (
            <div className="bg-byline-black border border-white/10 rounded-2xl p-8 text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="font-display text-3xl font-bold text-white mb-2">
                Password updated!
              </h1>
              <p className="text-white/50 mb-6">
                Your password has been successfully reset. You can now sign in with your new password.
              </p>
              <Link
                to="/"
                className="inline-block bg-byline-gold hover:bg-byline-gold-bright text-byline-black px-8 py-3 rounded-full font-semibold transition-colors"
              >
                Go to Home
              </Link>
            </div>
          ) : (
            <div className="bg-byline-black border border-white/10 rounded-2xl p-8">
              <h1 className="font-display text-3xl font-bold text-white mb-2">
                Reset your password
              </h1>
              <p className="text-white/50 mb-8">
                Enter your new password below.
              </p>

              <form onSubmit={handleSubmit}>
                {error && (
                  <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <div className="mb-4">
                  <label htmlFor="password" className="block text-white/70 text-sm mb-2">
                    New Password
                  </label>
                  <input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-byline-gold/50 focus:ring-2 focus:ring-byline-gold/20 transition-all"
                    placeholder="••••••••"
                    disabled={!token}
                  />
                </div>

                <div className="mb-6">
                  <label htmlFor="confirm-password" className="block text-white/70 text-sm mb-2">
                    Confirm New Password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-byline-gold/50 focus:ring-2 focus:ring-byline-gold/20 transition-all"
                    placeholder="••••••••"
                    disabled={!token}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !token}
                  className={`w-full bg-byline-gold hover:bg-byline-gold-bright text-byline-black py-3 rounded-full font-semibold transition-colors ${
                    loading || !token ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                >
                  {loading ? 'Resetting...' : 'Reset Password'}
                </button>
              </form>

              <p className="mt-6 text-center text-white/40 text-sm">
                <Link
                  to="/"
                  className="text-byline-gold hover:text-byline-gold-bright transition-colors"
                >
                  Back to home
                </Link>
              </p>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  )
}
