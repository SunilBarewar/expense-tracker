import React, { useContext, useState } from "react";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { singin, singup } from "../../api/AuthRequests";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/authContext";

const Auth = () => {
  const [selectedTab, setSelectedTab] = useState("Sign In");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState({
    isError: false,
    message: "",
  });

  const navigate = useNavigate();
  const { authDispatch } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    let response;
    const formData = {
      email,
      password,
    };

    try {
      if (selectedTab === "Sign In") response = await singin(formData);
      else {
        formData.name = name;
        response = await singup(formData);
      }
      authDispatch({ type: "SET_TOKEN", payload: response.data });
      navigate("/");
    } catch (error) {
      setError({ isError: true, message: error.response.data.message });
    }
  };

  const toggleTabs = (title) => {
    setEmail("");
    setPassword("");
    setError({
      isError: false,
      message: "",
    });

    setSelectedTab(title);
  };
  return (
    <div className="grid place-content-center min-h-screen bg-gradient-blue">
      <div className="w-[375px] flex flex-col items-center justify-center bg-white p-5 transition-all rounded-xl gap-5 shadow-1">
        <section className="flex items-center w-full justify-between gap-3">
          <TabButton
            title={"Sign In"}
            isActive={selectedTab}
            setActive={toggleTabs}
          />
          <TabButton
            title={"Sign Up"}
            isActive={selectedTab}
            setActive={toggleTabs}
          />
        </section>
        <form className="w-full flex flex-col gap-3">
          {selectedTab === "Sign Up" && (
            <InputField
              label={"name"}
              id="name"
              placeholder="Enter your name"
              name="name"
              type="text"
              onChange={(e) => setName(e.target.value)}
              value={name}
            />
          )}

          <InputField
            label={"email"}
            id="email"
            placeholder="Enter your email"
            name="email"
            type="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
          <InputField
            label={"password"}
            id="password"
            placeholder="Enter password"
            name="password"
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            value={password}
          />

          {error.isError && (
            <p className="text-red-500 text-xs">*{error.message}</p>
          )}
          <div
            className={`self-end ${
              selectedTab === "Sign In" &&
              "w-full flex justify-between items-end"
            }`}
          >
            {selectedTab === "Sign In" && (
              <Link
                to="/reset-password"
                replace={true}
                className="mr-auto text-sm underline hover:text-blue-600"
              >
                Forgot password?
              </Link>
            )}
            <Button title={selectedTab} handleClick={handleSubmit} />
          </div>
        </form>
      </div>
    </div>
  );
};

const TabButton = ({ title, isActive, setActive }) => {
  return (
    <button
      className={`p-3 border w-[50%] font-semibold rounded-md ${
        isActive === title && "border-blue-500"
      }`}
      onClick={() => setActive(title)}
    >
      {title}
    </button>
  );
};
export default Auth;
