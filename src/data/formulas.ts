import type { Formula } from "../types/Formula";

export const F1: Formula = {
  slug: "f1",
  name: "F1",
  nameLong: "Formula 1",
  trademarks: "Formula One, Formula 1, F1 & Grand Prix are trademarks of Formula One Licensing BV.",
  active: true,
  primaryColor: "#E10600",
  logoBgColor: "#15151e",
  logoTextColor: "#E10600",
  initials: "F1",
  years: [2026],
  url: "https://www.formula1.com",
};

export const F2: Formula = {
  slug: "f2",
  name: "F2",
  nameLong: "Formula 2",
  trademarks: "FIA FORMULA 2 CHAMPIONSHIP, FIA FORMULA 2, FORMULA 2, F2 are trademarks of the FIA.",
  active: true,
  primaryColor: "#023A5F",
  logoBgColor: "#023A5F",
  logoTextColor: "#ffffff",
  initials: "F2",
  url: "https://www.fiaformula2.com",
};

export const F3: Formula = {
  slug: "f3",
  name: "F3",
  nameLong: "Formula 3",
  trademarks: "FIA FORMULA 3 CHAMPIONSHIP, FIA FORMULA 3, FORMULA 3, F3 are trademarks of the FIA.",
  active: false,
  primaryColor: "#666666",
  logoBgColor: "#666666",
  logoTextColor: "#ffffff",
  initials: "F3",
  url: "https://www.fiaformula3.com",
};

export const FORMULA_E: Formula = {
  slug: "formula-e",
  name: "Formula E",
  nameLong: "Formula E",
  trademarks: "Formula-E, FIA FORMULA-E CHAMPIONSHIP & E-Prix are trademarks of the FIA.",
  active: false,
  primaryColor: "#0000ff",
  logoBgColor: "#0000ff",
  logoTextColor: "#ffffff",
  initials: "FE",
  url: "https://fiaformulae.com",
};

export const F1_ACADEMY: Formula = {
  slug: "f1-academy",
  name: "F1 Academy",
  nameLong: "F1 Academy",
  trademarks: "F1 Academy, Formula One, Formula 1, F1 & Grand Prix are trademarks of Formula One Licensing BV.",
  active: false,
  primaryColor: "#0083d3",
  logoBgColor: "#0083d3",
  logoTextColor: "#ffffff",
  initials: "F1",
  url: "https://www.f1academy.com",
};

export const formulas: Formula[] = [F1, F2, F3, FORMULA_E, F1_ACADEMY];
