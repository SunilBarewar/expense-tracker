import getToken from "../utils/getToken";
import API from "./API";

export const getLeaderboardStats = async () => {
  const token = getToken();

  const response = await API.get("/premium/leaderboard", {
    headers: {
      Authorization: token,
    },
  });
  return response;
};

export const generateReportOfExpenses = async () => {
  const token = getToken();

  const response = await API.get("/premium/generate-report", {
    headers: {
      Authorization: token,
    },
  });
  return response;
};
