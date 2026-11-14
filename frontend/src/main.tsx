import { StrictMode, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { checkHealth } from "./health";
import type { HealthResult } from "./health";

type CheckState =
  | { kind: "idle" }
  | { kind: "checking" }
  | { kind: "success"; checkedAt: string }
  | Exclude<HealthResult, { kind: "success" }>;

function describeState(state: CheckState): string {
  switch (state.kind) {
    case "idle":
      return "Aucune vérification effectuée.";
    case "checking":
      return "Vérification en cours…";
    case "success":
      return `L’API technique répond. Dernière vérification réussie à ${state.checkedAt}.`;
    case "unavailable":
      return `API indisponible : ${state.detail}`;
    case "unexpected":
      return `Réponse inattendue : ${state.detail}`;
  }
}

function App() {
  const [state, setState] = useState<CheckState>({ kind: "idle" });
  const requestInProgress = useRef(false);

  async function handleHealthCheck(): Promise<void> {
    if (requestInProgress.current) {
      return;
    }

    requestInProgress.current = true;
    setState({ kind: "checking" });

    try {
      const result = await checkHealth();

      if (result.kind === "success") {
        setState({
          kind: "success",
          checkedAt: new Date().toLocaleTimeString("fr-FR"),
        });
      } else {
        setState(result);
      }
    } catch {
      setState({
        kind: "unexpected",
        detail: "une erreur interne a empêché la vérification.",
      });
    } finally {
      requestInProgress.current = false;
    }
  }

  return (
    <main>
      <header>
        <h1>Factorealm</h1>
        <p className="subtitle">Socle technique — version de développement</p>
      </header>

      <section className="panel" aria-labelledby="connection-title">
        <h2 id="connection-title">Connexion au moteur local</h2>
        <p>
          Cette vérification interroge uniquement la route de santé technique.
          Elle ne contrôle ni une base de données, ni la comptabilité, ni les
          sauvegardes.
        </p>

        <button
          type="button"
          onClick={() => {
            void handleHealthCheck();
          }}
          disabled={state.kind === "checking"}
        >
          {state.kind === "checking"
            ? "Vérification en cours…"
            : "Vérifier la connexion"}
        </button>

        <p className="result" role="status" aria-atomic="true">
          {describeState(state)}
        </p>
      </section>

      <section className="panel" aria-labelledby="limits-title">
        <h2 id="limits-title">Périmètre actuel</h2>
        <p>
          Aucun compte, document commercial ou stockage métier n’est disponible.
          N’utilisez pas de données professionnelles réelles.
        </p>
        <p>
          Le résultat affiché correspond au dernier contrôle manuel, pas à une
          surveillance continue.
        </p>
      </section>

      <footer>Auteur initial : Thibstudio24.</footer>
    </main>
  );
}

const container = document.getElementById("root");

if (container === null) {
  throw new Error("Le conteneur principal de Factorealm est absent.");
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
