import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import {
  isForgotPasswordRequestActive,
  updatePassword,
} from "../../api/AuthRequests";

const ResetPassword = () => {
  let { request_id } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const navigate = useNavigate();
  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError({
        isError: true,
        message: "password should be same as confirm password",
      });
      return;
    }

    try {
      await updatePassword({ request_id, newPassword });
      navigate("/auth");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    (async () => {
      try {
        await isForgotPasswordRequestActive(request_id);
      } catch (error) {
        navigate("/reset-password", { replace: true });
      }
    })();
  }, []);
  return (
    <div className="w-full min-h-screen p-3 bg-gradient-blue ">
      <div className="shadow-1 p-4 mx-auto mt-[6%] bg-white rounded-md sm:w-[50%] md:w-[40%] lg:w-[30%] relative">
        <h1 className="text-xl text-zinc-700 text-center mb-5 font-bold">
          Reset your account password
        </h1>

        <InputField
          type="text"
          placeholder="enter new password"
          label={"new password"}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <InputField
          type="text"
          placeholder="re-enter the new password"
          label={"confirm password"}
          onChange={(e) => setConfirmPassword(e.target.value)}
        />
        {error.isError && (
          <p className="text-xs text-red-600">*{error.message}</p>
        )}
        <div className="flex justify-center mt-6">
          <Button title={"Reset Password"} handleClick={handleResetPassword} />
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
