import { Manga } from "@/data/manga";
import { Studio } from "@/data/studios";

/**
 * Helper functions that already exist elsewhere in the codebase.
 * They are imported only for type‑checking; the runtime implementations
 * are defined in other files (e.g., inferGenres, inferThemes, etc.).
 */
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
  // ----- 1️⃣ Basic matching score -----
  const mangaGenres = inferGenres(manga);
  const mangaThemes = inferThemes(manga);
  const mangaAge = inferAgeGroup(manga);
  const mangaLength = getMangaLength(manga); // "short" | "medium" | "long"
  const mangaPacing = getPacingPreference(manga); // "slow" | "medium" | "fast"

  let score = 0;

  // Genre overlap (each matching genre adds 0.3)
  const genreMatches = mangaGenres.filter((g) => studio.genres.includes(g)).length;
  score += genreMatches * 0.3;

  // Theme overlap (each matching theme adds 0.2)
  const themeMatches = mangaThemes.filter((t) => studio.themes.includes(t)).length;
  score += themeMatches * 0.2;

  // Age‑group match (exact match adds 0.5)
  if (studio.ageGroups.includes(mangaAge)) {
    score += 0.5;
  }

  // Length preference match (exact match adds 0.4)
  if (studio.lengthPreference === mangaLength) {
    score += 0.4;
  }

  // Pacing preference match (exact match adds 0.4)
  if (studio.pacing === mangaPacing) {
    score += 0.4;
  }

  // ----- 2️⃣ Triangle Staff special case -----
  if (studio.id === "triangle-staff") {
    // Desired style for Triangle Staff:
    //   - Slice‑of‑life genre
    //   - Psychological theme
    //   - Slow pacing (moody/dark tone is represented by the psychological theme)
    const isSliceOfLife = mangaGenres.includes("slice of life");
    const isPsychological = mangaThemes.includes("psychological");
    const isSlow = mangaPacing === "slow";

    const meetsAll = isSliceOfLife && isPsychological && isSlow;

    if (!meetsAll) {
      // Heavy penalty when the style does not match.
      score -= 5;
    } else {
      // Strong boost – the show becomes a cult classic.
      score += 5;
    }
  }

  return score;
}