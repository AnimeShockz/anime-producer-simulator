import React, { useMemo, useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { mangaList, Manga } from "@/data/manga";
import {
  budgetOrder,
  budgetValue,
  BudgetLevel,
  studios,
  Studio
} from "@/data/studios";
import ShowRoster from "@/components/ShowRoster";
import StudioRoster from "@/components/StudioRoster";

const ROSTER_SIZE = 7;

const formatBudget = (value: BudgetLevel) =>
  value.charAt(0).toUpperCase() + value.slice(1);

const formatArray = (values: string[]) =>
  values.slice(0, 3).join(", ") + (values.length > 3 ? "..." : "");

const formatStatus = (manga: Manga) => {
  if (manga.status === "finished") return "Finished";
  return `Running (${manga.releaseFrequency ?? "ongoing"})`;
};

const formatNumber = (value: number) => value.toLocaleString();

const shuffle = <T,>(items: T[]) => [...items].sort(() => Math.random() - 0.5);

const createInitialRoster = () => shuffle(mangaList).slice(0, ROSTER_SIZE);

const pickShows = (pool: Manga[], count: number) => shuffle(pool).slice(0, count);

const getAvailablePool = (currentRoster: Manga[], blockedIds: Set<string>) =>
  mangaList.filter(
    (manga) =>
      !blockedIds.has(manga.id) &&
      !currentRoster.some((rosterManga) => rosterManga.id === manga.id)
  );

const getMangaComplexity = (manga: Manga) => {
  if (manga.chapters > 120) return "high";
  if (manga.chapters > 60) return "medium";
  return "low";
};

const getMangaLength = (manga: Manga) => {
  if (manga.chapters < 60) return "short";
  if (manga.chapters < 150) return "medium";
  return "long";
};

const getPacingPreference = (manga: Manga) => {
  if (manga.releaseFrequency === "weekly") return "fast";
  return "medium";
};

const inferAgeGroup = (manga: Manga) => {
  const magazine = manga.magazine.toLowerCase();
  if (magazine.includes("shojo")) return "shojo";
  if (magazine.includes("seinen") || magazine.includes("afternoon")) {
    return "seinen";
  }
  return "shonen";
};

const inferGenres = (manga: Manga) => {
  const title = manga.title.toLowerCase();
  const genres: string[] = [];

  if (
    title.includes("samurai") ||
    title.includes("ninja") ||
    title.includes("crusade") ||
    title.includes("battalion") ||
    title.includes("ronin") ||
    title.includes("knight") ||
    title.includes("errant") ||
    title.includes("exorcist") ||
    title.includes("monster") ||
    title.includes("battle") ||
    title.includes("dragon")
  ) {
    genres.push("action");
  }

  if (
    title.includes("neon") ||
    title.includes("cyber") ||
    title.includes("mecha") ||
    title.includes("drift") ||
    title.includes("sky") ||
    title.includes("harbor")
  ) {
    genres.push("sci-fi");
  }

  if (
    title.includes("princess") ||
    title.includes("kingdom") ||
    title.includes("dragon") ||
    title.includes("academy") ||
    title.includes("grandmaster") ||
    title.includes("familiar")
  ) {
    genres.push("fantasy");
  }

  if (
    title.includes("café") ||
    title.includes("cafe") ||
    title.includes("winds") ||
    title.includes("detective") ||
    title.includes("gourmet") ||
    title.includes("bento") ||
    title.includes("convenience") ||
    title.includes("lunch") ||
    title.includes("karaoke") ||
    title.includes("idol")
  ) {
    genres.push("slice of life");
  }

  if (
    title.includes("ghost") ||
    title.includes("spirit") ||
    title.includes("spirits") ||
    title.includes("exorcist") ||
    title.includes("demon") ||
    title.includes("monster") ||
    title.includes("shrine")
  ) {
    genres.push("supernatural");
  }

  if (
    title.includes("detective") ||
    title.includes("mailbox") ||
    title.includes("underpass")
  ) {
    genres.push("mystery");
  }

  if (
    title.includes("cherry") ||
    title.includes("postcards") ||
    title.includes("roommate") ||
    title.includes("princess") ||
    title.includes("idol")
  ) {
    genres.push("romance");
  }

  if (
    title.includes("mini golf") ||
    title.includes("bicycle") ||
    title.includes("drift") ||
    title.includes("lunch")
  ) {
    genres.push("sports");
  }

  if (!genres.length) genres.push("drama");
  return genres;
};

const inferThemes = (manga: Manga) => {
  const title = manga.title.toLowerCase();
  const themes: string[] = [];

  if (
    title.includes("crusade") ||
    title.includes("kingdom") ||
    title.includes("dragon") ||
    title.includes("ronin") ||
    title.includes("battalion") ||
    title.includes("knight") ||
    title.includes("errant") ||
    title.includes("bicycle") ||
    title.includes("harbor")
  ) {
    themes.push("adventure");
  }

  if (
    title.includes("samurai") ||
    title.includes("ninja") ||
    title.includes("mecha") ||
    title.includes("battalion") ||
    title.includes("exorcist") ||
    title.includes("battle") ||
    title.includes("drift")
  ) {
    themes.push("action");
  }

  if (
    title.includes("café") ||
    title.includes("cafe") ||
    title.includes("winds") ||
    title.includes("gourmet") ||
    title.includes("bento") ||
    title.includes("lunch") ||
    title.includes("convenience") ||
    title.includes("mailbox") ||
    title.includes("cherry") ||
    title.includes("postcards")
  ) {
    themes.push("healing");
  }

  if (
    title.includes("cyber") ||
    title.includes("neon") ||
    title.includes("mecha") ||
    title.includes("drift") ||
    title.includes("sky")
  ) {
    themes.push("sci-fi");
  }

  if (
    title.includes("princess") ||
    title.includes("cherry") ||
    title.includes("postcards") ||
    title.includes("idol") ||
    title.includes("roommate") ||
    title.includes("mailbox")
  ) {
    themes.push("romance");
  }

  if (
    title.includes("detective") ||
    title.includes("mailbox") ||
    title.includes("underpass") ||
    title.includes("moonlit")
  ) {
    themes.push("mystery");
  }

  if (
    title.includes("monster") ||
    title.includes("karaoke") ||
    title.includes("mini golf") ||
    title.includes("salaryman") ||
    title.includes("lunch")
  ) {
    themes.push("comedy");
  }

  if (
    title.includes("mini golf") ||
    title.includes("bicycle") ||
    title.includes("drift") ||
    title.includes("lunch")
  ) {
    themes.push("sports");
  }

  if (!themes.length) themes.push("drama");
  return themes;
};

const includesAny = (studioValues: string[], candidateValues: string[]) => {
  if (studioValues.includes("any")) return true;
  return candidateValues.some((candidate) => studioValues.includes(candidate));
};

const getStudioFitScore = (manga: Manga, studio: Studio) => {
  let score = 0;
  if (includesAny(studio.genres, inferGenres(manga))) score += 1.25;
  if (includesAny(studio.themes, inferThemes(manga))) score += 0.75;
  if (includesAny(studio.ageGroups, [inferAgeGroup(manga)])) score += 0.5;

  const complexityMap: Record<string, number> = {
    low: 1,
    medium: 2,
    high: 3,
    any: 2
  };
  const lengthMap: Record<string, number> = {
    short: 1,
    medium: 2,
    long: 3,
    any: 2
  };
  const pacingMap: Record<string, number> = {
    slow: 1,
    medium: 2,
    fast: 3,
    any: 2
  };

  if (studio.complexity !== "any") {
    if (
      complexityMap[studio.complexity] ===
      complexityMap[getMangaComplexity(manga)]
    ) {
      score += 0.75;
    } else {
      score -= 0.25;
    }
  }

  if (studio.lengthPreference !== "any") {
    if (
      lengthMap[studio.lengthPreference] ===
      lengthMap[getMangaLength(manga)]
    ) {
      score += 0.5;
    } else {
      score -= 0.25;
    }
  }

  if (studio.pacing !== "any") {
    if (
      pacingMap[studio.pacing] ===
      pacingMap[getPacingPreference(manga)]
    ) {
      score += 0.5;
    } else {
      score -= 0.25;
    }
  }

  return score;
};

const generateCriticReview = (
  manga: Manga,
  studio: Studio,
  budget: BudgetLevel
) => {
  const budgetNum = budgetValue[budget];
  const studioMinBudgetNum = budgetValue[studio.minBudget];

  if (budgetNum < studioMinBudgetNum) {
    return [
      "AI Critic Review: Project Declined",
      "",
      `${studio.name} declined the project. Their minimum accepted budget is ${formatBudget(
        studio.minBudget
      )}, but the assigned budget was only ${formatBudget(budget)}.`
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
    10: "Masterpiece"
  };
  const rating = ratingMap[finalScore];

  const budgetComment =
    budgetNum >= studioMinBudgetNum
      ? `The ${formatBudget(budget)} budget met ${studio.name}'s minimum requirement and gave the production enough room to lean into its house style.`
      : `The ${formatBudget(budget)} budget fell below ${studio.name}'s minimum requirement, creating production constraints before airing even began.`;

  const verdict =
    finalScore >= 9
      ? "A breakout hit. Critics praised the adaptation as a rare case where the studio amplified the manga's strengths rather than merely translating them."
      : finalScore >= 7
        ? "A strong adaptation with clear strengths, though a few fans may debate pacing, episode count, or how faithfully certain arcs were handled."
        : finalScore >= 5
          ? "A competent but uneven adaptation. It has memorable moments, but the source material and studio style do not fully align."
          : finalScore >= 3
            ? "A disappointing adaptation. The studio choice, budget pressure, or format mismatch left too much of the manga's appeal behind."
            : "A troubled adaptation. Critics viewed it as a poor pairing between source material, studio strengths, and production resources.";

  return [
    `AI Critic Review: ${rating} (${finalScore}/10)`,
    "",
    `Source material: ${manga.title} (${formatStatus(manga)}, ${manga.chapters} chapters, ${manga.tankobonVolumes} tankobon volumes, ${formatNumber(
      manga.salesVolumes
    )} total tankobon sales, ${manga.popularity}% popularity).`,
    `Magazine context: ${manga.magazine}.`,
    `Studio choice: ${studio.name} is a ${studio.size} studio. ${studio.styleDescription}`,
    `Fit analysis: inferred genres were ${formatArray(inferGenres(manga))}; inferred themes were ${formatArray(
      inferThemes(manga)
    )}; target age group was ${inferAgeGroup(manga)}; preferred length was ${getMangaLength(
      manga
    )}; preferred pacing was ${getPacingPreference(manga)}.`,
    `Production context: ${budgetComment}`,
    `Verdict: ${verdict}`
  ].join("\n");
};

const Index = () => {
  const [availableManga, setAvailableManga] = useState<Manga[]>(createInitialRoster);
  const [selectedManga, setSelectedManga] = useState<Manga | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<BudgetLevel>("average");
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isProducing, setIsProducing] = useState(false);
  const [season, setSeason] = useState(1);

  const ineligibleReason = useMemo(() => {
    if (!selectedStudio) return "";
    if (budgetValue[selectedBudget] < budgetValue[selectedStudio.minBudget]) {
      return `${selectedStudio.name} requires at least a ${selectedStudio.minBudget} budget.`;
    }
    return "";
  }, [selectedBudget, selectedStudio]);

  const canProduce =
    Boolean(selectedManga && selectedStudio) && ineligibleReason.length === 0;

  const handleMangaSelect = (manga: Manga) => {
    setSelectedManga(manga);
    setResult(null);
  };

  const handleBudgetChange = (value: string) => {
    setSelectedBudget(value as BudgetLevel);
    setResult(null);
  };

  const handleStudioSelect = (studio: Studio) => {
    setSelectedStudio(studio);
    setResult(null);
  };

  const handleProduce = () => {
    if (!canProduce || !selectedManga || !selectedStudio) return;

    const producedManga = selectedManga;
    const producedStudio = selectedStudio;
    const producedBudget = selectedBudget;

    setIsProducing(true);
    setResult(null);

    window.setTimeout(() => {
      setResult(
        generateCriticReview(producedManga, producedStudio, producedBudget)
      );

      setAvailableManga((current) => {
        const adaptedIds = new Set<string>([producedManga.id]);
        let nextRoster = current.filter((manga) => !adaptedIds.has(manga.id));

        if (nextRoster.length > 3 && Math.random() < 0.25) {
          const marketDrop = nextRoster[Math.floor(Math.random() * nextRoster.length)];
          if (marketDrop) adaptedIds.add(marketDrop.id);
        }

        nextRoster = nextRoster.filter((manga) => !adaptedIds.has(manga.id));
        const additions = pickShows(getAvailablePool(nextRoster, adaptedIds), 1);

        return shuffle([...additions, ...nextRoster]).slice(0, ROSTER_SIZE);
      });

      setSelectedManga(null);
      setSeason((currentSeason) => currentSeason + 1);
      setIsProducing(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 text-slate-950">
      <div className="mx-auto max-w-5xl space-y-6">
        <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
          <CardHeader>
            <CardTitle className="text-2xl font-bold">
              Anime Producer Simulator
            </CardTitle>
            <CardDescription>
              Pick a manga from the current market roster, assign a budget, choose a studio, then wait for the AI critic review after the simulated airing run. Producing a show removes it from the roster and may refresh the market.
            </CardDescription>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-[1.15fr_0.85fr]">
              <ShowRoster
                mangaList={availableManga}
                selectedManga={selectedManga}
                season={season}
                onSelectManga={handleMangaSelect}
              />
              <StudioRoster
                studios={studios}
                selectedStudio={selectedStudio}
                onSelectStudio={handleStudioSelect}
              />
            </div>

            <div className="space-y-2">
              <label className="text-sm font-medium">Budget</label>
              <Select
                disabled={isProducing}
                value={selectedBudget}
                onValueChange={handleBudgetChange}
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Choose a budget" />
                </SelectTrigger>
                <SelectContent>
                  {budgetOrder.map((budget) => (
                    <SelectItem key={budget} value={budget}>
                      {formatBudget(budget)}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {ineligibleReason && (
              <p className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                {ineligibleReason}
              </p>
            )}

            <Button
              disabled={!canProduce || isProducing}
              className="w-full"
              onClick={handleProduce}
            >
              {isProducing ? "Waiting for airing season..." : "Produce Anime"}
            </Button>
          </CardContent>
        </Card>

        {selectedManga && selectedStudio && (
          <div className="grid gap-4 lg:grid-cols-2">
            <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{selectedManga.title}</CardTitle>
                <CardDescription>
                  {formatStatus(selectedManga)} • {selectedManga.magazine}
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm text-slate-700 md:grid-cols-2">
                <div>
                  <span className="font-medium text-slate-950">Popularity:</span>{" "}
                  {selectedManga.popularity}%
                </div>
                <div>
                  <span className="font-medium text-slate-950">Sales:</span>{" "}
                  {formatNumber(selectedManga.salesVolumes)} total tankobon
                </div>
                <div>
                  <span className="font-medium text-slate-950">Chapters:</span>{" "}
                  {selectedManga.chapters}
                </div>
                <div>
                  <span className="font-medium text-slate-950">Tankobon:</span>{" "}
                  {selectedManga.tankobonVolumes}
                </div>
              </CardContent>
            </Card>

            <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
              <CardHeader className="pb-2">
                <CardTitle className="text-lg">{selectedStudio.name}</CardTitle>
                <CardDescription>
                  Minimum {formatBudget(selectedStudio.minBudget)} • {selectedStudio.size}{" "}
                  studio
                </CardDescription>
              </CardHeader>
              <CardContent className="grid gap-3 text-sm text-slate-700 md:grid-cols-2">
                <div>
                  <span className="font-medium text-slate-950">Genres:</span>{" "}
                  {formatArray(selectedStudio.genres)}
                </div>
                <div>
                  <span className="font-medium text-slate-950">Themes:</span>{" "}
                  {formatArray(selectedStudio.themes)}
                </div>
                <div>
                  <span className="font-medium text-slate-950">Age groups:</span>{" "}
                  {formatArray(selectedStudio.ageGroups)}
                </div>
                <div>
                  <span className="font-medium text-slate-950">Length:</span>{" "}
                  {selectedStudio.lengthPreference}
                </div>
                <div>
                  <span className="font-medium text-slate-950">Complexity:</span>{" "}
                  {selectedStudio.complexity}
                </div>
                <div>
                  <span className="font-medium text-slate-950">Pacing:</span>{" "}
                  {selectedStudio.pacing}
                </div>
                <div className="md:col-span-2">
                  <span className="font-medium text-slate-950">Style:</span>{" "}
                  {selectedStudio.styleDescription}
                </div>
              </CardContent>
            </Card>
          </div>
        )}

        {result && (
          <Card className="rounded-2xl border border-slate-200 bg-white shadow-sm">
            <CardHeader>
              <CardTitle>AI Critic Review</CardTitle>
              <CardDescription>Generated after the simulated airing run.</CardDescription>
            </CardHeader>
            <CardContent>
              <Textarea value={result} readOnly className="min-h-72 resize-none" />
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Index;