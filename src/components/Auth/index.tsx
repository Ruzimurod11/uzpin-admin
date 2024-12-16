"use client";

import React, { useState } from "react";
import axiosInstance from "../../libs/axios";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export default function Signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const response = await axiosInstance.post("/root/login", {
        email,
        password,
      });

      const accessToken = response.data.access;

      Cookies.set("access_token", accessToken, { expires: 7, path: "" });
      router.push("/");
    } catch (error: any) {
      console.error(
        "Login failed:",
        error.response?.data?.message || error.message,
      );
      setError(error.response?.data?.message || "Kirishda Xatolik Bo'ldi");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mx-auto max-w-md rounded-lg bg-white p-6 shadow-md dark:bg-gray-800">
      <h2 className="mb-4 text-center text-2xl font-bold text-dark dark:text-white">
        Kirish
      </h2>
      {error && <div className="mb-4 text-sm text-red-600">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="mb-2 block font-medium text-dark dark:text-white"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Emailni kiriting"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div className="mb-4">
          <label
            htmlFor="password"
            className="mb-2 block font-medium text-dark dark:text-white"
          >
            Parol
          </label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Parolizni kiriting"
            className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-transparent focus:outline-none focus:ring-2 focus:ring-primary dark:bg-gray-700 dark:text-white"
            required
          />
        </div>

        <div className="mb-4">
          <button
            type="submit"
            className="hover:bg-primary-dark w-full rounded-lg bg-primary px-4 py-2 text-white focus:outline-none focus:ring-2 focus:ring-primary focus:ring-opacity-50"
            disabled={loading}
          >
            {loading ? "Jarayonda..." : "Kirish"}
          </button>
        </div>
      </form>
    </div>
  );
}
