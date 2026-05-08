const Button = ({ children, onClick, variant = "primary", className = "", disabled = false }) => {
  const variants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    secondary: "bg-gray-100 hover:bg-gray-200 text-gray-800",
    danger: "bg-red-500 hover:bg-red-600 text-white",
    outline: "border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`px-5 py-2.5 rounded-lg font-medium transition-all duration-200 
        ${variants[variant]} 
        ${disabled ? "opacity-50 cursor-not-allowed" : "cursor-pointer"}
        ${className}`}
    >
      {children}
    </button>
  );
};

export default Button;