export default function Footer() {
  return (
    <footer className="bg-gray-100 py-6 mt-12 border-t">
      <div className="max-w-6xl mx-auto text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} R-Tech Machine & Tools. All rights reserved.
      </div>
    </footer>
  );
}
import React from 'react';