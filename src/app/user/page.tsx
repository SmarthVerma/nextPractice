"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const router = useRouter();
  const handleGetUserDetails = async () => {
    try {
      const url = "/api/users/me";
      const response = await axios.get(url);
      console.log("this is the response on user", url);
      router.push(`/user/${response.data._id}`);
    } catch (error) {
      toast.error("error on logout");
      console.error(error);
    }
  };

  const handleLogout = async () => {
    try {
      const url = "/api/users/logout";
      const response = await axios.get(url);
      router.push("/login");
    } catch (error) {
      console.error(error);
      toast.error("error on logout");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">
          Your Profile
        </h2>

        {/* Get User Details Button */}
        <div className="mt-6 flex justify-between space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            onClick={handleGetUserDetails}
          >
            Get User Details
          </button>

          {/* Logout Button */}
          <button
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
            onClick={() => handleLogout()}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
}
