import { useState, useEffect } from "react";
import { userService } from "../services/user";
import { AddImg } from "./AddImg";
import { loadOrdersForDropDown } from "../store/actions/order.actions.js";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import SvgIcon from "./SvgIcon.jsx";

export function UserOrdersDropdownMenu({ loggedInUser, topOffset, onClose }) {
  const dropdownOrders = useSelector(
    (storeState) => storeState.orderModule.dropdownOrders
  ) || [];
  const [userOrders, setUserOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true); 

  useEffect(() => {
    if (dropdownOrders.length) {
      loadOrderData();
    } else {
      setIsLoading(false); 
    }
  }, [dropdownOrders]);

  async function loadOrderData() {
    try {
      setIsLoading(true); 
      const ordersData = await Promise.all(
        dropdownOrders.map(async (order) => {
          try {
            const user = await userService.getById(order.sellerId);

            return {
              ...order,
              fullName: user?.fullName || "Unknown Buyer",
              imgUrl: user?.avatar || "/default-avatar.png",
            };
          } catch (err) {
            console.error(`Error fetching user with ID ${order.sellerId}:`, err);
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
    } finally {
      setIsLoading(false); 
    }
  }

  useEffect(() => {
    async function fetchOrders() {
      if (loggedInUser) {
        try {
          await loadOrdersForDropDown({ buyerId: loggedInUser._id });
        } catch (err) {
          console.error("Error loading orders:", err);
        }
      }
    }
    fetchOrders();
  }, [loggedInUser]);

  const statusColors = {
    Pending: "#F1C40F",
    "In Progress": "#3498DB",
    Completed: "#2ECC71",
    Delivered: "#9B59B6",
    Rejected: "#E74C3C",
  };

  const getStatusElement = (status) => {
    const color = statusColors[status] || "#F1C40F";
    return (
      <div
        style={{
          backgroundColor: color,
          color: "#fff",
          padding: "1px",
          borderRadius: "4px",
          fontWeight: "bold",
          textAlign: "center",
          width: "100px",
        }}
      >
        {status}
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="dropdown-container">
        <div className="user-orders-dropdown-menu">
          <div className="dropdown-triangle"></div>
          <div className="loader-container">
            <div className="loader"></div>
            <p className="loading-text">Loading Orders...</p>
          </div>
        </div>
      </div>
    )
  }

  if (dropdownOrders.length === 0)
    return (
      <div className="dropdown-container">
        <div
          className="user-orders-dropdown-menu"
          style={{
            top: `${topOffset}`,
          }}
          onClick={onClose}
        >
          <div className="dropdown-triangle"></div>
          <div className="no-orders-dropdown-container">
            <div className="svg-wrap">
              <AddImg picUrl="https://res.cloudinary.com/dtpewh2wk/image/upload/v1738343751/svg_xml_base64_PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCA2NSA0MyI_PGcgaWQ9IjAySF9YWFNfT3ZlcnZpZXdfZW1wdHlfc3RhdGVfQWRtaW4iIHN0cm9rZT0ibm9uZSIgc3Ryb2tlLXdpZHRoPSIxIiBmaWxsPSJub25lIiBmaWx_ryte6e.svg"></AddImg>
            </div>

            <h3>No Orders Yet</h3>
            <p>
              Use the search box to find the digital <br /> services you need.
            </p>
          </div>
        </div>
      </div>
    );

  return (
    <div className="dropdown-container">
      <div className="user-orders-dropdown-menu" onClick={onClose}>
        <div className="dropdown-triangle"></div>
        <div className="user-orders-container">
          {userOrders.map((order) => (
            <div className="user-orders-gig" key={order._id}>
              <div className="orders-wrap">
                <div className="order-img">
                  <Link to={`/gig/${order.gigId}`}>
                    <img
                      src={order.gigFirstImgUrl}
                      alt="gigFirstImgUrl"
                      className="gigFirstImgUrl"
                    />
                  </Link>
                </div>

                <div className="order-details">
                  <h3 style={{ color: "#404145" }}>
                    {order.title || "Unknown Gig Title"}
                  </h3>

                  <div className="order-details-info">
                    <p style={{ color: "#6b7280" }}>by {order.fullName}</p>
                    <div className="gig-status">
                      {getStatusElement(order.orderState || "Pending")}
                    </div>
                  </div>
                </div>
              </div>
              <hr className="divider" />
            </div>
          ))}
        </div>

        <div className="view-all-orders flex">
          <Link to="/orders" style={{color:'blue'}}>View all orders</Link>
          <SvgIcon iconName={"rightArrow"} />
        </div>
      </div>
    </div>
  );
}