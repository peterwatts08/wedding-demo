import { useState, useEffect } from 'react'
import $ from 'jquery';
import SwipeableViews from 'react-swipeable-views';
import HomeMenu from '../components/HomeMenu';
import ContentWrapper from '../components/ContentWrapper';

export default function NavSystem({ components, componentIndex, setComponentIndex, uid }) {

  const [showTooltip, setShowToolip] = useState(false)
  const [heightFromTop, setHeightFromTop] = useState(350);

  const setAndSaveShowTooltip = () => {
    setShowToolip(true)
    window.localStorage.setItem('tooltipShown', true)
  }

  useEffect(() => {
    if (!window.localStorage.tooltipShown) {
      setAndSaveShowTooltip()
    }
  }, [])

  useEffect(() => {
    const windowHeight = window.innerHeight;
    const arrowRight = document.getElementsByClassName("home__nav-right-arrow")
    const arrowLeft = document.getElementsByClassName("home__nav-left-arrow")
    if (componentIndex > -1 && windowHeight && arrowRight[0]) {
        setHeightFromTop(((windowHeight - arrowRight[0].offsetHeight)/2))
    } else if (componentIndex > -1 && windowHeight && arrowLeft[0]) {
        setHeightFromTop(((windowHeight - arrowLeft[0].offsetHeight)/2))
    }
  })

  const handleHideTooltip = () => {
    if (showTooltip) {
      setShowToolip(false)
    }
  }

  const styles = {
    root: {
      padding: '0 30px',
    },
    slideContainer: {
      padding: '8px 5px',
    }
  };

  return (
    <div className="mb-5">
      { componentIndex === -1 &&  <HomeMenu components={components} setComponentIndex={setComponentIndex} uid={uid} />}
      { 
        componentIndex > -1 &&
        <>
        <SwipeableViews ignoreNativeScroll={true} index={componentIndex} onSwitching={handleHideTooltip} style={styles.root} slideStyle={styles.slideContainer}>
          {components.map((component,i) => <ContentWrapper key={i} components={components} currentComponent={component} currentComponentIndex={i} setComponentIndex={setComponentIndex} componentIndex={componentIndex}/>)}
        </SwipeableViews>
        <div className="text-center pt-2 pb-5">
          <span className="home__back-button " onClick={() => setComponentIndex(-1)}>Back to menu</span>
        </div>
        {
          componentIndex < 5 && 
          <span 
            className="home__nav-right-arrow" 
            style={heightFromTop ? { top: `${heightFromTop}px` } : { display: 'none' }} 
            onClick={() => setComponentIndex(componentIndex+1)}
          >
            &#x2192;
          </span>
        }
        {
          componentIndex > 0 && 
          <span 
            className="home__nav-left-arrow" 
            style={heightFromTop ? { top: `${heightFromTop}px` } : { display: 'none' }} 
            onClick={() => setComponentIndex(componentIndex-1)}
          >
            &#x2190;
          </span>
        }
        {showTooltip && (
          <div className="d-flex flex-column home__nav-tooltip">
            <span className="p-2 home__nav-tooltip-box text-center">
              Try swiping<br />between pages!</span>
            <span className="mx-auto home__nav-tooltip-pointer" style={{ fontSize: '32px' }}>&#x1f446;</span>
          </div>
        )}
        </>
      }
    </div>
  )
}