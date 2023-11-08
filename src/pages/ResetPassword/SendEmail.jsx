import React, { useState } from "react";
import InputField from "../../components/InputField";
import Button from "../../components/Button";
import { sendForgotPasswordEmail } from "../../api/AuthRequests";

const SendEmail = () => {
  const [email, setEmail] = useState("");
  const [isMailsent, setIsMailsent] = useState(false);
  const [error, setError] = useState({
    isError: false,
    message: "",
  });
  const handleSendResetMail = async (e) => {
    e.preventDefault();
    if (!email) return;

    try {
      await sendForgotPasswordEmail(email);
      setIsMailsent(true);
    } catch (error) {
      setError({
        isError: true,
        message: "email does not exists",
      });
    }
  };
  return (
    <div className="w-full min-h-screen p-3 bg-gradient-blue ">
      <div className="shadow-1 p-4 mx-auto mt-[6%] bg-white rounded-md sm:w-[50%] md:w-[40%] lg:w-[30%] relative">
        <h1 className="text-xl text-zinc-700 text-center mb-3 font-bold">
          Forgot Password
        </h1>
        <p className="text-xs text-slate-500 text-center mb-4">
          Enter your registered email address to get the reset password link
        </p>
        {isMailsent ? (
          <div className="border border-slate-300 rounded-lg text-sm p-4 text-zinc-500 bg-green-200 text-center mb-4">
            Please check your mail inbox to reset your password through the sent
            link
          </div>
        ) : (
          <>
            <InputField
              type="text"
              placeholder="enter your email address"
              label={"email"}
              onChange={(e) => setEmail(e.target.value)}
            />
            {error.isError && (
              <p className="text-xs text-red-600">*{error.message}</p>
            )}
            <div className="flex justify-center mt-6">
              <Button
                title={"Send reset password link"}
                handleClick={handleSendResetMail}
              />
            </div>{" "}
          </>
        )}
      </div>
    </div>
  );
};

export default SendEmail;
