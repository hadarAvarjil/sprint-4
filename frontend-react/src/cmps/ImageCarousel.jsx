import { useRef, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SvgIcon from './SvgIcon.jsx'

export function ImageCarousel({
  isFrom,
  images,
  gigId,
  newImgIndex,
  setNewImgIndex,
}) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [parentWidth, setParentWidth] = useState(0)
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)

  const carouselRef = useRef()

  const numImages = images.length
  let imageWidth = parentWidth

  useEffect(() => {
    const totalCarouselWidth = imageWidth * numImages
    carouselRef.current.style.width = `${totalCarouselWidth}px`
    carouselRef.current.style.transform = `translateX(-${imageWidth * currentIndex
      }px`
  }, [imageWidth, currentIndex, numImages])

  useEffect(() => {
    setCurrentIndex(newImgIndex)
  }, [newImgIndex])

  useEffect(() => {
    const updateParentWidth = () => {
      if (carouselRef.current && carouselRef.current.parentElement) {
        const newParentWidth = carouselRef.current.parentElement.clientWidth
        if (newParentWidth > 0) {
          setParentWidth(newParentWidth)
        }
      }
    }
    updateParentWidth()
    window.addEventListener('reload', updateParentWidth)
    window.addEventListener('resize', updateParentWidth)
    return () => {
      window.removeEventListener('reload', updateParentWidth)
      window.removeEventListener('resize', updateParentWidth)
    }
  }, [])

  function nextImage(event) {
    event.stopPropagation()
    setCurrentIndex((prevIndex) => (prevIndex + 1) % numImages)
    setNewImgIndex((prevIndex) => (prevIndex + 1) % numImages)
  }

  function prevImage(event) {
    event.stopPropagation()
    setCurrentIndex((prevIndex) => prevIndex === 0 ? numImages - 1 : prevIndex - 1)
    setNewImgIndex((prevIndex) => prevIndex === 0 ? numImages - 1 : prevIndex - 1)
  }

  function handleDotClick(index, event) {
    event.stopPropagation()
    setCurrentIndex(index)
  }

  function handleTouchStart(e) {
    setTouchStart(e.targetTouches[0].clientX)
    setTouchEnd(null)
  }

  function handleTouchMove(e) {
    setTouchEnd(e.targetTouches[0].clientX)
  }

  function handleTouchEnd() {
    if (!touchStart || !touchEnd) return
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > 25
    const isRightSwipe = distance < -25

    if (isLeftSwipe) nextImage(new Event('swipe'))
    if (isRightSwipe) prevImage(new Event('swipe'))
  }

  return (
    <div
      className={`carousel-container ${isFrom === 'gig-details' ? 'gig-details' : ''}`}
    >
      <button
        className={`arrow${isFrom === 'gig-details' ? '-gig-details' : ''
          } left`}
        onClick={(e) => prevImage(e)}
      >
        <SvgIcon iconName={'arrowDown'} />
      </button>
      <div className="carousel-wrapper">
        <div
          className="carousel"
          ref={carouselRef}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          style={{
            width: `${imageWidth * numImages}px`,
          }}
        >
          {images.map((image, index) => (
            <div
              key={index}
              className={`carousel-item ${isFrom === 'gig-details' ? 'gig-details' : ''}`}
              style={{
                // width: `${imageWidth}px`,
                width: `${imageWidth}px`,
              }}
            >
              {isFrom !== 'gig-details' ? (
                <Link to={`/gig/${gigId}`}>
                  <img
                    src={image}
                    style={{ borderRadius: '0.5em' }}
                    alt={`Image ${index}`}
                    className={index === currentIndex ? 'active' : ''}
                  />
                </Link>
              ) : (
                <img
                  src={image}
                  alt={`Image ${index}`}
                  style={{ borderRadius: '0' }}
                  className={index === currentIndex ? 'active' : ''}
                />
              )}
            </div>
          ))}
        </div>
      </div>

      <button
        className={`arrow${isFrom === 'gig-details' ? '-gig-details' : ''
          } right`}
        // className={"arrow right"}
        onClick={(e) => nextImage(e)}
      >
        <SvgIcon iconName={'arrowDown'} />
      </button>
      {isFrom !== 'gig-details' && (
        <ul className="dot-container">
          {images.map((_, index) => (
            <li
              key={index}
              onClick={(e) => handleDotClick(index, e)}
              className={`dot ${index === currentIndex ? 'active' : ''}`}
            ></li>
          ))}
        </ul>
      )}
    </div>
  )
}
