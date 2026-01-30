import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { ApolloProvider, useQuery } from '@apollo/client'
import { client } from './lib/apollo'
import { GET_CURRENT_USER } from './graphql/queries'
import Nav from './components/Nav'
import Footer from './components/Footer'
import LoginDialog from './components/LoginDialog'
import Home from './pages/Home'
import About from './pages/About'
import Admin from './pages/Admin'

function AppContent() {
  const [loginOpen, setLoginOpen] = useState(false)
  const { data, refetch } = useQuery(GET_CURRENT_USER)
  const user = data?.app?.user

  const handleLoginSuccess = () => {
    refetch()
  }

  const handleGetStartedClick = () => {
    if (!user) {
      setLoginOpen(true)
    } else {
      // Scroll to search section if logged in
      const searchSection = document.getElementById('search-section')
      if (searchSection) {
        searchSection.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }

  return (
    <BrowserRouter>
      <div className="min-h-screen bg-byline-black">
        {/* Grain overlay */}
        <div className="grain-overlay" />

        <Nav
          user={user}
          onLoginClick={() => setLoginOpen(true)}
          onGetStartedClick={handleGetStartedClick}
        />

        <main>
          <Routes>
            <Route
              path="/"
              element={
                <Home
                  user={user}
                  onLoginClick={() => setLoginOpen(true)}
                  onGetStartedClick={handleGetStartedClick}
                />
              }
            />
            <Route path="/about" element={<About />} />
            <Route path="/admin" element={<Admin user={user} />} />
          </Routes>
        </main>

        <Footer />

        <LoginDialog
          isOpen={loginOpen}
          onClose={() => setLoginOpen(false)}
          onSuccess={handleLoginSuccess}
        />
      </div>
    </BrowserRouter>
  )
}

export default function App() {
  return (
    <ApolloProvider client={client}>
      <AppContent />
    </ApolloProvider>
  )
}
