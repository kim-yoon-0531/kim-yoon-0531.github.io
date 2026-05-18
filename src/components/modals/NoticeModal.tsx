type Props = {
  open: boolean
  onClose: () => void
}

function NoticeModal({ open, onClose }: Props) {
  if (!open) return null

  return (
    <div className="mk-modal-overlay" onClick={onClose}>
      <div className="mk-modal mk-modal-wide" onClick={e => e.stopPropagation()}>
        <button className="mk-modal-close" onClick={onClose}>×</button>
        <h3 className="mk-modal-title">공지사항</h3>
        <p className="mk-modal-sub">하객분들께 안내드립니다</p>

        <div className="mk-notice-list">
          <div className="mk-notice-item">
            <h4>식사안내</h4>
            <p>예식 시작 30분전 연회장 오픈됩니다.</p>
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
      </div>
    </div>
  )
}

export default NoticeModal
