import { useState, useEffect } from 'react';
import { getTimeRemaining } from '../functions/utils.js'

export default function Countdown({ date }) {

  const [countdown, setCountdown] = useState({})

  useEffect(() => {
    const updateCountdown = () => setCountdown(getTimeRemaining(date))
    setInterval(updateCountdown, 1000)
  },[])

  return (
    <div className="d-flex" style={{ background: 'white' }}>
    {
      countdown.days && countdown.total > 0 &&
      <span className="home__countdown mx-auto pt-2 pb-1 text-center">
        {`${countdown.days} days, ${countdown.hours} hours, ${countdown.minutes} minutes and ${countdown.seconds} seconds until...`}
      </span>
    }
    {
      !countdown.days &&
      <span className="home__countdown mx-auto pt-2 pb-1 text-center">
        Loading...
      </span>
    }
    {
      countdown.days && countdown.total < 1 &&
      <span className="home__countdown mx-auto pt-2 pb-1 text-center">
        The big day has passed!
      </span>
    }
    </div>
  )
}