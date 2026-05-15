import React from "react";

export const Button = ({
  children,
  icon,
  className = "",
  variant = "solid",
  type = "button",
  ...props
}) => {
  const base = "flex items-center justify-center gap-2 px-4 py-2 rounded-2xl font-medium transition";
  const variants = {
    outline: "border border-gray-300 text-gray-700 bg-white hover:bg-gray-100",
    solid: " bg-black-600 text-white hover:bg-gray-700",
  };

  return (
    <button
      type={type}
      className={`${base} ${variant === "outline" ? variants.outline : variants.solid} ${className}`}
      {...props}
    >
      {icon}
      {children}
    </button>
  );
};

Button.displayName = "Button";
export default Button;

