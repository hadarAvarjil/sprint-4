import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GigPreview } from '../cmps/GigPreview.jsx';
import { GigReview } from '../cmps/GigReview.jsx';
import { gigService } from '../services/gig/gig.service.local.js';
import { loadUser } from '../store/actions/user.actions';
import SvgIcon from '../cmps/SvgIcon.jsx'
import { store } from '../store/store';
import { showSuccessMsg } from '../services/event-bus.service';
import {
  socketService,
  SOCKET_EVENT_USER_UPDATED,
  SOCKET_EMIT_USER_WATCH,
} from '../services/socket.service';

export function UserDetails() {
  const params = useParams();
  const user = useSelector((storeState) => storeState.userModule.watchedUser);
  const [allGigs, setAllGigs] = useState([]);
  const [userGigs, setUserGigs] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [ratingStats, setRatingStats] = useState({
    totalReviews: 0,
    starCounts: [0, 0, 0, 0, 0],
    averageRating: 0,
  });
  const [searchText, setSearchText] = useState('');
  const [showOnlyWithFiles, setShowOnlyWithFiles] = useState(false);
  const [filteredReviews, setFilteredReviews] = useState([]);

  useEffect(() => {
    async function fetchAllGigs() {
      try {
        const gigs = await gigService.query();
        setAllGigs(gigs);
      } catch (err) {
        console.error('Failed to load gigs:', err);
      }
    }
    fetchAllGigs();
  }, []);

  useEffect(() => {
  async function fetchReviewsWithUserData() {
    if (!userGigs.length) return;

    try {
      const allReviews = userGigs.flatMap((gig) => gig.reviews || []);
      const reviewsWithUserData = await Promise.all(
        allReviews.map(async (review) => {
          try {
            const user = await userService.getById(review.userId);
            return {
              ...review,
              username: user.fullName,
              imgUrl: user.avatar,
              country: user.from,
            };
          } catch (err) {
            console.error(`Failed to fetch user data for review ${review.id}`, err);
            return {
              ...review,
              username: 'Unknown',
              imgUrl: '/path/to/default-avatar.png',
              country: 'Unknown',
            };
          }
        })
      );
      setReviews(reviewsWithUserData);
    } catch (err) {
      console.error('Failed to fetch reviews with user data:', err);
    }
  }
  fetchReviewsWithUserData();
}, [userGigs]);

  useEffect(() => {
    if (user && user._id) {
      const filteredGigs = allGigs.filter((gig) => gig.ownerId === user._id);
      setUserGigs(filteredGigs);
    }
  }, [user, allGigs]);

  useEffect(() => {
    applyFilters(reviews);
  }, [searchText, showOnlyWithFiles, reviews]);

  useEffect(() => {
    loadUser(params.id);

    socketService.emit(SOCKET_EMIT_USER_WATCH, params.id);
    socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate);

    return () => {
      socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate);
    };
  }, [params.id]);

  useEffect(() => {
    if (userGigs.length > 0) {
      const allReviews = userGigs.flatMap((gig) => gig.reviews || []);
      calculateRatingStats(allReviews);
      applyFilters(allReviews);
    }
  }, [userGigs, searchText, showOnlyWithFiles]);

  function onUserUpdate(user) {
    showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`);
    store.dispatch({ type: 'SET_WATCHED_USER', user });
  }

  function calculateRatingStats(reviews) {
    const totalReviews = reviews.length;
    const starCounts = [0, 0, 0, 0, 0];
    let totalRating = 0;

    reviews.forEach((review) => {
      if (review.rating) {
        totalRating += review.rating;
        starCounts[review.rating - 1]++;
      }
    });

    setRatingStats({
      totalReviews,
      starCounts,
      averageRating: totalRating / totalReviews || 0,
    });
  }

  function applyFilters(reviews) {
    let filtered = reviews;

    if (searchText) {
      filtered = filtered.filter((review) =>
        review.text.toLowerCase().includes(searchText.toLowerCase())
      );
    }

    if (showOnlyWithFiles) {
      filtered = filtered.filter((review) => review.files && review.files.length > 0);
    }

    setFilteredReviews(filtered);
  }

  if (!user) return <div>Loading...</div>;

  return (
    <section className="user-details-specific">
      <div className="user-details-wrapper">
        <div className="user-main-info">
          <div className="user-header flex align-start">
            <img
              className="user-avatar-specific"
              src={user.avatar}
              alt={`${user.fullName}'s avatar`}
            />
            <div className="user-info">
              <h1>{user.fullName} <span className="username">@{user.username}</span></h1>
              
              <div className="rating">
                <span><SvgIcon iconName="blackStar" />
                {user.rating}</span>
                <span>({user.reviewsCount || 0})</span> 
                <span className="top-rated-badge">Top Rated ✦✦✦</span>
              </div>
              <p className="user-bio">{user.bio || 'Rain, just rain'}</p>
              <p className="user-location">
              
              <SvgIcon iconName="locationUser" /> 
                {user.from}<SvgIcon iconName="languageIcon" />  <span className="languages-text">{user.languages.join(', ')} </span> 
              </p>
            </div>
          </div>

          <div className="user-about">
            <h2>About me</h2>
            <p>{user.about || 'No additional details provided.'}</p>
          </div>
        </div>

        <div className="user-contact-card">
          <div className="contact-header">
            <img className="avatar" src={user.avatar} alt="user-avatar" />
            <h3>{user.fullName}</h3>
            <p>Offline • {new Date().toLocaleTimeString()} local time</p>
          </div>
          <button className="contact-btn">Contact me</button>
          <p className="response-time">Average response time: 1 hour</p>
        </div>
      </div>

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
  <h2>Reviews</h2>
  {ratingStats.totalReviews > 0 && (
    <div className="reviews-summary">
      <div className="average-rating">
        {/* <span className="rating-number">{ratingStats.averageRating.toFixed(1)}</span> */}
        <span className="stars">
          {'★'.repeat(Math.round(ratingStats.averageRating))}
          {'☆'.repeat(5 - Math.round(ratingStats.averageRating))}
        </span>
        {/* <p>{ratingStats.totalReviews} Reviews</p> */}
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
  )}

    {/* <div className="reviews-filters">
      <input
        type="text"
        placeholder="Search reviews"
        value={searchText}
        onChange={(e) => setSearchText(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={showOnlyWithFiles}
          onChange={(e) => setShowOnlyWithFiles(e.target.checked)}
        />
        Only show reviews with files
      </label>
    </div> */}
  
    <ul className="reviews">
      {reviews.map((review) => (
        <li key={review.id}>
          <GigReview review={review} />
        </li>
      ))}
    </ul>
    </div>
    </section>
  );
}
