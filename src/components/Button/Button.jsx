const Button = ({ type, children }) => {
  const className =
    type === "action"
      ? "bg-orange-500 hover:bg-orange-600"
      : "bg-gray-300 hover:bg-gray-400";

  return (
    <div
      className={`px-7 py-8 text-4xl text-center hover:cursor-pointer hover:trasform hover:-translate-y-2 active:translate-y-0 ${className}`}
    >
      {children}
    </div>
  );
};

export default Button;