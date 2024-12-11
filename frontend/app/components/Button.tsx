import React from "react";

interface ButtonProps {
  label: string;
  onClick?: () => void;
  type?: "button" | "submit";
}

const Button: React.FC<ButtonProps> = ({ label, onClick, type = "button" }) => {
  return (
    <button
      type={type}
      onClick={onClick}
      className="bg-primary text-white px-4 py-2 rounded-md hover:bg-blue-700 focus:outline-none"
    >
      {label}
    </button>
  );
};

export default Button;
