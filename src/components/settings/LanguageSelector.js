// LanguageSelector.js
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeLanguage } from "../../store/translationSlice";
import Flag from "react-world-flags";

const LanguageSelector = () => {
  const dispatch = useDispatch();
  const selectedLanguage = useSelector(
    (state) => state.translations.selectedLanguage
  );

  const handleLanguageChange = (language) => {
    dispatch(changeLanguage(language));
  };
  const langs = [
    { lang: "en", short: "gb", name: "English" },
    { lang: "sv", short: "se", name: "Swedish" },
  ];

  return (
    <div style={{ display: "flex", gap: "10px" }}>
      {" "}
      {langs.map((lang) => (
        <button
          key={lang.lang}
          onClick={() => handleLanguageChange(lang.lang)}
          disabled={selectedLanguage === lang.lang}
          style={{
            padding: "8px 16px",
            cursor: "pointer",
          }}
        >
          <Flag code={lang.short} style={{ width: "52px", height: "32px" }} />
          <p>{lang.name}</p>
        </button>
      ))}
    </div>
  );
};

export default LanguageSelector;
