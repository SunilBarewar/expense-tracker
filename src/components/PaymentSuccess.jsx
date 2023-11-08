import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/authContext";
import { useLocation, useNavigate } from "react-router-dom";
import Button from "./Button";

/**
 * payment-successful comopenent =>  will render after the payment for premium membership will be successful
 *
 * @returns React.reactNode
 */
const PaymentSuccess = () => {
  const { authDispatch } = useContext(AuthContext);
  const { state } = useLocation();
  const navigate = useNavigate();

  const goToHomePage = (e) => {
    e.preventDefault();
    navigate("/", { replace: true });
  };

  // update auth state
  useEffect(() => {
    // redirect to home page if state is null
    if (!state) {
      navigate("/", { replace: true });
      return;
    }
    authDispatch({ type: "SET_TOKEN", payload: state });
  }, []);
  return (
    <>
      <div className="grid place-content-center min-h-screen bg-gradient-blue">
        <div className="bg-white shadow-1  p-4 flex flex-col justify-center items-center rounded-md">
          <img
            src="pay-success.svg"
            alt="payment-successful"
            width={150}
            height={150}
          />

          <h1 className="text-[22px] font-bold bg-gradient-to-r from-green-600 via-green-500 to-green-600 inline-block text-transparent bg-clip-text leading-[3.3rem] mb-3">
            Payment Successful!!!
          </h1>

          <Button title={"Go to home"} handleClick={goToHomePage} />
        </div>
      </div>
    </>
  );
};

export default PaymentSuccess;
