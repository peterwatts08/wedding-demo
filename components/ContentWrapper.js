import { useState, useEffect } from 'react'
import { Image } from 'react-bootstrap';

const ContentWrapper = ({ components, currentComponent, currentComponentIndex, componentIndex, setComponentIndex }) => {

  const currentContent = currentComponentIndex === componentIndex

  const handleClick = () => {
    if (!currentContent) {
      setComponentIndex(currentComponentIndex)
    }
  }

  const styleExtension = currentContent ? '' : '--clickable'

  return (
    <div 
      className={`home__wrapper-container${styleExtension} pt-2`} 
      onClick={handleClick}
    >
      <div className="d-flex">
        <div className="home__menu-header-container d-flex mx-auto pb-3">
          <div className="home__menu-header">
            {currentComponent.title}
          </div>
        </div>
      </div>
      <div className="d-flex">
        <div className="mx-auto">
        {
          components.map((component,i) => {
            const matchingComponent = component.src === currentComponent.src
            return <Image 
                      key={component.src}
                      src={`/images/${component.src}.png`} 
                      className={`home__nav-icon${matchingComponent ? '--active' : ''}`}
                      onClick={() => setComponentIndex(i)}
                    />
          })
        }
        </div>
      </div>
      <div className="pt-4">
        {currentComponent.jsx}
      </div>
    </div>
  )
}

export default ContentWrapper


