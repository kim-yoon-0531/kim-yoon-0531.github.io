import { useEffect, useRef, useState } from 'react'
import chatMessages from '../data/chatMessages.json'
import { weddingData } from '../data/weddingData'
import './NewPage.css'

type ChatType = 'receive' | 'send' | 'image'
type ChatSize = 'normal' | 'large'

interface ChatMessage {
  type: ChatType
  message?: string
  imageUrl?: string
  caption?: string
  size?: ChatSize
  color?: string
  parts?: {
    text: string
    color?: string
    size?: ChatSize
  }[]
}

const messages: ChatMessage[] = chatMessages as ChatMessage[]

function NewPage() {
  const containerRef = useRef<HTMLDivElement | null>(null)
  const itemRefs = useRef<(HTMLDivElement | null)[]>([])
  const [visible, setVisible] = useState<boolean[]>(() => messages.map(() => false))

  useEffect(() => {
    const root = containerRef.current
    if (!root) return

    const observer = new IntersectionObserver(
      entries => {
        setVisible(prev => {
          const next = [...prev]
          entries.forEach(entry => {
            const index = Number((entry.target as HTMLElement).dataset.index)
            if (!Number.isNaN(index) && entry.isIntersecting) {
              next[index] = true
            }
          })
          return next
        })
      },
      {
        root,
        threshold: 0.05,
        // Trigger a bit 앞쪽에서 감지해 빠른 스크롤에도 놓치지 않도록
        rootMargin: '0px 0px 30% 0px',
      },
    )

    itemRefs.current.forEach(el => {
      if (el) observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return (
    <div className="chat-page">
      <header className="chat-header">
        <div>
          <div className="chat-header-title">❤️Wedding Invitation❤️</div>
          <div className="chat-header-sub">
          </div>
        </div>
      </header>

      <div className="chat-body" ref={containerRef}>
        <div className="chat-system">{weddingData.date.date} {weddingData.date.dayOfWeek} · 결혼 소식</div>
        <div className="chat-messages">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`chat-message ${msg.type} ${visible[index] ? 'visible' : ''}`}
              ref={el => {
                itemRefs.current[index] = el
              }}
              data-index={index}
            >
              <div className="chat-bubble-wrapper">
                {msg.type === 'image' ? (
                  <div className={`chat-bubble image-bubble ${msg.type}`}>
                    <img src={msg.imageUrl} alt={msg.caption ?? 'image'} className="chat-image" />
                    {msg.caption && <div className="chat-image-caption">{msg.caption}</div>}
                  </div>
                ) : (
                  <div
                    className={`chat-bubble ${msg.type} ${msg.size === 'large' ? 'large' : ''}`}
                    style={msg.color ? { color: msg.color } : undefined}
                  >
                    {msg.parts
                      ? msg.parts.map((part, idx) => (
                          <span
                            key={idx}
                            className={`chat-text-part ${part.size === 'large' ? 'large' : ''}`}
                            style={part.color ? { color: part.color } : undefined}
                          >
                            {part.text}
                          </span>
                        ))
                      : msg.message}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default NewPage