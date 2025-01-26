

export function ProfileCard() {

    const ProfileCard = () => {
        return (
            <div className="profile-card">
                {/* Avatar */}
                <div className="profile-avatar">
                    H
                </div>
                {/* Name */}
                <h2 className="profile-name">Your Fiverr Name</h2>
                <p className="profile-username">@hadaravarjll</p>
                {/* Location */}
                <div className="profile-detail">
                    <span className="icon location-icon"></span>
                    Located in Israel
                </div>
                {/* Join Date */}
                <div className="profile-detail">
                    <span className="icon join-date-icon"></span>
                    Joined in January 2025
                </div>
                {/* Additional Information */}
                <ul className="profile-additional">
                    <li>Your industry</li>
                    <li>Preferred languages</li>
                    <li>Preferred working hours</li>
                </ul>
            </div>
        )
    }
}
