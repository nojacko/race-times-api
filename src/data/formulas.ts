import type { Formula } from "../types/Formula";

export const F1: Formula = {
  slug: "f1",
  name: "F1",
  trademarks: "Formula One, Formula 1, F1 & Grand Prix are trademarks of Formula One Licensing BV.",
  active: true,
};

export const F2: Formula = {
  slug: "f2",
  name: "F2",
  trademarks: "FIA FORMULA 2 CHAMPIONSHIP, FIA FORMULA 2, FORMULA 2, F2 are trademarks of the FIA.",
  active: true,
};

export const F3: Formula = {
  slug: "f3",
  name: "F3",
  trademarks: "FIA FORMULA 3 CHAMPIONSHIP, FIA FORMULA 3, FORMULA 3, F3 are trademarks of the FIA.",
  active: false,
};

export const FORMULA_E: Formula = {
  slug: "formula-e",
  name: "Formula E",
  trademarks: "Formula-E, FIA FORMULA-E CHAMPIONSHIP & E-Prix are trademarks of the FIA.",
  active: false,
};

export const F1_ACADEMY: Formula = {
  slug: "f1-academy",
  name: "F1 Academy",
  trademarks: "F1 Academy, Formula One, Formula 1, F1 & Grand Prix are trademarks of Formula One Licensing BV.",
  active: false,
};

export const formulas: Formula[] = [F1, F2, F3, FORMULA_E, F1_ACADEMY];
