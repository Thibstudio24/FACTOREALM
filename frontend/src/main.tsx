import { StrictMode, useRef, useState } from "react";
import { createRoot } from "react-dom/client";

type CheckState =
  | { kind: "idle" }
  | { kind: "checking" }
  | { kind: "success"; checkedAt: string }
  | { kind: "unavailable"; detail: string }
  | { kind: "unexpected"; detail: string };

function isHealthResponse(value: unknown): value is { status: "ok" } {
  return (
    typeof value === "object" &&
    value !== null &&
    "status" in value &&
    value.status === "ok"
  );
}

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

  async function checkHealth(): Promise<void> {
    if (requestInProgress.current) {
      return;
    }

    requestInProgress.current = true;
    setState({ kind: "checking" });

    const controller = new AbortController();
    const timeout = window.setTimeout(() => controller.abort(), 5000);

    try {
      const response = await fetch("/healthz", {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
        credentials: "omit",
        redirect: "error",
        signal: controller.signal,
      });

      if (!response.ok) {
        setState({
          kind: "unavailable",
          detail: `le serveur ou le relais a renvoyé HTTP ${response.status}.`,
        });
        return;
      }

      const contentType = response.headers.get("Content-Type");
      const mediaType = contentType?.split(";")[0]?.trim().toLowerCase();

      if (mediaType !== "application/json") {
        setState({
          kind: "unexpected",
          detail: "le contenu reçu n’est pas annoncé comme du JSON.",
        });
        return;
      }

      let body: unknown;

      try {
        body = await response.json();
      } catch (error: unknown) {
        if (controller.signal.aborted || error instanceof TypeError) {
          throw error;
        }

        setState({
          kind: "unexpected",
          detail: "le contenu reçu n’est pas un JSON valide.",
        });
        return;
      }

      if (!isHealthResponse(body)) {
        setState({
          kind: "unexpected",
          detail: "le JSON reçu ne contient pas le statut attendu.",
        });
        return;
      }

      setState({
        kind: "success",
        checkedAt: new Date().toLocaleTimeString("fr-FR"),
      });
    } catch {
      setState({
        kind: "unavailable",
        detail: controller.signal.aborted
          ? "le délai maximal de cinq secondes a été dépassé."
          : "la requête n’a pas pu aboutir. Vérifiez les serveurs Go et Vite.",
      });
    } finally {
      window.clearTimeout(timeout);
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
            void checkHealth();
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
