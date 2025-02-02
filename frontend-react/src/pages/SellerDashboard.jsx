import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

import { SellerOrdersList } from '../cmps/SellerOrdersList.jsx'
import { SellerFinanceSumup } from '../cmps/SellerFinanceSumup.jsx'

import { loadOrders } from '../store/actions/order.actions.js'

export function SellerDashboard() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const orders = useSelector(storeState => storeState.orderModule.orders)
    const [isLoading, setIsLoading] = useState(true) // Add loading state

    useEffect(() => {
        async function fetchOrders() {
            if (loggedInUser) {
                try {
                    setIsLoading(true) // Start loading
                    await loadOrders({ sellerId: loggedInUser._id })
                } catch (err) {
                    console.error("Error loading orders:", err)
                } finally {
                    setIsLoading(false) // Stop loading
                }
            } else {
                setIsLoading(false) // Stop loading if no user is logged in
            }
        }
        fetchOrders()
    }, [loggedInUser])

    const NO_RESULT_IMG = 'https://res.cloudinary.com/dtffr5wya/image/upload/v1738089073/no-results_i0l51z.png'

    if (isLoading) {
        // Loader while orders are being fetched
        return (
            <div className="loader-container">
                <div className="loader"></div>
                <p className="loading-text">Loading your dashboard...</p>
            </div>
        )
    }

    if (orders.length === 0) {
        return (
            <main className="seller-dashboard-page full flex column">
                <div className="no-results">
                    <h3>Whoops, looks like you don't have any orders yet.</h3>
                    <img src={NO_RESULT_IMG} alt="no results" />
                </div>
            </main>
        )
    }

    return (
        <main className="seller-dashboard-page full">
            <section className="dashboard-container flex">
                <SellerFinanceSumup
                    loggedInUser={loggedInUser}
                    orders={orders}
                />

                <SellerOrdersList
                    loggedInUser={loggedInUser}
                    orders={orders}
                />
            </section>
        </main>
    )
}