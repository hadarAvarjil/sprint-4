import { userService } from '../services/user'
import { GigPreview } from './GigPreview'
import { useState, useEffect } from 'react'

export function GigList({ gigs, onRemoveGig = () => {}, onUpdateGig = () => {}, isLoading }) {
  const [isVisible, setIsVisible] = useState(false)
  const [likedGigs, setLikedGigs] = useState([])
  const isFrom = 'explore'

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 100)
    return () => clearTimeout(timer)
  }, [])

  const toggleLike = (gigId) => {
    setLikedGigs((prevLikedGigs) =>
      prevLikedGigs.includes(gigId)
        ? prevLikedGigs.filter((id) => id !== gigId) 
        : [...prevLikedGigs, gigId]
    )
  }

  const uniqueGigs = gigs.filter(
    (gig, index, self) => index === self.findIndex((g) => g._id === gig._id)
  )

  function shouldShowActionBtns(gig) {
    const user = userService.getLoggedinUser()
    return user && (user.isAdmin || gig.owner?._id === user._id)
  }

  if (isLoading) return <div className="loader">Loading...</div>

  return (
    <section className="main-gig-list">
      <div className={`gig-list layout-row ${isVisible ? 'show' : ''}`}>
        {uniqueGigs.map((gig) => (
          <GigPreview
            key={gig._id}
            onRemoveGig={onRemoveGig}
            onUpdateGig={onUpdateGig}
            gig={gig}
            isLiked={likedGigs.includes(gig._id)}
            onToggleLike={toggleLike}
            canEdit={shouldShowActionBtns(gig)}
            isFrom={isFrom}
          />
        ))}
      </div>
    </section>
  )
}
