// import { useState, useEffect } from 'react'
// import { Link } from 'react-router-dom'
// import { userService } from '../services/user'
// import { orderService } from '../services/order'
// import { AddImg } from './AddImg'
// import { loadOrders } from '../store/actions/order.actions.js'
// import { useSelector } from 'react-redux'
// import { NavLink } from 'react-router-dom'


// export function TestDrop({ isHovered, loggedInUser }) {

//       const orders = useSelector(storeState => storeState.orderModule.orders)
//       const [userOrders, setUserOrders] = useState([])


//       useEffect(() => {
//         if (orders?.length) {
//             loadOrderData()
//         }
//     }, [orders])

//     async function loadOrderData() {
//         try {
//             const ordersData = await Promise.all(
//                 orders.map(async (order) => {
//                     try {
//                         const user = await userService.getById(order.sellerId)
//                         console.log(order,'uouououou');
                        
//                         return {
//                             ...order,
//                             fullName: user?.fullName || 'Unknown Buyer',
//                             imgUrl: user?.avatar || '/default-avatar.png', // Use default if missing
//                         }
//                     } catch (err) {
//                         console.error(`Error fetching user with ID ${order.sellerId}:`, err);
//                         return {
//                             ...order,
//                             fullName: 'Unknown Buyer',
//                             imgUrl: '/default-avatar.png',
//                         }
//                     }
//                 })
//             )

//             setUserOrders(ordersData);
//         } catch (err) {
//             console.error('Unexpected error while loading user orders:', err)
//         }
//     }
      
//       useEffect(() => {
//           async function fetchOrders() {
//               if (loggedInUser) {
//                   try {
//                       console.log(loggedInUser);
//                       await loadOrders({ buyerId: loggedInUser._id })
//                   } catch (err) {
//                       console.error("Error loading orders:", err)
//                   }
//               }
//           }
//           fetchOrders()
//       }, [loggedInUser])


// console.log('yyyyyyyyyyyyyyyyy', orders);

//      if (orders.length=== 0)return (
//          <div className="user-orders-dropdown-menu" style={{
//              display: isHovered ? "none" : "block", }} >
//            <div className="dropdown-triangle"></div>
//            <div className="no-orders-dropdown-container">
             
//              <div className="svg-wrap"> 
//              <AddImg picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738343751/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NSA0MyI_PGcgaWQ9IjAySF9YWFNfT3ZlcnZpZXdfZW1wdHlfc3RhdGVfQWRtaW4iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWx_ryte6e.svg'></AddImg>
//              </div>
     
//              <h3> No Orders Yet</h3>
//              <p>Use the search box to find the digital <br/> services you need.</p>
//            </div>
//          </div>
//        );
 
//   return (
//     <div className="user-orders-dropdown-menu" style={{
//       display: isHovered ? "none" : "block", }} >
//     <div className="dropdown-triangle"></div> 
//     <div className="user-orders-dropdown-menu" >

//    ( userOrders.map((order) => {

//           const getStatusElement = (status) => {
//               if (status === "approved") {
//                 return <div style={{ backgroundColor: "green", color: "white", padding: "5px", borderRadius: "4px" }}>Approved</div>;
//               } else if (status === "declined") {
//                 return <div style={{ backgroundColor: "red", color: "white", padding: "5px", borderRadius: "4px" }}>Declined</div>;
//               } else {
//                 return <div style={{ backgroundColor: "yellow", color: "black", padding: "5px", borderRadius: "4px" }}>Pending</div>;
//               }
//             // };

//           return (
//             <div className="user-orders-dropdown-menu" >

//             <div className="orders-wrap"> 
//             <div className="order-img"> <img src={order.gigUrl} alt="Seller" className="seller" />  </div>
  
//             <div className="order-details">
//               <h3 style={{color:'#404145', backgroundColor:"yellow"}}> {order.title || 'Unknown Gig Title'}</h3>

//               <div className="order-details-info">

//                 <p style={{color:'#6b7280'}}> {order.fullName}</p>
//                 <div style={{color:'green'}}> {getStatusElement('order.status' || "pending")}</div>

//               </div>
//             </div>
//           </div>
//     )
    
//     )
    
//     </div> 
//     </div> 
// )












// // import { useState, useEffect } from 'react'
// // import { userService } from '../services/user'
// // import { orderService } from '../services/order'
// // import { AddImg } from './AddImg'
// // import { Link, NavLink} from "react-router-dom";
 

// // // export function UserOrdersDropdownMenu({ loggedInUser, orders,isHovered  }) {
// // export function UserOrdersDropdownMenu({  orders,isHovered  }) {
// //     const [userOrders, setUserOrders] = useState([])

// //     useEffect(() => {
// //         if (orders?.length) {
// //             loadOrderData()
// //         }
// //     }, [orders])

// //     async function loadOrderData() {
// //         try {
// //             const ordersData = await Promise.all(
// //                 orders.map(async (order) => {
// //                     try {
// //                         const user = await userService.getById(order.sellerId)
                        
// //                         return {
// //                             ...order,
// //                             fullName: user?.fullName || 'Unknown Buyer',
// //                             imgUrl: user?.avatar || '/default-avatar.png', // Use default if missing
// //                         }
// //                     } catch (err) {
// //                         console.error(`Error fetching user with ID ${order.sellerId}:`, err);
// //                         return {
// //                             ...order,
// //                             fullName: 'Unknown Buyer',
// //                             imgUrl: '/default-avatar.png',
// //                         }
// //                     }
// //                 })
// //             )

// //             setUserOrders(ordersData);
// //         } catch (err) {
// //             console.error('Unexpected error while loading user orders:', err)
// //         }
// //     }

// //     function calculateDueOn(order) {
// //         if (!order?.createdAt || !order?.daysToMake) return 'N/A'

// //         const createdAtDate = new Date(order.createdAt)
// //         const dueOnDate = new Date(createdAtDate)
// //         dueOnDate.setDate(dueOnDate.getDate() + order.daysToMake)
// //         return dueOnDate.toDateString()
// //     }

// //     console.log('what',userOrders);

 
// //     if (orders)  return (
// //         <div className="user-dropdown-menu" style={{
// //             display: isHovered ? "block" : "none",
// //             width: "200px",
// //             height: "150px",
// //             border: "1px solid black",
// //             padding: "10px",
// //           }} >
// //           <div className="dropdown-triangle"></div>
// //           <div className="no-orders-dropdown-container">
            
// //             <div className="svg-wrap"> 
// //             <AddImg picUrl='https://res.cloudinary.com/dtpewh2wk/image/upload/v1738343751/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NSA0MyI_PGcgaWQ9IjAySF9YWFNfT3ZlcnZpZXdfZW1wdHlfc3RhdGVfQWRtaW4iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWx_ryte6e.svg'></AddImg>
// //             </div>
    
// //             <h3> No Orders Yet</h3>
// //             <p>Use the search box to find the digital <br/> services you need.</p>
// //           </div>
// //         </div>
// //       );

// //  return (

// //     <div className="user-orders-dropdown-menu" >
// //     <div className='dropdown-triangle'></div>
// //     <div className='orders-dropdown-container'>
// //     blaaao
    
// //     </div>
// //         </div>


// //     )
// // }
