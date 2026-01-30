import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../graphql/mutations'

export default function LoginDialog({ isOpen, onClose, onSuccess, onForgotPassword }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  const [login, { loading }] = useMutation(LOGIN, {
    onCompleted: (data) => {
      if (data.login.errors?.length > 0) {
        setError(data.login.errors[0])
      } else {
        onSuccess(data.login.app.user)
        onClose()
      }
    },
    onError: (err) => {
      setError(err.message)
    },
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')

    if (!email || !password) {
      setError('Please enter your email and password')
      return
    }

    await login({
      variables: {
        input: { email, password },
      },
    })
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

        <h2 className="font-display text-3xl font-bold text-white mb-2">
          Welcome back
        </h2>
        <p className="text-white/50 mb-8">
          Sign in to continue following your favorite writers.
        </p>

        <form onSubmit={handleSubmit}>
          {error && (
            <div className="mb-4 p-3 bg-red-500/10 border border-red-500/30 rounded-lg text-red-400 text-sm">
              {error}
            </div>
          )}

          <div className="mb-4">
            <label htmlFor="email" className="block text-white/70 text-sm mb-2">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-byline-gold/50 focus:ring-2 focus:ring-byline-gold/20 transition-all"
              placeholder="you@example.com"
            />
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-white/70 text-sm mb-2">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-white/30 focus:outline-none focus:border-byline-gold/50 focus:ring-2 focus:ring-byline-gold/20 transition-all"
              placeholder="••••••••"
            />
          </div>

          <div className="mb-6 text-right">
            <button
              type="button"
              onClick={() => {
                onClose()
                onForgotPassword && onForgotPassword()
              }}
              className="text-sm text-byline-gold hover:text-byline-gold-bright transition-colors"
            >
              Forgot password?
            </button>
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full bg-byline-gold hover:bg-byline-gold-bright text-byline-black py-3 rounded-full font-semibold transition-colors ${
              loading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <p className="mt-6 text-center text-white/40 text-sm">
          Don't have an account?{' '}
          <button className="text-byline-gold hover:text-byline-gold-bright transition-colors">
            Sign up
          </button>
        </p>
      </div>
    </div>
  )
}
