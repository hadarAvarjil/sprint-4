//  async function createOrder() {
//         const newOrder = orderService.createOrder(
//             loggedInUser._id,
//             gig.ownerId,
//             gig.title,
//             gig.daysToMake,
//             gig._id,
//             gig.price
//         )

import React, { useState, useEffect } from "react";

export function AllOrders() {
  const [allGigsterOrders, setAllGigsterOrders] = useState([]);

  useEffect(() => {
    // Retrieve the orders from local storage
    const storedOrders = JSON.parse(localStorage.getItem("order")) || [];
    setAllGigsterOrders(storedOrders);
  }, []);

  return (
    <div className="orders-table-container">
      <table className="orders-table">
        <thead>
          <tr>
            <th>Buyer</th>
            <th>Buyer Name</th>
            <th>Name of Gig</th>
            <th>Due On</th>
            <th>Delivered At</th>
            <th>Total</th>
            <th>Status</th>
            <th>Gig Owner</th>
          </tr>
        </thead>
        <tbody>
          {allGigsterOrders.map((order, index) => {
            const [
              buyerId,
              ownerId,
              gigTitle,
              daysToMake,
              gigId,
              price,
              deliveredAt = "Not Delivered", // Optional field
              status = "Pending" // Optional field
            ] = order;

            const dueDate = new Date(Date.now() + daysToMake * 24 * 60 * 60 * 1000).toLocaleDateString();

            return (
              <tr key={index}>
                <td>
                  <img
                    // src={`pic of ${buyerId}`}
                    alt="Buyer"
                    className="buyer-pic"
                  />
                </td>
                <td>{buyerId}</td>
                <td>{gigTitle}</td>
                <td>{dueDate}</td>
                <td>{deliveredAt}</td>
                <td>${price}</td>
                <td>{status}</td>
                <td>{ownerId}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
