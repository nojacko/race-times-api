import type { CircuitSlug } from "src/types/Circuit";
import { slugsJoin } from "./strings";

export const raceToCircuit: { [key: string]: CircuitSlug } = {
  // F1
  "f1_pre-season-testing-1": "bahrain-international-circuit",
  "f1_pre-season-testing-2": "bahrain-international-circuit",
  "f1_australia": "albert-park-circuit",
  "f1_china": "shanghai-international-circuit",
  "f1_japan": "suzuka-circuit",
  "f1_bahrain": "bahrain-international-circuit",
  "f1_saudi-arabia": "jeddah-corniche-circuit",
  "f1_miami": "miami-international-autodrome",
  "f1_canada": "circuit-gilles-villeneuve",
  "f1_monaco": "circuit-de-monaco",
  "f1_barcelona-catalunya": "circuit-de-barcelona-catalunya",
  "f1_austria": "red-bull-ring",
  "f1_great-britain": "silverstone-circuit",
  "f1_belgium": "circuit-de-spa-francorchamps",
  "f1_hungary": "hungaroring",
  "f1_netherlands": "circuit-zandvoort",
  "f1_italy": "autodromo-nazionale-monza",
  "f1_spain": "circuito-de-madring",
  "f1_azerbaijan": "baku-city-circuit",
  "f1_singapore": "marina-bay-circuit",
  "f1_united-states": "circuit-of-the-americas",
  "f1_mexico": "autodromo-hermanos-rodríguez",
  "f1_brazil": "autodromo-jose-carlos",
  "f1_las-vegas": "las-vegas-strip",
  "f1_qatar": "lusail-international-circuit",
  "f1_united-arab-emirates": "yas-marina-circuit",
  // F2
  "f2_melbourne": "albert-park-circuit",
  "f2_sakhir": "bahrain-international-circuit",
  "f2_jeddah": "jeddah-corniche-circuit",
  "f2_monaco": "circuit-de-monaco",
  "f2_barcelona": "bahrain-international-circuit",
  "f2_spielberg": "red-bull-ring",
  "f2_silverstone": "silverstone-circuit",
  "f2_spa-francorchamps": "circuit-de-spa-francorchamps",
  "f2_budapest": "hungaroring",
  "f2_monza": "autodromo-nazionale-monza",
  "f2_madrid": "circuito-de-madring",
  "f2_baku": "baku-city-circuit",
  "f2_lusail": "lusail-international-circuit",
  "f2_yas-island": "yas-marina-circuit",
  // F3
  "f3_melbourne": "albert-park-circuit",
  "f3_sakhir": "bahrain-international-circuit",
  "f3_monaco": "circuit-de-monaco",
  "f3_barcelona": "circuit-de-barcelona-catalunya",
  "f3_spielberg": "red-bull-ring",
  "f3_silverstone": "silverstone-circuit",
  "f3_spa-francorchamps": "circuit-de-spa-francorchamps",
  "f3_budapest": "hungaroring",
  "f3_monza": "autodromo-nazionale-monza",
  "f3_madrid": "circuito-de-madring",
  // Formula E
  "formula-e_sao-paulo": "sao-paulo-street-circuit",
  "formula-e_mexico-city": "autodromo-hermanos-rodríguez",
  "formula-e_miami": "miami-international-autodrome",
  "formula-e_jeddah-1": "jeddah-corniche-circuit",
  "formula-e_jeddah-2": "jeddah-corniche-circuit",
  "formula-e_madrid": "circuito-del-jarama",
  "formula-e_berlin-1": "flughafen-tempelhof",
  "formula-e_berlin-2": "flughafen-tempelhof",
  "formula-e_monaco-1": "circuit-de-monaco",
  "formula-e_monaco-2": "circuit-de-monaco",
  "formula-e_sanya": "sanya-street-circuit",
  "formula-e_shanghai-1": "shanghai-international-circuit",
  "formula-e_shanghai-2": "shanghai-international-circuit",
  "formula-e_tokyo-1": "tokyo-street-circuit",
  "formula-e_tokyo-2": "tokyo-street-circuit",
  "formula-e_london-1": "london-excel-circuit",
  "formula-e_london-2": "london-excel-circuit",
  // F1 Acadamy
  "f1-academy_shanghai": "shanghai-international-circuit",
  "f1-academy_jeddah": "jeddah-corniche-circuit",
  "f1-academy_montreal": "circuit-gilles-villeneuve",
  "f1-academy_silverstone": "silverstone-circuit",
  "f1-academy_zandvoort": "circuit-zandvoort",
  "f1-academy_austin": "circuit-of-the-americas",
  "f1-academy_las-vegas": "las-vegas-strip",
};

export function getCircuitKey(formulaSlug: string, eventSlug: string): string {
  return slugsJoin(formulaSlug, eventSlug);
}

export function getCircuitSlug(key: string): CircuitSlug | undefined {
  return raceToCircuit[key];
}
