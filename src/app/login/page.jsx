"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const Login = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onLogin = async (e) => {
   
    setLoading(true);
    try {
      await axios.post("/api/users/login", user);
      router.push("/profile");
    } catch (error) {
      toast.error("login failed");
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-80 text-black">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {loading ? "Processing..." : "Login"}
        </h2>
        <div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm mb-2">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={user.email}
              onChange={(e) => setUser({ ...user, email: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="you@example.com"
              required
            />
          </div>
          <div className="mb-6">
            <label htmlFor="password" className="block text-sm mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={user.password}
              onChange={(e) => setUser({ ...user, password: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="••••••••"
              required
            />
          </div>
          <button
            onClick={onLogin}
            className="w-full bg-blue-500 text-white py-2 rounded-md"
            disabled={buttonDisabled}
          >
            {buttonDisabled ? "Fill all fields" : "Login"}
          </button>
        </div>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/signup" className="text-blue-500">
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
