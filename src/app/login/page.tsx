"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function page() {
  const router = useRouter();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const [btnDisabled, setBtnDisabled] = useState(true);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data.email.length > 0 && data.password.length > 0) {
      setBtnDisabled(false);
    } else {
      setBtnDisabled(true);
    }
    // console.log(data);
  }, [data]);

  const login = async () => {
    setLoading(true);
    try {
      const url = "/api/users/login";
      const response = await axios.post(url, data);

      console.log("response", response);
        router.push("/profile");
    } catch (error: any) {
      console.error("error while signing in", error.message);
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full min-h-screen flex items-center justify-center bg-gray-900">
        <form className="flex flex-col bg-gray-800 p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2
            className={`text-2xl font-semibold mb-6 text-center transition-all duration-300 ease-in-out
    ${loading ? "text-indigo-400 animate-pulse" : "text-white"}`}
          >
            {loading ? "Processing..." : "Log in"}
          </h2>

          <label
            htmlFor="email"
            className="text-sm font-medium text-gray-300 mb-2"
          >
            Enter Email
          </label>
          <input
            type="email"
            id="email"
            className="p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 bg-gray-700 text-gray-200"
            value={data.email}
            onChange={(e) =>
              setData((prev) => ({ ...prev, email: e.target.value }))
            }
            placeholder="example@email.com"
          />

          <label
            htmlFor="password"
            className="text-sm font-medium text-gray-300 mb-2"
          >
            Enter Password
          </label>
          <input
            type="password"
            id="password"
            className="p-3 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 mb-4 bg-gray-700 text-gray-200"
            value={data.password}
            onChange={(e) =>
              setData((prev) => ({ ...prev, password: e.target.value }))
            }
            placeholder="••••••••"
          />

          <button
            type="button"
            onClick={login}
            disabled={loading || btnDisabled}
            className={`font-semibold py-3 px-4 rounded-lg transition mb-2 focus:outline-none focus:ring-4 
    ${
      btnDisabled
        ? "bg-gray-400 cursor-not-allowed text-gray-700" // Disabled state
        : "bg-indigo-600 hover:bg-indigo-700 text-white focus:ring-indigo-400"
    }`} // Enabled state
          >
            {btnDisabled ? "Fill All Fields" : "Log In"}
          </button>
        </form>
      </div>
    </>
  );
}
