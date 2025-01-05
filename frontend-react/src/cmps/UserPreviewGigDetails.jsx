import { useEffect, useState } from 'react'
import SvgIcon from './SvgIcon.jsx'

export function UserPreviewGigDetails({ owner }) {
    const [user, setUser] = useState(null)

    useEffect(() => {
        if (owner) {
            loadUserDetails()
        }
    }, [owner])

    function loadUserDetails() {
        setUser(owner)
    }

    if (!user) return null

    return (
        <div className="user-preview-gig-details flex">
            <div className="user-info flex align-start">
                <img
                    className="avatar"
                    src={user.avatar}
                    alt={`${user.fullName} avatar`}
                />
                <div className="user-details flex column">
                    <div className="user-header flex align-center">
                        <span className="fullname">{user.fullName}</span>
                        {user.isTopRated && (
                            <span className="top-rated-badge">Top Rated ✦✦✦</span>
                        )}
                    </div>
                    {user.ordersInQueue && (
                        <span className="orders-queue">
                            {user.ordersInQueue} orders in queue
                        </span>
                    )}
                    <div className="user-info-row flex align-center">
                        <span className="user-role">Graphic Designer</span>
                        <div className="rating flex align-center">
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
        </div>
    )
}