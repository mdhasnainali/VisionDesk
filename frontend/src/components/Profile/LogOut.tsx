"use client";
import { Loader, LogOut } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

const SignOut = () => {
  const [loading, setloading] = useState(false);
  const router = useRouter();
  const handleSignout = () => {
    try {
      setloading(true);
      localStorage.removeItem("access_token");
      localStorage.removeItem("refresh_token");
      router.push("/auth/login");
    } catch (error) {
      console.log(error);
    } finally {
      setloading(false);
    }
  };
  return (
    <div className="text-red-400 p-2 rounded-md hover:bg-accent font-semibold text-xs  flex items-center gap-2 cursor-pointer">
      <button
        onClick={handleSignout}
        type="submit"
        className="text-red-400  w-full flex items-center gap-2 cursor-pointer"
      >
        <LogOut className="w-4 h-4 " />
        {loading ? (
          <>
            <Loader className="w-4 h-4 animate-spin" />
            Signing Out...
          </>
        ) : (
          "Sign Out"
        )}
      </button>
    </div>
  );
};

export default SignOut;
