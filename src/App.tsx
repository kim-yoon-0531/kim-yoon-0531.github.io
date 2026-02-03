import { useState } from 'react'
import './App.css'
import Contact from './components/Contact'
import CoupleInfo from './components/CoupleInfo'
import DateInfo from './components/DateInfo'
import Gallery from './components/Gallery'
import Hero from './components/Hero'
import Message from './components/Message'
import VenueInfo from './components/VenueInfo'
import NewPage from './components/NewPage'

type ViewType = 'landing' | 'wedding' | 'new'

function App() {
  const [view, setView] = useState<ViewType>('landing')

  if (view === 'landing') {
    return(
      <div className="app landing">
        <div className="landing-content">
          <h1 className="landing-title">모바일청첩장 준비중입니다🤍🕊️</h1>
        </div>
      </div>
    )
    /*
    return (
      <div className="app landing">
        <div className="landing-content">
          <h1 className="landing-title">원하시는 청첩장을 선택해주세요</h1>
          <div className="landing-buttons">
            <button className="landing-button primary" onClick={() => setView('new')}>
              신랑신부가 준비한 멋진 청첩장 구경하기💌
            </button>
            <button className="landing-button secondary" onClick={() => setView('wedding')}>
              빠른 청첩장 보러가기💨
            </button>
          </div>
        </div>
      </div>
    )
      */
  }

  if (view === 'new') {
    return (
      <div className="app">
        <button className="back-button" onClick={() => setView('landing')}>
          ← 처음 화면으로
        </button>
        <NewPage />
      </div>
    )
  }

  // view === 'wedding' 인 경우: 현재 index.html의 내용(기존 App 화면)
  return (
    <div className="app">
      <button className="back-button" onClick={() => setView('landing')}>
        ← 처음 화면으로
      </button>
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
