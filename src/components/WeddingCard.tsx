import { useState, useEffect, useRef } from 'react'
import { weddingData } from '../data/weddingData'
import './WeddingCard.css'

function WeddingCard() {
  const [dDay, setDDay] = useState(0)
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [accountModal, setAccountModal] = useState(false)
  const [accountTab, setAccountTab] = useState<'groom' | 'bride'>('groom')
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null)
  const sparkleRef = useRef<HTMLCanvasElement>(null)

  // 별가루 Canvas 이펙트
  useEffect(() => {
    const canvas = sparkleRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const section = canvas.parentElement!
    const img = section.querySelector('img')!
    let animId: number
    let w = 0, h = 0
    let stars: { x: number; y: number; r: number; dx: number; dy: number; rt: number; rtMax: number; rtDir: number }[] = []

    const createStar = () => ({
      x: Math.random() * w,
      y: Math.random() * h,
      r: 1 + Math.random() * 3,
      dx: (Math.random() - 0.5) * 0.3,
      dy: (Math.random() - 0.5) * 0.3,
      rt: 0,
      rtMax: 0.4 + Math.random() * 0.6,
      rtDir: 0.005 + Math.random() * 0.01,
    })

    const setup = () => {
      const dpr = window.devicePixelRatio || 1
      w = section.offsetWidth
      h = section.offsetHeight
      canvas.width = w * dpr
      canvas.height = h * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.floor((w * h) / 15000)
      stars = Array.from({ length: count }, createStar)
    }

    const draw = () => {
      ctx.clearRect(0, 0, w, h)
      stars.forEach(s => {
        s.rt += s.rtDir
        if (s.rt >= s.rtMax || s.rt <= 0) s.rtDir *= -1
        s.x += s.dx
        s.y += s.dy
        if (s.x < 0 || s.x > w) s.dx *= -1
        if (s.y < 0 || s.y > h) s.dy *= -1

        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.r * 2)
        grad.addColorStop(0, `rgba(255, 255, 255, ${s.rt})`)
        grad.addColorStop(1, 'rgba(255, 255, 255, 0)')
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r * 2, 0, Math.PI * 2)
        ctx.fillStyle = grad
        ctx.fill()
      })
      animId = requestAnimationFrame(draw)
    }

    // 이미지 로드 후 시작 (높이 확보)
    const start = () => { setup(); draw() }
    if (img.complete) start()
    else img.onload = start

    window.addEventListener('resize', setup)
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', setup) }
  }, [])

  useEffect(() => {
    const els = document.querySelectorAll('.mk-reveal')
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target) } }),
      { threshold: 0.15 }
    )
    els.forEach(el => observer.observe(el))

    return () => observer.disconnect()
  }, [])


  useEffect(() => {
    const calcDDay = () => {
      const wedding = new Date(2026, 4, 31)
      const now = new Date()
      now.setHours(0, 0, 0, 0)
      const diff = wedding.getTime() - now.getTime()
      setDDay(Math.max(0, Math.ceil(diff / (1000 * 60 * 60 * 24))))
    }
    calcDDay()
    const timer = setInterval(calcDDay, 60000)
    return () => clearInterval(timer)
  }, [])

  // Calendar
  const renderCalendar = () => {
    const firstDay = new Date(2026, 4, 1).getDay()
    const daysInMonth = 31
    const weeks: (number | null)[][] = []
    let week: (number | null)[] = []
    for (let i = 0; i < firstDay; i++) week.push(null)
    for (let d = 1; d <= daysInMonth; d++) {
      week.push(d)
      if (week.length === 7) { weeks.push(week); week = [] }
    }
    if (week.length) { while (week.length < 7) week.push(null); weeks.push(week) }

    return (
      <table className="mk-cal-table">
        <thead>
          <tr>
            {['일', '월', '화', '수', '목', '금', '토'].map(d => (
              <th key={d}>{d}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {weeks.map((w, wi) => (
            <tr key={wi}>
              {w.map((day, di) => (
                <td key={di} className={day === 31 ? 'wedding-day' : ''}>
                  {day === 31 ? <span className="day-circle">{day}</span> : day}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    )
  }

  const allImages = ['top','01','02','016','03','04','05','06','07','08','09','010','011','012','013','014','015','017','018','019','020','021','022','023','024']
  const total = allImages.length

  // 키보드 좌우키
  useEffect(() => {
    if (selectedIndex === null) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') setSelectedIndex((selectedIndex - 1 + total) % total)
      else if (e.key === 'ArrowRight') setSelectedIndex((selectedIndex + 1) % total)
      else if (e.key === 'Escape') closeModal()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selectedIndex])

  // 터치 스와이프
  const touchStart = useRef(0)
  const handleTouchStart = (e: React.TouchEvent) => { touchStart.current = e.touches[0].clientX }
  const handleTouchEnd = (e: React.TouchEvent) => {
    const diff = touchStart.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      if (diff > 0) setSelectedIndex(prev => prev !== null ? (prev + 1) % total : null)
      else setSelectedIndex(prev => prev !== null ? (prev - 1 + total) % total : null)
    }
  }

  const copyAccount = (account: string, key: string) => {
    navigator.clipboard.writeText(account).then(() => {
      setCopiedIndex(key)
      setTimeout(() => setCopiedIndex(null), 1500)
    })
  }

  const setViewportZoom = (allow: boolean) => {
    const meta = document.querySelector('meta[name="viewport"]')
    if (meta) {
      meta.setAttribute('content', allow
        ? 'width=device-width, initial-scale=1.0'
        : 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      )
    }
  }

  const openModal = (index: number) => {
    setSelectedIndex(index)
    document.body.style.overflow = 'hidden'
    setViewportZoom(true)
  }
  const closeModal = () => {
    setSelectedIndex(null)
    document.body.style.overflow = ''
    setViewportZoom(false)
  }

  return (
    <div className="mk-wrapper">

      {/* ===== Section 1: Hero ===== */}
      <section className="mk-hero">
        <div className="mk-hero-bg">
          <img src="/images/main/background2.webp" alt="" />
        </div>
        <img src="/images/main/letter.png" alt="Sangseon and Seulgi 결혼합니다" className="mk-hero-letter mk-reveal" />
      </section>

      {/* ===== Section 2: Wedding Photo ===== */}
      <section className="mk-photo">
        <img src="/images/main/main3.webp" alt="웨딩 사진" className="mk-photo-img" />
        <p className="mk-photo-title">Our Wedding</p>
        <canvas ref={sparkleRef} className="mk-sparkles-canvas" />
      </section>

      {/* ===== Section 3: Calendar ===== */}
      <section className="mk-calendar">
        <div className="mk-reveal">
          <p className="mk-cal-date">2026. 05. 31</p>
          <p className="mk-cal-time">12: 20 PM</p>
          <p className="mk-cal-venue">월드컵 컨벤션 2층 임페리얼 볼룸홀</p>
          <div className="mk-cal-grid">
            {renderCalendar()}
          </div>
          <div className="mk-cal-divider" />
          <div className="mk-dday">
            <span className="mk-dday-label">D-day</span>
            <span className="mk-dday-value">{dDay}<span className="mk-dday-unit">days</span></span>
          </div>
        </div>
      </section>

      {/* ===== Section 4: Invitation + Gallery ===== */}
      <section className="mk-invite">
        <div className="mk-invite-inner">
          {/* 그룹1: Invitation + 텍스트 */}

          <p className="mk-invite-title mk-reveal">Invitation</p>
          <div className="mk-reveal">
            <div className="mk-invite-text">
              <p>상상만 해도 미소가 지어지는</p>
              <p>선물 같은 사람을 만나</p>
              <p>슬플 때나 기쁠 때나 함께하며</p>
              <p>기꺼이 같은 길을 걸어가려 합니다.</p>
              <br />
              <p>작은 공통점으로 시작된 인연이</p>
              <p>서로의 하루를 빛내는 이야기가 되어</p>
              <p>동화 같은 사랑을 이어가려 합니다.</p>
              <br />
              <p>저희의 첫 장면에 소중한 당신을 초대합니다.</p>
            </div>

          {/* 그룹2: 하트 + 부모/신랑신부 + 마음전달 버튼 */}
            <p className="mk-couple-heart">&#9829;</p>
            <div className="mk-invite-couple">
              <p className="mk-parents">{weddingData.couple.groom.parents}의 아들</p>
              <p className="mk-couple-name">{weddingData.couple.groom.name}</p>
              <p className="mk-parents">{weddingData.couple.bride.parents}의 딸</p>
              <p className="mk-couple-name">{weddingData.couple.bride.name}</p>
            </div>
            <button className="mk-heart-btn" onClick={() => { setAccountModal(true); document.body.style.overflow = 'hidden' }}>
              마음 전달하기 ▶
            </button>
          </div>

          {/* 그룹3: Gallery 타이틀 + 대표사진 + 그리드 */}

          <p className="mk-gallery-title mk-reveal">Gallery</p>
          <div className="mk-reveal">
            <div className="mk-gallery-top" onClick={() => openModal(0)}>
              <img src="/images/gallery/top.webp" alt="갤러리 대표" loading="lazy" />
            </div>
            <div className="mk-gallery-grid">
              {['01','02','016','03','04','05','06','07','08','09','010','011','012','013','014','015','017','018','019','020','021','022','023','024'].map((name, i) => (
                <div key={name} className="mk-gallery-item" onClick={() => openModal(i + 1)}>
                  <img src={`/images/gallery/thumb/${name}.webp`} alt={`갤러리 ${name}`} loading="lazy" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== Account Modal ===== */}
      {accountModal && (
        <div className="mk-modal-overlay" onClick={() => { setAccountModal(false); document.body.style.overflow = '' }}>
          <div className="mk-modal" onClick={e => e.stopPropagation()}>
            <button className="mk-modal-close" onClick={() => { setAccountModal(false); document.body.style.overflow = '' }}>×</button>
            <h3 className="mk-modal-title">마음 전달하기</h3>
            <p className="mk-modal-sub">직접 축하의 마음을 전달하세요</p>
            <div className="mk-modal-tabs">
              <button className={accountTab === 'groom' ? 'active' : ''} onClick={() => setAccountTab('groom')}>신랑에게</button>
              <button className={accountTab === 'bride' ? 'active' : ''} onClick={() => setAccountTab('bride')}>신부에게</button>
            </div>
            <div className="mk-modal-accounts">
              {weddingData.accounts?.[accountTab].map((acc, i) => {
                const key = `${accountTab}-${i}`
                return (
                  <div key={key} className="mk-modal-card">
                    <div className="mk-modal-card-top">
                      <span className="mk-modal-card-name">{acc.name}</span>
                      <span className="mk-modal-card-relation">{acc.relation}</span>
                    </div>
                    <div className="mk-modal-card-bottom">
                      <span className="mk-modal-card-bank">{acc.bank}</span>
                      <span className="mk-modal-card-account">
                        {acc.account}
                        <button className="mk-copy-btn" onClick={() => copyAccount(acc.account, key)}>
                          {copiedIndex === key ? <i className="fa-solid fa-check" /> : <i className="fa-regular fa-copy" />}
                        </button>
                      </span>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        </div>
      )}

      {/* ===== Gallery Lightbox ===== */}
      {selectedIndex !== null && (
        <div className="mk-lightbox" onClick={closeModal} onTouchStart={handleTouchStart} onTouchEnd={handleTouchEnd}>
          <button className="mk-lb-close" onClick={closeModal}>×</button>
          <button className="mk-lb-nav mk-lb-prev" onClick={e => { e.stopPropagation(); setSelectedIndex((selectedIndex - 1 + total) % total) }}>‹</button>
          <button className="mk-lb-nav mk-lb-next" onClick={e => { e.stopPropagation(); setSelectedIndex((selectedIndex + 1) % total) }}>›</button>
          <div className="mk-lb-content" onClick={e => e.stopPropagation()}>
            <img src={`/images/gallery/${allImages[selectedIndex]}.webp`} alt="" />
            <div className="mk-lb-counter">{selectedIndex + 1} / {total}</div>
          </div>
        </div>
      )}

      {/* ===== Section 5: Location ===== */}
      <section className="mk-location">
        <p className="mk-loc-title mk-reveal"><span className="mk-loc-en">Location</span> 오시는길</p>

        <div className="mk-loc-map mk-reveal">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3162.7!2d126.8971!3d37.5683!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x357c98dc75ebe10d%3A0x5f92c0d333099c6c!2z7ISc7Jq4IOyblOuTnOy7tOqyvOq4sOyepQ!5e0!3m2!1sko!2skr!4v1"
            width="100%"
            height="200"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="오시는길"
          />
        </div>

        <div className="mk-loc-nav-btns mk-reveal">
          {weddingData.maps && Object.entries(weddingData.maps).map(([key, map]) => (
            <a key={key} href={map.link} target="_blank" rel="noopener noreferrer" className="mk-loc-nav-btn">
              <img src={map.icon} alt={key} className="mk-loc-nav-icon" />
              <span>{map.name}</span>
            </a>
          ))}
        </div>

        <div className="mk-loc-details mk-reveal">
          <div className="mk-loc-block">
            <h4>버스</h4>
            <p className="mk-text-blue">월드컵경기장 서측 문화비축기지 정류장 하차 도보 3분</p>
            <p className="mk-loc-sub">간선: 571, 710, 760</p>
            <p className="mk-loc-sub">지선: 7019, 7715, 8777</p>
            <p className="mk-loc-sub">광역: 9711</p>
          </div>
          <div className="mk-loc-block">
            <h4>지하철</h4>
            <p className="mk-text-blue">6호선 월드컵경기장역 2번 출구 보도 3분 (200m)</p>
            <p className="mk-loc-sub">월드컵경기장역 2번 출구에 경기장 서측(W) 방향 안내 배너</p>
            <p className="mk-loc-sub">환승역: 2호선 합정역, 3호선 불광역·약수역, 4호선 삼각지역, 5호선 공덕역</p>
          </div>
          <div className="mk-loc-block">
            <h4>자동차</h4>
            <p className="mk-text-blue">월드컵경기장 서문 진입 후 서측 1,2 주차장 이용</p>
            <p className="mk-loc-sub">주차접수대 등록 후 출차 (90분 무료)</p>
            <p className="mk-loc-sub">상암 월드컵 주경기장에 축구 경기·콘서트로 인해 주차장 만차 시 주차 요원의 안내 또는 발렛파킹 안내 드림</p>
            <p className="mk-loc-sub">(외부 주차 2시간 30분 무료·발렛파킹 무료)</p>
          </div>
        </div>
      </section>

      {/* ===== Section 6: Notice ===== */}
      <section className="mk-notice">
        <p className="mk-notice-title mk-reveal"><span className="mk-loc-en">Notice</span> 공지사항</p>
        <div className="mk-notice-list mk-reveal">
          <div className="mk-notice-item">
            <h4>식사안내</h4>
            <p>결혼 시작 30분전 연회장 오픈됩니다.</p>
            <p>맛있는 식사 하고 가시길 바라겠습니다 ☺️</p>
          </div>
          <div className="mk-notice-item">
            <h4>주차등록</h4>
            <p>축의대 태블릿PC를 이용하여 무료주차 등록 부탁드립니다.</p>
            <p>축의대 마감시 상담실 옆 information에서 직원을 통해 주차등록 가능합니다.</p>
          </div>
          <div className="mk-notice-item">
            <h4>ATM위치</h4>
            <p>축의대기준 왼쪽 복도 끝 그랜드볼룸홀 옆에 ATM기 3대 위치해있습니다.</p>
          </div>
          <div className="mk-notice-item">
            <h4>신부대기실 위치</h4>
            <p>축의대기준 왼쪽으로 오시다보면 엘리베이터 옆 임페리얼볼룸 신부라운지에 신부가 있습니다😊</p>
          </div>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <section className="mk-footer">
        <img src="/images/footer/footer.webp" alt="" className="mk-footer-img" />
      </section>
    </div>
  )
}

export default WeddingCard
