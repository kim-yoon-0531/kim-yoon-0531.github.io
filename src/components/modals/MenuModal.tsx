import { useRef, useState } from 'react'

type Props = {
  open: boolean
  onClose: () => void
}

const menuItems = [
  { name: '도가니탕', img: '/images/menu/1.webp' },
  { name: '생연어회', img: '/images/menu/2.webp' },
  { name: 'LA목살구이', img: '/images/menu/3.webp' },
  { name: '수란', img: '/images/menu/4.webp' },
  { name: '육회초밥', img: '/images/menu/5.webp' },
  { name: '양념게장', img: '/images/menu/6.webp' },
  { name: '칠리새우', img: '/images/menu/7.webp' },
  { name: '치즈볼', img: '/images/menu/8.webp' },
]

function MenuModal({ open, onClose }: Props) {
  const [zoomIdx, setZoomIdx] = useState<number | null>(null)
  const imgRef = useRef<HTMLImageElement>(null)
  const scale = useRef(1)
  const pos = useRef({ x: 0, y: 0 })
  const last = useRef({ x: 0, y: 0 })
  const touchStart = useRef({ x: 0, y: 0 })
  const pinchStartDist = useRef(0)
  const pinchStartScale = useRef(1)

  if (!open) return null

  const apply = () => {
    if (!imgRef.current) return
    imgRef.current.style.transform = `translate(${pos.current.x}px, ${pos.current.y}px) scale(${scale.current})`
  }
  const reset = () => {
    scale.current = 1
    pos.current = { x: 0, y: 0 }
    if (imgRef.current) imgRef.current.style.transform = ''
  }
  const getDist = (t: React.TouchList) => {
    const dx = t[0].clientX - t[1].clientX
    const dy = t[0].clientY - t[1].clientY
    return Math.sqrt(dx * dx + dy * dy)
  }

  const onTouchStart = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      pinchStartDist.current = getDist(e.touches)
      pinchStartScale.current = scale.current
    } else if (e.touches.length === 1) {
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      last.current = { ...pos.current }
    }
  }
  const onTouchMove = (e: React.TouchEvent) => {
    if (e.touches.length === 2) {
      const d = getDist(e.touches)
      const ns = Math.min(4, Math.max(1, pinchStartScale.current * (d / pinchStartDist.current)))
      scale.current = ns
      if (ns === 1) pos.current = { x: 0, y: 0 }
      apply()
    } else if (e.touches.length === 1 && scale.current > 1) {
      const dx = e.touches[0].clientX - touchStart.current.x
      const dy = e.touches[0].clientY - touchStart.current.y
      pos.current = { x: last.current.x + dx, y: last.current.y + dy }
      apply()
    }
  }
  const onTouchEnd = (e: React.TouchEvent) => {
    if (e.touches.length === 1) {
      touchStart.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      last.current = { ...pos.current }
    }
  }
  const onWheel = (e: React.WheelEvent) => {
    const ns = Math.min(4, Math.max(1, scale.current - e.deltaY * 0.002))
    scale.current = ns
    if (ns === 1) pos.current = { x: 0, y: 0 }
    apply()
  }
  const onDoubleClick = () => {
    scale.current = scale.current > 1 ? 1 : 2
    if (scale.current === 1) pos.current = { x: 0, y: 0 }
    apply()
  }

  const openZoom = (i: number) => { reset(); setZoomIdx(i) }
  const closeZoom = () => { reset(); setZoomIdx(null) }

  return (
    <div className="mk-modal-overlay" onClick={onClose}>
      <div className="mk-modal mk-modal-wide" onClick={e => e.stopPropagation()}>
        <button className="mk-modal-close" onClick={onClose}>×</button>
        <h3 className="mk-modal-title">추천 식사 메뉴</h3>
        <p className="mk-modal-sub">신랑 &amp; 신부의 추천메뉴</p>

        <div className="mk-menu-grid">
          {menuItems.map((item, i) => (
            <div key={item.name} className="mk-menu-item">
              <div className="mk-menu-photo" onClick={() => openZoom(i)}>
                <img src={item.img} alt={item.name} loading="lazy" />
              </div>
              <p className="mk-menu-name">{item.name}</p>
            </div>
          ))}
        </div>

        <p className="mk-menu-more">외 140여가지 메뉴</p>

        <p className="mk-menu-drink-note">
          생맥주, 막걸리를 포함한 음료는 무제한이니<br />
          부담없이 즐겨주세요 🍻
        </p>
      </div>

      {zoomIdx !== null && (
        <div className="mk-lightbox" onClick={closeZoom}>
          <button className="mk-lb-close" onClick={closeZoom}>×</button>
          <div
            className="mk-lb-content"
            onClick={e => e.stopPropagation()}
            onWheel={onWheel}
            onDoubleClick={onDoubleClick}
            onTouchStart={onTouchStart}
            onTouchMove={onTouchMove}
            onTouchEnd={onTouchEnd}
          >
            <div className="mk-lb-viewport">
              <img
                ref={imgRef}
                className="mk-lb-img"
                src={menuItems[zoomIdx].img}
                alt={menuItems[zoomIdx].name}
                style={{ touchAction: 'none' }}
              />
            </div>
            <div className="mk-lb-counter">{menuItems[zoomIdx].name}</div>
          </div>
        </div>
      )}
    </div>
  )
}

export default MenuModal
