import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { login, signup } from '../store/actions/user.actions.js'
import { AddImg } from './AddImg.jsx'

export function LoginSignup({ isJoinShow, setIsJoinShow }) {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        fullName: '',
        imgUrl: '',
    })

    const [NewUsername, setNewUsername] = useState("");
    const [NewFullname, setNewFullname] = useState("");
    const [NewPassword, setNewPassword] = useState("");
    
    const handleClose = () => {
        setIsJoinShow(false)
    }

    if (!isJoinShow) return null

    function onLogin(credentials) {
        isSignup ? _signup(credentials) : _login(credentials)
    }

    function _login(credentials) {
        try {
            login(credentials)
            showSuccessMsg('Logged in successfully')
        } catch (error) {
            showErrorMsg('Oops try again')
        }
    }

    function _signup(credentials) {
        try {
            signup(credentials)
            showSuccessMsg('Logged in successfully')
        } catch (error) {
            showErrorMsg('Oops try again')
        }
    }

    return (
        <section className="login-signup">
            <>
                <div className="sign-div">
                    <div className="left-purple-ad">

                        <div className="left-purple-ad-text">
                            <div className="content">
                                <h2>Success starts here</h2>
                                <ul className="flex ">
                                    <li>
                                        ✓  Over 700 categories
                                    </li>

                                    <li>
                                        ✓  Quality work done faster
                                    </li>

                                    <li>
                                        ✓  Access to talent and businesses<br /> across the globe
                                    </li>
                                </ul>
                            </div>
                            <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736802265/standard.0638957_sespel.png'} />
                        </div>
                    </div>
                    <div className="right-user-sign">
                        <h2>Sign In</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault()
                                handleSubmit()
                            }}
                        >
                            <div>
                                <section>
                                    <h4>Create a new account</h4>
                                    <p>Already have an account? <span>Sign in</span></p>
                                </section>

                                <label htmlFor="username">Full name</label>
                                <input
                                    id="username"
                                    type="text"
                                    value={NewFullname}
                                    // onChange={(e) => setNewFullname(e.target.value)}
                                    required
                                />
                                <label htmlFor="username">Username</label>
                                <input
                                    id="username"
                                    type="text"
                                    value={NewUsername}
                                    // onChange={(e) => setNewUsername(e.target.value)}
                                    required
                                />
                            </div>
                            <div>
                                <label htmlFor="password">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    value={NewPassword}
                                    // onChange={(e) => setNewPassword(e.target.value)}
                                    required
                                />
                            </div>
                            <button type="submit">Submit</button>
                            <button
                                type="button"
                                onClick={handleClose}
                            >
                                Close
                            </button>
                        </form>
                    </div>
                </div>
            </>
        </section>
    )
}




