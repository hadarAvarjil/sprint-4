import { Link, useNavigate, useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useModal } from '../customHooks/ModalContext.jsx'
import { useDeviceType } from '../customHooks/DeviceTypeContext.jsx'
import { gigService } from '../services/gig.service'
import { userService } from '../services/user.service.js'
import { removeGig } from '../store/actions/gig.actions.js'


import SvgIcon from './SvgIcon.jsx'
import { UserPreview } from './UserPreview.jsx'
import { ImageCarousel } from './ImageCarousel.jsx'
import { loadReviews } from '../store/actions/review.actions.js'
import { utilService } from '../services/util.service.js'


export function GigPreview({ isFrom, gig, suppressOwner = false }) {
  const navigate = useNavigate()
  const params = useParams()
  const loggedInUserId = params.id
  const loggedInUser = useSelector((storeState) => storeState.userModule.user)
  const { openLogin } = useModal()
  const deviceType = useDeviceType()


  const [newImgIndex, setNewImgIndex] = useState(0)
  const [owner, setOwner] = useState(null)
  const [updatedGig, setUpdatedGig] = useState(gig)
  const [isLiked, setIsLiked] = useState(false);


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


  useEffect(() => {
    setIsLiked(gig.likedByUsers || false);
  }, []);


  async function onRemoveGig() {
    try {
      await removeGig(updatedGig._id)
      console.log('Gig removed successfully:')
      navigate(`/user/${owner._id}`)
    } catch (err) {
      console.error('Failed to save gig:', err)
    }
  }

  async function likeGig(e) {
    e.preventDefault()
    const gigToSave = { ...updatedGig }
    if (isLiked) {
      gigToSave.likedByUsers = false
      setIsLiked(false)
    } else {
      gigToSave.likedByUsers = true
      setIsLiked(true)
    }

    try {
      await gigService.save(gigToSave)
      setUpdatedGig(gigToSave)
    } catch (err) {
      console.log("error save gig", err) //debug
    }
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

      {isFrom !== 'userProfile' && (
        <span className="heart" onClick={(e) => likeGig(e)}>
          {isLiked ? (
            <SvgIcon iconName={'transparentHeart'} />
          ) : (
            <SvgIcon iconName={'heartOutlineDesktopIcon'} />
          )}
        </span>
      )}

      <div className="preview-body">
        {isFrom === 'explore' && (
          <UserPreview isFrom={isFrom} owner={owner} gig={updatedGig}>
            <Link className="gig-title" to={`/gig/${updatedGig._id}`}>
              {updatedGig.title}
            </Link>
          </UserPreview>
        )}

        {isFrom === 'user-profile-gigs-owner' && (
          <div className="gig-title flex">
            <span className="gig-title b">{`${updatedGig.title}`}</span>
          </div>
        )}

<div
              className={`gig-changes ${loggedInUserId !== loggedInUser?._id ? 'right' : ''
                }`}
            >
              {loggedInUserId === loggedInUser?._id && (
                <div className="gig-btns">
                  <button className="gig-btn">
                    <Link to={`/gig/edit/${updatedGig._id}`}>
                      <SvgIcon iconName={'pencil'} />
                    </Link>
                  </button>
                  <button onClick={onRemoveGig} className="gig-btn">
                    <SvgIcon iconName={'trashIcon'} />
                  </button>
                </div>
              )}
              {/* <div className="price">
                <span className="starting">Starting At</span>
                <span>{`$${updatedGig.price}`}</span>
              </div> */}
            </div>

        {isFrom !== 'userProfile' && (
          <div className="gig-price flex">
            <span className="price b">{`price $${updatedGig.price}`}</span>
          </div>
        )}
      </div>
    </li>
  )
}



