export type FestiveType = "none" | "new-year" | "spring-festival";

export const festiveConfig: {
  active: FestiveType;
} = {
  active: "spring-festival", // Change this to toggle effects
};
