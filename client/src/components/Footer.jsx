import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="bg-byline-black border-t border-white/10 py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <Link to="/" className="font-display text-xl font-bold text-white">
            Byline
          </Link>

          <div className="flex items-center gap-6">
            <Link
              to="/about"
              className="text-white/50 hover:text-white transition-colors text-sm"
            >
              About
            </Link>
            <a
              href="mailto:hello@joinbyline.com"
              className="text-white/50 hover:text-white transition-colors text-sm"
            >
              Contact
            </a>
          </div>

          <p className="text-white/30 text-sm">
            &copy; {new Date().getFullYear()} Byline. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  )
}
