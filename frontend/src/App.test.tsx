// @vitest-environment jsdom

import { StrictMode } from "react";
import {
  act,
  cleanup,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { App } from "./App";
import { checkHealth } from "./health";
import type { HealthResult } from "./health";

vi.mock("./health", () => ({
  checkHealth: vi.fn(),
}));

const checkHealthMock = vi.mocked(checkHealth);

beforeEach(() => {
  checkHealthMock.mockReset();
});

afterEach(() => {
  cleanup();
});

function renderApp(): void {
  render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

function getCheckButton(): HTMLButtonElement {
  return screen.getByRole<HTMLButtonElement>("button", {
    name: "Vérifier la connexion",
  });
}

function getStatusText(): string {
  return screen.getByRole("status").textContent ?? "";
}

describe("App", () => {
  it("affiche l'état initial sans déclencher de requête", () => {
    renderApp();

    expect(
      screen.getByRole("heading", { level: 1, name: "Factorealm" }),
    ).toBeDefined();

    expect(getStatusText()).toBe("Aucune vérification effectuée.");
    expect(getCheckButton().disabled).toBe(false);
    expect(checkHealthMock).not.toHaveBeenCalled();
  });

  it("désactive le bouton pendant la requête et évite un second appel", async () => {
    let resolveRequest!: (result: HealthResult) => void;

    const pending = new Promise<HealthResult>((resolve) => {
      resolveRequest = resolve;
    });

    checkHealthMock.mockReturnValueOnce(pending);

    renderApp();
    fireEvent.click(getCheckButton());

    const busyButton = screen.getByRole<HTMLButtonElement>("button", {
      name: "Vérification en cours…",
    });

    expect(busyButton.disabled).toBe(true);
    expect(getStatusText()).toBe("Vérification en cours…");

    fireEvent.click(busyButton);
    expect(checkHealthMock).toHaveBeenCalledTimes(1);

    await act(async () => {
      resolveRequest({ kind: "success" });
      await pending;
    });

    expect(getStatusText()).toContain("L’API technique répond.");
    expect(getCheckButton().disabled).toBe(false);
  });

  it("affiche le succès et une indication de dernière vérification", async () => {
    checkHealthMock.mockResolvedValueOnce({ kind: "success" });

    renderApp();
    fireEvent.click(getCheckButton());

    await waitFor(() => {
      expect(getStatusText()).toContain(
        "L’API technique répond. Dernière vérification réussie à ",
      );
    });

    expect(checkHealthMock).toHaveBeenCalledTimes(1);
    expect(getCheckButton().disabled).toBe(false);
  });

  it("remplace un ancien succès par une indisponibilité", async () => {
    checkHealthMock
      .mockResolvedValueOnce({ kind: "success" })
      .mockResolvedValueOnce({
        kind: "unavailable",
        detail: "le serveur ou le relais a renvoyé HTTP 503.",
      });

    renderApp();
    fireEvent.click(getCheckButton());

    await waitFor(() => {
      expect(getStatusText()).toContain("L’API technique répond.");
    });

    fireEvent.click(getCheckButton());

    await waitFor(() => {
      expect(getStatusText()).toBe(
        "API indisponible : le serveur ou le relais a renvoyé HTTP 503.",
      );
    });

    expect(getStatusText()).not.toContain("Dernière vérification réussie");
    expect(checkHealthMock).toHaveBeenCalledTimes(2);
    expect(getCheckButton().disabled).toBe(false);
  });

  it("affiche une réponse inattendue sans l'assimiler à un succès", async () => {
    checkHealthMock.mockResolvedValueOnce({
      kind: "unexpected",
      detail: "le JSON reçu ne contient pas le statut attendu.",
    });

    renderApp();
    fireEvent.click(getCheckButton());

    await waitFor(() => {
      expect(getStatusText()).toBe(
        "Réponse inattendue : le JSON reçu ne contient pas le statut attendu.",
      );
    });

    expect(getStatusText()).not.toContain("L’API technique répond.");
    expect(getCheckButton().disabled).toBe(false);
  });

  it("permet une nouvelle tentative après une erreur interne", async () => {
    checkHealthMock
      .mockRejectedValueOnce(new Error("Erreur interne simulée"))
      .mockResolvedValueOnce({ kind: "success" });

    renderApp();
    fireEvent.click(getCheckButton());

    await waitFor(() => {
      expect(getStatusText()).toBe(
        "Réponse inattendue : une erreur interne a empêché la vérification.",
      );
    });

    expect(getCheckButton().disabled).toBe(false);

    fireEvent.click(getCheckButton());

    await waitFor(() => {
      expect(getStatusText()).toContain("L’API technique répond.");
    });

    expect(checkHealthMock).toHaveBeenCalledTimes(2);
    expect(getCheckButton().disabled).toBe(false);
  });
});
