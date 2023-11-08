import getToken from "../utils/getToken";
import API from "./API";

export const addExpense = async (expense) => {
  const token = getToken();
  const response = await API.post("/expense/add-expense", expense, {
    headers: {
      Authorization: token,
    },
  });
  return response;
};
export const fetchExpenses = async (currentPage) => {
  const token = getToken();
  const response = await API.get(`/expense/all-expenses?page=${currentPage}`, {
    headers: {
      Authorization: token,
    },
  });
  return response;
};
