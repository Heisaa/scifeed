// Research subjects and categories for SciFeed

export interface SubjectCategory {
  id: string;
  name: string;
  description: string;
  subcategories?: string[];
}

export const RESEARCH_SUBJECTS: SubjectCategory[] = [
  {
    id: "cs",
    name: "Computer Science",
    description: "Computing, AI, algorithms, and software",
    subcategories: [
      "Artificial Intelligence",
      "Machine Learning",
      "Computer Vision",
      "Natural Language Processing",
      "Robotics",
      "Cryptography",
      "Distributed Systems",
      "Human-Computer Interaction",
      "Software Engineering",
      "Algorithms",
    ],
  },
  {
    id: "physics",
    name: "Physics",
    description: "Fundamental forces, matter, and energy",
    subcategories: [
      "Quantum Physics",
      "Astrophysics",
      "Condensed Matter",
      "High Energy Physics",
      "General Relativity",
      "Statistical Mechanics",
      "Optics",
      "Nuclear Physics",
    ],
  },
  {
    id: "mathematics",
    name: "Mathematics",
    description: "Pure and applied mathematics",
    subcategories: [
      "Number Theory",
      "Algebra",
      "Geometry",
      "Topology",
      "Analysis",
      "Probability",
      "Statistics",
      "Combinatorics",
      "Logic",
    ],
  },
  {
    id: "biology",
    name: "Biology",
    description: "Life sciences and biological systems",
    subcategories: [
      "Molecular Biology",
      "Genetics",
      "Neuroscience",
      "Immunology",
      "Ecology",
      "Evolutionary Biology",
      "Cell Biology",
      "Bioinformatics",
    ],
  },
  {
    id: "chemistry",
    name: "Chemistry",
    description: "Matter, composition, and reactions",
    subcategories: [
      "Organic Chemistry",
      "Inorganic Chemistry",
      "Physical Chemistry",
      "Analytical Chemistry",
      "Biochemistry",
      "Materials Science",
    ],
  },
  {
    id: "medicine",
    name: "Medicine & Health",
    description: "Medical research and healthcare",
    subcategories: [
      "Clinical Trials",
      "Epidemiology",
      "Public Health",
      "Pharmacology",
      "Oncology",
      "Cardiology",
      "Psychiatry",
      "Radiology",
    ],
  },
  {
    id: "engineering",
    name: "Engineering",
    description: "Applied sciences and technology",
    subcategories: [
      "Electrical Engineering",
      "Mechanical Engineering",
      "Civil Engineering",
      "Chemical Engineering",
      "Bioengineering",
      "Aerospace Engineering",
    ],
  },
  {
    id: "economics",
    name: "Economics",
    description: "Economic theory and analysis",
    subcategories: [
      "Microeconomics",
      "Macroeconomics",
      "Econometrics",
      "Behavioral Economics",
      "Game Theory",
      "Finance",
    ],
  },
  {
    id: "social",
    name: "Social Sciences",
    description: "Society, behavior, and culture",
    subcategories: [
      "Psychology",
      "Sociology",
      "Anthropology",
      "Political Science",
      "Linguistics",
    ],
  },
];

export type SubjectPreference = {
  subject: string;
  subcategories?: string[];
};
