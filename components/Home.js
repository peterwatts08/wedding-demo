import { useContext, useState, useEffect } from 'react';
import Head from 'next/head';
import Title from './Title';
import NavSystem from './NavSystem';
import Wedding from './Wedding';
import Accomodation from './Accomodation';
import Footer from './Footer';
import Invite from './Invite';
import CodePage from './CodePage';
import RSVP from './RSVP';
import Content from './Content';
import { formatInviteName } from '../functions/utils';

export default function Home() {

  const [componentIndex, setComponentIndex] = useState(-1)
  const [showInvite, setShowInvite] = useState(false)
  const setAndSaveShowInvite = () => {
    setShowInvite(true)
    window.localStorage.setItem('inviteShown', true)
  }

  const foodContent = [
    { text: "Food and drink information"}, 
  ]

  const travelContent = [
     { text: "Travel information"}, 
  ]

  const giftsContent = [
    { text: "Gifts information"},  
  ]

  const components = [
    { src: 'rings', title: 'Wedding Day', jsx: <Wedding /> },
    { src: 'bed', title: 'Accomodation', jsx: <Accomodation /> },
    { src: 'bottle', title: 'Food & Drink', jsx: <Content content={foodContent} img="food-drink.png"/> },
    { src: 'car', title: 'Travel', jsx: <Content content={travelContent} img="car.jpg"/> },
    { src: 'gift', title: 'Gifts', jsx: <Content content={giftsContent} img="gifts.png"/> },
    { src: 'rsvp', title: 'RSVP', jsx: <RSVP /> }
  ]

  useEffect(() => {
    if (!window.localStorage.inviteShown) {
      setAndSaveShowInvite()
    }
  }, [])

  return (
    <>
      <Head>
        <title>Wedding Demo</title>
        <meta name="description" content="WWW - Watts Wedding Website" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div id="root-div">
        <div id="background-div">
          <Title returnHome={() => setComponentIndex(-1)} name={'Guest'} setShowInvite={setAndSaveShowInvite}/>
          <NavSystem components={components} componentIndex={componentIndex} setComponentIndex={setComponentIndex} />
          <Footer />
          <Invite showInvite={showInvite} closeInvite={() => setShowInvite(false)} goToRSVP={() => setComponentIndex(5)} />
        </div>
      </div> 
    </>
  )
}
