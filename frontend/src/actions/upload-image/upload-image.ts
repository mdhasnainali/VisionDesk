import api from "@/lib/api";
import { toast } from "sonner";

export const UploadImageAction = async (
  previousState: any,
  formData: FormData
) => {
  try {
    const res = await api.post(
      "administrator/setup-workplace/?action=add-image",
      {
        workplace_image: formData.get("workplace_image"),
      },
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      }
    );
    console.log("Upload success:", res);
    toast.success("Image uploaded successfully");
  } catch (error) {
    console.log(error);
    toast.error("Image upload failed");
  }

  return { errors: {}, success: true };
};
