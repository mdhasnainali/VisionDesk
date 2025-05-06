import api from "@/lib/api";
import { validateForm } from "@/lib/validateForm";
import { LoginSchema } from "@/Schemas/auth";
import { LoginType } from "@/types/auth";
import axios from "axios";
import { toast } from "sonner";

export const LoginAction = async (
  previousState: LoginType,
  formData: FormData
): Promise<LoginType> => {
  //  Validate the form data
  const validationErrors = validateForm(LoginSchema, formData);

  if (validationErrors) {
    return validationErrors;
  }

  try {
    const res = await api.post("rest-auth/login/", {
      email: formData.get("email"),
      password: formData.get("password"),
    });
    console.log(res);
    localStorage.setItem("workplace_setup", res.data.workplace_setup);
    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);
    toast.success("Log in successful");
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        errors: {
          formError: error.response?.data.message || ["Axios error occurred"],
        },
      };
    } else if (error instanceof Error) {
      return {
        errors: {
          formError: [error.message],
        },
      };
    } else {
      return {
        errors: {
          formError: ["Unknown error"],
        },
      };
    }
  }

  return { success: true, errors: {} };
};
