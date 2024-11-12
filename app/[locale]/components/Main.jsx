import React from "react";
import { useTranslations } from "next-intl";
import Steps from "./Steps";
import Dictionary from "./Dictionary";
import { useDispatch, useSelector } from "react-redux";
import { toggleSubmitState } from "../../lib/services/submitSlice";
import { debounce } from "lodash";
import Loading from "../assets/Loading";
import { useLocale } from "next-intl";
import { toast } from "sonner";
import { motion } from "framer-motion";

export default function Main() {
  const isSubmitState = useSelector((state) => state.submitState.isSubmitState);
  const dispatch = useDispatch();
  const t = useTranslations("Index");

  const locale = useLocale();
  const [word, setWord] = React.useState("");

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

  const channels = [
    { name: "NRT NEWS HD", logo: "/images/nrt.jpg", link: "#" },
    { name: "K24 HD", logo: "https://upload.wikimedia.org/wikipedia/commons/f/ff/K24logo.png", link: "#" },
    { name: "GaliKurdistan", logo: "/images/gali.jpg", link: "#" },
    { name: "Kurdistan TV", logo: "/images/kurdistan.jpg", link: "#" },
    { name: "Bangawaz TV", logo: "/images/bangawaz.jpg", link: "#" },
  ];

  return (
    <div className="max-w-6xl mx-auto" dir={locale === "en" ? "ltr" : "rtl"}>
      {!isSubmitState ? (
        <>
          <form onSubmit={handleSubmit} className="px-4 py-16 mx-auto">
            {/* Existing form and header content */}
          </form>

          {/* New TV Channels Section */}
          <div className="px-4 py-8">
            <h2 className="text-2xl font-bold text-white">TV Shows</h2>
            <div className="mt-6 space-y-4">
              {channels.map((channel, index) => (
                <a
                  key={index}
                  href={channel.link}
                  className="flex items-center p-4 bg-gray-800 rounded-lg hover:bg-gray-700"
                >
                  <img
                    src={channel.logo}
                    alt={`${channel.name} Logo`}
                    className="w-16 h-16 mr-4"
                  />
                  <span className="text-white font-medium">{channel.name}</span>
                </a>
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