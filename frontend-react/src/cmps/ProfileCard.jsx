import SvgIcon from './SvgIcon'
import { AddImg } from './AddImg' 

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

            <div className="profile-detail" style={{color:'black'}}>
                {/* <SvgIcon className="icon-user-profile" iconName="locationUser" /> */}
                <AddImg picUrl="https://res.cloudinary.com/dtpewh2wk/image/upload/v1738001580/svg_xml_base64_PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxMyAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJ2YXIoLS1hOHJlMjUxaSkiPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2R_z83hoh.svg" className="icon-user-profile" />
                {user?.from || "Located in Israel"}
            </div>

            <div className="profile-detail" style={{color:'black'}}>
                {/* <SvgIcon className="icon-user-profile" iconName="personUser" /> */}
                <AddImg picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738001580/svg_xml_base64_PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNCAxNCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJ2YXIoLS1hOHJlMjUxaSkiPjxwYXRoIGZpbGwtcnVsZT0iZXZlbm9kZCIgY2xpcC1ydWxlPSJldmVub2R_eed29c.svg' className="icon-user-profile" />
                {`Joined in ${user?.joinDate || "January 2025"}`}
            </div>

            <hr className="divider" />

            <div className="profile-detail">
                {/* <SvgIcon className="icon-user-profile" iconName="suitcaeUser" /> */}
                <AddImg picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738002447/briefcase-svgrepo-com_1_b2zjna.svg' className="icon-user-profile" />
                {user?.industry || "Your industry"}
            </div>
            <hr className="divider" />

            <div className="profile-detail" >
                <AddImg picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738001580/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyMCIgaGVpZ2h0PSIyMCIgdmlld0JveD0iMCAwIDIwIDIwIiBmaWxsPSJub25lIj48ZyBjbGlwLXBhdGg9InVybCgjY2xpcF9sYW5ndWFnZXNfaWNvbikiPjxwYXRoIGQ9Ik0xMC4_dvy6ql.svg' className="icon-user-profile" />
                { `Preferred languages ${user?.languages || "Hebrew"}`}
            </div>
            <hr className="divider" />

            <div className="profile-detail">
                {/* <SvgIcon className="icon-user-profile" iconName="clockUser"  /> */}
                <AddImg picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738001580/svg_xml_base64_PHN2ZyB3aWR0aD0iMTYiIGhlaWdodD0iMTYiIHZpZXdCb3g9IjAgMCAxNiAxNiIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIiBmaWxsPSJ2YXIoLS1hOHJlMjUxaSkiPjxwYXRoIGQ9Ik04IC4yNUE3Ljc0OSA3Ljc0OSAwIDAgMCAuMjUgOCA3Ljc_owvldn.svg' className="icon-user-profile"  />
                { `Preferred working hours ${user?.workingHours  || "08:00 - 17:00"}`}
            </div>
        </div>
    )
}