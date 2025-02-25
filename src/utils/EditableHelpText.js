// EditableHelpText.js
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css"; // Import Quill styles
import "react-quill/dist/quill.bubble.css"; // Import Quill styles
import { setTranslation, updateTranslation } from "./../store/translationSlice";

const EditableHelpText = ({ field }) => {
  const dispatch = useDispatch();

  const showHelpFields = useSelector((state) => state.settings.showHelpFields);

  const selectedLanguage = useSelector(
    (state) => state.translations.selectedLanguage
  );

  const translation = useSelector((state) => {
    return state.translations.data.find(
      (t) => t.field === field && t.language === selectedLanguage
    );
  });

  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(translation ? translation.text : field);

  const handleSaveClick = () => {
    dispatch(setTranslation({ field, language: selectedLanguage, text }));
    dispatch(updateTranslation({ field, language: selectedLanguage, text }));
    setIsEditing(false);
  };

  useEffect(() => {
    if (translation) {
      setText(translation.text);
      setIsEditing(false); // Reset editing state when translation changes
    }
  }, [translation, selectedLanguage]);

  useEffect(() => {
    if (translation && text !== translation.text) {
      setIsEditing(true);
    } else {
      setIsEditing(false); // Ensure save button is not shown initially
    }
  }, [text, translation]);

  if (showHelpFields === "NO") {
    return null;
  }

  const theme = showHelpFields === "YES" ? "snow" : "bubble";

  return (
    <div>
      <ReactQuill
        value={text}
        onChange={setText}
        theme={theme}
        readOnly={showHelpFields === "READONLY"}
      />
      {showHelpFields === "READONLY" ? null : isEditing ? (
        <button onClick={handleSaveClick}>Save</button>
      ) : null}
    </div>
  );
};

export default EditableHelpText;
