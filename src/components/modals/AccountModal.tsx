import { useState } from 'react'
import { weddingData } from '../../data/weddingData'

type Props = {
  open: boolean
  onClose: () => void
}

function AccountModal({ open, onClose }: Props) {
  const [accountTab, setAccountTab] = useState<'groom' | 'bride'>('groom')
  const [copiedIndex, setCopiedIndex] = useState<string | null>(null)

  if (!open) return null

  const copyAccount = (account: string, key: string) => {
    navigator.clipboard.writeText(account).then(() => {
      setCopiedIndex(key)
      setTimeout(() => setCopiedIndex(null), 1500)
      alert('복사되었습니다')
    })
  }

  return (
    <div className="mk-modal-overlay" onClick={onClose}>
      <div className="mk-modal" onClick={e => e.stopPropagation()}>
        <button className="mk-modal-close" onClick={onClose}>×</button>
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
  )
}

export default AccountModal
