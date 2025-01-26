export function ProfileCard({ user }) {
    return (
        <div className="profile-card">
        
            <img
              className="profile-avatar"
              src={user?.avatar}
              alt={`${user.fullName}'s avatar`}
            />
  

     
            <h2 className="profile-name">
                {user?.name || "Your Fiverr Name"}
            </h2>
            <p className="profile-username">
                @{user?.username || "username"}
            </p>

      
            <div className="profile-detail">
                <span className="icon location-icon">📍</span>
                {user?.from || "Located in Israel"}
            </div>

   
            <div className="profile-detail">
                <span className="icon join-date-icon">🗓️</span>
                {`Joined in ${user?.joinDate || "January 2025"}`}
            </div>

            <ul className="profile-additional">
                {user?.additionalInfo?.length > 0
                    ? user.additionalInfo.map((info, idx) => (
                          <li key={idx}>
                              <span>📌</span> {info}
                          </li>
                      ))
                    : [
                          "Your industry",
                          "Preferred languages",
                          "Preferred working hours",
                      ].map((item, idx) => (
                          <li key={idx}>
                              <span></span> {item}
                          </li>
                      ))}
            </ul>
        </div>
    )
}