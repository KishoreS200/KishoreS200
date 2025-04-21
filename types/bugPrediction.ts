export interface DeveloperInfo {
  name: string;
  experienceYears: number;
  recentProjects: number;
  averageWorkHours: number;
}

export interface ProjectInfo {
  complexity: number;
  linesOfCode: number;
  deadlinePressure: number;
}

export interface PredictionResult {
  bugLikelihood: number;
  riskLevel: 'Low' | 'Medium' | 'High';
  suggestions: string[];
}
