export type Manga = {
  id: string;
  title: string;
  popularity: number;
  salesVolumes: number;
  chapters: number;
  tankobonVolumes: number;
  status: "finished" | "running";
  releaseFrequency: "weekly" | "monthly" | null;
  magazine: string;
  synopsis: string[];
  conceptType: "generic" | "familiar" | "distinctive";
};

export const mangaList: Manga[] = [
  {
    id: "manga-1",
    title: "Starlight Crusade",
    popularity: 78,
    salesVolumes: 12500000,
    chapters: 150,
    tankobonVolumes: 18,
    status: "finished",
    releaseFrequency: null,
    magazine: "Weekly Shōnen Jump",
    conceptType: "generic",
    synopsis: [
      "A farm boy discovers that the comet above his village is actually a sealed royal weapon.",
      "He joins a traveling knight order and learns that his bloodline may be tied to the kingdom's fall.",
      "The story follows training arcs, rival squads, and a final campaign against a corrupted emperor.",
      "It is a straightforward shonen fantasy with clear heroes, clean rivalries, and a classic ending."
    ]
  },
  {
    id: "manga-2",
    title: "Neon Samurai",
    popularity: 65,
    salesVolumes: 8200000,
    chapters: 95,
    tankobonVolumes: 12,
    status: "running",
    releaseFrequency: "weekly",
    magazine: "Weekly Shōnen Jump",
    conceptType: "familiar",
    synopsis: [
      "In a city divided by corporate clans, a young courier inherits an illegal plasma katana.",
      "He refuses to work for the syndicates and becomes a protector of the night markets.",
      "The plot mixes street fights, family loyalty, and the cost of living under constant surveillance.",
      "Its appeal comes from familiar cyberpunk action with a more personal coming-of-age core."
    ]
  },
  {
    id: "manga-3",
    title: "Eclipse Café",
    popularity: 54,
    salesVolumes: 5000000,
    chapters: 60,
    tankobonVolumes: 8,
    status: "running",
    releaseFrequency: "monthly",
    magazine: "Afternoon",
    conceptType: "familiar",
    synopsis: [
      "A shy barista inherits a café that only appears during lunar eclipses.",
      "Each customer arrives with a regret, and the owner must brew the right drink to help them face it.",
      "Romance grows slowly between the owner and a regular who never orders the same thing twice.",
      "The series is cozy, emotional, and built around small human revelations."
    ]
  },
  {
    id: "manga-4",
    title: "Mecha Princess",
    popularity: 82,
    salesVolumes: 15300000,
    chapters: 200,
    tankobonVolumes: 22,
    status: "finished",
    releaseFrequency: null,
    magazine: "Weekly Shōnen Jump",
    conceptType: "generic",
    synopsis: [
      "A runaway princess becomes the pilot of an ancient war machine buried beneath her capital.",
      "Her older brothers fight over the throne while enemy nations close in from every border.",
      "The manga focuses on tournaments, battlefield politics, and increasingly powerful mecha forms.",
      "It is a conventional action fantasy built for big reveals and crowd-pleasing power-ups."
    ]
  },
  {
    id: "manga-5",
    title: "Whispering Winds",
    popularity: 48,
    salesVolumes: 3700000,
    chapters: 45,
    tankobonVolumes: 6,
    status: "running",
    releaseFrequency: "monthly",
    magazine: "Shōjo Comic",
    conceptType: "familiar",
    synopsis: [
      "After her grandmother's death, a city girl returns to a mountain village that speaks through the wind.",
      "She learns to hear messages left behind by people who never said what they needed to say.",
      "The story moves through seasonal festivals, quiet friendships, and one unresolved family secret.",
      "Its tone is gentle and sentimental, aimed at readers who like healing dramas."
    ]
  },
  {
    id: "manga-6",
    title: "Cyber Ninja Chronicles",
    popularity: 70,
    salesVolumes: 9800000,
    chapters: 110,
    tankobonVolumes: 14,
    status: "running",
    releaseFrequency: "weekly",
    magazine: "Weekly Shōnen Jump",
    conceptType: "familiar",
    synopsis: [
      "A failed police cadet joins an underground clan that trains ninjas for digital warfare.",
      "His missions involve hacking shrines, chasing data smugglers, and protecting old neighborhood networks.",
      "The series balances tournament-style rivalries with a larger conspiracy inside the government.",
      "It is familiar action with a neat hook: ancient discipline applied to future crime."
    ]
  },
  {
    id: "manga-7",
    title: "Gourmet Detective",
    popularity: 55,
    salesVolumes: 4200000,
    chapters: 70,
    tankobonVolumes: 9,
    status: "finished",
    releaseFrequency: null,
    magazine: "Monthly Shōnen Magazine",
    conceptType: "distinctive",
    synopsis: [
      "A former restaurant critic solves crimes by reconstructing the final meal of each victim.",
      "His assistant is a practical patrol officer who keeps dragging him back to actual police work.",
      "Each case turns on ingredients, timing, table manners, and the habits of working kitchens.",
      "The mystery format is familiar, but the food-based deductions give it a distinctive flavor."
    ]
  },
  {
    id: "manga-8",
    title: "Dragon Kingdom",
    popularity: 90,
    salesVolumes: 20000000,
    chapters: 250,
    tankobonVolumes: 30,
    status: "finished",
    releaseFrequency: null,
    magazine: "Weekly Shōnen Jump",
    conceptType: "generic",
    synopsis: [
      "The last dragon prince is raised by human swordsmiths after his kingdom is destroyed.",
      "He enters a royal martial tournament to prove that dragons and humans can share a future.",
      "The story builds through rival houses, forbidden magic, and a prophecy that may be a lie.",
      "It is a broad fantasy blockbuster with huge battles and a very traditional hero's journey."
    ]
  },
  {
    id: "manga-9",
    title: "Bento Box Ronin",
    popularity: 61,
    salesVolumes: 4800000,
    chapters: 88,
    tankobonVolumes: 11,
    status: "running",
    releaseFrequency: "weekly",
    magazine: "Weekly Shōnen Magazine",
    conceptType: "distinctive",
    synopsis: [
      "A wandering cook carries a lacquered bento box that once belonged to a disgraced samurai.",
      "Every meal he prepares becomes a lesson in patience, timing, and restraint.",
      "When a school kendo team faces sabotage, he steps in as their temporary lunch manager.",
      "The series mixes food, training, and small-town grudges in a warmer, stranger way than a standard sports manga."
    ]
  },
  {
    id: "manga-10",
    title: "The Last Train to Sapporo",
    popularity: 44,
    salesVolumes: 2900000,
    chapters: 52,
    tankobonVolumes: 7,
    status: "finished",
    releaseFrequency: null,
    magazine: "Afternoon",
    conceptType: "distinctive",
    synopsis: [
      "A burned-out office worker misses the final train north and meets six strangers stranded at the station.",
      "Each chapter follows one passenger's reason for leaving home before dawn.",
      "Snow, missed calls, and half-finished apologies shape the quiet drama.",
      "It is a grounded ensemble story about people who are not ready to arrive anywhere."
    ]
  },
  {
    id: "manga-11",
    title: "Blue Fire Battalion",
    popularity: 67,
    salesVolumes: 7600000,
    chapters: 130,
    tankobonVolumes: 16,
    status: "running",
    releaseFrequency: "weekly",
    magazine: "Weekly Shōnen Jump",
    conceptType: "generic",
    synopsis: [
      "A reckless recruit joins an elite rescue unit that fights fires fueled by supernatural gas.",
      "His squad is made of specialists who compete as fiercely as they cooperate.",
      "The manga follows rescue missions, rank exams, and a hidden arsonist targeting the battalion.",
      "It is a direct action series with team dynamics, rivalries, and escalating disasters."
    ]
  },
  {
    id: "manga-12",
    title: "Mailbox Princess",
    popularity: 50,
    salesVolumes: 3400000,
    chapters: 48,
    tankobonVolumes: 6,
    status: "running",
    releaseFrequency: "monthly",
    magazine: "Shōjo Comic",
    conceptType: "distinctive",
    synopsis: [
      "A girl discovers that letters placed in her school's old mailbox reach a prince in another kingdom.",
      "Their correspondence begins as a prank and becomes a secret diplomatic channel.",
      "The romance grows through handwritten notes, cultural misunderstandings, and small acts of courage.",
      "The fantasy setting is familiar, but the mailbox premise gives it a softer, more intimate shape."
    ]
  },
  {
    id: "manga-13",
    title: "Tokyo Underpass Spirits",
    popularity: 58,
    salesVolumes: 4600000,
    chapters: 76,
    tankobonVolumes: 10,
    status: "running",
    releaseFrequency: "monthly",
    magazine: "Afternoon",
    conceptType: "familiar",
    synopsis: [
      "A night-shift janitor can see the spirits that gather beneath Tokyo's busiest underpasses.",
      "Most are harmless, but some are echoes of accidents the city wants to forget.",
      "He helps them move on while avoiding a bureau that erases supernatural witnesses.",
      "It is a familiar urban ghost mystery with a strong atmosphere and episodic structure."
    ]
  },
  {
    id: "manga-14",
    title: "Seven Days of Cherry Rain",
    popularity: 52,
    salesVolumes: 3900000,
    chapters: 35,
    tankobonVolumes: 5,
    status: "finished",
    releaseFrequency: null,
    magazine: "Shōjo Comic",
    conceptType: "generic",
    synopsis: [
      "Two childhood friends reunite during the week before their high school festival.",
      "Each day brings them closer to a confession neither of them knows how to say.",
      "The story uses rain, cherry blossoms, and festival lights to mark each emotional step.",
      "It is a clean, familiar romance built around timing, hesitation, and first love."
    ]
  },
  {
    id: "manga-15",
    title: "Moonlit Convenience Store",
    popularity: 63,
    salesVolumes: 5700000,
    chapters: 64,
    tankobonVolumes: 8,
    status: "running",
    releaseFrequency: "monthly",
    magazine: "Afternoon",
    conceptType: "distinctive",
    synopsis: [
      "A convenience store on a quiet corner becomes a meeting place for humans and night creatures.",
      "The clerk sells onigiri, bandages, phone chargers, and the occasional curse-breaking umbrella.",
      "Regular customers include a tired vampire, a werewolf student, and a ghost who pays in old coins.",
      "The series is supernatural slice-of-life with a practical, deadpan sense of humor."
    ]
  },
  {
    id: "manga-16",
    title: "Iron Orchid Academy",
    popularity: 71,
    salesVolumes: 8900000,
    chapters: 120,
    tankobonVolumes: 15,
    status: "running",
    releaseFrequency: "weekly",
    magazine: "Weekly Shōnen Magazine",
    conceptType: "familiar",
    synopsis: [
      "A scholarship student enters an academy where every club is also a combat division.",
      "She joins the gardening club, only to learn its flowers are used to forge battlefield medicine.",
      "Rival students, secret sponsors, and a school tournament drive the main plot.",
      "It is a familiar academy action manga with a slightly more specific hook."
    ]
  },
  {
    id: "manga-17",
    title: "Class 3-B Monster Club",
    popularity: 59,
    salesVolumes: 4500000,
    chapters: 80,
    tankobonVolumes: 10,
    status: "running",
    releaseFrequency: "weekly",
    magazine: "Weekly Shōnen Magazine",
    conceptType: "familiar",
    synopsis: [
      "A normal homeroom teacher is assigned to a class where every student hides a monster form.",
      "The club activities are really training exercises for controlling their transformations.",
      "The comedy comes from school rules clashing with claws, wings, and ancient curses.",
      "It is a recognizable school comedy premise with a supernatural twist."
    ]
  },
  {
    id: "manga-18",
    title: "Knight Errant in a Hoodie",
    popularity: 66,
    salesVolumes: 6100000,
    chapters: 92,
    tankobonVolumes: 12,
    status: "running",
    releaseFrequency: "weekly",
    magazine: "Weekly Shōnen Jump",
    conceptType: "distinctive",
    synopsis: [
      "A medieval knight wakes up in modern Tokyo wearing only a hoodie borrowed from a convenience store clerk.",
      "Instead of searching for a portal home, he starts solving neighborhood problems with chivalric logic.",
      "His sincerity makes him popular, but his literal interpretation of honor causes constant trouble.",
      "The fish-out-of-water comedy gives the urban fantasy premise a more unusual rhythm."
    ]
  },
  {
    id: "manga-19",
    title: "The Shopkeeper's Familiar",
    popularity: 47,
    salesVolumes: 3100000,
    chapters: 55,
    tankobonVolumes: 7,
    status: "running",
    releaseFrequency: "monthly",
    magazine: "Afternoon",
    conceptType: "distinctive",
    synopsis: [
      "A failed apprentice witch opens a repair shop for broken magical objects.",
      "Her familiar is an overworked raccoon dog who handles bookkeeping and customer complaints.",
      "Each item has a history, and fixing it often means repairing the relationship attached to it.",
      "The series is cozy fantasy with a dry comic edge and a very specific daily-life focus."
    ]
  },
  {
    id: "manga-20",
    title: "After School Exorcist",
    popularity: 73,
    salesVolumes: 9400000,
    chapters: 140,
    tankobonVolumes: 17,
    status: "running",
    releaseFrequency: "weekly",
    magazine: "Weekly Shōnen Jump",
    conceptType: "generic",
    synopsis: [
      "A high schooler inherits a family business that exorcises spirits after club activities end.",
      "His best friend keeps score of their cases like they are part-time jobs.",
      "The plot builds from school rumors to a larger war between shrines and spirit brokers.",
      "It is a direct supernatural action manga with clear arcs and reliable escalation."
    ]
  },
  {
    id: "manga-21",
    title: "The Quiet Prince of Karaoke",
    popularity: 49,
    salesVolumes: 3300000,
    chapters: 58,
    tankobonVolumes: 7,
    status: "finished",
    releaseFrequency: null,
    magazine: "Shōjo Comic",
    conceptType: "distinctive",
    synopsis: [
      "The heir to a small entertainment company can only sing when no one knows he is performing.",
      "A part-time karaoke attendant discovers his secret and becomes his unofficial manager.",
      "Their partnership grows through late-night sessions, bad contracts, and stage fright.",
      "The music drama is grounded in anxiety, trust, and the difference between fame and expression."
    ]
  },
  {
    id: "manga-22",
    title: "Grandmaster of Mini Golf",
    popularity: 42,
    salesVolumes: 2500000,
    chapters: 66,
    tankobonVolumes: 8,
    status: "running",
    releaseFrequency: "monthly",
    magazine: "Weekly Young Jump",
    conceptType: "distinctive",
    synopsis: [
      "A retired pro golfer opens a mini golf course and accidentally trains a group of misfit kids.",
      "Each hole teaches a different trick involving angles, patience, and reading people.",
      "The competition is low-stakes, but the characters treat every putt like a championship.",
      "It is an odd sports comedy that finds drama in a sport nobody expected to take seriously."
    ]
  },
  {
    id: "manga-23",
    title: "Crimson Postcards",
    popularity: 56,
    salesVolumes: 4100000,
    chapters: 72,
    tankobonVolumes: 9,
    status: "finished",
    releaseFrequency: null,
    magazine: "Shōjo Comic",
    conceptType: "generic",
    synopsis: [
      "A young woman receives postcards from her future self after a painful breakup.",
      "Each message pushes her toward a different city, job, and possible version of love.",
      "The story follows her friendships, career doubts, and the temptation to avoid heartbreak entirely.",
      "It is a straightforward romance drama about choosing an uncertain future."
    ]
  },
  {
    id: "manga-24",
    title: "My Neighbor's Ghost is a Salaryman",
    popularity: 68,
    salesVolumes: 7200000,
    chapters: 96,
    tankobonVolumes: 12,
    status: "running",
    releaseFrequency: "weekly",
    magazine: "Weekly Young Jump",
    conceptType: "distinctive",
    synopsis: [
      "A college student moves into cheap housing and finds that her upstairs neighbor died years ago.",
      "The ghost still wears a suit, checks train schedules, and complains about overtime from the afterlife.",
      "Together they investigate why he cannot move on while dealing with noisy living spirits in the building.",
      "The comedy is specific and character-driven, built around work culture and unfinished business."
    ]
  },
  {
    id: "manga-25",
    title: "Sky Harbor Angels",
    popularity: 60,
    salesVolumes: 5200000,
    chapters: 84,
    tankobonVolumes: 10,
    status: "running",
    releaseFrequency: "monthly",
    magazine: "Afternoon",
    conceptType: "familiar",
    synopsis: [
      "A group of young airport staff handle emergencies, delays, and the private dramas of travelers.",
      "One mechanic dreams of becoming a pilot, while a dispatcher hides a family connection to a crash.",
      "The manga blends workplace pressure with quiet romance and rescue episodes.",
      "It is a familiar ensemble drama with a strong sense of place."
    ]
  },
  {
    id: "manga-26",
    title: "Bicycle Samurai Club",
    popularity: 64,
    salesVolumes: 5900000,
    chapters: 104,
    tankobonVolumes: 13,
    status: "running",
    releaseFrequency: "weekly",
    magazine: "Weekly Shōnen Magazine",
    conceptType: "distinctive",
    synopsis: [
      "A delinquent joins a cycling club because he mistakes it for a sword club.",
      "The captain decides to train him using discipline, routes, and old samurai films.",
      "Races become tests of endurance, teamwork, and pride without ever losing their comedic edge.",
      "The sports manga hook is unusual enough to stand out while still following familiar club dynamics."
    ]
  },
  {
    id: "manga-27",
    title: "Lunch Rush Legends",
    popularity: 57,
    salesVolumes: 4400000,
    chapters: 78,
    tankobonVolumes: 9,
    status: "running",
    releaseFrequency: "weekly",
    magazine: "Weekly Shōnen Magazine",
    conceptType: "familiar",
    synopsis: [
      "A cafeteria worker turns lunch service into a battlefield of timing, teamwork, and pride.",
      "His rivals include food trucks, elite chefs, and a student council that treats meals like policy.",
      "The series focuses on kitchen chaos, local ingredients, and friendships built over trays.",
      "It is a familiar food sports manga with a school setting and energetic pacing."
    ]
  },
  {
    id: "manga-28",
    title: "The Idol Who Couldn't Sing",
    popularity: 53,
    salesVolumes: 3800000,
    chapters: 62,
    tankobonVolumes: 8,
    status: "finished",
    releaseFrequency: null,
    magazine: "Shōjo Comic",
    conceptType: "distinctive",
    synopsis: [
      "A girl becomes the face of an idol group after a viral video, but she cannot sing on command.",
      "Her bandmates cover for her at first, then help her find a voice that is not perfect but honest.",
      "The story is less about fame and more about panic, trust, and learning to perform without disappearing.",
      "Its music premise is familiar, but the central flaw makes the drama feel more personal."
    ]
  },
  {
    id: "manga-29",
    title: "Drift King of the Rain District",
    popularity: 69,
    salesVolumes: 8100000,
    chapters: 118,
    tankobonVolumes: 14,
    status: "running",
    releaseFrequency: "weekly",
    magazine: "Weekly Young Jump",
    conceptType: "familiar",
    synopsis: [
      "A delivery driver becomes an underground drift racer after winning a bet on a rain-soaked highway.",
      "He races to pay off his family's garage debt while avoiding a crew that rigs matches.",
      "The manga follows cars, rival crews, and the changing mood of one city district.",
      "It is a familiar street racing story with a strong atmosphere and clear competitive arcs."
    ]
  }
];