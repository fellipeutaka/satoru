export const DIFFICULTY = ["peaceful", "easy", "normal", "hard"] as const;
export type Difficulty = (typeof DIFFICULTY)[number];
