"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";

export default function verifyEmailPage() {
  const [token, setToken] = useState("");
  const [verified, setVerified] = useState(false);
  const [error, setError] = useState(false);

  const verifyEmail = async () => {
    try {
      await axios.post("/api/users/verifyemail", { token });
    setVerified(true);
    } catch (error) {
      setError(true)
      console.log(error);
    }
  };

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const token = urlParams.get("token");
    setToken(token || "");
    setError(false)
  }, []);

  useEffect(() => {
    setError(false)
    if (token.length > 0) {
      verifyEmail();
    }
  }, [token]);

  return (
    <div className="min-h-screen text-black flex flex-col items-center justify-center bg-gray-300">
      <h1 className="text-4xl font-medium">Verify your email</h1>
      <p className="p-2 bg-blue-400 mt-3">{token ? `${token}` : "no token"}</p>
      {verified && (
        <div>
          <p className="m-4 bg-green-700 text-white p-4">Verified</p>
          <Link href={"/login"}>Login</Link>
        </div>
      )}
      {error && (
        <div>
          <p className="m-4 bg-rose-300 text-black p-4">Error</p>
        </div>
      )}
    </div>
  );
}
