import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

export default function Nav({ onLoginClick, onGetStartedClick, user }) {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-byline-black/90 backdrop-blur-md' : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-display text-2xl font-bold text-white">
          Byline
        </Link>

        <div className="flex items-center gap-6">
          <Link
            to="/about"
            className="text-white/70 hover:text-white transition-colors text-sm font-medium"
          >
            About
          </Link>

          {user ? (
            <div className="flex items-center gap-4">
              <span className="text-white/70 text-sm">{user.email}</span>
              <a
                href="/logout"
                className="text-white/70 hover:text-white transition-colors text-sm font-medium"
              >
                Logout
              </a>
            </div>
          ) : (
            <>
              <button
                onClick={onLoginClick}
                className="text-white/70 hover:text-white transition-colors text-sm font-medium"
              >
                Login
              </button>
              <button
                onClick={onGetStartedClick}
                className="bg-byline-gold hover:bg-byline-gold-bright text-byline-black px-4 py-2 rounded-full text-sm font-semibold transition-colors"
              >
                Get Started
              </button>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}
