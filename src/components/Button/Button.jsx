const Button = ({ type, onClick, children }) => {
  const className =
    type === "action"
      ? "bg-orange-500 hover:bg-orange-600"
      : "bg-gray-300 hover:bg-gray-400";

  return (
    <button type="button" onClick={onClick}
      className={`px-7 py-8 text-4xl text-center hover:cursor-pointer hover:trasform hover:-translate-y-2 active:translate-y-0 ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;