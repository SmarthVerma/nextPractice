"use client";
import axios from "axios";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Page() {
  const params = useSearchParams(); // You might use this later for navigation
  const token = params.get("token");
  const [status, setStatus] = useState(false);

  const fetchDetail = async () => {
    try {
      const url = "/api/users/me";
      const response = await axios.get(url);
      console.log("This is response", response.data);
      setStatus(response.data.verified); // Assuming response has a 'verified' key
    } catch (error: any) {
      console.error("Error fetching details", error.message);
      toast.error("Failed to fetch account status");
    }
  };

  const handleVerify = async () => {
    try {
      const url = "/api/users/verifyemail";
      const response = await axios.post(url, { token });
      console.log("Response", response);
      if (response.data.verified) {
        setStatus(true);
        toast.success("Account Verified");
      }
    } catch (error: any) {
      console.error("Error while verifying", error.message);
      toast.error("Verification failed");
    }
  };

  useEffect(() => {
    fetchDetail();
  }, [handleVerify]);

  return (
    <>
      <div className="w-full min-h-screen flex flex-col items-center justify-center bg-gray-900 text-white">
        {token ? (
          <>
            <h2 className="text-4xl font-semibold mb-6 flex">
              Account Status:
              <span
                className={`ml-2 text-sm px-4 py-2 rounded-lg flex items-center font-bold ${
                  status ? "bg-green-500 text-white" : "bg-red-500 text-white"
                }`}
              >
                {status ? "Verified" : "Not Verified"}
              </span>
            </h2>
            <button
              onClick={() => handleVerify()}
              className="px-6 py-3 bg-blue-600 hover:bg-blue-700 rounded-lg text-white text-lg font-medium transition duration-300 ease-in-out transform hover:scale-105"
            >
              Verify
            </button>
          </>
        ) : (
          <span>No token available</span>
        )}
      </div>
    </>
  );
}
