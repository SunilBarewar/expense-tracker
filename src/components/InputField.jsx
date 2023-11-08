const InputField = ({ label, ...inputProps }) => {
  return (
    <div className="w-full flex flex-col gap-1">
      <label htmlFor={label} className="capitalize text-sm leading-8">
        {label}
      </label>
      <input
        {...inputProps}
        autoComplete="off"
        className="border h-[50px] rounded-lg text-sm px-3 focus:outline-blue-500"
      />
    </div>
  );
};

export default InputField;
