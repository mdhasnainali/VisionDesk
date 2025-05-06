import api from "@/lib/api";
import { toast } from "sonner";

export const LogOutAction = async () => {
  try {
    await api.post("rest-auth/logout/");
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
    localStorage.removeItem("workplace_setup");
    toast.success("You have been logged out");
    return { success: true };
  } catch {
    toast.error("An error occurred");
    return { success: false, error: "An error occurred" };
  }
};
