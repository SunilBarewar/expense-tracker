import React, { useContext } from "react";
import { AuthContext } from "../context/authContext";
import { Link } from "react-router-dom";
import {
  purchasePremiumMembership,
  updatePaymentAndMembershipStatus,
} from "../api/PurchaseRequest";

const Navbar = () => {
  const {
    authState: { isPremium },
    authDispatch,
  } = useContext(AuthContext);
  const btnStyle = "px-3 py-1 rounded-md text-white text-[15px]";

  // open razorpay payment page
  async function displayRazorpayCheckoutPage(e) {
    e.preventDefault();
    try {
      const { data } = await purchasePremiumMembership();

      const options = {
        key: data.key_id,
        order_id: data.order.id,
        name: "Expense tracker premium",
        description:
          "Get access to premium features and manage your expenses more efficiently",
        image: "https://avatars.githubusercontent.com/u/25058652?v=4",
        handler: async function (response) {
          try {
            const res = await updatePaymentAndMembershipStatus({
              order_id: response.razorpay_order_id,
              payment_id: response.razorpay_payment_id,
              payment_status: "successful",
            });
            // alert("isPremium user : " + res.data.isPremium);
            navigate("/paymentsuccess", { replace: true, state: res.data });
          } catch (error) {
            console.log(error);
          }
        },
        prefill: {
          name: "Gaurav Kumar",
          email: "gaurav.kumar@example.com",
          contact: "9000090000",
        },
      };

      const rzp = new window.Razorpay(options);

      rzp.on("payment.failed", async function (response) {
        const { order_id, payment_id } = response.error.metadata;
        const res = await updatePaymentAndMembershipStatus({
          order_id,
          payment_id,
          payment_status: "failed",
        });
      });
      rzp.open();
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <div className="w-full flex justify-between items-center px-5 h-[50px] bg-white shadow">
      <Link className="px-3 py-1 border font-bold md:text-xl" to="/">
        Expense Tracker 🧮
      </Link>

      {isPremium && (
        <h1 className="text-sm font-normal mr-auto ml-2 text-white px-2 py-1 rounded-md shadow bg-gradient-to-r from-cyan-500 to-blue-500">
          premium
        </h1>
      )}

      <div className="flex gap-3">
        {!isPremium && (
          <button
            className={`${btnStyle} bg-orange-500`}
            onClick={(e) => displayRazorpayCheckoutPage(e)}
          >
            Buy premium
          </button>
        )}

        {isPremium && (
          <Link
            to={"/leaderboard"}
            state={isPremium}
            className={`${btnStyle} bg-green-300`}
          >
            Leader Board
          </Link>
        )}
        <button
          onClick={(e) => {
            e.preventDefault();
            authDispatch({ type: "LOGOUT" });
          }}
          className={`${btnStyle} bg-red-400`}
        >
          log out
        </button>
      </div>
    </div>
  );
};

export default Navbar;
