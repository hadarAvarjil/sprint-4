import { useState } from 'react'
import { showErrorMsg, showSuccessMsg } from '../services/event-bus.service.js'
import { login, signup } from '../store/actions/user.actions.js'
import { AddImg } from './AddImg.jsx'
import { NavLink } from 'react-router-dom'

export function LoginSignup({ isLoginSignUpShow, setIsLoginSignUpShow }) {
    const [credentials, setCredentials] = useState({
        username: '',
        password: '',
        // fullName: '',
        // imgUrl: '',
    })
    const [isSignup, setIsSignup] = useState(true)

    const handleClose = () => {
        setIsLoginSignUpShow(false)
    }

    const handleChange = ({ target: { name, value } }) =>
        setCredentials((prev) => ({ ...prev, [name]: value }))

    const onLogin = (e) => {
        e.preventDefault();
    
        // Validation for required fields
        if (!credentials.username || !credentials.password) {
            showErrorMsg('All fields are required.');
            return;
        }
    
        // Call the appropriate function based on the mode
        isSignup ? _signup(credentials) : _login(credentials);
    }

    const _login = async (credentials) => {
        try {
            const loginData = {
                username: credentials.username,
                password: credentials.password,
            };
            await login(loginData);
            showSuccessMsg('Logged in successfully');
            handleClose();
        } catch (error) {
            showErrorMsg('Oops, try again');
        }
    }
    const _signup = async (credentials) => {
        const text = credentials.fullName[0].toUpperCase()
        const purple = '800080'
        const white = 'ffffff'
        credentials.imgUrl = `https://ui-avatars.com/api/?name=${text}&background=${purple}&color=${white}`
        try {
            await signup(credentials)
            showSuccessMsg('Signed up successfully')
            handleClose()
        } catch (error) {
            showErrorMsg('Oops, try again')
        }
    }

    if (!isLoginSignUpShow) return null

    return (
        <section className="login-signup">
            <div className="sign-div">
                <div className="left-purple-ad">
                    <div className="left-purple-ad-text">
                        <div className="content">
                            <h2>Success starts here</h2>
                            <ul className="flex">
                                <li>✓ Over 700 categories</li>
                                <li>✓ Quality work done faster</li>
                                <li>✓ Access to talent and businesses<br /> across the globe</li>
                            </ul>
                        </div>
                        <AddImg picUrl={'https://res.cloudinary.com/dtpewh2wk/image/upload/v1736802265/standard.0638957_sespel.png'} />
                    </div>
                </div>
                <div className="right-user-sign">
                    <form onSubmit={onLogin}>
                        <section>
                            <h2>{isSignup ? 'Create a new account' : 'Sign in to your account'}</h2>
                            <h5>{isSignup ? 'Already have an account?' : 'Don’t have an account?'}
                            <span className='toggle-sign-join-span'
                                type="button"
                                onClick={() => setIsSignup(!isSignup)}
                            >
                                {isSignup ? 'Sign in' : 'Join here'}
                            </span>
                            </h5>
                            {/* <button
                                type="button"
                                onClick={() => setIsSignup(!isSignup)}
                            >
                                {isSignup ? 'Sign in' : 'Join here'}
                            </button> */}
                        </section>

                        <label htmlFor="username">Username</label>
                        <input
                            id="username"
                            name="username"
                            type="text"
                            value={credentials.username}
                            onChange={handleChange}
                            required
                            autoFocus
                        />

                        <label htmlFor="password">Password</label>
                        <input
                            id="password"
                            name="password"
                            type="password"
                            value={credentials.password}
                            onChange={handleChange}
                            required
                        />

                        {isSignup && (
                            <>
                                <label htmlFor="fullName">Full name</label>
                                <input
                                    id="fullName"
                                    name="fullName"
                                    type="text"
                                    value={credentials.fullName}
                                    onChange={handleChange}
                                    required
                                />
                            </>
                        )}

                        <button className="form-submit-btn" type="submit">Submit</button>
                        {/* <button type="button" onClick={handleClose}>Close</button> */}
                    </form> 
                          
                    <p>By joining, you agree to the Gigster <NavLink to="/terms"><span onClick={handleClose}>Terms of Service</span></NavLink> and to occasionally receive emails from us. Please read our <NavLink to="/privacy"><span onClick={handleClose}>Privacy Policy</span></NavLink> to learn how we use your personal data.</p>

                </div>
            </div>
        </section>
    )
}