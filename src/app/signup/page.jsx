"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

const SignUp = () => {
  const router = useRouter();

  const [user, setUser] = useState({
    email: "",
    password: "",
    username: "",
  });

  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const onSignUp = async (e) => {
   
    setLoading(true);
    try {
      await axios.post("/api/users/signup", user);
      router.push("/login");
    } catch (error) {
      toast.error("Signup failed");
    }
  };

  useEffect(() => {
    if (
      user.email.length > 0 &&
      user.password.length > 0 &&
      user.username.length > 0
    ) {
      setButtonDisabled(false);
    } else {
      setButtonDisabled(true);
    }
  }, [user]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-6 rounded-md shadow-md w-80 text-black">
        <h2 className="text-2xl font-semibold text-center mb-4">
          {loading ? "Processing..." : "Sign Up"}
        </h2>
        <div>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm mb-2">
              Full Name
            </label>
            <input
              type="text"
              value={user.username}
              onChange={(e) => setUser({ ...user, username: e.target.value })}
              id="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
              placeholder="John Doe"
              required
            />
          </div>
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
            onClick={onSignUp}
            className="w-full bg-blue-500 text-white py-2 rounded-md"
            disabled={buttonDisabled}
          >
            {buttonDisabled ? "Fill all fields" : "Sign Up"}
          </button>
        </div>
        <p className="text-sm text-center mt-4">
          Already have an account?{" "}
          <a href="/login" className="text-blue-500">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
