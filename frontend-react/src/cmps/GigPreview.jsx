import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import SvgIcon from './SvgIcon.jsx'
import { ImageCarousel } from './ImageCarousel.jsx'
import { userService } from '../services/user/user.service.local.js' 

export function GigPreview({ gig, isLiked, onToggleLike }) {
  const [newImgIndex, setNewImgIndex] = useState(0)
  const [ownerDetails, setOwnerDetails] = useState(null) 
  const { imgUrls, _id, title, price, rate, ownerId } = gig || {}
  const { avatar, fullName, level } = ownerDetails || {}


  useEffect(() => {
    if (ownerId) {
      fetchOwnerDetails(ownerId)
    }
  }, [ownerId])

  const fetchOwnerDetails = async (ownerId) => {
    try {
      const ownerData = await userService.getById(ownerId) 
      setOwnerDetails(ownerData)
    } catch (err) {
      console.error('Failed to fetch owner details:', err)
    }
  }

  const handleLikeClick = () => {
    onToggleLike(_id)
  }

  return (
    <div className="gig-preview">
      <div className="image-container">
        {imgUrls && imgUrls.length > 0 && (
          <ImageCarousel
            images={imgUrls}
            gigId={_id}
            newImgIndex={newImgIndex}
            setNewImgIndex={setNewImgIndex}
          />
        )}
        <button className="heart-icon" onClick={handleLikeClick}>
          <SvgIcon
            iconName={isLiked ? 'heartOutlineDesktopIcon' : 'transparentHeart'}
            style={{ width: '24px', height: '24px' }}
          />
        </button>
      </div>
      <div className="gig-details">
      <div className="user-info">
          {avatar && (
            <img
              className="avatar"
              src={avatar}
              alt={`${fullName || 'User'} avatar`}
            />
          )}
          <div className="user-text">
            <span className="full-name">{`Ad by ${fullName || 'Unknown User'}`}</span>
            <span className="level">
              {level || 'No Level'}
            </span>
          </div>
        </div>
        {title && (
          <Link className="gig-title" to={`/gigdetails/${_id}`}>
            {title}
          </Link>
        )}
        <div className="gig-meta">
          <div className="user-rating">
            <span className="rating-score">{rate ? `★${rate}` : 'No Rating'}</span>
          </div>
          <div className="price">
            {price ? `From ₪${price}` : 'No Price'}
          </div>
        </div>
      </div>
    </div>
  )
}
