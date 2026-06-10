"use client";

import React from "react";
import { Manga } from "@/data/manga";
import { Studio, BudgetLevel, budgetValue, studios } from "@/data/studios";
import { getStudioFitScore } from "@/lib/studioFit";
import { formatBudget, formatStatus, formatNumber, formatArray } from "@/utils/formatters";
import { inferGenres } from "@/utils/inferGenres";
import { inferThemes } from "@/utils/inferThemes";
import { inferAgeGroup } from "@/utils/inferAgeGroup";
import { getMangaLength } from "@/utils/getMangaLength";
import { getPacingPreference } from "@/utils/getPacingPreference";

/* -------------------------------------------------------------------------- */
/*  Critic review generation (same logic as before, now with proper imports) */
/* -------------------------------------------------------------------------- */
const generateCriticReview = (manga: Manga, studio: Studio, budget: BudgetLevel) => {
  const budgetNum = budgetValue[budget];
  const studioMinBudgetNum = budgetValue[studio.minBudget];

  // Length‑vs‑budget penalty (same as before)
  const lengthPenalty = (() => {
    const length = getMangaLength(manga);
    if (budgetNum <= budgetValue["low"]) {
      if (length === "long") return -2;
      if (length === "medium") return -1;
    }
    if (budgetNum === budgetValue["average"] && length === "long") return -1;
    return 0;
  })();

  if (budgetNum < studioMinBudgetNum) {
    return [
      "AI Critic Review: Project Declined",
      "",
      `${studio.name} declined the project. Their minimum accepted budget is ${formatBudget(
        studio.minBudget,
      )}, but the assigned budget was only ${formatBudget(budget)}.`,
      "Result: The animation looks cheap and the sound design feels thin due to insufficient funds.",
    ].join("\n");
  }

  let score = 0;
  score += 2;
  score += Math.round(manga.popularity / 20);
  score += Math.min(Math.round(manga.salesVolumes / 5_000_000), 4);
  if (manga.chapters > 200) {
    score -= 1.5;
  } else if (manga.chapters < 60) {
    score += 0.5;
  } else {
    score += 0.25;
  }
  if (manga.status === "finished") {
    score += 1;
  } else if (manga.releaseFrequency === "weekly") {
    score += 0.5;
  } else {
    score -= 0.25;
  }
  score += getStudioFitScore(manga, studio);
  score += budgetNum >= 5 ? 0.75 : budgetNum <= 2 ? -0.75 : 0.25;
  score += lengthPenalty;

  const finalScore = Math.max(0, Math.min(10, Math.round(score)));
  const ratingMap: Record<number, string> = {
    0: "Abysmal",
    1: "Terrible",
    2: "Poor",
    3: "Below Average",
    4: "Average",
    5: "Decent",
    6: "Good",
    7: "Very Good",
    8: "Great",
    9: "Excellent",
    10: "Masterpiece",
  };
  const rating = ratingMap[finalScore];

  const budgetComment =
    budgetNum >= studioMinBudgetNum
      ? `The ${formatBudget(budget)} budget met ${studio.name}'s minimum requirement and gave the production enough room to lean into its house style.`
      : `The ${formatBudget(budget)} budget fell below ${studio.name}'s minimum requirement, creating production constraints before airing even began.`;

  const lengthNote =
    lengthPenalty < 0
      ? "Because the series is long relative to the modest budget, the animation quality and sound design suffer, making the overall experience feel thin."
      : "The chosen budget comfortably supports the series length, allowing solid visuals and audio.";

  const triangleCultNote =
    studio.id === "triangle-staff" && score >= 5
      ? "\n\n⚡️ Cult Classic Alert: Despite the studio's notorious reputation, this perfect existential slice‑of‑life match turned the project into a cult phenomenon."
      : "";

  return [
    `AI Critic Review: ${rating} (${finalScore}/10)`,
    "",
    `Source material: ${manga.title} (${formatStatus(manga)}, ${manga.chapters} chapters, ${manga.tankobonVolumes} tankobon volumes, ${formatNumber(
      manga.salesVolumes,
    )} total tankobon sales, ${manga.popularity}% popularity).`,
    `Magazine context: ${manga.magazine}.`,
    `Studio choice: ${studio.name} is a ${studio.size} studio. ${studio.styleDescription}`,
    `Fit analysis: inferred genres were ${formatArray(inferGenres(manga))}; inferred themes were ${formatArray(
      inferThemes(manga),
    )}; target age group was ${inferAgeGroup(manga)}; preferred length was ${getMangaLength(
      manga,
    )}; preferred pacing was ${getPacingPreference(manga)}.`,
    `Production context: ${budgetComment}`,
    lengthNote,
    `Verdict: ${finalScore >= 9
      ? "A breakout hit. Critics praised the adaptation as a rare case where the studio amplified the manga's strengths rather than merely translating them."
      : finalScore >= 7
        ? "A strong adaptation with clear strengths, though a few fans may debate pacing, episode count, or how faithfully certain arcs were handled."
        : finalScore >= 5
          ? "A competent but uneven adaptation. It has memorable moments, but the source material and studio style do not fully align."
          : finalScore >= 3
            ? "A disappointing adaptation. The studio choice, budget pressure, or format mismatch left too much of the manga's appeal behind."
            : "A troubled adaptation. Critics viewed it as a poor pairing between source material, studio strengths, and production resources."
    }${triangleCultNote}`,
  ].join("\n");
};

/* -------------------------------------------------------------------------- */
/*  Placeholder Index page – can be expanded later                           */
/* -------------------------------------------------------------------------- */
const Index: React.FC = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Anime Producer Simulator</h1>
      <p className="text-gray-600">
        This is the landing page. The critic review logic is ready for use.
      </p>
    </div>
  );
};

export default Index;