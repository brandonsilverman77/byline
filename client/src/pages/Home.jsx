import Hero from '../components/Hero'
import Marquee from '../components/Marquee'
import SearchSection from '../components/SearchSection'
import HowItWorks from '../components/HowItWorks'
import Stats from '../components/Stats'
import FinalCTA from '../components/FinalCTA'

export default function Home({ user, onLoginClick, onGetStartedClick }) {
  return (
    <>
      <Hero onGetStartedClick={onGetStartedClick} />
      <Marquee />
      <SearchSection user={user} onLoginRequired={onLoginClick} />
      <HowItWorks />
      <Stats />
      <FinalCTA onGetStartedClick={onGetStartedClick} />
    </>
  )
}
