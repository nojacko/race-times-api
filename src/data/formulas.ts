import type { Formula } from "../types/Formula";

export const F1: Formula = {
  slug: "f1",
  name: "F1",
  nameFull: "Formula 1",
  trademarks: "Formula One, Formula 1, F1 & Grand Prix are trademarks of Formula One Licensing BV.",
  active: true,
  primaryColor: "#E10600",
  logoBgColor: "#15151E",
  logoTextColor: "#E10600",
  initials: "F1",
  years: ["2026"],
  url: "https://www.formula1.com",
};

export const F2: Formula = {
  slug: "f2",
  name: "F2",
  nameFull: "Formula 2",
  trademarks: "FIA FORMULA 2 CHAMPIONSHIP, FIA FORMULA 2, FORMULA 2, F2 are trademarks of the FIA.",
  active: true,
  primaryColor: "#023A5F",
  logoBgColor: "#023A5F",
  logoTextColor: "#FFFFFF",
  initials: "F2",
  years: ["2026"],
  url: "https://www.fiaformula2.com",
};

export const F3: Formula = {
  slug: "f3",
  name: "F3",
  nameFull: "Formula 3",
  trademarks: "FIA FORMULA 3 CHAMPIONSHIP, FIA FORMULA 3, FORMULA 3, F3 are trademarks of the FIA.",
  active: true,
  primaryColor: "#666666",
  logoBgColor: "#666666",
  logoTextColor: "#FFFFFF",
  initials: "F3",
  years: ["2026"],
  url: "https://www.fiaformula3.com",
};

export const FORMULA_E: Formula = {
  slug: "formula-e",
  name: "Formula E",
  nameFull: "Formula E",
  trademarks: "Formula-E, FIA FORMULA-E CHAMPIONSHIP & E-Prix are trademarks of the FIA.",
  active: true,
  primaryColor: "#0000FF",
  logoBgColor: "#0000FF",
  logoTextColor: "#FFFFFF",
  initials: "FE",
  years: ["2025-26"],
  url: "https://fiaformulae.com",
};

export const F1_ACADEMY: Formula = {
  slug: "f1-academy",
  name: "F1 Academy",
  nameFull: "F1 Academy",
  trademarks: "F1 Academy, Formula One, Formula 1, F1 & Grand Prix are trademarks of Formula One Licensing BV.",
  active: true,
  primaryColor: "#6A00EB",
  logoBgColor: "#6A00EB",
  logoTextColor: "#FFFFFF",
  initials: "F1",
  years: ["2026"],
  url: "https://www.f1academy.com",
};

export const formulas: Formula[] = [F1, F2, F3, FORMULA_E, F1_ACADEMY];

export function getFormula(slug: string): Formula | undefined {
  if (!slug) return undefined;
  return formulas.find((f) => f.slug === slug);
}

export function getFormulasActive(): Formula[] {
  return formulas.filter((f) => f.active);
}
