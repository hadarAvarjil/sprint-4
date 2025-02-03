import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useModal } from '../customHooks/ModalContext.jsx'
import { useDeviceType } from '../customHooks/DeviceTypeContext.jsx'
import { gigService } from '../services/gig.service'
import { userService } from '../services/user.service.js'
import { removeGig } from '../store/actions/gig.actions.js'

import SvgIcon from './SvgIcon.jsx'
import { UserPreview } from './UserPreview.jsx'
import { ImageCarousel } from './ImageCarousel.jsx'
import { loadReviews } from '../store/actions/review.actions.js'

export function GigPreview({ isFrom, gig, suppressOwner = false, onLikeToggle }) {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const params = useParams()
  const loggedInUserId = params.id
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  const { openLogin } = useModal()
  const deviceType = useDeviceType()


  const [newImgIndex, setNewImgIndex] = useState(0)
  const [owner, setOwner] = useState(null)
  const [updatedGig, setUpdatedGig] = useState(gig)

  const isLiked = Array.isArray(gig.likedByUsers) && loggedInUser
    ? gig.likedByUsers.includes(loggedInUser._id)
    : false;



  useEffect(() => {
    if (!suppressOwner) {
      async function fetchOwnerDetails() {
        const ownerData = await userService.getById(updatedGig.ownerId)
        setOwner(ownerData)
      }
      fetchOwnerDetails()
    }
    loadReviews()
  }, [updatedGig.ownerId, suppressOwner])

  async function handleLike(e) {
    e.preventDefault()

    if (!loggedInUser) {
      openLogin()
      return
    }

    if (onLikeToggle) {
      onLikeToggle(gig)
    }
    const updatedGig = { ...gig };
    updatedGig.likedByUsers = Array.isArray(updatedGig.likedByUsers) ? [...updatedGig.likedByUsers] : []

    if (updatedGig.likedByUsers.includes(loggedInUser._id)) {
      updatedGig.likedByUsers = updatedGig.likedByUsers.filter(userId => userId !== loggedInUser._id)
    } else {
      updatedGig.likedByUsers.push(loggedInUser._id)
    }

    try {
      await gigService.save(updatedGig)
      dispatch({ type: 'UPDATE_GIG', gig: updatedGig })
    } catch (err) {
      console.log("Error saving gig", err)
    }
  }


  async function onRemoveGig() {
    try {
      await removeGig(updatedGig._id)
      console.log('Gig removed successfully:')
      navigate(`/user/${owner._id}`)
    } catch (err) {
      console.error('Failed to save gig:', err)
    }
  }

  if (isFrom === 'recommended') {
    const levelNumber = owner?.level ? parseInt(owner.level.split(' ')[1], 10) || 0 : 0
    function renderStars(level) {
      const maxStars = 3;
      const filledStars = '✦'.repeat(level)
      const emptyStars = '✧'.repeat(maxStars - level)
      return filledStars + emptyStars
    }

    return (
      <li className="recommended">
        <div className="image-wrapper">
          {updatedGig.imgUrls && updatedGig.imgUrls.length > 0 && (
            <img
              src={updatedGig.imgUrls[0]}
              alt={updatedGig.title}
            />
          )}
          {loggedInUser && (
            <span className="heart" onClick={(e) => handleLike(e)}>
              {isLiked ? (
                <SvgIcon iconName={'heartOutlineDesktopIcon'} />
              ) : (
                <SvgIcon iconName={'transparentHeart'} />
              )}
            </span>
          )}
        </div>
        {owner && (
          <div className="gig-user">
            {owner.imgUrl && (
              <img
                className="user-avatar"
                src={owner.imgUrl}
                alt={`${owner.fullName} avatar`}
                style={{
                  width: '30px',
                  height: '30px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  marginRight: '0.5rem'
                }}
              />
            )}
            <div className="user-info">
              <h1>{owner.fullName}</h1>
              <span className="level flex row" data-level={owner.level} title="user level">
                {levelNumber > 0 && levelNumber <= 3 ? (
                  <>
                    {levelNumber === 3 ? (
                      <span className="top-rated-badge">Top Rated ✦✦✦</span>
                    ) : (
                      <>Level {renderStars(levelNumber)}</>
                    )}
                  </>
                ) : owner.level === 'Pro Talent' ? (
                  <span className="pro-level">
                    <SvgIcon iconName="customCheckMarkSunIcon" /> Pro
                  </span>
                ) : owner.level === 'New Seller' ? (
                  <span className="new-seller-badge">
                    <SvgIcon iconName="newSeedlingIcon" /> New Seller
                  </span>
                ) : (
                  <>{owner.level}</>
                )}
              </span>
              <div className="preview-body">
                <div className="gig-title">
                  <Link to={`/gig/${updatedGig._id}`}>
                    {updatedGig.title}
                  </Link>
                </div>
                <div className="gig-price">
                  price ${updatedGig.price}
                </div>
                <div className="rating">
                  <span>
                    <SvgIcon iconName="blackStar" />
                    {owner.rating}
                  </span>
                  <span>({owner.reviewsCount || 0})</span>
                </div>
              </div>
            </div>
          </div>
        )}



      </li>
    )
  }
  return (
    <li className="gig-preview">
      <ImageCarousel
        isFrom={isFrom}
        images={updatedGig.imgUrls}
        gigId={updatedGig._id}
        newImgIndex={newImgIndex}
        setNewImgIndex={setNewImgIndex}
      />

      {loggedInUser && isFrom !== 'userProfile' && (
        <span className="heart" onClick={(e) => handleLike(e)}>
          {isLiked ? (
            <SvgIcon iconName={'heartOutlineDesktopIcon'} />
          ) : (
            <SvgIcon iconName={'transparentHeart'} />
          )}
        </span>
      )}

      <div className="preview-body">
        {(isFrom === 'explore' || isFrom === 'myLists') && (
          <UserPreview isFrom={isFrom} owner={owner} gig={updatedGig}>
            <Link className="gig-title" to={`/gig/${updatedGig._id}`}>
              {updatedGig.title}
            </Link>
          </UserPreview>
        )}

        {isFrom === 'user-profile-gigs-owner' && (
          <div className="gig-title flex">
            <span className="gig-title b">{updatedGig.title}</span>
          </div>
        )}

        {isFrom !== 'userProfile' && (
          <div className="gig-price flex">
            <span className="price b">{`price $${updatedGig.price}`}</span>
          </div>
        )}

        <div className="gig-changes">
          {loggedInUser && loggedInUser._id === gig.ownerId && (
            <div className="gig-btns">
              <Link to={`/gig/edit/${gig._id}`}>
                <button className="gig-btn">
                  <SvgIcon iconName={'pencil'} />
                </button>
              </Link>

              <button onClick={onRemoveGig} className="gig-btn">
                <SvgIcon iconName={'trashIcon'} />
              </button>
            </div>
          )}
        </div>
      </div>
    </li>
  )
}



