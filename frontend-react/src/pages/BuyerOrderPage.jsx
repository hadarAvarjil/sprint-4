import { useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Link } from 'react-router-dom'

import { BuyerOrdersList } from '../cmps/BuyerOrdersList.jsx'

import { loadOrders } from '../store/actions/order.actions.js'



export function BuyerOrderPage() {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const orders = useSelector(storeState => storeState.orderModule.orders)

    
    
    useEffect(() => {
        async function fetchOrders() {
            if (loggedInUser) {
                try {
                    console.log(loggedInUser);
                    await loadOrders({ buyerId: loggedInUser._id })
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
                    <h3>Whoops, you haven't ordered anything yet!</h3>
                    <img src={NO_RESULT_IMG} alt="no results" />
                </div>
            </main>
        )
    }

    return (
        <main className="seller-dashboard-page full flex column">
            <section className="dashboard-container layout-row">
               
                <h3>My Order</h3>
                <BuyerOrdersList
                    loggedInUser={loggedInUser}
                    orders={orders}
                />
            </section>
        </main>
    )
}