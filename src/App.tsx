import './App.css'
import WeddingCard from './components/WeddingCard'
import WeddingDayCard from './components/WeddingDayCard'

// 예식 당일(2026-05-31) 00:00 ~ 13:00 KST에는 간략 페이지 노출
function isWeddingDayWindow(now: Date = new Date()): boolean {
  // UTC 기준 ms에 KST 오프셋(+9h)만 더하면 어떤 타임존 사용자든 KST 시각으로 변환됨
  const kst = new Date(now.getTime() + 9 * 60 * 60 * 1000)
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
