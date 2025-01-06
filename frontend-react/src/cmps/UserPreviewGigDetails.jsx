import { useEffect, useState } from 'react'

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
        <div className="user-preview">
            <img
                className="avatar"
                src={user.imgUrl}
                alt={`${user.fullName} avatar`}
            />
            <div className="user-info">
                <span className="fullname">{user.fullName}</span>
                <span className="user-level" title="User Level">
                    {user.level}
                </span>
                {user.ordersInQueue && (
                    <span className="orders-queue">
                        {user.ordersInQueue} orders in queue
                    </span>
                )}
                <div className="rating">
                    <span className="stars">
                        {"★".repeat(Math.floor(user.rating))}{" "}
                        {"☆".repeat(5 - Math.floor(user.rating))}
                    </span>
                    <span className="rating-score">{user.rating.toFixed(1)}</span>
                    <span className="rating-count">
                        ({user.ratingCount.toLocaleString()} reviews)
                    </span>
                </div>
            </div>
        </div>
    );
}