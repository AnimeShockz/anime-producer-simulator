import { Manga } from "@/data/manga";
import { Studio } from "@/data/studios";

import { inferGenres } from "@/utils/inferGenres";
import { inferThemes } from "@/utils/inferThemes";
import { inferAgeGroup } from "@/utils/inferAgeGroup";
import { getMangaLength } from "@/utils/getMangaLength";
import { getPacingPreference } from "@/utils/getPacingPreference";

/**
 * Returns a numeric score (positive = good fit, negative = bad fit)
 * that is added to the overall critic score.
 */
export function getStudioFitScore(manga: Manga, studio: Studio): number {
  const mangaGenres = inferGenres(manga);
  const mangaThemes = inferThemes(manga);
  const mangaAge = inferAgeGroup(manga);
  const mangaLength = getMangaLength(manga);
  const mangaPacing = getPacingPreference(manga);

  let score = 0;

  const genreMatches = mangaGenres.filter((g) => studio.genres.includes(g)).length;
  score += genreMatches * 0.3;

  const themeMatches = mangaThemes.filter((t) => studio.themes.includes(t)).length;
  score += themeMatches * 0.2;

  if (studio.ageGroups.includes(mangaAge)) {
    score += 0.5;
  }

  if (studio.lengthPreference === mangaLength) {
    score += 0.4;
  }

  if (studio.pacing === mangaPacing) {
    score += 0.4;
  }

  // Triangle Staff special case
  if (studio.id === "triangle-staff") {
    const isSliceOfLife = mangaGenres.includes("slice of life");
    const isPsychological = mangaThemes.includes("psychological");
    const isSlow = mangaPacing === "slow";

    const meetsAll = isSliceOfLife && isPsychological && isSlow;

    if (!meetsAll) {
      score -= 5;
    } else {
      score += 5;
    }
  }

  return score;
}