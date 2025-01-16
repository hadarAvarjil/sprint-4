import React, { useState, useEffect } from "react";
import { userService } from "../services/user.service";
import { useSelector } from "react-redux";

export function ProfilePage() {
  const [profile, setProfile] = useState(null);
  const [allGigsterOrders, setAllGigsterOrders] = useState([]);
  const userId = useSelector((storeState) => storeState.userModule.user?._id);

  useEffect(() => {
    // Fetch user profile
    async function fetchProfile() {
      try {
        const users = await userService.getUsers();
        const userProfile = users.find((user) => user._id === userId);
        setProfile(userProfile || {});
      } catch (error) {
        console.error("Error fetching profile:", error);
      }
    }

    // Fetch orders from local storage
    const storedOrders = JSON.parse(localStorage.getItem("order")) || [];
    setAllGigsterOrders(storedOrders);

    fetchProfile();
  }, [userId]);

  const ownedOrders = allGigsterOrders.filter((order) => order[1] === userId);
  const purchasedOrders = allGigsterOrders.filter((order) => order[0] === userId);

  if (!profile) return (
    <div className="profile-page-container">
      <div className="profile-layout">
        {/* Left Profile Info */}
        <div className="profile-info">
          {/* <img src={profile.pic} alt={profile.fullName} className="profile-pic" /> */}
          <h2>fullName</h2>
          <p><strong>Username:</strong></p>
          <p><strong>Level:</strong></p>
          <p><strong>Rating:</strong></p>
          <p><strong>Orders in Queue:</strong></p>
          <p><strong>Member Since:</strong></p>
          <p><strong>From:</strong></p>
          <p><strong>Languages:</strong></p>
        </div>
  
        {/* Right Manage Orders */}
        <div className="profile-orders">
          {/* Orders to Provide */}
          <div className="orders-section">
            <h3>Manage the Orders I Need to Provide</h3>
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
                </tr>
              </thead>
              <tbody>
                {ownedOrders.map((order, index) => {
                  const [buyerId, , gigTitle, daysToMake, , price, deliveredAt = "Not Delivered", status = "Pending"] = order;
                  const dueDate = new Date(Date.now() + daysToMake * 24 * 60 * 60 * 1000).toLocaleDateString();
                  return (
                    <tr key={index}>
                      <td>
                        {/* <img
                          src={`https://api.dicebear.com/5.x/initials/svg?seed=${buyerId}`}
                          alt="Buyer"
                          className="buyer-pic"
                        /> */}
                      </td>
                      <td>buyerId</td>
                      <td>gigTitle</td>
                      <td>dueDate</td>
                      <td>deliveredAt</td>
                      <td>$price</td>
                      <td>status</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
  
          {/* Gigs Purchased */}
          <div className="orders-section">
            <h3>Gigs I Bought</h3>
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Owner</th>
                  <th>Owner Name</th>
                  <th>Name of Gig</th>
                  <th>Due On</th>
                  <th>Delivered At</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {purchasedOrders.map((order, index) => {
                  const [, ownerId, gigTitle, daysToMake, , price, deliveredAt = "Not Delivered", status = "Pending"] = order;
                  const dueDate = new Date(Date.now() + daysToMake * 24 * 60 * 60 * 1000).toLocaleDateString();
                  return (
                    <tr key={index}>
                      <td>
                        {/* <img
                          src={`https://api.dicebear.com/5.x/initials/svg?seed=${ownerId}`}
                          alt="Owner"
                          className="owner-pic"
                        /> */}
                      </td>
                      <td>ownerId</td>
                      <td>gigTitle</td>
                      <td>dueDate</td>
                      <td>deliveredAt</td>
                      <td>$price</td>
                      <td>status</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
  







  return (
    <div className="profile-page-container">
      <div className="profile-layout">
        {/* Left Profile Info */}
        <div className="profile-info">
          <img src={profile.pic} alt={profile.fullName} className="profile-pic" />
          <h2>{profile.fullName}</h2>
          <p><strong>Username:</strong> {profile.username}</p>
          <p><strong>Level:</strong> {profile.level}</p>
          <p><strong>Rating:</strong> {profile.rating}</p>
          <p><strong>Orders in Queue:</strong> {profile.ordersInQueue}</p>
          <p><strong>Member Since:</strong> {new Date(profile.createAt).toLocaleDateString()}</p>
          <p><strong>From:</strong> {profile.from}</p>
          <p><strong>Languages:</strong> {profile.languages?.join(", ")}</p>
        </div>
  
        {/* Right Manage Orders */}
        <div className="profile-orders">
          {/* Orders to Provide */}
          <div className="orders-section">
            <h3>Manage the Orders I Need to Provide</h3>
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
                </tr>
              </thead>
              <tbody>
                {ownedOrders.map((order, index) => {
                  const [buyerId, , gigTitle, daysToMake, , price, deliveredAt = "Not Delivered", status = "Pending"] = order;
                  const dueDate = new Date(Date.now() + daysToMake * 24 * 60 * 60 * 1000).toLocaleDateString();
                  return (
                    <tr key={index}>
                      <td>
                        <img
                          src={`https://api.dicebear.com/5.x/initials/svg?seed=${buyerId}`}
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
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
  
          {/* Gigs Purchased */}
          <div className="orders-section">
            <h3>Gigs I Bought</h3>
            <table className="orders-table">
              <thead>
                <tr>
                  <th>Owner</th>
                  <th>Owner Name</th>
                  <th>Name of Gig</th>
                  <th>Due On</th>
                  <th>Delivered At</th>
                  <th>Total</th>
                  <th>Status</th>
                </tr>
              </thead>
              <tbody>
                {purchasedOrders.map((order, index) => {
                  const [, ownerId, gigTitle, daysToMake, , price, deliveredAt = "Not Delivered", status = "Pending"] = order;
                  const dueDate = new Date(Date.now() + daysToMake * 24 * 60 * 60 * 1000).toLocaleDateString();
                  return (
                    <tr key={index}>
                      <td>
                        <img
                          src={`https://api.dicebear.com/5.x/initials/svg?seed=${ownerId}`}
                          alt="Owner"
                          className="owner-pic"
                        />
                      </td>
                      <td>{ownerId}</td>
                      <td>{gigTitle}</td>
                      <td>{dueDate}</td>
                      <td>{deliveredAt}</td>
                      <td>${price}</td>
                      <td>{status}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  
  
  );
}
