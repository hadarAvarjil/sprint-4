import React, { useState, useEffect } from "react";

export function AllOrders() {
  const [gigs, setGigs] = useState([]);

  useEffect(() => {
    // Your gigs array (this should be the data you want to display)
    const gigsData = [
      {
        _id: "g101",
        title: "I will create logos for your company",
        price: 45.99,
        daysToMake: 3,
        ownerId: "u101",
      },
      {
        _id: "g102",
        title: "I will design stunning website templates",
        price: 59.99,
        daysToMake: 7,
        ownerId: "g110",
      },
      {
        _id: "g111",
        title: "I will provide hilarious video game 'assistance",
        price: 59.99,
        daysToMake: 1,
        ownerId: "u102",
      },
      {
        _id: "g103",
        title: "I will write engaging blog articles for your niche",
        price: 29.99,
        daysToMake: 3,
        ownerId: "u103",
      },
      {
        _id: "g104",
        title: "I will compose a personalized song for your special occasion",
        price: 69.99,
        daysToMake: 7,
        ownerId: "u104",
      },
    ];
    setGigs(gigsData);
  }, []);

  return (
    <div className="orders-table-container">
      <table className="orders-table">
        <thead>
          <tr>
            <th>Buyer pic</th>
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
          {gigs.map((gig, index) => {
            // Simulate buyer and status for each gig
            const buyerId = `Buyer${index + 1}`; // Example: Buyer1, Buyer2...
            const deliveredAt = "Not Delivered"; // Placeholder, you can update it with actual data
            const status = "Pending"; // Placeholder, you can update it with actual status
            const dueDate = new Date(Date.now() + gig.daysToMake * 24 * 60 * 60 * 1000).toLocaleDateString();

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
                <td>{gig.title}</td>
                <td>{dueDate}</td>
                <td>{deliveredAt}</td>
                <td>${gig.price}</td>
                <td>{status}</td>
                <td>{gig.ownerId}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}





// import React, { useState, useEffect } from "react";

// export function AllOrders() {
//   const [allGigsterOrders, setAllGigsterOrders] = useState([]);

//   useEffect(() => {
//     // Retrieve the orders from local storage
//     const storedOrders = JSON.parse(localStorage.getItem("order")) || [];
//     setAllGigsterOrders(storedOrders);
//   }, []);

//   return (
//     <div className="orders-table-container">
//       <table className="orders-table">
//         <thead>
//           <tr>
//             <th>Buyer</th>
//             <th>Buyer Name</th>
//             <th>Name of Gig</th>
//             <th>Due On</th>
//             <th>Delivered At</th>
//             <th>Total</th>
//             <th>Status</th>
//             <th>Gig Owner</th>
//           </tr>
//         </thead>
//         <tbody>
//           {allGigsterOrders.map((order, index) => {
//             const [
//               buyerId,
//               ownerId,
//               gigTitle,
//               daysToMake,
//               gigId,
//               price,
//               deliveredAt = "Not Delivered", // Optional field
//               status = "Pending" // Optional field
//             ] = order;

//             const dueDate = new Date(Date.now() + daysToMake * 24 * 60 * 60 * 1000).toLocaleDateString();

//             return (
//               <tr key={index}>
//                 <td>
//                   <img
//                     // src={`pic of ${buyerId}`}
//                     alt="Buyer"
//                     className="buyer-pic"
//                   />
//                 </td>
//                 <td>{buyerId}</td>
//                 <td>{gigTitle}</td>
//                 <td>{dueDate}</td>
//                 <td>{deliveredAt}</td>
//                 <td>${price}</td>
//                 <td>{status}</td>
//                 <td>{ownerId}</td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// }
