import { useState, useEffect } from "react";
import { userService } from "../services/user";
import { AddImg } from "./AddImg";
import { loadOrders } from "../store/actions/order.actions.js";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
// const [isHovered, setIsHovered] = useState(false);


// export function TestDrop() {
//   return(
//     <div style={{width:'500px',height:'500px',backgroundColor:'blue'}}> yoooooo</div>
//   )
// }


export function TestDrop({  loggedInUser }) {
  const orders = useSelector((storeState) => storeState.orderModule.orders);
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    if (orders?.length) {
      loadOrderData();
    }
  }, [orders]);

  async function loadOrderData() {
    try {
      const ordersData = await Promise.all(
        orders.map(async (order) => {
          try {
            const user = await userService.getById(order.sellerId);
            console.log(order, "uouououou");

            return {
              ...order,
              fullName: user?.fullName || "Unknown Buyer",
              imgUrl: user?.avatar || "/default-avatar.png", // Use default if missing
            };
          } catch (err) {
            console.error(
              `Error fetching user with ID ${order.sellerId}:`,
              err
            );
            return {
              ...order,
              fullName: "Unknown Buyer",
              imgUrl: "/default-avatar.png",
            };
          }
        })
      );

      setUserOrders(ordersData);
    } catch (err) {
      console.error("Unexpected error while loading user orders:", err);
    }
  }

  useEffect(() => {
    async function fetchOrders() {
      if (loggedInUser) {
        try {
          console.log(loggedInUser);
          await loadOrders({ buyerId: loggedInUser._id });
        } catch (err) {
          console.error("Error loading orders:", err);
        }
      }
    }
    fetchOrders();
  }, [loggedInUser]);

  console.log("yyyyyyyyyyyyyyyyy", orders);

  if (orders.length === 0)
    return (
      <div
        className="user-orders-dropdown-menu"
      >
        <div className="dropdown-triangle"></div>
        <div className="no-orders-dropdown-container">
          <div className="svg-wrap">
            <AddImg picUrl="https://res.cloudinary.com/dtpewh2wk/image/upload/v1738343751/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NSA0MyI_PGcgaWQ9IjAySF9YWFNfT3ZlcnZpZXdfZW1wdHlfc3RhdGVfQWRtaW4iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWx_ryte6e.svg"></AddImg>
          </div>

          <h3> No Orders Yet</h3>
          <p>
            Use the search box to find the digital <br /> services you need.
          </p>
        </div>
      </div>
    );

  return (
    <div
      className="user-orders-dropdown-menu"

    >
      <div className="dropdown-triangle"></div>
      <div className="user-orders-container">
        {userOrders.map((order) => {
          const getStatusElement = (status) => {
            if (status === "approved") {
              return (
                <div
                  style={{
                    backgroundColor: "green",
                    color: "white",
                    padding: "5px",
                    borderRadius: "4px",
                  }}
                >
                  Approved
                </div>
              );
            } else if (status === "declined") {
              return (
                <div
                  style={{
                    backgroundColor: "red",
                    color: "white",
                    padding: "5px",
                    borderRadius: "4px",
                  }}
                >
                  Declined
                </div>
              );
            } else {
              return (
                <div
                  style={{
                    color: "orange",
                    padding: "5px",
                    borderRadius: "4px",
                  }}
                >
                  Pending
                </div>
              );
            }
          };

          return (
            <div className="user-orders-gig">
              <div className="orders-wrap">
                <div className="order-img">
                  {" "}
                  <img
                    src={order.gigUrl}
                    alt="Seller"
                    className="seller"
                  />{" "}
                </div>

                <div className="order-details">
                  <h3 style={{ color: "#404145" }}>
                    {" "}
                    {order.title || "Unknown Gig Title"}
                  </h3>

                  <div className="order-details-info">
                    <p style={{ color: "#6b7280" }}>by {order.fullName}</p>
                    <div className="gig-status">
                      {" "}
                      {getStatusElement("order.status" || "pending")}
                    </div>
                  </div>
                </div>
              </div>
              <hr className="divider" />
            </div>

          );
        })}

      </div>
      <NavLink to="/orders">
           <div className="view-all-orders" >View all orders {">"} </div>
          </NavLink>
      </div>
  );
}

















