import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { userService } from '../services/user'
import { saveOrder } from '../store/actions/order.actions.js'

export function SellerOrdersList({ loggedInUser, orders = [] }) {
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
                            imgUrl: user?.imgUrl || '/default-avatar.png',
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

    async function changeOrderState(orderId, newState) {
        try {
            const updatedOrders = userOrders.map(order =>
                order._id === orderId ? { ...order, orderState: newState } : order
            )
            setUserOrders(updatedOrders)
            const updatedOrder = updatedOrders.find(order => order._id === orderId)
            await saveOrder(updatedOrder)
        } catch (err) {
            console.error(`Error updating order ${orderId}:`, err)
        }
    }

    const statusColors = {
        "Pending": "#F1C40F",     
        "In Progress": "#3498DB",  
        "Completed": "#2ECC71",   
        "Delivered": "#9B59B6",    
        "Rejected": "#E74C3C"      
    }

    const allowedTransitions = {
        "Pending": ["In Progress", "Rejected"],
        "In Progress": ["Completed", "Rejected"],
        "Completed": ["Delivered"],
        "Delivered": [], 
        "Rejected": [] 
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
                    {userOrders?.length > 0 ? ( 
                        userOrders.map((order) => {
                            const dueOn = calculateDueOn(order)
                            return (
                                <tr key={order._id}>
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
                                    <td>
                                        <select
                                            className="order-status"
                                            style={{ backgroundColor: statusColors[order.orderState] || '#ccc' }}
                                            value={order.orderState}
                                            onChange={(e) => changeOrderState(order._id, e.target.value)}
                                            disabled={!allowedTransitions[order.orderState]?.length} // ✅ Safe check
                                        >
                                            <option value={order.orderState}>{order.orderState}</option>
                                            {(allowedTransitions[order.orderState] || []).map(status => ( // ✅ Ensures .map() always runs on an array
                                                <option key={status} value={status}>{status}</option>
                                            ))}
                                        </select>
                                    </td>
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