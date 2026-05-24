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
  if (!open) return null

  return (
    <div className="mk-modal-overlay" onClick={onClose}>
      <div className="mk-modal mk-modal-wide" onClick={e => e.stopPropagation()}>
        <button className="mk-modal-close" onClick={onClose}>×</button>
        <h3 className="mk-modal-title">추천 식사 메뉴</h3>
        <p className="mk-modal-sub">신랑 &amp; 신부의 추천메뉴</p>

        <div className="mk-menu-grid">
          {menuItems.map(item => (
            <div key={item.name} className="mk-menu-item">
              <div className="mk-menu-photo">
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
    </div>
  )
}

export default MenuModal
