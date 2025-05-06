import api from "@/lib/api";

const GetProfile = async () => {
  try {
    const res = await api.get("administrator/profile/");
    return res?.data;
  } catch {}
};

export default GetProfile;
