import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';
import SvgIcon from './SvgIcon.jsx'

export function UserPreviewGigDetails({ owner, gig }) {
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

    const reviewsText = gig.reviews.length === 1 ? 'Review' : 'Reviews';
    function renderStars(rate) {
        const maxStars = 3; // Total number of stars
        const filledStars = "✦".repeat(rate);
        const emptyStars = "✧".repeat(maxStars - rate);
        return filledStars + emptyStars;
    }
    return (
        <div className="user-preview-gig-details flex">
            <div className="user-info flex align-start">
                <img
                    className="avatar"
                    src={user.imgUrl}
                    alt={`${user.fullName} avatar`}
                />
                <div className="user-details flex column">
                    <div className="user-header flex align-center">
                        <span className="fullname">
                            <Link to={`/user/${user._id}`}>{user.fullName}</Link>
                        </span>
                        {user.level === 'Pro Talent' ? (
                            <span className="pro-talent-badge">
                                <SvgIcon iconName="customCheckMarkSunIcon" />
                                Pro
                            </span>
                        ) : user.level === 'New Seller' ? (
                            <span className="new-seller-badge">
                                <SvgIcon iconName="newSeedlingIcon" />
                                New Seller
                            </span>
                        ) : levelNumber < 3 ? (
                            <span className="level-badge">
                                Level {levelNumber} {renderStars(levelNumber)}
                            </span>
                        ) : levelNumber === 3 ? (
                            <span className="top-rated-badge">
                                Top Rated ✦✦✦
                            </span>
                        ) : null}
                        <div className="line-divider"></div>
                        {user.ordersInQueue && (
                            <span className="orders-queue">
                                {user.ordersInQueue} orders in queue
                            </span>
                        )}
                    </div>
                    <div className="user-info-row flex align-center">
                        <span className="user-role">Graphic Designer</span>
                        <div className="rating flex align-center">
                            <span className="stars">
                                {"★".repeat(Math.floor(user.rating))}
                                {"☆".repeat(5 - Math.floor(user.rating))}
                            </span>
                            <span className="rating-score"> {(user.rating || 0).toFixed(1)}</span>
                            <span
                                className="reviews-count"
                                onClick={() => {
                                    const reviewsSection = document.getElementById('reviews-section');
                                    if (reviewsSection) {
                                        reviewsSection.scrollIntoView({ behavior: 'smooth' });
                                    }
                                }}
                                style={{ cursor: 'pointer' }}
                            >
                                ({gig.reviews.length} {reviewsText})
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}