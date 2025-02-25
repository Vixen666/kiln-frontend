// src/helpers/useTranslation.js
import { useSelector } from 'react-redux';

const useTranslation = (field) => {
  const translations = useSelector((state) => state.translations.data);
  const selectedLanguage = useSelector((state) => state.translations.selectedLanguage);
  console.log(selectedLanguage)
  const translation = translations.find(
    (t) => t.field === field && t.language === selectedLanguage
  );
  console.log(translation)
  return translation ? translation.text : field;
};

export default useTranslation;