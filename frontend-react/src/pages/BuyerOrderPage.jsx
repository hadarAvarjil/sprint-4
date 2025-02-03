import { useSelector } from 'react-redux'
import { useEffect, useState } from 'react'

import { BuyerOrdersList } from '../cmps/BuyerOrdersList.jsx'
import { loadOrders } from '../store/actions/order.actions.js'



export function BuyerOrderPage() {
    const [isLoading, setIsLoading] = useState(true)
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const orders = useSelector(storeState => storeState.orderModule.orders)
    const [userOrders, setUserOrders] = useState([])


    useEffect(() => {
        async function fetchOrders() {
            if (loggedInUser) {
                try {
                    setIsLoading(true)
                    const fetchedOrders = await loadOrders({ buyerId: loggedInUser._id })
                    setUserOrders(fetchedOrders || []);
                } catch (err) {
                    console.error("Error loading orders:", err)
                } finally {
                    setIsLoading(false)
                }
            }
        }
        fetchOrders()
    }, [loggedInUser,])

    const NO_RESULT_IMG = 'https://res.cloudinary.com/dtffr5wya/image/upload/v1738089073/no-results_i0l51z.png'
    console.log(orders);

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
                <p className="loading-text">Loading your orders...</p>
            </div>
        )
    }

    if (orders.length === 0) {
        return (
            <main className="seller-dashboard-page full flex column">
                <div className="no-results">
                    <h3>Whoops, you haven't ordered anything yet!</h3>
                    <img src={NO_RESULT_IMG} alt="no results" />
                </div>
            </main>
        )
    }

    return (
        <main className="seller-dashboard-page full flex column">
            <section className="dashboard-container layout-row">
                <div className='buyer-my-orders-table'>
                    <BuyerOrdersList
                        loggedInUser={loggedInUser}
                        orders={orders}
                    />
                </div>
            </section>
        </main>
    )
}