"use client";

import React, { createContext, useContext, useEffect, useState } from "react";

type Language = 
  | "English"
  | "Japanese"
  | "Korean"
  | "Chinese"
  | "Spanish"
  | "French"
  | "German"
  | "Italian"
  | "Portuguese"
  | "Russian";

interface LanguageContextProps {
  language: Language;
  setLanguage: (lang: Language) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [language, setLanguage] = useState<Language>("English");

  // Load from localStorage on mount
  useEffect(() => {
    const stored = window.localStorage.getItem("app-language");
    if (stored) {
      setLanguage(stored as Language);
    }
  }, []);

  // Persist changes
  useEffect(() => {
    window.localStorage.setItem("app-language", language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = (): LanguageContextProps => {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return ctx;
};