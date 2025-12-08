import { useEffect, useMemo, useState } from 'react'
import { weddingData } from '../data/weddingData'
import './DateInfo.css'

type Countdown = {
  days: number
  hours: number
  minutes: number
  seconds: number
  isPast: boolean
}

const MS = {
  second: 1000,
  minute: 60 * 1000,
  hour: 60 * 60 * 1000,
  day: 24 * 60 * 60 * 1000,
} as const

const calcCountdown = (target: Date): Countdown => {
  const diff = target.getTime() - Date.now()
  const clamped = Math.max(diff, 0)

  return {
    days: Math.floor(clamped / MS.day),
    hours: Math.floor((clamped % MS.day) / MS.hour),
    minutes: Math.floor((clamped % MS.hour) / MS.minute),
    seconds: Math.floor((clamped % MS.minute) / MS.second),
    isPast: diff <= 0,
  }
}

const DateInfo = () => {
  const { date } = weddingData

  const targetDate = useMemo(() => {
    const [year, month, day] = date.date.split('.').map(Number)
    const [hour, minute] = date.time.split(':').map(Number)
    // 월은 0부터 시작
    return new Date(year, month - 1, day, hour, minute)
  }, [date.date, date.time])

  const [countdown, setCountdown] = useState<Countdown>(() =>
    calcCountdown(targetDate),
  )

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown(calcCountdown(targetDate))
    }, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  return (
    <section className="date-info">
      <div className="date-info-content">
        <div className="date-main">
          <div className="date-number">{date.date}</div>
          <div className="date-day">{date.dayOfWeek}</div>
        </div>
        <div className="time-info">
          <span className="time-label">오후</span>
          <span className="time-value">{date.time}</span>
        </div>
        <div className="countdown">
          <span className="countdown-number">{countdown.days}</span>
          <span className="countdown-label">일</span>
          <span className="separator" />
          <span className="countdown-number">{countdown.hours}</span>
          <span className="countdown-label">시</span>
          <span className="separator" />
          <span className="countdown-number">{countdown.minutes}</span>
          <span className="countdown-label">분</span>
          <span className="separator" />
          <span className="countdown-number">{countdown.seconds}</span>
          <span className="countdown-label">초</span>
        </div>
      </div>
    </section>
  )
}

export default DateInfo
