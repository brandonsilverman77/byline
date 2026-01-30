import { useState } from 'react'

export default function ForgotPasswordDialog({ isOpen, onClose, onBackToLogin }) {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)

    if (!email) {
      setError('Please enter your email')
      setLoading(false)
      return
    }

    try {
      const csrfToken = document.querySelector('meta[name="csrf-token"]')?.getAttribute('content')

      const response = await fetch('/password/reset', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRF-Token': csrfToken || '',
        },
        body: JSON.stringify({ email }),
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

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
        onClick={onClose}
      />

      {/* Dialog */}
      <div className="relative bg-byline-black border border-white/10 rounded-2xl p-8 w-full max-w-md mx-4 animate-slide-up">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/40 hover:text-white transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {success ? (
          <>
            <div className="text-center">
              <div className="w-16 h-16 bg-green-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h2 className="font-display text-2xl font-bold text-white mb-2">
                Check your email
              </h2>
              <p className="text-white/50 mb-6">
                If an account exists with that email, you'll receive a password reset link shortly.
              </p>
              <button
                onClick={() => {
                  setSuccess(false)
                  setEmail('')
                  onClose()
                  onBackToLogin && onBackToLogin()
                }}
                className="text-byline-gold hover:text-byline-gold-bright transition-colors"
              >
                Back to login
              </button>
            </div>
          </>
        ) : (
          <>
            <h2 className="font-display text-3xl font-bold text-white mb-2">
              Forgot password?
            </h2>
            <p className="text-white/50 mb-8">
              Enter your email and we'll send you a link to reset your password.
            </p>

            <form onSubmit={handleSubmit}>
              {error && (
                <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
                  {error}
                </div>
              )}

              <div className="mb-6">
                <label htmlFor="forgot-email" className="block text-white/70 text-sm mb-2">
                  Email
                </label>
                <input
                  id="forgot-email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-byline-gold/50 focus:ring-2 focus:ring-byline-gold/20 transition-all"
                  placeholder="you@example.com"
                />
              </div>

              <button
                type="submit"
                disabled={loading}
                className={`w-full bg-byline-gold hover:bg-byline-gold-bright text-byline-black py-3 rounded-full font-semibold transition-colors ${
                  loading ? 'opacity-50 cursor-not-allowed' : ''
                }`}
              >
                {loading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>

            <p className="mt-6 text-center text-white/40 text-sm">
              Remember your password?{' '}
              <button
                onClick={() => {
                  onClose()
                  onBackToLogin && onBackToLogin()
                }}
                className="text-byline-gold hover:text-byline-gold-bright transition-colors"
              >
                Sign in
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  )
}
