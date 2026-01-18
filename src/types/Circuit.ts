export type CircuitSlug =
  // F1
  | "albert-park-circuit"
  | "shanghai-international-circuit"
  | "suzuka-circuit"
  | "bahrain-international-circuit"
  | "jeddah-corniche-circuit"
  | "miami-international-autodrome"
  | "circuit-gilles-villeneuve"
  | "circuit-de-monaco"
  | "circuit-de-barcelona-catalunya"
  | "red-bull-ring"
  | "silverstone-circuit"
  | "circuit-de-spa-francorchamps"
  | "hungaroring"
  | "circuit-zandvoort"
  | "autodromo-nazionale-monza"
  | "circuito-de-madring"
  | "baku-city-circuit"
  | "marina-bay-circuit"
  | "circuit-of-the-americas"
  | "autodromo-hermanos-rodríguez"
  | "autodromo-jose-carlos"
  | "las-vegas-strip"
  | "lusail-international-circuit"
  | "yas-marina-circuit";

export interface Circuit {
  slug: CircuitSlug;
  name: string;
  location: string;
  country: string;
  coords: {
    lat: number;
    lon: number;
  };
  timeZone: string;
}
