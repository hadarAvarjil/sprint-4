import { useSelector } from "react-redux"
import { useEffect, useState } from "react"
import { Link } from 'react-router-dom'

import { orderService } from '../services/order'
import { loadOrders } from "../store/actions/order.actions.js"


export function AllOrders() {
  const orders = useSelector((storeState) => storeState.orderModule.orders)

  useEffect(() => {
    async function fetchOrders() {
      try {
        await loadOrders()
      } catch (err) {
        console.error("Error loading orders:", err)
      }
    }
    fetchOrders()
  }, [orders])

  const buyerUrl = 'https://res.cloudinary.com/dtffr5wya/image/upload/v1737198103/Admin_vxiwmi.webp'
  const buyerName = 'Percival Feathers III'

  console.log(orders);


  function calculateDueOn(order) {
    const createdAtDate = new Date(order.createdAt)
    const dueOnDate = new Date(createdAtDate)
    dueOnDate.setDate(dueOnDate.getDate() + order.daysToMake)
    return dueOnDate.toDateString()
  }

  return (
    <div className="orders-table-container">
      <h4>Mangae Orders</h4>
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
          {orders.map((order, index) => {
            const dueOn = calculateDueOn(order)
            const status = "Pending"
            return (
              <tr key={index}>
                <td>
                  <img src={buyerUrl} alt="Buyer" className="buyer-pic" />
                  <span>{buyerName}</span>
                </td>
                <td> <Link to={`/gig/${order.gigId}`}>
                  {order.title}
                </Link>
                </td>
                <td>{dueOn}</td>
                <td>${order.totalPrice}</td>
                <td>{status}</td>
              </tr>
            )
          })}
        </tbody>
      </table>
    </div>
  )
}

