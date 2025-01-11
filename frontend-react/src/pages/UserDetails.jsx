import { useEffect,useState } from 'react';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { GigPreview } from '../cmps/GigPreview.jsx';
import { gigService } from '../services/gig/gig.service.local.js';
import { loadUser } from '../store/actions/user.actions';
import { store } from '../store/store';
import { showSuccessMsg } from '../services/event-bus.service';
import { socketService, SOCKET_EVENT_USER_UPDATED, SOCKET_EMIT_USER_WATCH } from '../services/socket.service';

export function UserDetails() {
  const params = useParams();
  const user = useSelector(storeState => storeState.userModule.watchedUser);
  const [allGigs, setAllGigs] = useState([]); 
  const [userGigs, setUserGigs] = useState([]);



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
    if (user && user._id) {
      const filteredGigs = allGigs.filter((gig) => gig.ownerId === user._id); 
      setUserGigs(filteredGigs);
    }
  }, [user, allGigs]);
  useEffect(() => {
    loadUser(params.id);

    socketService.emit(SOCKET_EMIT_USER_WATCH, params.id);
    socketService.on(SOCKET_EVENT_USER_UPDATED, onUserUpdate);

    return () => {
      socketService.off(SOCKET_EVENT_USER_UPDATED, onUserUpdate);
    };
  }, [params.id]);

  function onUserUpdate(user) {
    showSuccessMsg(`This user ${user.fullname} just got updated from socket, new score: ${user.score}`);
    store.dispatch({ type: 'SET_WATCHED_USER', user });
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
          <h1>{user.fullName}</h1>
          <p className="username">@{user.username}</p>
          <div className="rating">
            <span>⭐ {user.rating}</span>
            <span>({user.reviewsCount || 0})</span>
            <span className="top-rated-badge">Top Rated ✦✦✦</span>
          </div>
          <p className="user-bio">{user.bio || "Rain, just rain"}</p>
          <p className="user-location">
            📍 {user.from} | 🗣️ {user.languages.join(', ')}
          </p>
        </div>
      </div>

      <div className="user-about">
        <h2>About me</h2>
        <p>{user.about || "No additional details provided."}</p>
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
        <GigPreview key={gig._id} gig={gig} isFrom="userProfile" suppressOwner={true} />
      ))}
    </ul>
  </div>
    </section>
  );
  
  
}
