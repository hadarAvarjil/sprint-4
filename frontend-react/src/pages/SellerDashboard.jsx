import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { SellerOrdersList } from '../cmps/SellerOrdersList.jsx'

import { loadOrders } from '../store/actions/order.actions.js'

export function SellerDashboard() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const orders = useSelector(storeState => storeState.orderModule.orders)

    useEffect(() => {
        async function fetchOrders() {
            if (loggedInUser) {
                try {
                    await loadOrders({ sellerId: loggedInUser._id })
                } catch (err) {
                    console.error("Error loading orders:", err)
                }
            }
        }
        fetchOrders()
    }, [loggedInUser])

    const NO_RESULT_IMG = 'https://res.cloudinary.com/dtffr5wya/image/upload/v1738089073/no-results_i0l51z.png'

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
        <main className="seller-dashboard-page full flex column">
            <section className="dashboard-container layout-row">
               
                <h3>Manage Your Orders</h3>
                <SellerOrdersList
                    loggedInUser={loggedInUser}
                    orders={orders}
                />
            </section>
        </main>
    )
}