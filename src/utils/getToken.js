const getToken = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  return user.token;
};

export default getToken;
