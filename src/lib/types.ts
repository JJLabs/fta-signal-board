export type Deal = {
  id: string;
  date: string;
  company: string;
  sector: string;
  stage: string;
  amountM: number;
  leadInvestor: string;
  investors: string[];
  country: string;
};

export type Signal = {
  kind: 'spike' | 'repeat-investor' | 'mega-round' | 'stage-shift';
  title: string;
  detail: string;
  href?: string;
};
