export type FestiveType = "none" | "new-year" | "spring-festival";

export const festiveConfig: {
  active: FestiveType;
} = {
  active: "new-year", // Change this to toggle effects
};
