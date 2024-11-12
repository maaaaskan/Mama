import React, { useState } from "react";
import { useTranslations } from "next-intl";
import Steps from "./Steps";
import Dictionary from "./Dictionary";
import { useDispatch, useSelector } from "react-redux";
import { toggleSubmitState } from "../../lib/services/submitSlice";
import { debounce } from "lodash";
import Loading from "../assets/Loading";
import { useLocale } from "next-intl";
import { toast } from "sonner";

export default function Main() {
  const isSubmitState = useSelector((state) => state.submitState.isSubmitState);
  const dispatch = useDispatch();
  const t = useTranslations("Index");

  const locale = useLocale();
  const [word, setWord] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const inputValue = e.target.elements[0].value.trim();
    debouncedHandleSubmit(inputValue);
  };

  const debouncedHandleSubmit = debounce((inputValue) => {
    if (isValidInput(inputValue)) {
      setWord(String(inputValue).toLowerCase());
      dispatch(toggleSubmitState());
    }
  }, 1000);

  const isValidInput = (input) => {
    if (input == null || input.trim() === "") {
      toast.error(t("Input empty"));
      return false;
    }
    if (/\s/.test(input)) {
      toast.error(t("Input one"));
      return false;
    }
    if (/\d/.test(input)) {
      toast.error(t("Input num"));
      return false;
    }
    return true;
  };

  const boxes = [
    { image: "https://www.goranikurdi.com/img/artists/238.jpg?v=OQRJmZtfKE_8Yj_A3dyGoMXoMxXL6jeAuFgGtPX-qwU", text: "بێکەس", link: "#" },
    { image: "https://kurdipedia.org/files/photos/2008/293.JPG?ver=20110917095358", text: "مەحوی", link: "#" },
    { image: "https://www.kdp.info/grafik/uploaded/2024/NB__2024_07_16_h16m19s4__BE.jpg", text: "نێچیرڤان بارزانی", link: "#" },
  ];

  return (
    <div className="max-w-6xl mx-auto" dir={locale === "en" ? "ltr" : "rtl"}>
      {!isSubmitState ? (
        <>
          <form onSubmit={handleSubmit} className="px-4 py-16 mx-auto">
            {/* Existing form and header content */}
          </form>

          {/* New Boxes Section */}
          <div className="px-4 py-8">
            <h2 className="text-2xl font-bold text-white">Image Boxes</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
              {boxes.map((box, index) => (
                <div
                  key={index}
                  onClick={() => window.open(box.link, "_blank")}
                  className="cursor-pointer bg-gray-800 rounded-lg overflow-hidden shadow-lg transform transition duration-300 hover:scale-105"
                >
                  <img src={box.image} alt={`Box ${index + 1}`} className="w-full h-48 object-cover" />
                  <div className="p-4">
                    <p className="text-white font-medium">{box.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <Steps />
        </>
      ) : (
        <div className="flex flex-col justify-center items-center h-screen -mt-16">
          <Loading />
          <h1 className="font-semibold text-base mt-2">{t("loading")}</h1>
        </div>
      )}

      {isSubmitState ? <Dictionary word={word} /> : <></>}
    </div>
  );
}