"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";

interface ProfileData {
  _id: string;
  username: string;
  email: string;
  isVerified: boolean;
  isAdmin: boolean;
  __v: number;
}

export default function Page() {
  const [data, setData] = useState<ProfileData | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [loader, setLoader] = useState(false);

  const fetchMe = async () => {
    const url = "/api/users/me";
    const response = await axios.get(url);
    console.log("this is my response to data fetching", response);
    setData(response.data);
  };

  useEffect(() => {
    fetchMe();
  }, []);

  const handleOpenModal = () => setShowModal(true);
  const handleCloseModal = () => setShowModal(false);
  const handleSendEmail = async () => {
    setLoader(true);
    try {
      const url = "/api/users/send_verificaton_mail";
      const response = await axios.get(url);
      alert(`Verification email sent to ${response.data.message}`);
    } catch (error: any) {
      alert(`Something went wrong`);
      console.error("Error:", error);
    } finally {
      setLoader(false);
    }

    handleCloseModal(); // Close the modal after sending the email
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">
          Your Profile
        </h2>
        <div className="space-y-4">
          <div className="flex justify-between">
            <span className="font-medium text-gray-400">Your ID:</span>
            <span className="text-gray-200">{data?._id || "Loading..."}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-400">Email:</span>
            <span className="text-gray-200">{data?.email || "Loading..."}</span>
          </div>
          <div className="flex justify-between">
            <span className="font-medium text-gray-400">Username:</span>
            <span className="text-gray-200">
              {data?.username || "Loading..."}
            </span>
          </div>
          <div className="relative flex justify-between">
            <span className="font-medium text-gray-400">Verified:</span>
            <span
              className={`font-semibold cursor-pointer ${
                data?.isVerified ? "text-green-400" : "text-red-400"
              }`}
              onClick={data?.isVerified ? undefined : handleOpenModal}
            >
              {data?.isVerified ? (
                "Yes"
              ) : (
                <span className="hover:underline">No</span>
              )}
            </span>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50">
          <div className="bg-gray-800 text-gray-100 p-6 rounded-lg shadow-lg max-w-sm w-full">
            <h3 className="text-lg font-semibold mb-4">
              Send Verification Email
            </h3>
            <p className="mb-4">Would you like to send a verification email?</p>
            <div className="flex justify-end space-x-2">
              <button
                className={`px-4 py-2 rounded transition-colors ${
                  loader
                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
                onClick={handleSendEmail}
                disabled={loader}
              >
                {loader ? "Sending..." : "Send Email"}
              </button>
              <button
                className={`px-4 py-2 rounded transition-colors ${
                  loader
                    ? "bg-gray-500 text-gray-300 cursor-not-allowed"
                    : "bg-gray-600 text-white hover:bg-gray-700"
                }`}
                onClick={handleCloseModal}
                disabled={loader}
              >
                {loader ? "Please wait..." : "Cancel"}
              </button>
            </div>
          </div>
        </div>
      )}

        
    </div>
  );
}
