import { weddingData } from '../../data/weddingData'

type Props = {
  open: boolean
  onClose: () => void
}

function LocationModal({ open, onClose }: Props) {
  if (!open) return null

  return (
    <div className="mk-modal-overlay" onClick={onClose}>
      <div className="mk-modal mk-modal-wide" onClick={e => e.stopPropagation()}>
        <button className="mk-modal-close" onClick={onClose}>×</button>
        <h3 className="mk-modal-title">오시는 길</h3>
        <p className="mk-modal-sub">월드컵 컨벤션 2층 임페리얼 볼룸홀</p>

        <p className="mk-loc-address" style={{ marginTop: 8 }}>
          서울특별시 마포구 월드컵로 240 2층<br />
          (성산동 서울월드컵경기장 서측)
        </p>

        <div className="mk-loc-map">
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

        <div className="mk-loc-nav-btns">
          {weddingData.maps && Object.entries(weddingData.maps).map(([key, map]) => (
            <a key={key} href={map.link} target="_blank" rel="noopener noreferrer" className="mk-loc-nav-btn">
              <img src={map.icon} alt={key} className="mk-loc-nav-icon" />
              <span>{map.name}</span>
            </a>
          ))}
        </div>

        <div className="mk-loc-details">
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
            <p className="mk-loc-sub">주차접수대 등록 후 출차 (90분 무료, 추가 시간 10분당 300원부과)</p>
            <p className="mk-loc-sub">상암 월드컵 주경기장에 축구 경기·콘서트로 인해 주차장 만차 시 주차 요원의 안내 또는 발렛파킹 안내 드림</p>
            <p className="mk-loc-sub">(외부 주차시 2시간 30분 무료·발렛파킹 무료)</p>
            <p className="mk-loc-sub">※ 홈플러스 주차장은 무료 주차 불가합니다.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LocationModal
