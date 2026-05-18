import { useState } from 'react'
import { weddingData } from '../data/weddingData'
import AccountModal from './modals/AccountModal'
import LocationModal from './modals/LocationModal'
import NoticeModal from './modals/NoticeModal'
import MenuModal from './modals/MenuModal'
import './WeddingCard.css'
import './WeddingDayCard.css'

type ModalKey = 'location' | 'notice' | 'menu' | 'account' | null

function WeddingDayCard() {
  const [activeModal, setActiveModal] = useState<ModalKey>(null)

  const open = (key: Exclude<ModalKey, null>) => {
    setActiveModal(key)
    document.body.style.overflow = 'hidden'
  }
  const close = () => {
    setActiveModal(null)
    document.body.style.overflow = ''
  }

  return (
    <div className="mk-wrapper mk-day-wrapper">
      <section className="mk-day-intro">
        <p className="mk-day-today">Wedding Day</p>
        <p className="mk-day-greeting">
          기다리던 오늘,<br />
          저희의 시작을 알리는 날입니다.
        </p>
        <p className="mk-day-thanks">
          함께 축복해주셔서 진심으로 감사합니다.
        </p>
        <p className="mk-day-careful">
          설레는 마음으로 기다리고 있겠습니다.<br />
          오시는 길 조심히 와주세요 :)
        </p>
        <div className="mk-day-divider" />
        <p className="mk-day-couple">
          {weddingData.couple.groom.name} &nbsp;·&nbsp; {weddingData.couple.bride.name}
        </p>
        <p className="mk-day-when">2026. 05. 31 일요일 12:20 PM</p>
        <p className="mk-day-where">월드컵 컨벤션 2층 임페리얼 볼룸홀</p>

        <div className="mk-day-map-icons">
          {weddingData.maps && Object.entries(weddingData.maps).map(([key, map]) => (
            <a key={key} href={map.link} target="_blank" rel="noopener noreferrer" className="mk-day-map-icon">
              <img src={map.icon} alt={map.name} />
              <span>{map.name}</span>
            </a>
          ))}
        </div>

        <div className="mk-day-actions">
          <button className="mk-day-action-btn" onClick={() => open('location')}>오시는 길 ▶</button>
          <button className="mk-day-action-btn" onClick={() => open('notice')}>공지사항 ▶</button>
          <button className="mk-day-action-btn" onClick={() => open('account')}>마음 전달하기 ▶</button>
          <button className="mk-day-action-btn" onClick={() => open('menu')}>추천 식사 메뉴 ▶</button>
        </div>

        <a href="?normal" className="mk-day-original-link">
          청첩장 보러가기 →
        </a>
      </section>

      <LocationModal open={activeModal === 'location'} onClose={close} />
      <NoticeModal open={activeModal === 'notice'} onClose={close} />
      <MenuModal open={activeModal === 'menu'} onClose={close} />
      <AccountModal open={activeModal === 'account'} onClose={close} />
    </div>
  )
}

export default WeddingDayCard
