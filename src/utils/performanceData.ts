
export interface PerformanceItem {
  subject: string;
  performance: 'lower' | 'same' | 'higher';
  percentageCorrect: number;
}

export const performanceData: PerformanceItem[] = [
  { subject: "Pathology", performance: "lower", percentageCorrect: 58 },
  { subject: "Physiology", performance: "lower", percentageCorrect: 57 },
  { subject: "Gross Anatomy & Embryology", performance: "same", percentageCorrect: 71 },
  { subject: "Microbiology", performance: "lower", percentageCorrect: 55 },
  { subject: "Pharmacology", performance: "lower", percentageCorrect: 60 },
  { subject: "Behavioral Sciences", performance: "same", percentageCorrect: 73 },
  { subject: "Biochemistry & Nutrition", performance: "higher", percentageCorrect: 85 },
  { subject: "Histology & Cell Biology", performance: "higher", percentageCorrect: 82 },
  { subject: "Immunology", performance: "same", percentageCorrect: 70 },
  { subject: "Genetics", performance: "higher", percentageCorrect: 80 }
];

export const step2PerformanceData: PerformanceItem[] = [
  // Physician Tasks
  { subject: "PC: Diagnosis", performance: "lower", percentageCorrect: 58 },
  { subject: "Ethics/Professionalism", performance: "lower", percentageCorrect: 60 },
  
  // Systems with Lower Performance
  { subject: "Gastrointestinal System", performance: "lower", percentageCorrect: 57 },
  { subject: "Behavioral Health", performance: "lower", percentageCorrect: 55 },
  { subject: "Surgery", performance: "lower", percentageCorrect: 55 },
  { subject: "Multisystem Processes & Disorders", performance: "lower", percentageCorrect: 59 },
  { subject: "Renal & Urinary System & Male Reproductive", performance: "lower", percentageCorrect: 61 },
  { subject: "Psychiatry", performance: "lower", percentageCorrect: 60 },
  
  // Same Performance
  { subject: "PC: Pharmacotherapy, Interventions & Management", performance: "same", percentageCorrect: 71 },
  { subject: "Systems-Based Practice/Patient Safety", performance: "same", percentageCorrect: 73 },
  { subject: "Respiratory System", performance: "same", percentageCorrect: 70 },
  { subject: "Nervous System & Special Senses", performance: "same", percentageCorrect: 72 },
  { subject: "Endocrine System", performance: "same", percentageCorrect: 75 },
  { subject: "Pregnancy, Childbirth & the Puerperium", performance: "same", percentageCorrect: 74 },
  { subject: "Pediatrics", performance: "same", percentageCorrect: 73 },
  
  // Higher Performance (fewer items)
  { subject: "PC: Health Maintenance, Prevention & Surveillance", performance: "higher", percentageCorrect: 82 },
  { subject: "Cardiovascular System", performance: "higher", percentageCorrect: 85 },
  { subject: "Female Reproductive & Breast", performance: "higher", percentageCorrect: 83 },
  { subject: "Medicine", performance: "higher", percentageCorrect: 82 }
];
