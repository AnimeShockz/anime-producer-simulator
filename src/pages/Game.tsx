"use client";

import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";
import { useT } from "@/lib/i18n";

export default function Game() {
  const navigate = useNavigate();
  const { language, setLanguage } = useLanguage();
  const { t } = useT();

  return (
    <div className="min-h-screen bg-slate-50 p-6 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4 text-slate-900">
        🎮 {t("gameSettings")}
      </h1>
      <p className="mb-6 text-slate-700">
        The Game page is now a simple, reliable placeholder.
      </p>

      <Button onClick={() => navigate("/")}>← {t("mainMenu")}</Button>

      {/* Language selector (keeps the UI functional) */}
      <div className="mt-8">
        <label className="block mb-2 text-sm font-medium text-slate-600">
          {t("language")}
        </label>
        <select
          value={language}
          onChange={(e) => setLanguage(e.target.value as any)}
          className="rounded border border-slate-300 p-2"
        >
          <option value="English">English</option>
          <option value="Japanese">日本語</option>
          <option value="Korean">한국어</option>
          <option value="Chinese">中文</option>
          <option value="Spanish">Español</option>
          <option value="French">Français</option>
          <option value="German">Deutsch</option>
          <option value="Italian">Italiano</option>
          <option value="Portuguese">Português</option>
          <option value="Russian">Русский</option>
        </select>
      </div>
    </div>
  );
}