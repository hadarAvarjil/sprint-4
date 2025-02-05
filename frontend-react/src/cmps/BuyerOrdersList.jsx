import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { userService } from '../services/user'
import { orderService } from '../services/order'

export function BuyerOrdersList({ loggedInUser, orders }) {
    const [userOrders, setUserOrders] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (orders?.length) {
            loadOrderData()
        } else {
            setIsLoading(false)
        }
    }, [orders])

    async function loadOrderData() {
        try {
            setIsLoading(true);
            const ordersData = await Promise.all(
                orders.map(async (order) => {
                    try {
                        const user = await userService.getById(order.sellerId)
                        console.log(order, 'uouououou');

                        return {
                            ...order,
                            fullName: user.fullName || 'Unknown Buyer',
                            imgUrl: user?.imgUrl || '/default-avatar.png',
                        }
                    } catch (err) {
                        console.error(`Error fetching user with ID ${order.sellerId}:`, err);
                        return {
                            ...order,
                            fullName: 'Unknown Buyer',
                            imgUrl: '/default-avatar.png',
                        }

                    } finally {
                        setIsLoading(false)
                    }
                })
            )

            setUserOrders(ordersData);
        } catch (err) {
            console.error('Unexpected error while loading user orders:', err)
        }
    }

    if (isLoading) {
        return (
            <div className="loading-container">
                <div className="loader"></div>
                <p className="loading-text">Loading your orders...</p>
            </div>
        )
    }

    function calculateDueOn(order) {
        if (!order?.createdAt || !order?.daysToMake) return 'N/A'

        const createdAtDate = new Date(order.createdAt)
        const dueOnDate = new Date(createdAtDate)
        dueOnDate.setDate(dueOnDate.getDate() + order.daysToMake)
        return dueOnDate.toDateString()
    }

    return (
        <>
            <h3>My Orders</h3>
            <section className="orders-table-container">
                <table className="orders-table">
                    <thead>
                        <tr>
                            <th>Gig</th>
                            <th>Title</th>
                            <th>Due On</th>
                            <th>Total</th>
                            <th>Seller</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {userOrders?.map((order, index) => {
                            const dueOn = calculateDueOn(order);

                            const statusColors = {
                                "Pending": "#F1C40F",
                                "In Progress": "#3498DB",
                                "Completed": "#2ECC71",
                                "Delivered": "#9B59B6",
                                "Rejected": "#E74C3C",
                            }

                            const getStatusElement = (status) => {
                                const color = statusColors[status] || "#F1C40F"
                                return (
                                    <div
                                        style={{
                                            backgroundColor: color,
                                            color: "#fff",
                                            padding: "5px 10px",
                                            borderRadius: "4px",
                                            fontWeight: "bold",
                                            textAlign: "center",
                                        }}
                                    >
                                        {status}
                                    </div>
                                );
                            };

                            return (
                                <tr style={{ borderBottom: "1px solid #ddd" }} key={order._id || index}>
                                    <td className="td-gig-img">
                                        <img src={order.gigFirstImgUrl} alt="Gig" className="gigFirstImgUrl" />
                                        <Link to={`/gig/${order.gigId}`}></Link>
                                    </td>
                                    <td style={{textAlign:"start"}}>
                                        <Link to={`/gig/${order.gigId}`}>{order.title || "Unknown Gig"}</Link>
                                    </td>
                                    <td className='due-on'>{dueOn}</td>
                                    <td className='total'>${order.price?.toFixed(2) || "0.00"}</td>
                                    <td className="buyer-orders-seller-td">
                                        <img src={order.imgUrl} alt="Seller" className="seller" />
                                        <span>{order.fullName}</span>
                                    </td>
                                    <td className='order-state'>{getStatusElement(order.orderState || "Pending")}</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </section>
        </>
    )
}