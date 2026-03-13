export type CatalogueItem = {
  id: number;
  type: "Certification" | "Course";
  code: string;
  title: string;
  provider: string;
  level: string;
  cost: number;
  duration: string;
  competencyName: string;
  isQatarRecommended?: boolean;
  prepForCertCode?: string | null;
  format?: string;
  description?: string;
  skills: string[];
  prerequisites?: string[];
  examFormat?: string;
};
