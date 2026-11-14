import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { App } from "./App";

const container = document.getElementById("root");

if (container === null) {
  throw new Error("Le conteneur principal de Factorealm est absent.");
}

createRoot(container).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
