import React, { useState } from 'react';
import {
  Button,
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Textarea,
} from '@/components/ui/*';
import { mangaList, Manga } from '@/data/manga';
import { studios, Studio, BudgetLevel } from '@/data/studios';

const Index = () => {
  const [selectedManga, setSelectedManga] = useState<Manga | null>(null);
  const [selectedBudget, setSelectedBudget] = useState<BudgetLevel>('average');
  const [selectedStudio, setSelectedStudio] = useState<Studio | null>(null);
  const [result, setResult] = useState<string | null>(null);
  const [isProducing, setIsProducing] = useState(false);

  const handleProduce = () => {
    if (!selectedManga || !selectedStudio) return;
    setIsProducing(true);
    // Simulate production delay
    setTimeout(() => {
      const review = generateCriticReview(selectedManga, selectedStudio, selectedBudget);
      setResult(review);
      setIsProducing(false);
    }, 1500);
  };

  const generateCriticReview = (
    manga: Manga,
    studio: Studio,
    budget: BudgetLevel
  ): string => {
    // Simple scoring system
    let score = 0;
    const budgetNum = budgetValue[budget];
    const studioMinBudgetNum = budgetValue[studio.minBudget];

    // Budget adequacy
    if (budgetNum >= studioMinBudgetNum) {
      score += 2;
    } else {
      score -= 2; // underfunded
    }

    // Popularity factor
    score += Math.round(manga.popularity / 20); // 0-5

    // Sales factor
    score += Math.min(Math.round(manga.salesVolumes / 3), 4); // 0-4

    // Length factor: longer manga may be harder to adapt well
    if (manga.chapters > 150) {
      score -= 1;
    } else if (manga.chapters < 50) {
      score += 1;
    }

    // Status factor: finished manga may have complete story
    if (manga.status === 'finished') {
      score += 1;
    } else {
      score -= 0.5; // ongoing may have filler risk
    }

    // Studio fit: check if manga genres/themes match studio strengths
    const genreMatch = studio.genres.some((g) =>
      ['action', 'fantasy', 'romance', 'comedy', 'slice of life', 'drama', 'sci-fi', 'horror', 'mecha'].some(
        (mg) => manga.title.toLowerCase().includes(g) // very rough proxy
      )
    );
    // Since we don't have genre tags on manga, we'll use a heuristic based on title keywords
    const titleLower = manga.title.toLowerCase();
    let genreFit = 0;
    if (titleLower.includes('samurai') || titleLower.includes('ninja') || titleLower.includes('mecha') || titleLower.includes('crusade')) {
      genreFit = studio.genres.includes('action') ? 1 : 0;
    }
    if (titleLower.includes('café') || titleLower.includes('detective') || titleLower.includes('winds')) {
      genreFit = studio.genres.includes('slice of life') || studio.genres.includes('drama') ? 1 : 0;
    }
    if (titleLower.includes('princess') || titleLower.includes('kingdom')) {
      genreFit = studio.genres.includes('fantasy') ? 1 : 0;
    }
    score += genreFit;

    // Complexity match
    const complexityMap: Record<string, number> = { low: 1, medium: 2, high: 3 };
    const mangaComplexity = manga.chapters > 100 ? 'high' : manga.chapters > 50 ? 'medium' : 'low';
    if (complexityMap[mangaComplexity] === complexityMap[studio.complexity]) {
      score += 1;
    } else {
      score -= 0.5;
    }

    // Pacing match: weekly manga -> fast pacing preferred
    const pacingPreference = manga.releaseFrequency === 'weekly' ? 'fast' : manga.releaseFrequency === 'monthly' ? 'medium' : 'medium';
    if (studio.pacing === pacingPreference) {
      score += 1;
    } else {
      score -= 0.5;
    }

    // Clamp score
    score = Math.max(0, Math.min(10, score));

    // Generate review text based on score and studio style
    const ratingMap: Record<number, string> = {
      0: 'Abysmal',
      1: 'Terrible',
      2: 'Poor',
      3: 'Below Average',
      4: 'Average',
      5: 'Decent',
      6: 'Good',
      7: 'Very Good',
      8: 'Great',
      9: 'Excellent',
      10: 'Masterpiece',
    };
    const rating = ratingMap[score];

    let review = `Critic Review: ${rating} (${score}/10)\n\n`;
    review += `Studio ${studio.name} delivered an adaptation that ${studio.styleDescription.toLowerCase()}\n`;
    review += `The source material "${manga.title}" (Popularity: ${manga.popularity}%, Sales: ${manga.salesVolumes}M volumes) `;
    review += `was adapted with a ${budget} budget. `;
    if (budgetNum < studioMinBudgetNum) {
      review += `However, the budget was below the studio's typical minimum, which may have constrained production. `;
    }
    review += `Overall, the adaptation `;
    if (score >= 8) {
      review += `was a resounding success, capturing the essence of the manga while enhancing it with stellar animation.`;
    } else if (score >= 6) {
      review += `was a solid effort that pleased fans, though some noted missed opportunities in storytelling.`;
    } else if (score >= 4) {
      review += `was a mixed reception; while visually adequate, the adaptation struggled with pacing or depth.`;
    } else {
      review += `fell short of expectations, with criticism directed at animation quality, story adaptation, or lack of creativity.`;
    }

    return review;
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-50 to-indigo-100 p-4">
      <Card className="w-full max-w-2xl shadow-2xl">
        <CardHeader className="pb-4">
          <CardTitle className="text-2xl font-bold text-gray-800">Anime Producer Simulator</CardTitle>
          <CardDescription className="text-gray-600">
            Select a manga, assign budget and studio, then produce the anime to see the critic's review.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Form>
            <FormField>
              <FormLabel>Manga</FormLabel>
              <FormControl>
                <Select
                  value={selectedManga?.id ?? ''}
                  onValueChange={(v) => setSelectedManga(mangaList.find((m) => m.id === v) ?? null)}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select a manga..." />
                  </SelectTrigger>
                  <SelectContent>
                    {mangaList.map((m) => (
                      <SelectItem key={m.id} value={m.id}>
                        {m.title} ({m.status === 'finished' ? 'Finished' : `Running (${m.releaseFrequency})`})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormField>

            <FormField>
              <FormLabel>Budget</FormLabel>
              <FormControl>
                <Select
                  value={selectedBudget}
                  onValueChange={(v) => setSelectedBudget(v)}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select budget..." />
                  </SelectTrigger>
                  <SelectContent>
                    {budgetOrder.map((b) => (
                      <SelectItem key={b} value={b}>
                        {b.charAt(0).toUpperCase() + b.slice(1)}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormField>

            <FormField>
              <FormLabel>Studio</FormLabel>
              <FormControl>
                <Select
                  value={selectedStudio?.id ?? ''}
                  onValueChange={(v) => setSelectedStudio(studios.find((s) => s.id === v) ?? null)}
                >
                  <SelectTrigger className="w-[200px]">
                    <SelectValue placeholder="Select studio..." />
                  </SelectTrigger>
                  <SelectContent>
                    {studios.map((s) => (
                      <SelectItem key={s.id} value={s.id}>
                        {s.name} (Min: {s.minBudget.charAt(0).toUpperCase() + s.minBudget.slice(1)})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </FormControl>
            </FormField>

            <Button
              onClick={handleProduce}
              disabled={isProducing || !selectedManga || !selectedStudio}
              className="w-full"
            >
              {isProducing ? 'Producing...' : 'Produce Anime'}
            </Button>
          </Form>
        </CardContent>
        {result && (
          <CardFooter className="pt-4">
            <CardTitle className="text-lg font-semibold text-gray-800">Critic Review</CardTitle>
            <Textarea
              value={result}
              readOnly
              className="w-full h-32 mt-2 p-2 text-gray-700 bg-gray-50 border border-gray-200 rounded"
            />
          </CardFooter>
        )}
      </Card>
    </div>
  );
};

export default Index;