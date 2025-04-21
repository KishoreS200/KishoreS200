import BugPredictionForm from "../bugPredictionForm"

export default function Page() {
  return (
    <main className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Developer Bug Prediction Tool</h1>
      <BugPredictionForm />
    </main>
  )
}
