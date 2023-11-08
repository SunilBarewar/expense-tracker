import getToken from "../utils/getToken";
import API from "./API";

export const purchasePremiumMembership = async () => {
  const token = getToken();
  const response = await API.post(
    "/purchase/premium-membership",
    {},
    {
      headers: {
        Authorization: token,
      },
    }
  );
  return response;
};

export const updatePaymentAndMembershipStatus = async (data) => {
  const token = getToken();
  const response = await API.post("/purchase/update-status", data, {
    headers: {
      Authorization: token,
    },
  });
  return response;
};
