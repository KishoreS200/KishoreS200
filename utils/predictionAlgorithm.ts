import { DeveloperInfo, ProjectInfo, PredictionResult } from '../types/bugPrediction';

export function predictBugLikelihood(developer: DeveloperInfo, project: ProjectInfo): PredictionResult {
  // Simple weighted calculation
  const experienceFactor = Math.max(1, 5 - developer.experienceYears * 0.5);
  const workloadFactor = (developer.recentProjects * developer.averageWorkHours) / 100;
  const complexityFactor = project.complexity * (project.linesOfCode / 1000);
  const pressureFactor = project.deadlinePressure;

  const bugLikelihood = (
    (experienceFactor * 0.3) +
    (workloadFactor * 0.2) +
    (complexityFactor * 0.3) +
    (pressureFactor * 0.2)
  ) * 10; // Scale to 0-100

  const riskLevel = bugLikelihood < 30 ? 'Low' : bugLikelihood < 60 ? 'Medium' : 'High';

  const suggestions = [];
  if (workloadFactor > 1.5) suggestions.push("Consider reducing the developer's workload");
  if (complexityFactor > 2) suggestions.push("The project might benefit from code simplification");
  if (pressureFactor > 7) suggestions.push("High deadline pressure may increase bug risk");

  return {
    bugLikelihood: Math.min(Math.round(bugLikelihood * 10) / 10, 100), // Round to 1 decimal place, max 100
    riskLevel,
    suggestions
  };
}
