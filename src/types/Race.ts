export interface Race {
  slug: string;
  name: string;
  location: string;
  /** ISO 3166-1 alpha-2 country code */
  country: string;
  coords: { lat: number; lon: number };
}
