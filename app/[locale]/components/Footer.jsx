import React from "react";
import { FaSnapchat } from "react-icons/fa";

export default function Footer() {
  return (
    <div className="flex justify-center items-center mt-16">
      <a href="https://snapchat.com/t/tFOzaxPy" target="_blank">
        <FaSnapchat className="w-6 h-6 ltr:mr-3 rtl:ml-3 mb-4 cursor-pointer transition-all duration-200 ease-in-out hover:scale-125 focus:scale-125 active:scale-105" />
      </a>
      <a
        href="https://www.instagram.com/maaaskan?igsh=M3p4ZzZ5YzBmNnhv&utm_source=qr"
        target="_blank"
        className="inline-block mb-4 bg-none font-bold text-sm border-2 transition-all duration-200 ease-in-out py-[4px] px-[6px] rounded-xl cursor-pointer hover:scale-110 focus:scale-110 active:scale-105"
      >
        &copy; 2023 - Maskan Nazat
      </a>
    </div>
  );
}
