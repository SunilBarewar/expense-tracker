import React, { useContext, useEffect, useState } from "react";
import Button from "../../components/Button";
import AddExpenseModal from "../../components/AddExpenseModal";
import { AuthContext } from "../../context/authContext";
import {
  purchasePremiumMembership,
  updatePaymentAndMembershipStatus,
} from "../../api/PurchaseRequest";
import { useNavigate } from "react-router-dom";
import Navbar from "../../components/Navbar";
import { generateReportOfExpenses } from "../../api/PremiumRequests";
import ExpenseTable from "../../components/ExpenseTable";

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { authState } = useContext(AuthContext);

  const handleIsModalOpen = () => {
    setIsModalOpen((prev) => !prev);
  };

  const downloadFile = async (e) => {
    e.preventDefault();

    try {
      const { data } = await generateReportOfExpenses();
      const element = document.createElement("a");
      element.href = data.fileURL;

      // simulate link click
      document.body.appendChild(element); // Required for this to work in FireFox
      element.click();
      document.body.removeChild(element);
    } catch (error) {
      console.log(error);
    }
  };
  // Using useEffect to call the API once mounted and set the data
  const btnStyle = "px-3 py-1 rounded-md text-white text-[15px]";
  return (
    <div className="w-full min-h-screen bg-white flex justify-center overflow-hidden">
      <div className="flex flex-col w-full items-center">
        <Navbar />
        <div className="flex w-full justify-between h-14 items-center px-10">
          <div className="font-bold text-xl shadow-1 px-6 py-2 mt-5 bg-white border-zinc-100 rounded-md">
            <span className="text-slate-900">Total Expense :</span>
            <span className=" text-rose-500"> {authState.totalExpense}</span>
          </div>

          <div className="flex gap-3">
            <button
              className={`${btnStyle} bg-blue-600`}
              onClick={handleIsModalOpen}
            >
              Add expense
            </button>
            {authState.isPremium === true && (
              <button
                className={`${btnStyle} bg-lime-600`}
                onClick={handleIsModalOpen}
              >
                Download Report
              </button>
            )}
          </div>
        </div>

        <ExpenseTable />
      </div>

      {isModalOpen && <AddExpenseModal closeModal={handleIsModalOpen} />}
    </div>
  );
};

export default Dashboard;
