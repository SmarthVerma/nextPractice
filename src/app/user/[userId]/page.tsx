"use client";
import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function Page({ params }: any) {
    console.log(`this is the params`, params)
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-900">
      <div className="bg-gray-800 shadow-lg rounded-lg p-8 max-w-lg w-full">
        <h2 className="text-2xl font-semibold text-gray-100 mb-4">
          Your Profile : <span className="text-sm font-normal">{params.userId}</span>
        </h2>
      </div>
    </div>
  );
}
