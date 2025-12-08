import './App.css'
import Contact from './components/Contact'
import CoupleInfo from './components/CoupleInfo'
import DateInfo from './components/DateInfo'
import Gallery from './components/Gallery'
import Hero from './components/Hero'
import Message from './components/Message'
import VenueInfo from './components/VenueInfo'

function App() {
  return (
    <div className="app">
      <Hero />
      <main className="main">
        <DateInfo />
        <CoupleInfo />
        <Message />
        <Gallery />
        <VenueInfo />
        <Contact />
      </main>
    </div>
  )
}

export default App
