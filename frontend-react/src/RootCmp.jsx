import React from 'react'
import { Routes, Route } from 'react-router'
import { useLocation } from 'react-router-dom';


import { HomePage } from './pages/HomePage'
import { AboutUs, AboutTeam, AboutVision } from './pages/AboutUs'
import { GigIndex } from './pages/GigIndex.jsx'
// import { ReviewIndex } from './pages/ReviewIndex.jsx'
// import { ChatApp } from './pages/Chat.jsx'
import { AdminIndex } from './pages/AdminIndex.jsx'

import { GigDetails } from './pages/GigDetails.jsx'
import { UserDetails } from './pages/UserDetails'
import { GigPurchasePage } from './pages/GigPurchasePage'

import { HomeAppHeader } from './cmps/HomeAppHeader.jsx'
import { AppHeader } from './cmps/AppHeader'
import { AppFooter } from './cmps/AppFooter'
import { GigEdit } from './pages/GigEdit.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'

import { BuyerOrderPage } from './pages/BuyerOrderPage.jsx';
import { UserProfile } from './pages/UserProfile.jsx';
import {TermsPage} from './pages/TermsPage.jsx';
import { PrivacyPage } from './pages/PrivacyPage.jsx';
import { SellerDashboard } from './pages/SellerDashboard.jsx';
import { MyLists } from './pages/MyLists.jsx'
 
export function RootCmp() {
    const location = useLocation();
    return (
        <div className="main-container">
            {location.pathname === '/' ? <HomeAppHeader /> : <AppHeader />}

            <UserMsg />
  
            <main className=' full grid-main-container'> 
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
                    <Route path="/gig/edit/:id?" element={<GigEdit />} />
                    <Route path="admin" element={<AdminIndex />} />
                    <Route path="/orders" element={<BuyerOrderPage />} />
                    <Route path="/my-lists" element={<MyLists />} />
                    <Route path="/profile/:id" element={<UserProfile />} />
                    <Route path="/dashboard" element={<SellerDashboard />} />
                    <Route path="terms"element={<TermsPage/>} />
                    <Route path="privacy"element={<PrivacyPage/>}/>
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}


