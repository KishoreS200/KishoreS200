"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Slider } from "@/components/ui/slider"
import type { DeveloperInfo, ProjectInfo, PredictionResult } from "./types/bugPrediction"
import { predictBugLikelihood } from "./utils/predictionAlgorithm"

export default function BugPredictionForm() {
  const [developer, setDeveloper] = useState<DeveloperInfo>({
    name: "",
    experienceYears: 0,
    recentProjects: 0,
    averageWorkHours: 0,
  })

  const [project, setProject] = useState<ProjectInfo>({
    complexity: 5,
    linesOfCode: 0,
    deadlinePressure: 5,
  })

  const [prediction, setPrediction] = useState<PredictionResult | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const result = predictBugLikelihood(developer, project)
    setPrediction(result)
  }

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle>Developer-Based Bug Prediction</CardTitle>
        <CardDescription>Enter developer and project information to predict bug likelihood</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Developer Name</Label>
            <Input
              id="name"
              value={developer.name}
              onChange={(e) => setDeveloper({ ...developer, name: e.target.value })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="experience">Years of Experience</Label>
            <Input
              id="experience"
              type="number"
              value={developer.experienceYears}
              onChange={(e) => setDeveloper({ ...developer, experienceYears: Number(e.target.value) })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="projects">Recent Projects (last 6 months)</Label>
            <Input
              id="projects"
              type="number"
              value={developer.recentProjects}
              onChange={(e) => setDeveloper({ ...developer, recentProjects: Number(e.target.value) })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hours">Average Work Hours (per day)</Label>
            <Input
              id="hours"
              type="number"
              value={developer.averageWorkHours}
              onChange={(e) => setDeveloper({ ...developer, averageWorkHours: Number(e.target.value) })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="complexity">Project Complexity (1-10)</Label>
            <Slider
              id="complexity"
              min={1}
              max={10}
              step={1}
              value={[project.complexity]}
              onValueChange={(value) => setProject({ ...project, complexity: value[0] })}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="loc">Lines of Code</Label>
            <Input
              id="loc"
              type="number"
              value={project.linesOfCode}
              onChange={(e) => setProject({ ...project, linesOfCode: Number(e.target.value) })}
              required
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="pressure">Deadline Pressure (1-10)</Label>
            <Slider
              id="pressure"
              min={1}
              max={10}
              step={1}
              value={[project.deadlinePressure]}
              onValueChange={(value) => setProject({ ...project, deadlinePressure: value[0] })}
            />
          </div>
          <Button type="submit">Predict Bug Likelihood</Button>
        </form>
      </CardContent>
      {prediction && (
        <CardFooter className="flex flex-col items-start">
          <h3 className="text-lg font-semibold mb-2">Prediction Result:</h3>
          <p>Bug Likelihood: {prediction.bugLikelihood}%</p>
          <p>
            Risk Level:{" "}
            <span
              className={`font-bold ${prediction.riskLevel === "Low" ? "text-green-500" : prediction.riskLevel === "Medium" ? "text-yellow-500" : "text-red-500"}`}
            >
              {prediction.riskLevel}
            </span>
          </p>
          {prediction.suggestions.length > 0 && (
            <div className="mt-2">
              <h4 className="font-semibold">Suggestions:</h4>
              <ul className="list-disc list-inside">
                {prediction.suggestions.map((suggestion, index) => (
                  <li key={index}>{suggestion}</li>
                ))}
              </ul>
            </div>
          )}
        </CardFooter>
      )}
    </Card>
  )
}
