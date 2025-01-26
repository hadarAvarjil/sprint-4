import SvgIcon from './SvgIcon'

{/* clockUser languageUser suitcaeUser personUser locationUser */ }

export function ProfileCard({ user }) {
    return (
        <div className="profile-card">
            <img
                className="profile-avatar"
                src={user?.avatar || "https://via.placeholder.com/150"}
                alt={`${user?.name || "User"}'s avatar`}
            />

            <h2 className="profile-name">{user?.name || "Your Fiverr Name"}</h2>
            <p className="profile-username">@{user?.username || "username"}</p>

            <hr className="divider" />

            <div className="profile-detail">
                <SvgIcon className="icon-user-profile" iconName="locationUser" />
                {user?.from || "Located in Israel"}
            </div>

            <div className="profile-detail">
                <SvgIcon className="icon-user-profile" iconName="personUser" />
                {`Joined in ${user?.joinDate || "January 2025"}`}
            </div>

            <hr className="divider" />

            <div className="profile-detail">
                <SvgIcon className="icon-user-profile" iconName="suitcaeUser" />
                {user?.industry || "Your industry"}
            </div>

            <div className="profile-detail">
                <SvgIcon className="icon-user-profile" iconName="languageUser" />
                {user?.preferredLanguages || "Preferred languages"}
            </div>

            <div className="profile-detail">
                <SvgIcon iconName="clockUser" className="icon-user-profile" />
                {user?.workingHours || "Preferred working hours"}
            </div>
        </div>
    )
}