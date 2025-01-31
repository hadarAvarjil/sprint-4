import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { userService } from '../services/user'
import { orderService } from '../services/order'


export function SellerOrdersList({ loggedInUser, orders }) {
    const [userOrders, setUserOrders] = useState([])

    useEffect(() => {
        if (orders?.length) {
            loadOrderData()
        }
    }, [orders])

    async function loadOrderData() {
        try {
            const ordersData = await Promise.all(
                orders.map(async (order) => {
                    try {
                        const user = await userService.getById(order.buyerId)
                        return {
                            ...order,
                            fullName: user?.fullName || 'Unknown Buyer',
                            imgUrl: user?.avatar || '/default-avatar.png', // Use default if missing
                        };
                    } catch (err) {
                        console.error(`Error fetching user with ID ${order.buyerId}:`, err);
                        return {
                            ...order,
                            fullName: 'Unknown Buyer',
                            imgUrl: '/default-avatar.png',
                        }
                    }
                })
            )

            setUserOrders(ordersData);
        } catch (err) {
            console.error('Unexpected error while loading user orders:', err)
        }
    }

    function calculateDueOn(order) {
        if (!order?.createdAt || !order?.daysToMake) return 'N/A'

        const createdAtDate = new Date(order.createdAt)
        const dueOnDate = new Date(createdAtDate)
        dueOnDate.setDate(dueOnDate.getDate() + order.daysToMake)
        return dueOnDate.toDateString()
    }

    return (
        <section className="orders-table-container">
            <h4>Manage Orders</h4>
            <table className="orders-table">
                <thead>
                    <tr>
                        <th>Buyer</th>
                        <th>Gig</th>
                        <th>Due On</th>
                        <th>Total</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {userOrders.length > 0 ? (
                        userOrders.map((order, index) => {
                            const dueOn = calculateDueOn(order)
                            const status = order.status || "Pending" // Use dynamic status

                            return (
                                <tr key={order._id || index}>
                                    <td>
                                        <img src={order.imgUrl} alt="Buyer" className="buyer-pic" />
                                        <span>{order.fullName}</span>
                                    </td>
                                    <td>
                                        <Link to={`/gig/${order.gigId}`}>
                                            {order.title || 'Unknown Gig'}
                                        </Link>
                                    </td>
                                    <td>{dueOn}</td>
                                    <td>${order.price?.toFixed(2) || '0.00'}</td>
                                    <td>{status}</td>
                                </tr>
                            )
                        })
                    ) : (
                        <tr>
                            <td colSpan="5">No orders available</td>
                        </tr>
                    )}
                </tbody>
            </table>
        </section>
    )
}