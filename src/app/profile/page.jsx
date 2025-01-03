"use client";

import axios from "axios";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";

export default function ProfilePage() {
  const router = useRouter();

  const logout = async () => {
    try {
      console.log("Logging out...");
      await axios.post("/api/users/logout");
      toast.success("Logout successfully");
      router.push("/login");
    } catch (error) {
      console.error("Logout failed:", error);
      toast.error("Logout failed");
    }
  };

  return (
    <div className="min-h-screen text-black flex flex-col items-center justify-center bg-gray-300">
      <h1 className="text-4xl font-medium">Profile Page</h1>
      

      <button className="bg-rose-400 p-4 m-4" onClick={logout}>
        Logout
      </button>
    </div>
  );
}