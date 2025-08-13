import React, { useEffect, useState } from "react";
import axios from "axios";
import { NavLink } from "react-router-dom";

const ProfilePage = () => {
  document.title = "User Profile";
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    axios
      .get("/api/profile", { withCredentials: true }) 
      .then((res) => {
        setUser(res.data.user);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleLogout = () => {
    axios
      .post("/api/logout", {}, { withCredentials: true })
      .then(() => {
        window.location.href = "/login";
      })
      .catch((err) => console.error(err));
  };

  if (loading) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  if (!user) {
    return (
      <div className="text-center mt-10 text-red-500">
        Unauthorized — Please login first.
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-xl max-w-md w-full p-6">
        
        {/* Profile Picture */}
        <div className="flex justify-center">
          <img
            src={user.profilePicture}
            alt={user.fullName}
            className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
          />
        </div>

        {/* Name & Email */}
        <div className="text-center mt-4">
          <h2 className="text-2xl font-bold text-gray-800">{user.fullName}</h2>
          <p className="text-gray-500">{user.email}</p>
        </div>

        {/* Info */}
        <div className="mt-6 space-y-3">
          <p><span className="font-semibold">Age:</span> {user.age}</p>
          <p><span className="font-semibold">Address:</span> {user.address}</p>
          <p><span className="font-semibold">Phone:</span> {user.phone}</p>
          <p>
            <span className="font-semibold">Member Since:</span>{" "}
            {new Date(user.createdAt).toLocaleDateString()}
          </p>
        </div>

        {/* Logout Button */}
        <div className="mt-6 flex items-center justify-around">
          <NavLink
          to="/my-orders"
            className="bg-green-500 hover:bg-green-600 text-white px-5 py-2 rounded-lg shadow"
          >
            My Orders
          </NavLink>
          <button
            className="bg-red-500 hover:bg-red-600 text-white px-5 py-2 rounded-lg shadow"
            onClick={handleLogout}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
