import React from "react";

function Header() {
  return (
    <header className="bg-white border-b p-4">
      <div className="flex justify-between items-center">
        <h1 className="text-xl font-bold">AI Chatbot</h1>
        <button className="px-4 py-2 text-sm text-red-600 hover:text-red-800">
          Sign Out
        </button>
      </div>
    </header>
  );
}

export default Header;
    