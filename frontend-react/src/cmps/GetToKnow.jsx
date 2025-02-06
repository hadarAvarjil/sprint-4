import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import SvgIcon from './SvgIcon.jsx'

export function GetToKnow({ owner, gig }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (owner) {
            loadUserDetails()
        }
    }, [owner])

    function loadUserDetails() {
        setUser(owner)
    }
  
  
    const levelNumber = user?.level ? parseInt(user.level.split(' ')[1], 10) || 0 : 0
    if (!user) return null

    function renderStars(rate) {
        const maxStars = 3; 
        const filledStars = "✦".repeat(rate);
        const emptyStars = "✧".repeat(maxStars - rate);
        return filledStars + emptyStars;
    }
    return (
        <>
        <div className='g-t-k-container'>
            <h3 className='g-t-k-title'>Get to know {user.fullName}</h3>
            <div className="get-to-know user-preview-gig-details flex">
                <div className="user-info flex align-start">
                    <div className="avatar-container">
                        <img
                            className="avatar-get-to-know"
                            src={user.imgUrl}
                            alt={`${user.fullName} avatar`}
                        />
                        {user.isVerified && (
                            <div className="verified-badge">
                                <SvgIcon iconName="checkMarkIcon" />
                            </div>
                        )}
                    </div>
                    <div className="user-details">
                        <div className="user-header">
                            <span className="fullname">
                                <Link to={`/user/${user._id}`}>{user.fullName}</Link>
                            </span>
                        </div>
                        <span className="user-role">Graphic Designer</span>
                        <div className="user-info-row align-center">
                            <div className="rating align-center">
                                <span className="stars">
                                    {"★".repeat(Math.floor(user.rating))}
                                    {"☆".repeat(5 - Math.floor(user.rating))}
                                </span>
                                <span className="rating-score">
                                    {(user.rating || 0).toFixed(1)}
                                </span>
                                <span> ({gig.reviews.length})</span>
                                <div className="line-divider"></div>
                                {user.level === "Pro Talent" ? (
                                    <span className="pro-talent-badge">
                                        <SvgIcon iconName="customCheckMarkSunIcon" />
                                        Pro
                                    </span>
                                ) : user.level === "New Seller" ? (
                                    <span className="new-seller-badge">
                                        <SvgIcon iconName="newSeedlingIcon" />
                                        New Seller
                                    </span>
                                ) : levelNumber < 3 ? (
                                    <span className="level-badge">
                                        Level {levelNumber} {renderStars(levelNumber)}
                                    </span>
                                ) : levelNumber === 3 ? (
                                    <span className="top-rated-badge">Top Rated ✦✦✦</span>
                                ) : null}
                            </div>
                        </div>
                    </div>
                </div>
                </div>
            </div>
        </>
    )
}