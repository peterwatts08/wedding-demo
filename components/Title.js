import { useEffect } from 'react';
import moment from 'moment';
import anime from 'animejs/lib/anime.min.js';
import Countdown from './Countdown.js'

export default function Title({ name, returnHome, setShowInvite }) {

  useEffect(() => {
    var textWrapper = document.querySelector('.home__main-heading');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");
    anime.timeline({loop: false})
      .add({
        targets: '.home__main-heading .letter',
        scale: [4,1],
        opacity: [0,1],
        translateZ: 0,
        easing: "easeOutExpo",
        duration: 900,
        delay: (el, i) => 90*i
      })
  }, [])

  return (
    <div>
      <Countdown date={moment("2023-08-01 13:00","YYYY-MM-DD HH:mm").toDate()} />
      {
        !!name && 
        <div className="d-flex">
          <div className="home__invite-container d-flex" onClick={() => setShowInvite(true)}>
              <span className="home__invite-icon my-auto p-2">&#x1F4E9;</span>
              <span className="home__invite-message my-auto">{name}</span>
          </div>
        </div>
      }
      <div>
        <h1 className={`${name ? 'pt-1' : 'pt-5'} text-center mb-0`}>The Wedding of</h1>
        <div className="text-center">
            <span className="home__main-heading pb-2" onClick={returnHome}>Bride & Groom </span>
        </div>
        <h1 className="pb-4 mb-0 text-center">01 - 08 - 23</h1>
      </div>
    </div>
  )

}