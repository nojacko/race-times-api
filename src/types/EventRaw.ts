export interface EventSessionRaw {
  day: string;
  month: string;
  name: string;
  startTime: string;
  endTime: string | null;
}

export interface EventRaw {
  url: string;
  updatedAt: string;
  slug: string;
  title: string;
  data: EventSessionRaw[];
}

export default EventRaw;
