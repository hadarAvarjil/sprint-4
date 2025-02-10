import React from 'react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import { GigPreview } from '../cmps/GigPreview.jsx'
import { GigReview } from '../cmps/GigReview.jsx'
import { gigService } from '../services/gig.service.js'
import { userService } from '../services/user.service.js' 
import { loadUser } from '../store/actions/user.actions'
import { UserSkills } from '../cmps/UserSkills.jsx'
import SvgIcon from '../cmps/SvgIcon.jsx'
import { store } from '../store/store'
import { showSuccessMsg } from '../services/event-bus.service'
import { AddImg } from '../cmps/AddImg.jsx'

// import {
//   socketService,
//   SOCKET_EVENT_USER_UPDATED,
//   SOCKET_EMIT_USER_WATCH,
// } from '../services/socket.service'

export function UserDetails() {
  const params = useParams()
  const user = useSelector((storeState) => storeState.userModule.watchedUser)
  const [allGigs, setAllGigs] = useState([])
  const [userGigs, setUserGigs] = useState([])
  const [reviews, setReviews] = useState([])
  const navigate = useNavigate()
  const [ratingStats, setRatingStats] = useState({
    totalReviews: 0,
    starCounts: [0, 0, 0, 0, 0],
    averageRating: 0,
  })
  const [searchText, setSearchText] = useState('')
  const [showOnlyWithFiles, setShowOnlyWithFiles] = useState(false)
  const [filteredReviews, setFilteredReviews] = useState([])
  const [originalReviews, setOriginalReviews] = useState([])
  const [visibleCount, setVisibleCount] = useState(2)
const paperPlane = <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1737985101/svg_xml_base64_PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgZmlsbD0iI2ZmZiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cGF0aCBjbGlwLXJ1bGU9ImV2ZW5vZGQiIGQ9Ik0xNS40OC40MjNhLjc1Ljc1IDAgMCAxIC4_c9a6an.svg'}/>
  
  useEffect(() => {
    if (reviews.length > 0) {
      setFilteredReviews(reviews)
      setOriginalReviews(reviews)
      console.log('Filtered Reviews set:', reviews)
    }
  }, [reviews])

  useEffect(() => {
    async function fetchAllGigs() {
      try {
        const gigs = await gigService.query()
        setAllGigs(gigs)
        console.log('Fetched and normalized gigs:', gigs)
      } catch (err) {
        console.error('Failed to load gigs:', err)
      }
    }
    fetchAllGigs()
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight - 50) {
        if (visibleCount < filteredReviews.length) {
          setVisibleCount((prev) => prev + 2)
        }
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => {
      window.removeEventListener('scroll', handleScroll)
    }
  }, [visibleCount, filteredReviews])

  useEffect(() => {
    async function fetchReviewsWithUserData() {
      if (!userGigs.length) {
        console.log('No user gigs available to fetch reviews.')
        return
      }

      try {
        const allReviews = userGigs.flatMap((gig) => gig.reviews || [])
        console.log('All Reviews from Gigs:', allReviews)

        const reviewsWithUserData = await Promise.all(
          allReviews.map(async (review) => {
            if (review.username && review.imgUrl) {
              console.log(`Review ${review.id} already has username and imgUrl`)
              return review
            }
            console.log(`Fetching user data for review ID: ${review.id}, userId: ${review.userId}`)

            const userId = typeof review.userId === 'object' && review.userId.$oid ? review.userId.$oid : review.userId

            try {
              const user = await userService.getById(userId)
              if (!user) {
                console.warn(`User with ID ${userId} not found.`)
                return {
                  ...review,
                  username: 'Unknown',
                  imgUrl: 'https://via.placeholder.com/50',
                  country: 'Unknown', 
                }
              }
              console.log(`Fetched user for review ${review.id}:`, user)
              return {
                ...review,
                username: user.username || "Unknown", 
                imgUrl: user.imgUrl || "https://via.placeholder.com/50",
                country: user.from || "Unknown",
              }
            } catch (err) {
              console.error(`Failed to fetch user data for review ${review.id}`, err)
              return {
                ...review,
                username: 'Unknown',
                imgUrl: 'https://via.placeholder.com/50',
                country: 'Unknown',
              }
            }
          })
        )
        console.log("Enriched reviews:", reviewsWithUserData)
        setReviews(reviewsWithUserData)
        setOriginalReviews(reviewsWithUserData)
        setFilteredReviews(reviewsWithUserData)
      } catch (err) {
        console.error("Failed to fetch reviews with user data:", err)
      }
    }
    fetchReviewsWithUserData()
  }, [userGigs])

  useEffect(() => {
    if (user && user._id) {
      const userId = typeof user._id === 'object' && user._id.$oid ? user._id.$oid : user._id
      console.log('User ID:', userId) 

      const filteredGigs = allGigs.filter((gig) => gig.ownerId === userId)
      console.log('Gig ownerIds:', allGigs.map(gig => gig.ownerId)) 
      console.log('Filtered Gigs for User:', filteredGigs) 

      setUserGigs(filteredGigs)
    }
  }, [user, allGigs])

  useEffect(() => {
    applyFilters()
  }, [searchText, showOnlyWithFiles, reviews])

  useEffect(() => {
    loadUser(params.id)


  }, [params.id])

  useEffect(() => {
    if (userGigs.length > 0) {
      const allReviews = userGigs.flatMap((gig) => gig.reviews || [])
      console.log('All Reviews for Rating Stats:', allReviews)
      calculateRatingStats(allReviews)
      applyFilters(allReviews)
    }
  }, [userGigs, searchText, showOnlyWithFiles])

  function onUserUpdate(updatedUser) {
    showSuccessMsg(`This user ${updatedUser.fullName} just got updated from socket, new score: ${updatedUser.score}`)
    store.dispatch({ type: 'SET_WATCHED_USER', user: updatedUser })
  }

  function calculateRatingStats(reviews) {
    const totalReviews = reviews.length
    const starCounts = [0, 0, 0, 0, 0]
    let totalRating = 0

    reviews.forEach((review) => {
      if (review.rating) {
        totalRating += review.rating
        const index = Math.floor(review.rating) - 1
        if (index >= 0 && index < 5) {
          starCounts[index]++
        }
      }
    })

    setRatingStats({
      totalReviews,
      starCounts,
      averageRating: totalRating / totalReviews || 0,
    })
    console.log('Rating Stats:', {
      totalReviews,
      starCounts,
      averageRating: totalRating / totalReviews || 0,
    })
  }

  function applyFilters() {
    let filtered = [...originalReviews]

    if (searchText.trim()) {
      filtered = filtered.filter((review) =>
        review.text?.toLowerCase().includes(searchText.toLowerCase())
      )
    }

    if (showOnlyWithFiles) {
      filtered = filtered.filter((review) => review.files && review.files.length > 0)
    }

    setFilteredReviews(filtered)
    console.log('Filtered Reviews after applying filters:', filtered)
  }

  function renderStars(rate) {
    const maxStars = 3
    const filledStars = "✦".repeat(rate)
    const emptyStars = "✧".repeat(maxStars - rate)
    return filledStars + emptyStars
  }
  const levelMap = {
    "New Seller": 1,
    "Level 1": 1,
    "Level 2": 2,
    "Top Rated": 3,
    "Pro Talent": 4
  };
  
  const levelNumber = levelMap[user?.level] || 0


  if (!user) return <div>Loading...</div>

  return (
    <div className='container-user-details-specific'>
      <section className="user-details-specific">
        <div className="user-details-wrapper">
          <div className="user-main-info">
            <div className="user-header flex align-start">
              <img
                className="user-avatar-specific"
                src={user.imgUrl}
                alt={`${user.fullName}'s avatar`}
              />
              <div className="user-info">
                <h1>{user.fullName} <span className="username">@{user.username}</span></h1>
                {user.level === 'Pro Talent' && (
                  <span className="pro-badge">
                    <SvgIcon iconName="customCheckMarkSunIcon" />
                    Pro
                  </span>
                )}
                {user.level === 'New Seller' && (
                  <span className="new-seller-badge">
                    <SvgIcon iconName="newSeedlingIcon" />
                    New Seller
                  </span>
                )}
                <div className="rating">
                  <span>
                    <SvgIcon iconName="blackStar" />
                    {user.rating}
                  </span>
                  <span>{user.reviewsCount}</span>
                  {levelNumber === 3 && (
                    <span className="top-rated-badge">
                      Top Rated ✦✦✦
                    </span>
                  )}
                  {levelNumber < 3 && (
                    <span className="level-badge">
                      Level {levelNumber} {renderStars(levelNumber)}
                    </span>
                  )}
                </div>
                <p className="user-bio">{user.bio || 'Spokesperson, actress and video producer'}</p>
                <p className="user-location">
                  <SvgIcon iconName="locationUser" />
                  {user.from}<SvgIcon iconName="languageIcon" />
                  <span className="languages-text">{user.languages.join(', ')} </span>
                </p>
              </div>
            </div>

            <div className="user-about">
  <h2>About me</h2>
  <div className="user-description">
    {user.description
      ? user.description.split(/\n\s*\n/).map((paragraph, index) => (
          <p key={index}>
            {paragraph.split("\n").map((line, lineIndex) => (
              <React.Fragment key={lineIndex}>
                {line}
                <br />
              </React.Fragment>
            ))}
          </p>
        ))
      : <p>No additional details provided.</p>
    }
  </div>
</div>

        </div>
        <div className="user-contact-card">
          <div className="contact-header">
            <img className="avatar" src={user.imgUrl} alt="user-avatar" />
            <div className='contact-header-user-text-info'>
            <h3>{user.fullName}</h3>
            <p>Offline • {new Date().toLocaleTimeString()} local time</p>
          </div>
          </div>
          <button className="contact-btn"> {paperPlane} Contact me</button>
          <p className="response-time">Average response time: 1 hour</p>
        </div>
      </div>

      <UserSkills skills={user.skills} />
      <div className="user-gigs">
        <h2>My Gigs</h2>
        <ul className="gigs-list">
          {userGigs.map((gig) => (
            <GigPreview
              key={gig._id}
              gig={gig}
              isFrom="userProfile"
              suppressOwner={true}
            />
          ))}
        </ul>
      </div>
      <div className="gig-reviews-section">

        {ratingStats.totalReviews > 0 && (
          <div className="reviews-summary">
            <div className='rating-container' >
              <div className='average-rating-container'>
               <h2>{reviews.length} Reviews</h2>
            <div className="average-rating">
              <span className="stars">
                {'★'.repeat(Math.round(ratingStats.averageRating))}
                {'☆'.repeat(5 - Math.round(ratingStats.averageRating))}
              </span>
            </div>
            </div>
            <div className="stars-breakdown">
              {ratingStats.starCounts.map((count, index) => (
                <div key={index} className="star-row">
                  <span>{5 - index} Stars</span>
                  <div className="progress-bar">
                    <div
                      className="progress"
                      style={{
                        width: `${(count / ratingStats.totalReviews) * 100}%`,
                      }}
                    ></div>
                  </div>
                  <span>({count})</span>
                </div>
              ))}
            </div>
            </div>
          </div>
        )}
        <div className="reviews-filters">
          <input
            type="text"
            placeholder="Search reviews"
            value={searchText}
            onChange={(e) => setSearchText(e.target.value)}
          />
          <button className="search-icon">
            <SvgIcon iconName="search" />
          </button>
          <label>
            <input
              type="checkbox"
              checked={showOnlyWithFiles}
              onChange={(e) => setShowOnlyWithFiles(e.target.checked)}
            />
            Only show reviews with files
          </label>
        </div>
        <ul className="reviews">
          {filteredReviews.slice(0, visibleCount).map((review) => (
            <li key={review.id}>
              <GigReview review={review} />
            </li>
          ))}
        </ul>
        {visibleCount < filteredReviews.length && (
          <div className="loading-indicator">Loading more reviews...</div>
        )}
      </div>
    </section>
    </div>
  )
}
