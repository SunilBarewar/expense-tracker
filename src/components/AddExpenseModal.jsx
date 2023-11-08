import { useContext, useState } from "react";
import { expenseCategories } from "../constants/categories";
import Button from "./Button";
import InputField from "./InputField";
import Select from "react-select";
import { addExpense } from "../api/ExpenseRequest";
import { AuthContext } from "../context/authContext";
import { authActions } from "../constants/actionTypes";
const AddExpenseModal = ({ closeModal }) => {
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState(0);
  const { authDispatch } = useContext(AuthContext);
  const handleAddExpense = async (e) => {
    e.preventDefault();

    if (!category || !description || !amount) return;
    const expense_obj = { category: category.value, desc: description, amount };

    try {
      const response = await addExpense(expense_obj);
      authDispatch({
        type: authActions.UPDATE_TOTALEXPENSE,
        payload: +response.data.totalExpense,
      });
    } catch (error) {
      console.log(error);
    }
    closeModal();
  };
  return (
    <div
      className="fixed bg-black bg-opacity-[0.2] z-10 inset-0 "
      onClick={closeModal}
    >
      <form
        className="bg-white shadow-1 w-96 p-6 rounded-lg pos-center flex flex-col gap-4"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="w-full">
          <span className="capitalize text-sm leading-8">choose category</span>
          <Select
            value={category}
            onChange={(selectedCategory) => setCategory(selectedCategory)}
            options={expenseCategories}
            classNamePrefix={"expense-cat"}
          />
        </div>
        <InputField
          label={"description"}
          type="text"
          name="description"
          placeholder="Enter description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <InputField
          label={"amount"}
          type="number"
          name="amount"
          placeholder="Enter amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <div className="self-center">
          <Button title={"Add expense"} handleClick={handleAddExpense} />
        </div>
      </form>
    </div>
  );
};

export default AddExpenseModal;
