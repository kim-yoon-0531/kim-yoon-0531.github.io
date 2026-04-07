import './App.css'
import MockupPage from './components/MockupPage'

function App() {
  const params = new URLSearchParams(window.location.search)
  const isMockup = params.get('v') === 'mockup'

  if (isMockup) {
    return <MockupPage />
  }

  return (
    <div className="app landing">
      <div className="landing-content">
        <h1 className="landing-title">모바일청첩장 준비중입니다🤍🕊️</h1>
      </div>
    </div>
  )
}

export default App
