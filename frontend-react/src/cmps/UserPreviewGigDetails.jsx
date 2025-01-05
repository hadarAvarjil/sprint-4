import { useEffect, useState } from 'react'

export function UserPreviewGigDetails({ owner }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (owner) {
            loadUserDetails()
        }
    }, [owner])

    function loadUserDetails() {
        setUser(owner);
    }

    if (!user) return null;

    return (
        <div className="gig-details-header">
            <div className="user-info">
                <img
                    className="avatar"
                    src={user.avatar}
                    alt={`${user.fullName} avatar`}
                />
                <div className="user-details">
                    <div className="user-header">
                        <span className="fullname">{user.fullName}</span>
                        {user.isTopRated && (
                            <span className="top-rated-badge">Top Rated ✦✦✦</span>
                        )}
                        {user.ordersInQueue && (
                            <span className="orders-queue">
                                {user.ordersInQueue} orders in queue
                            </span>
                        )}
                    </div>
                    <span className="user-role">Graphic Designer</span>
                    <div className="rating">
                        <span className="stars">
                            {"★".repeat(Math.floor(user.rating))}
                            {"☆".repeat(5 - Math.floor(user.rating))}
                        </span>
                        <span className="rating-score">{user.rating.toFixed(1)}</span>
                        <span className="rating-count">
                            ({user.ratingCount.toLocaleString()} reviews)
                        </span>
                    </div>
                </div>
            </div>
        </div>
    )
}