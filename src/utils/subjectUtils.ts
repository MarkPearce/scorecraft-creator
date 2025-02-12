export const getTargetScore = (examWeight?: string): number => {
  if (!examWeight) return 80;
  const weight = parseInt(examWeight.split('-')[0]);
  if (weight < 5) return 70;
  if (weight < 10) return 75;
  return 80;
};

export const getProgressColor = (isComplete: boolean): string => {
  return isComplete ? "bg-[#66BB6A]" : "bg-[#8A898C]";
};

export const getArticleTitles = (subject: string): string[] => {
  const subjectArticles: { [key: string]: string[] } = {
    "Human Development": [
      "Embryology: First Trimester Development",
      "Congenital Disorders and Genetic Testing",
      "Fetal Development and Birth Defects"
    ],
    "Blood & Lymphoreticular/Immune Systems": [
      "Hematopoiesis and Bone Marrow Disorders",
      "Immunodeficiency Diseases: A Clinical Guide",
      "Lymphoma Classification and Treatment"
    ],
    "Behavioral Health & Nervous Systems": [
      "Neurotransmitters and Psychiatric Disorders",
      "Clinical Neurology: Patient Assessment",
      "Brain Structure and Common Pathologies"
    ],
    "Musculoskeletal & Skin": [
      "Orthopedic Examination Techniques",
      "Dermatological Manifestations of Disease",
      "Musculoskeletal Disorders: A Review"
    ],
    "Cardiovascular System": [
      "ECG Interpretation: A Systematic Approach",
      "Heart Failure: Pathophysiology and Management",
      "Cardiovascular Physical Examination"
    ],
    "Respiratory & Renal/Urinary Systems": [
      "Pulmonary Function Testing",
      "Kidney Disease: Diagnosis and Treatment",
      "Respiratory Pathophysiology"
    ],
    "Gastrointestinal System": [
      "Liver Disease: Clinical Assessment",
      "GI Tract Disorders and Management",
      "Nutrition in GI Disorders"
    ],
    "Reproductive & Endocrine Systems": [
      "Hormone Regulation and Disorders",
      "Reproductive System Pathology",
      "Endocrine System: Clinical Cases"
    ],
    "Multisystem Processes & Disorders": [
      "Autoimmune Disease Recognition",
      "Systemic Inflammatory Response",
      "Multi-organ Failure Management"
    ],
    "Biostatistics & Epidemiology": [
      "Clinical Trial Design and Analysis",
      "Statistical Methods in Medicine",
      "Evidence-Based Medicine Principles"
    ],
    "Social Sciences & Communication": [
      "Patient Communication Strategies",
      "Medical Ethics and Decision Making",
      "Cultural Competency in Healthcare"
    ]
  };

  return subjectArticles[subject] || [
    "Overview & Core Concepts",
    "Clinical Applications",
    "Practice Guidelines"
  ];
};
