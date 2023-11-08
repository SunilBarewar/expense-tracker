import API from "./API";

export const singin = async (formData) =>
  await API.post("/user/sign-in", formData);

export const singup = async (formData) =>
  await API.post("/user/sign-up", formData);

export const sendForgotPasswordEmail = async (email) =>
  await API.post("/user/forgot-password/send-mail", { email });

export const isForgotPasswordRequestActive = async (request_id) =>
  await API.get(`/user/forgot-password/${request_id}`);

export const updatePassword = async (data) =>
  await API.put("/user/update-password", data);
