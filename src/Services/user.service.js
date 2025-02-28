import axios from "../http-common";

const getUserProfile = () => {
  return axios.get("/user/profile", {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

const updateUserProfile = (userData) => {
  return axios.put("/user/profile", userData, {
    headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
  });
};

export default { getUserProfile, updateUserProfile };