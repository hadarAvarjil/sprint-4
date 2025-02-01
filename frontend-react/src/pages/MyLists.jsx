import { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { gigService } from '../services/gig/gig.service.local.js'
import { GigPreview } from '../cmps/GigPreview.jsx'
import { userService } from '../services/user.service.js'

export function MyLists() {
  const [likedGigs, setLikedGigs] = useState([])
  const [recommendedGigs, setRecommendedGigs] = useState([])
  const loggedInUser = useSelector((state) => state.userModule.user)

  useEffect(() => {
    async function fetchLikedGigs() {
      if (!loggedInUser) return
      try {
        const gigs = await gigService.query()
        const userLikedGigs = gigs.filter(
          (gig) =>
            Array.isArray(gig.likedByUsers) &&
            gig.likedByUsers.includes(loggedInUser._id)
        )
        setLikedGigs(userLikedGigs)
      } catch (err) {
        console.error('Error fetching gigs:', err)
      }
    }
    fetchLikedGigs()
  }, [loggedInUser])

  useEffect(() => {
    async function fetchRecommendedGigs() {
      if (!loggedInUser) return
      if (likedGigs.length === 0) {
        setRecommendedGigs([])
        return
      }
      try {
        const category = likedGigs[0].category
        const fetchedGigs = await gigService.query({ category })
        const filteredRecommendedGigs = fetchedGigs.filter(
          (gig) =>
            gig.category === category &&
            !likedGigs.some((likedGig) => likedGig._id === gig._id)
        )
        setRecommendedGigs(filteredRecommendedGigs)
      } catch (err) {
        console.error('Error fetching recommended gigs:', err)
      }
    }
    fetchRecommendedGigs();
  }, [likedGigs, loggedInUser]);

  async function handleLikeToggle(gig) {
    if (!loggedInUser) return;
    setLikedGigs((prevLikedGigs) => {
      const updatedLikedGigs = prevLikedGigs.filter(
        (likedGig) => likedGig._id !== gig._id
      );
      return updatedLikedGigs;
    });

    try {

      await gigService.toggleLike(gig._id, loggedInUser._id);
      setRecommendedGigs((prevRecommendedGigs) =>
        prevRecommendedGigs.filter(
          (recommendedGig) => recommendedGig._id !== gig._id
        )
      );
    } catch (err) {
      console.error('Error toggling like:', err);
    }
  }

  return (
    <div className="my-lists-page">
      <h1>My Lists</h1>
      <section className="recommended-gigs-section">
        {likedGigs.length ? (
          <ul className="gigs-list recommended-gigs-list">
            {likedGigs.map((gig) => (
              <li className="liked-gig-item" key={gig._id}>
                <GigPreview
                  gig={gig}
                  isFrom="recommended"
                  onLikeToggle={() => handleLikeToggle(gig)}
                />
              </li>
            ))}
          </ul>
        ) : (
          <p>No liked gigs yet.</p>
        )}
      </section>
      <section className="recommended-gigs-section">
        <div className="flex-row">
          <h2 className="gig-title">
            {likedGigs.length > 0 ? (
              <>
                Because you've saved -{' '}
                <span style={{ color: '#446ee7' }}>
                  {likedGigs[0].category}
                </span>
              </>
            ) : (
              'Recommended Gigs'
            )}
          </h2>
        </div>
        <ul className="gigs-list recommended-gigs-list">
          {recommendedGigs.map((gig) => (
            <GigPreview key={gig._id} gig={gig} isFrom="recommended" />
          ))}
        </ul>
      </section>
    </div>
  )
}
