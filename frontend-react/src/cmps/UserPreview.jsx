import { useEffect, useState } from 'react'
import SvgIcon from '../cmps/SvgIcon'
import { userService } from '../services/user.service.js'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

export function UserPreview({ isFrom, owner, children }) {
  // const orders = useSelector((storeState) => storeState.orderModule.orders)
  const [user, setUser] = useState(null)
  const [ratingCount, setRatingCount] = useState(null)
  // let completedOrders = []
  // if (isFrom === 'gigDetailsTop' || isFrom === 'gigDetailsBottom') {
  //   completedOrders = orders
  //     .filter((order) => order.sellerId === owner._id)
  //     .filter((order) => order.deniedAt || order.acceptedAt)
  // }
  // completedOrders = completedOrders.length

  useEffect(() => {
    loadUserData()
  }, [owner])

  useEffect(() => {
    if (user && ratingCount === null) {
      const count = userService.getUserRatingCount(user)
      setRatingCount(count)
    }
  }, [user])

  function loadUserData() {
    setUser(owner)
  }
  function renderStars(rate) {
    const maxStars = 3 // Total number of stars
    const filledStars = "✦".repeat(rate);
    const emptyStars = "✧".repeat(maxStars - rate);
    return filledStars + emptyStars;
  }
  const levelNumber = user?.level ? parseInt(user.level.split(' ')[1], 10) || 0 : 0
  if (!user) return null

  return (
    <>
      <div
        className={`user-preview ${isFrom === 'gig-details' ? 'gap12' : isFrom === 'gig-details-2' ? 'gap16' : ''
          }`}
      >
        <img
          className={`avatar-${isFrom}`}
          src={user.imgUrl}
          alt={`${user.fullName} gig avatar`}
        />
        <div className={`user-${isFrom}-wrapper`}>
          <span className="name-wrapper">
            {(isFrom === 'gig-details' || isFrom === 'gig-details-2') && (
              <span className="fullname b">{user.fullName}</span>
            )}
            <Link to={`/user/${user._id}`}
              className={`username ${isFrom === 'explore' ? 'b' : ''}`}>
              {isFrom === 'gig-details' || isFrom === 'gig-details-2' ? '@' : ''}
              <span className="ad-by">Ad by</span> {user.fullName}
            </Link>
            {isFrom === 'userProfile' &&
              <span className={`user-level ${user.level === 'level 3' ? 'top' : ''}`} title='user level'>
                Level {user.level}
              </span>}
          </span>
        </div>
        {isFrom === 'explore' && (
          <span className="level flex row" data-level={user.level} title="user level">
            {levelNumber > 0 && levelNumber <= 3 ? (
              <>
                {levelNumber === 3 ? (
                  <span className="top-rated-badge">Top Rated ✦✦✦</span>
                ) : (
                  <>Level {renderStars(levelNumber)}</>
                )}
              </>
            ) : user.level === 'Pro Talent' ? (
              <span className="pro-level">
                <SvgIcon iconName="customCheckMarkSunIcon" /> Pro
              </span>
            ) : user.level === 'New Seller' ? (
              <span className="new-seller-level">
                <SvgIcon iconName="newSeedlingIcon" /> New
              </span>
            ) : (
              <>{user.level}</>
            )}
          </span>
        )}
      </div>
      {(isFrom === 'explore' || isFrom === 'recommended') && children}
      {isFrom === 'explore' && (
        <div className="user-rating-order">
          <span className="rating-score flex">
            <SvgIcon iconName={'star'} tag={'span'} />
            <span className="rate b" title='user rating'>{user.rating}</span>
            <span className="rate-count">{`(${ratingCount})`}</span>
          </span>
          <span></span>
        </div>
      )}
    </>
  )
}
