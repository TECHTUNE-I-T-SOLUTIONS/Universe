import React from "react";
import { formatDate } from "../utils/formatDate";

const Header = () => (
  <header className="flex flex-row bg-blue-400 w-full p-2 rounded mb-6 fixed top-0 z-10 overflow-y-auto">
    <div>
      <h1 className="text-xl font-bold text-black">ACADEMIC PROGRESS</h1>
      <p className="text-sm text-white">Today is: {formatDate()}</p>
    </div>
  </header>
);

export default Header;
