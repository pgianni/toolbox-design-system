import { Button } from '@pgianni/toolbox-react'

function App() {
  return (
    <main className="grid min-h-screen place-items-center bg-app-background p-8">
      <section className="max-w-md rounded-lg border bg-card p-8 shadow-md">
        <p className="mb-2 text-sm font-medium text-primary">Toolbox Design System</p>
        <h1 className="mb-3 text-2xl font-semibold">Documentation des composants</h1>
        <p className="mb-6 text-muted-foreground">
          Ouvre Storybook pour consulter les variantes et contrôles des composants partagés.
        </p>
        <Button type="button">Ouvrir Storybook</Button>
      </section>
    </main>
  )
}

export default App
