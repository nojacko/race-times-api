export interface Formula {
  slug: string;
  name: string;
  url: string;
  trademarks: string;
  active: boolean;
  primaryColor?: string;
  logoBgColor?: string;
  logoTextColor?: string;
  initials?: string;
  nameLong?: string;
  years?: number[];
}
