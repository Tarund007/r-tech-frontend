import React from "react";

export const Card = ({ className = "", children, ...props }) => {
  return (
    <div className={` bg-slate-50 rounded-xl shadow ${className}`} {...props}>
      {children}
    </div>
  );
};
Card.displayName = "Card";

export const CardContent = ({ className = "", children, ...props }) => {
  return (
    <div className={`p-4 ${className}`} {...props}>
      {children}
    </div>
  );
};
CardContent.displayName = "CardContent";
