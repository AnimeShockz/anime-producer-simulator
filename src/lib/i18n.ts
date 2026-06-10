import { useLanguage } from "@/contexts/LanguageContext";

type Translations = Record<string, Record<string, string>>;

const dictionary: Translations = {
  English: {
    title: "Anime Producer Simulator",
    tagline: "Build your anime season, choose studios, and review the results.",
    createNewGame: "Create New Game",
    loadSave: "Load Save",
    settings: "Settings",
    exitToWindows: "Exit to Windows",
    fullscreen: "Fullscreen",
    soundVolume: "Sound Volume",
    language: "Language",
    manageRoster: "Manage your adaptation roster and track critic reviews.",
    save: "Save",
    load: "Load",
    mainMenu: "Main Menu",
    toAdapt: "To Adapt",
    adapted: "Adapted",
    allAdapted: "All Adapted",
    searchPlaceholder: "Search manga...",
    budget: "Budget",
    rightsPurchased: "Rights Purchased",
    episodeCount: "Episode Count",
    adaptNow: "Adapt Now",
    alreadyAdapted: "Already Adapted",
    noReview: "No review yet. Adapt this manga to generate one.",
    gameSettings: "Game Settings",
    toggleFullscreen: "Fullscreen",
    currentLanguage: "Current language:",
  },
  Japanese: {
    title: "アニメプロデューサーシミュレーター",
    tagline: "アニメシーズンを作り、スタジオを選び、結果をレビューしよう。",
    createNewGame: "新しいゲームを作成",
    loadSave: "保存をロード",
    settings: "設定",
    exitToWindows: "Windowsへ終了",
    fullscreen: "全画面表示",
    soundVolume: "音量",
    language: "言語",
    manageRoster: "適応ロスターを管理し、批評レビューを追跡します。",
    save: "保存",
    load: "ロード",
    mainMenu: "メインメニュー",
    toAdapt: "未適応",
    adapted: "適応済み",
    allAdapted: "全て適応済み",
    searchPlaceholder: "漫画を検索...",
    budget: "予算",
    rightsPurchased: "権利取得済み",
    episodeCount: "エピソード数",
    adaptNow: "今すぐ適応",
    alreadyAdapted: "既に適応済み",
    noReview: "まだレビューがありません。適応すると生成されます。",
    gameSettings: "ゲーム設定",
    toggleFullscreen: "全画面表示",
    currentLanguage: "現在の言語:",
  },
  // Add other languages as needed (Korean, Chinese, etc.)
  Korean: {
    title: "애니메이션 프로듀서 시뮬레이터",
    tagline: "애니메이션 시즌을 만들고, 스튜디오를 선택하고, 결과를 검토하세요.",
    createNewGame: "새 게임 만들기",
    loadSave: "저장 불러오기",
    settings: "설정",
    exitToWindows: "Windows 종료",
    fullscreen: "전체 화면",
    soundVolume: "소리 볼륨",
    language: "언어",
    manageRoster: "적응 로스터를 관리하고 비평 리뷰를 추적합니다.",
    save: "저장",
    load: "불러오기",
    mainMenu: "메인 메뉴",
    toAdapt: "미적응",
    adapted: "적응됨",
    allAdapted: "전체 적응",
    searchPlaceholder: "만화 검색...",
    budget: "예산",
    rightsPurchased: "권리 구매",
    episodeCount: "에피소드 수",
    adaptNow: "지금 적응",
    alreadyAdapted: "이미 적응됨",
    noReview: "아직 리뷰가 없습니다. 적응하면 생성됩니다.",
    gameSettings: "게임 설정",
    toggleFullscreen: "전체 화면",
    currentLanguage: "현재 언어:",
  },
  // ... add other languages similarly
};

export const useT = () => {
  const { language } = useLanguage();
  const t = (key: keyof typeof dictionary["English"]) => {
    const langDict = dictionary[language] || dictionary["English"];
    return langDict[key] || dictionary["English"][key] || key;
  };
  return { t };
};