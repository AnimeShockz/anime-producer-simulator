export const getSavedTheme = (): "light" | "dark" => {
  return (window.localStorage.getItem("theme") as "light" | "dark") || "light";
};