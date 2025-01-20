import React from 'react'
import { Routes, Route } from 'react-router'
import { useLocation } from 'react-router-dom';


import { HomePage } from './pages/HomePage'
import { AboutUs, AboutTeam, AboutVision } from './pages/AboutUs'
import { GigIndex } from './pages/GigIndex.jsx'
import { ReviewIndex } from './pages/ReviewIndex.jsx'
import { ChatApp } from './pages/Chat.jsx'
import { AdminIndex } from './pages/AdminIndex.jsx'

import { GigDetails } from './pages/GigDetails.jsx'
import { UserDetails } from './pages/UserDetails'
import { GigPurchasePage } from './pages/GigPurchasePage'

import { HomeAppHeader } from './cmps/HomeAppHeader.jsx'
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { GigEdit } from './pages/GigEdit.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { LoginSignup } from './pages/LoginSignup.jsx'
import { Login } from './pages/Login.jsx'
import { Signup } from './pages/Signup.jsx'
import { AllOrders } from './pages/AllOrders.jsx';
import { ProfilePage } from './pages/ProfilePage.jsx';


export function RootCmp() {
    const location = useLocation();
    return (
        <div className="main-container">
            {/* Conditionally render the AppHeader based on the current route */}
            {location.pathname === '/' ? <HomeAppHeader /> : <AppHeader />}

            {/* <HomeAppHeader/> */}
            {/* <AppHeader /> */}
            <UserMsg />

{/* shinoi2 */}
            <main className="full"> 
                <Routes>
                    <Route path="" element={<HomePage />} />
                    <Route path="about" element={<AboutUs />}>
                        <Route path="team" element={<AboutTeam />} />
                        <Route path="vision" element={<AboutVision />} />
                    </Route>
                    <Route path="gig" element={<GigIndex />} />
                    <Route path="gig/:gigId" element={<GigDetails />} />
                    <Route path="purchase/:gigId" element={<GigPurchasePage />} />
                    <Route path="user/:id" element={<UserDetails />} />
                    <Route path="/gig/edit" element={<GigEdit />} />
                    <Route path="review" element={<ReviewIndex />} />
                    <Route path="chat" element={<ChatApp />} />
                    <Route path="admin" element={<AdminIndex />} />
                    <Route path="orders" element={<AllOrders />} />
                    <Route path="profile" element={<ProfilePage />} />
                    <Route path="login" element={<LoginSignup />}>
                        <Route index element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route>
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


