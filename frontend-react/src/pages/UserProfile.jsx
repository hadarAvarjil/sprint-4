import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { loadUser } from "../store/actions/user.actions.js"
import { useNavigate } from "react-router-dom"

import { ProfileCard } from "../cmps/ProfileCard.jsx"

export function UserProfile() {
    const loggedInUser = useSelector((storeState) => storeState.userModule.user)
    const [user, setUser] = useState(null)

    const navigate = useNavigate();

    async function loadUserData() {
        try {
            const userData = await loadUser(loggedInUser._id)
            setUser(userData)
        } catch (err) {
            console.error("Error loading user data: ", err)
        }
    }

    useEffect(() => {
        if (!loggedInUser?._id) { 
            navigate("/explore")
            return
        }
        loadUserData()
    }, [loggedInUser, navigate])

    if (!user) {
        return <div>Loading...</div>
    }

    return (
        <section className="UserProfile">
            <div className="user-profile flex">
                <ProfileCard user={user} /> 
            </div>
        </section>
    )
}