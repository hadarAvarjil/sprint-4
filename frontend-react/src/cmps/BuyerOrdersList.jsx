import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

import { userService } from '../services/user.service.js'
import { orderService } from '../services/order.service.js'

export function BuyerOrdersList({ loggedInUser, orders }) {
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
                        const user = await userService.getById(order.sellerId)
                        console.log(order,'uouououou');
                        
                        return {
                            ...order,
                            fullName: user.fullName || 'Unknown Buyer',
                            imgUrl: user?.imgUrl || '/default-avatar.png', // Use default if missing
                        }
                    } catch (err) {
                        console.error(`Error fetching user with ID ${order.sellerId}:`, err);
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

    console.log('what',userOrders);


    return (
        <section className="orders-table-container">
            <table className="orders-table">
                <thead>
                    <tr>
                       
                        <th>Gig</th>
                        <th></th>
                        <th>Due On</th>
                        <th>Total</th>
                        <th>Seller</th>
                        <th>Status</th>
                    </tr>
                </thead>
                <tbody>
                    {userOrders.length > 0 ? (
                        userOrders.map((order, index) => {
                            const dueOn = calculateDueOn(order)
                            // const status = order.status || "Pending" 

                            const getStatusElement = (status) => {
                                if (status === "approved") {
                                  return <div style={{ backgroundColor: "none", color: "#2C7055", padding: "5px", borderRadius: "4px" }}>Approved</div>;
                                } else if (status === "declined") {
                                  return <div style={{ backgroundColor: "none", color: "white", padding: "5px", borderRadius: "4px" }}>Declined</div>;
                                } else {
                                  return <div style={{ backgroundColor: "none", color: "orange", padding: "5px", borderRadius: "4px" }}>Pending</div>;
                                }
                              };
 
                            return (
                                <tr style={{ borderBottom: '1px solid #ddd'}} key={order._id || index}>
                                   <td className='td-gig-img'>
                                        <img src={order.gigFirstImgUrl} alt="gigFirstImgUrl" className="gigFirstImgUrl" />
                                        <Link to={`/gig/${order.gigId}`}>
                                            {/* {order.title || 'Unknown Gig'} */}
                                        </Link>
                                    </td>
                                    <td>
                                        <Link to={`/gig/${order.gigId}`}>
                                            {order.title || 'Unknown Gig'}
                                        </Link>
                                    </td>
                                    <td>{dueOn}</td>
                                    <td>${order.price?.toFixed(2) || '0.00'}</td>
                                    <td className='buyer-orders-seller-td'>
                                        <img src={order.imgUrl} alt="Seller" className="seller" />
                                        <span>{order.fullName}</span>
                                    </td>
                                    <td>{getStatusElement(order.status || "pending")}</td>

                                    {/* <td>{status}</td> */}
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