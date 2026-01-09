export type PieSlice = { label: string; value: number };

export type TimelinePoint = {
  year: number;
  quarter: number;
  total_spend: number;
  small_spend: number;
};

export type SampleRow = {
  contract_transaction_unique_key: string;
  awarding_sub_agency_name: string;
  recipient_name: string;
  recipient_uei: string;
  state: string;
  naics_code: number | null;
  naics_description: string;
  amount: number;
  initial_report_date: string; // YYYY-MM-DD
  usaspending_permalink: string;
  description: string;
};

export type SpendingDashboardResponse = {
  filters: { q?: string; naics?: number; state?: string };
  source: "bigquery" | "mock";
  summary: { total_spend: number; small_spend: number; unique_small_vendors: number };
  pie: PieSlice[];
  timeline: TimelinePoint[];
  sample: SampleRow[];
  error?: string;
};

export type RSSItem = {
  title: string;
  link: string;
  pubDate?: string;
};

export type RSSResponse = {
  url: string;
  items: RSSItem[];
};
