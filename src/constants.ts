export const THEME = [
  "apathy",
  "apathy:inverted",
  "ashes",
  "bespin",
  "brewer",
  "bright:inverted",
  "bright",
  "chalk",
  "codeschool",
  "colors",
  "eighties",
  "embers",
  "flat",
  "google",
  "grayscale",
  "grayscale:inverted",
  "greenscreen",
  "harmonic",
  "hopscotch",
  "isotope",
  "marrakesh",
  "mocha",
  "monokai",
  "ocean",
  "paraiso",
  "pop",
  "railscasts",
  "rjv-default",
  "shapeshifter",
  "shapeshifter:inverted",
  "solarized",
  "summerfruit",
  "summerfruit:inverted",
  "threezerotwofour",
  "tomorrow",
  "tube",
  "twilight",
];

export const APP_KEY_THEME = "iJSONTheme";

export enum PageType {
  View = "view",
  Compare = "compare",
  Schema = "schema",
}

export const pageColors: Record<
  PageType,
  | "success"
  | "primary"
  | "inherit"
  | "error"
  | "secondary"
  | "info"
  | "warning"
  | undefined
> = {
  [PageType.Compare]: "success",
  [PageType.Schema]: "secondary",
  [PageType.View]: "primary",
};
