import { useState, useEffect } from "react";
import { userService } from "../services/user";
import { AddImg } from "./AddImg";
import { loadOrdersForDropDown } from "../store/actions/order.actions.js";
import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import { Link } from "react-router-dom";

export function UserOrdersDropdownMenu({ loggedInUser, topOffset }) {
  const dropdownOrders = useSelector((storeState) => storeState.orderModule.dropdownOrders) || [];
  const [userOrders, setUserOrders] = useState([]);

  useEffect(() => {
    if (dropdownOrders.length) {
      loadOrderData();
    }
}, [dropdownOrders]);
 

  async function loadOrderData() {
    try {
      const ordersData = await Promise.all(
        dropdownOrders.map(async (order)=> {
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
          await loadOrdersForDropDown({ buyerId: loggedInUser._id });
        } catch (err) {
          console.error("Error loading orders:", err);
        }
      }
    }
    fetchOrders();
  }, [loggedInUser]);


  if (dropdownOrders.length === 0)
    return (
      <div
        className="user-orders-dropdown-menu"
        style={{
          top: `${topOffset}`,
        }}
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
      style={{
        top: `${topOffset}`,
        // right:`${rightOffset}`,
      }}
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
                  <Link to={`/gig/${order.gigId}`}>
                    <img
                      src={order.gigFirstImgUrl}
                      alt="gigFirstImgUrl"
                      className="gigFirstImgUrl"
                    />
                    {/* {order.title || "Unknown Gig"} */}
                  </Link>{" "}
                  {/* <img src={order.gigUrl} alt="Seller" className="seller" />{" "} */}
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
      <Link to="/dashboard">
        <div className="view-all-orders">  <Link to="/orders"></Link>View all orders {">"} </div>
      </Link>
    </div>
  );
}