{
  /* <div key={order._id || index}> */
}
{
  /* <div><img src={order.gigUrl} alt="Seller" className="seller" /></div>
                  <div>
                      <Link to={`/gig/${order.gigId}`}>
                          {order.title || 'Unknown Gig'}
                      </Link>
                  </div> */
}
{
  /* <div>${order.price?.toFixed(2) || '0.00'}</div>
                  <div className='seller-td'>
                      <img src={order.imgUrl} alt="Seller" className="seller" /> */
}
{
  /* <span>{order.fullName}</span> */
}
{
  /* </div> */
}
{
  /* <div>{getStatusElement('order.status' || "pending")}</div> */
}

{
  /* <div>{status}</div> */
}
{
  /* </div> */
}
{
  /* </div> */
}

//   <div className="user-orders-dropdown-menu" >
//     <div className="dropdown-triangle"></div>
//     <div className="orders-dropdown-container">
//       <div className="orders-wrap">
//         <div className="order-img">
//           <AddImg picUrl="https://res.cloudinary.com/dtpewh2wk/image/upload/v1737284056/WhatsApp_Image_2025-01-19_at_12.51.54_eofkkc.jpg"></AddImg>
//         </div>

//         <div className="order-details">
//           <h3 style={{color:'#404145', backgroundColor:"yellow"}}> gig title</h3>
//           <div className="order-details-info">
//             <p style={{color:'#6b7280'}}> by -seller-</p>
//             <div style={{color:'green'}}> status</div>
//           </div>
//         </div>
//       </div>
//           <hr className="divider" />
//       <NavLink to="/orders">
//         <div className="view-all-orders" >View all orders {">"} </div>
//       </NavLink>
//     </div>
//   </div>
// );

// return (
//     <div className="user-orders-dropdown-menu" >
//       <div className="dropdown-triangle"></div>
//       <div className="orders-dropdown-container">
//         <div className="orders-wrap">
//           <div className="order-img">
//             <AddImg picUrl="https://res.cloudinary.com/dtpewh2wk/image/upload/v1737284056/WhatsApp_Image_2025-01-19_at_12.51.54_eofkkc.jpg"></AddImg>
//           </div>

//           <div className="order-details">
//             <h3 style={{color:'#404145', backgroundColor:"yellow"}}> gig title</h3>
//             <div className="order-details-info">
//               <p style={{color:'#6b7280'}}> by -seller-</p>
//               <div style={{color:'green'}}> status</div>
//             </div>
//           </div>
//         </div>
//             <hr className="divider" />
//         <NavLink to="/orders">
//           <div className="view-all-orders" >View all orders {">"} </div>
//         </NavLink>
//       </div>
//     </div>
//   );

//  import { Link, useNavigate } from "react-router-dom";
//  import { logout } from "../store/actions/user.actions.js";
//  import { showErrorMsg } from "../services/event-bus.service.js";
//  import { AddImg } from "../cmps/AddImg.jsx";
//  import { NavLink } from "react-router-dom";

//  export function UserDropdownMenu({ loggedInUser, onClose }) {
//    const navigate = useNavigate();

//    async function onLogout() {
//      try {
//        navigate("/");
//        await logout();
//      } catch (err) {
//        showErrorMsg(
//          {
//            title: "FAILED TO LOGOUT",
//            body: `Failed to Logout now...`,
//          },
//          {
//            userMsgLeft: "55%",
//            messageAreaPadding: "2em 1.5em 2em 8em",
//            msgStatusTranslateX: "-12em",
//          }
//        );
//      }
//    }

//    return (
//      <div className="user-dropdown-menu" onClick={onClose}>
//        <div className="dropdown-triangle"></div>
//        <div className="orders-dropdown-container">
//          <div className="orders-wrap">
//            <div className="order-img">
//              <AddImg picUrl="https://res.cloudinary.com/dtpewh2wk/image/upload/v1737284056/WhatsApp_Image_2025-01-19_at_12.51.54_eofkkc.jpg"></AddImg>
//            </div>

//            <div className="order-details">
//              <h3 style={{color:'#404145', backgroundColor:"yellow"}}> gig title</h3>
//              <div className="order-details-info">
//                <p style={{color:'#6b7280'}}> by -seller-</p>
//                <div style={{color:'green'}}> status</div>
//              </div>
//            </div>
//          </div>
//              <hr className="divider" />
//          <NavLink to="/orders">
//            <div className="view-all-orders" >View all orders {">"} </div>
//          </NavLink>
//        </div>
//      </div>
//    );
//  }
