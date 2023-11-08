const Button = ({ title, handleClick = () => {} }) => {
  return (
    <button
      className="text-white bg-blue-600 h-[50px] px-10 font-normal rounded hover:bg-blue-500 transition-all"
      onClick={handleClick}
    >
      {title}
    </button>
  );
};

export default Button;
