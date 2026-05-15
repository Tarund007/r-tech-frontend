import React from "react";

export const Textarea = React.forwardRef(({ className = "", ...props }, ref) => (
  <textarea
    ref={ref}
    className={`w-full px-4 py-2 border rounded-md outline-none focus:ring-2 focus:ring-blue-500 ${className}`}
    {...props}
  />
));
Textarea.displayName = "Textarea";
export default Textarea;