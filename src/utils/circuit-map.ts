import type { CircuitSlug } from "src/types/Circuit";
import { slugsJoin } from "./strings";

export const raceToCircuit: { [key: string]: CircuitSlug } = {
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
};

export function getCircuitSlug(formulaSlug: string, eventSlug: string): CircuitSlug | undefined {
  const key = slugsJoin(formulaSlug, eventSlug);
  return raceToCircuit[key];
}
