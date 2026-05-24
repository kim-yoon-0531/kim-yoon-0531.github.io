import './App.css'
import WeddingCard from './components/WeddingCard'
import WeddingDayCard from './components/WeddingDayCard'

// 2026-05-30 12:00 ~ 05-31 00:00 KST: D-1 (eve)
// 2026-05-31 00:00 ~ 05-31 13:00 KST: 당일 (day)
function getWeddingWindow(now: Date = new Date()): 'eve' | 'day' | null {
  const eveStart = new Date('2026-05-30T12:00:00+09:00').getTime()
  const dayStart = new Date('2026-05-31T00:00:00+09:00').getTime()
  const dayEnd = new Date('2026-05-31T13:00:00+09:00').getTime()
  const t = now.getTime()
  if (t >= eveStart && t < dayStart) return 'eve'
  if (t >= dayStart && t < dayEnd) return 'day'
  return null
}

// ?eve → D-1 강제, ?day → 당일 강제, ?normal → 기존 페이지 강제
function getPreviewOverride(): 'eve' | 'day' | 'normal' | null {
  if (typeof window === 'undefined') return null
  const params = new URLSearchParams(window.location.search)
  if (params.has('eve')) return 'eve'
  if (params.has('day')) return 'day'
  if (params.has('normal')) return 'normal'
  return null
}

function App() {
  const override = getPreviewOverride()
  const mode = override === 'normal'
    ? null
    : (override ?? getWeddingWindow())
  return mode ? <WeddingDayCard mode={mode} /> : <WeddingCard />
}

export default App
