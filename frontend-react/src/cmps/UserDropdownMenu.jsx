import { Link, useNavigate } from 'react-router-dom'
import { logout } from '../store/actions/user.actions.js'
import { showErrorMsg } from '../services/event-bus.service.js'



export function UserDropdownMenu({ loggedInUser, onClose }) {
    const navigate = useNavigate()

    async function onLogout() {
        try {
            navigate('/')
            await logout()
        } catch (err) {
            showErrorMsg(
                {
                    title: 'FAILED TO LOGOUT',
                    body: `Failed to Logout now...`,
                },
                {
                    userMsgLeft: '55%',
                    messageAreaPadding: '2em 1.5em 2em 8em',
                    msgStatusTranslateX: '-12em',
                }
            )
        }
    }

    return (
        <div className="user-dropdown-menu" onClick={onClose}>
            <div className='dropdown-triangle'></div>
            <Link to={`/profile/${loggedInUser._id}`}>Profile</Link>
            <Link to="/dashboard">Dashboard</Link>
            <Link to="/orders">Orders</Link>
            <Link to="/">Become a Seller</Link>
            <Link to="/terms">Terms Of Service</Link>
            <Link to="/privacy">Privacy Policy</Link>
            <button onClick={onLogout}>Logout</button>
        </div>
    )
}