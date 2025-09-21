import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

function UserProfile() {
  const { id } = useParams();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`http://localhost:3001/api/protected/user/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setUser(data);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  return (
    <>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center py-10">
        <div className="max-w-lg w-full mx-auto bg-white rounded-3xl shadow-2xl p-10">
          <h2 className="text-3xl font-extrabold text-blue-700 mb-6 text-center">
            User Profile
          </h2>
          {loading ? (
            <div className="text-center text-gray-500">Loading...</div>
          ) : user ? (
            <div className="space-y-6">
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Name
                </label>
                <div className="w-full border border-blue-300 p-3 rounded-lg bg-blue-50 text-gray-800">
                  {user.name}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Email
                </label>
                <div className="w-full border border-blue-300 p-3 rounded-lg bg-blue-50 text-gray-800">
                  {user.email}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Number
                </label>
                <div className="w-full border border-blue-300 p-3 rounded-lg bg-blue-50 text-gray-800">
                  {user.number || "N/A"}
                </div>
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-2">
                  Role
                </label>
                <div className="w-full border border-blue-300 p-3 rounded-lg bg-blue-50 text-gray-800">
                  {user.role}
                </div>
              </div>
            </div>
          ) : (
            <div className="text-center text-gray-500">User not found.</div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
}

export default UserProfile;
