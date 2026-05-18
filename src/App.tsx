import './App.css'
import WeddingCard from './components/WeddingCard'
import WeddingDayCard from './components/WeddingDayCard'

// 예식 당일(2026-05-31) 00:00 ~ 13:00 KST에는 간략 페이지 노출
function isWeddingDayWindow(now: Date = new Date()): boolean {
  const kstMs = now.getTime() + (now.getTimezoneOffset() + 540) * 60000
  const kst = new Date(kstMs)
  return (
    kst.getUTCFullYear() === 2026 &&
    kst.getUTCMonth() === 4 &&
    kst.getUTCDate() === 31 &&
    kst.getUTCHours() < 13
  )
}

// ?day → 당일 페이지 강제, ?normal → 기존 페이지 강제
function getPreviewOverride(): 'day' | 'normal' | null {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  if (params.has('day')) return 'day'
  if (params.has('normal')) return 'normal'
  return null
}

function App() {
  const override = getPreviewOverride()
  const showDay = override ? override === 'day' : isWeddingDayWindow()
  return showDay ? <WeddingDayCard /> : <WeddingCard />
}

export default App
