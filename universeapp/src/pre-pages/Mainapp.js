import React from "react";
import logo from "../icons/UniVerselog.svg";
import Nametext from "../icons/UniVersetext.svg";


function App() {
  return (
    <div className="text-center">
      <header className="bg-white min-h-screen flex flex-col items-center justify-center text-white relative">
        <img
          src={logo}
          className="h-[20vmin] pointer-events-none z-10 animate-spin-slow"
          alt="logo"
        />
        <p>
          <img
            src={Nametext}
            className="h-[10vmin] pointer-events-none z-10 pt-0"
            alt="UniVerse"
          />
        </p>
        <p className="text-center mx-auto text-[calc(14px+0.5vw)] leading-6 text-blue-500 max-w-[90%] z-10">
          <br/> Your ultimate student companion!
        </p>
      </header>
    </div>
  );
}

export default App;
