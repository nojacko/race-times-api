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
  timeZone: string;
}

export const circuits: Circuit[] = [
  {
    slug: "albert-park-circuit",
    name: "Albert Park Circuit",
    location: "Melbourne",
    country: "AU",
    timeZone: "",
  },
  {
    slug: "shanghai-international-circuit",
    name: "Shanghai International Circuit",
    location: "Shanghai",
    country: "CN",
    timeZone: "",
  },
  {
    slug: "suzuka-circuit",
    name: "Suzuka Circuit",
    location: "Suzuka",
    country: "JP",
    timeZone: "",
  },
  {
    slug: "bahrain-international-circuit",
    name: "Bahrain International Circuit",
    location: "Sakhir",
    country: "BH",
    timeZone: "",
  },
  {
    slug: "jeddah-corniche-circuit",
    name: "Jeddah Corniche Circuit",
    location: "Jeddah",
    country: "SA",
    timeZone: "",
  },
  {
    slug: "miami-international-autodrome",
    name: "Miami International Autodrome",
    location: "Miami",
    country: "US",
    timeZone: "",
  },
  {
    slug: "circuit-gilles-villeneuve",
    name: "Circuit Gilles-Villeneuve",
    location: "Montreal",
    country: "CA",
    timeZone: "",
  },
  {
    slug: "circuit-de-monaco",
    name: "Circuit de Monaco",
    location: "Monaco",
    country: "MC",
    timeZone: "",
  },
  {
    slug: "circuit-de-barcelona-catalunya",
    name: "Circuit de Barcelona-Catalunya",
    location: "Barcelona",
    country: "SP",
    timeZone: "",
  },
  {
    slug: "red-bull-ring",
    name: "Red Bull Ring",
    location: "Spielberg",
    country: "AT",
    timeZone: "",
  },
  {
    slug: "silverstone-circuit",
    name: "Silverstone Circuit",
    location: "Silverstone",
    country: "GB",
    timeZone: "",
  },
  {
    slug: "circuit-de-spa-francorchamps",
    name: "Circuit de Spa-Francorchamps",
    location: "Stavelot",
    country: "BE",
    timeZone: "",
  },
  {
    slug: "hungaroring",
    name: "Hungaroring",
    location: "Budapest",
    country: "HU",
    timeZone: "",
  },
  {
    slug: "circuit-zandvoort",
    name: "Circuit Zandvoort",
    location: "Zandvoort",
    country: "NL",
    timeZone: "",
  },
  {
    slug: "autodromo-nazionale-monza",
    name: "Autodromo Nazionale Monza",
    location: "Monza",
    country: "IT",
    timeZone: "",
  },
  {
    slug: "circuito-de-madring",
    name: "Circuito de Madring",
    location: "Madrid",
    country: "ES",
    timeZone: "",
  },
  {
    slug: "baku-city-circuit",
    name: "Baku City Circuit",
    location: "Baku",
    country: "AZ",
    timeZone: "",
  },
  {
    slug: "marina-bay-circuit",
    name: "Marina Bay Circuit",
    location: "Singapore",
    country: "SG",
    timeZone: "",
  },
  {
    slug: "circuit-of-the-americas",
    name: "Circuit of The Americas",
    location: "Austin",
    country: "US",
    timeZone: "",
  },
  {
    slug: "autodromo-hermanos-rodríguez",
    name: "Autódromo Hermanos Rodríguez",
    location: "Mexico City",
    country: "MX",
    timeZone: "",
  },
  {
    slug: "autodromo-jose-carlos",
    name: "Autódromo José Carlos",
    location: "São Paulo",
    country: "BR",
    timeZone: "",
  },
  {
    slug: "las-vegas-strip",
    name: "Las Vegas Strip",
    location: "Las Vegas",
    country: "US",
    timeZone: "",
  },
  {
    slug: "lusail-international-circuit",
    name: "Lusail International Circuit",
    location: "Doha",
    country: "QA",
    timeZone: "",
  },
  {
    slug: "yas-marina-circuit",
    name: "Yas Marina Circuit",
    location: "Abu Dhabi",
    country: "AE",
    timeZone: "",
  },
];
