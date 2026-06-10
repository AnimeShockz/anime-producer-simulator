"use client" import React...`

The space after `"use client"` might have been preserved but there was no semicolon. The error actually now says:
`1 | "use client" import React...`

Wait, let me re-read the error:
`1 | "use client" import React, { useState, useMemo } from "react";`

So there IS a space between `"use client"` and `import`, but no semicolon. The JavaScript parser sees `"use client"` as a string literal (expression statement) and then sees `import` which is invalid in that context.

The fix is simply to change:
`"use client" import` 
to:
`"use client"; import`

Or even better, put them on separate lines:
```
"use client";

import React...
```

I need to make sure I use a newline or semicolon between `"use client"` and `import`.

Similarly, for ShowRoster.tsx the user is complaining about another error. Let me look at ShowRoster again.

Wait, the user only sent one error block for StudioRoster this time. Actually the user says "Fix error" and sent the StudioRoster error. So I just need to fix StudioRoster.tsx again.

I need to make sure I put a newline or semicolon after `"use client"`.

Let me also check ShowRoster.tsx since it was also broken before. But the user's most recent request specifically mentions the StudioRoster error.

I will rewrite StudioRoster.tsx with proper formatting (multiline) to ensure it's syntactically correct.

Ah, I see the pattern. The previous fix for ShowRoster.tsx added a `;` after `"use client"`. But for StudioRoster.tsx I missed it.

Actually looking at my last response for StudioRoster.tsx, I wrote: `"use client" import...` without a semicolon! That is the root cause.

So I need to provide a clean, properly formatted StudioRoster.tsx.</think>I'll fix the syntax error by adding a semicolon and line break after `"use client"` so the imports are parsed correctly.

<dyad-write path="src/components/StudioRoster.tsx" description="Rewriting StudioRoster.tsx with correct syntax and formatting">
"use client";

import React, { useState, useMemo } from "react";
import { Studio } from "@/data/studios";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface StudioRosterProps {
  studios: Studio[];
  selectedStudio: Studio | null;
  onSelectStudio: (studio: Studio) => void;
}

export default function StudioRoster({
  studios,
  selectedStudio,
  onSelectStudio,
}: StudioRosterProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState<"popularity" | "name" | "size">(
    "popularity"
  );
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [detailStudio, setDetailStudio] = useState<Studio | null>(null);

  const handleSelect = (studio: Studio) => {
    onSelectStudio(studio);
    setIsDialogOpen(false);
  };

  const openDetailDialog = (studio: Studio) => {
    setDetailStudio(studio);
    setIsDialogOpen(true);
  };

  const sortedStudios = useMemo(() => {
    const list = [...studios];
    switch (sortOption) {
      case "popularity":
        return list.sort((a, b) => b.popularity - a.popularity);
      case "name":
        return list.sort((a, b) => a.name.localeCompare(b.name));
      case "size": {
        const sizeOrder: Record<Studio["size"], number> = {
          small: 0,
          medium: 1,
          large: 2,
        };
        return list.sort((a, b) => sizeOrder[a.size] - sizeOrder[b.size]);
      }
      default:
        return list;
    }
  }, [studios, sortOption]);

  const filteredStudios = useMemo(() => {
    if (!searchTerm) return sortedStudios;
    return sortedStudios.filter((studio) =>
      studio.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [sortedStudios, searchTerm]);

  return (
    <div className="flex flex-col h-full">
      <h2 className="text-lg font-semibold mb-4">Select Studio</h2>

      <div className="mb-4 flex flex-col gap-2">
        <Input
          type="text"
          placeholder="Search studios..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full"
        />
        <Button
          variant="outline"
          className="px-3 self-start"
          onClick={() => {
            const options = ["popularity", "name", "size"] as const;
            const currentIndex = options.indexOf(sortOption);
            const nextIndex = (currentIndex + 1) % options.length;
            setSortOption(options[nextIndex]);
          }}
        >
          Sort: {sortOption}
        </Button>
      </div>

      <ScrollArea className="flex-1">
        <div className="space-y-3 pr-4">
          {filteredStudios.length === 0 ? (
            <p className="text-sm text-slate-500 text-center py-4">
              No studios found
            </p>
          ) : (
            filteredStudios.map((studio) => (
              <Card
                key={studio.id}
                className={`cursor-pointer transition-all hover:shadow-md ${
                  selectedStudio?.id === studio.id ? "ring-2 ring-primary" : ""
                }`}
                onClick={() => openDetailDialog(studio)}
              >
                <CardContent className="pt-4">
                  <h3 className="font-medium text-base">{studio.name}</h3>
                  <p className="text-sm text-slate-600 mt-1">
                    Min Budget: {" "}
                    <span className="font-semibold">{studio.minBudget}</span>
                  </p>
                </CardContent>
              </Card>
            ))
          )}
        </div>
      </ScrollArea>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>{detailStudio?.name}</DialogTitle>
            <DialogDescription>
              {detailStudio &&
                `Minimum ${detailStudio.minBudget} budget • ${detailStudio.size} studio`}
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div>
              <h4 className="font-medium text-sm mb-1">Style</h4>
              <p className="text-sm text-slate-700 leading-relaxed">
                {detailStudio?.styleDescription}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <span className="font-medium text-slate-600">Complexity:</span>{" "}
                {detailStudio?.complexity}
              </div>
              <div>
                <span className="font-medium text-slate-600">Pacing:</span>{" "}
                {detailStudio?.pacing}
              </div>
              <div>
                <span className="font-medium text-slate-600">Length:</span>{" "}
                {detailStudio?.lengthPreference}
              </div>
              <div>
                <span className="font-medium text-slate-600">Genres:</span>{" "}
                {detailStudio && detailStudio.genres.slice(0, 3).join(", ")}
              </div>
            </div>

            {detailStudio && selectedStudio?.id !== detailStudio.id && (
              <Button
                className="w-full"
                onClick={() => handleSelect(detailStudio)}
              >
                Select This Studio
              </Button>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}