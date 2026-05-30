type Props = {
  open: boolean
  onClose: () => void
}

function EntryAlertModal({ open, onClose }: Props) {
  if (!open) return null

  return (
    <div className="mk-modal-overlay" onClick={onClose}>
      <div className="mk-modal mk-modal-wide" onClick={e => e.stopPropagation()}>
        <button className="mk-modal-close" onClick={onClose}>×</button>
        <h3 className="mk-modal-title">교통 혼잡 안내</h3>
        <p className="mk-modal-sub">하객분들께 안내드립니다</p>
        <div className="mk-notice-list">
          <div className="mk-notice-item mk-alert-item">
            <p>당일 식장 건너편 문화비축기지의 행사로 인해 주변 도로 및 웨딩홀 진입로가 많이 혼잡할 것으로 예상됩니다.</p>
            <p>차량으로 방문하실 경우 정체로 인해 시간이 다소 소요될 수 있으니, 평소보다 조금 더 여유 있게 출발해 주시면 감사하겠습니다.</p>
            <p>소중한 걸음 하시는 길, 불편함이 없으시도록 안전하게 오시기를 바랍니다.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default EntryAlertModal
