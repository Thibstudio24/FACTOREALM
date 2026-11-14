import { afterEach, describe, expect, it, vi } from "vitest";
import { checkHealth, HEALTH_TIMEOUT_MS } from "./health";

afterEach(() => {
  vi.useRealTimers();
  vi.restoreAllMocks();
});

function jsonResponse(body: string): Response {
  return new Response(body, {
    status: 200,
    headers: {
      "Content-Type": "application/json; charset=utf-8",
    },
  });
}

describe("checkHealth", () => {
  it("accepte la réponse attendue et utilise les options prévues", async () => {
    const fetcher = vi.fn<typeof fetch>();
    fetcher.mockResolvedValue(jsonResponse('{"status":"ok"}'));

    await expect(checkHealth(fetcher)).resolves.toEqual({
      kind: "success",
    });

    expect(fetcher).toHaveBeenCalledTimes(1);
    expect(fetcher).toHaveBeenCalledWith(
      "/healthz",
      expect.objectContaining({
        method: "GET",
        headers: {
          Accept: "application/json",
        },
        cache: "no-store",
        credentials: "omit",
        redirect: "error",
        signal: expect.any(AbortSignal),
      }),
    );
  });

  it("signale une erreur HTTP", async () => {
    const fetcher = vi.fn<typeof fetch>();
    fetcher.mockResolvedValue(
      new Response("Service indisponible", { status: 503 }),
    );

    await expect(checkHealth(fetcher)).resolves.toEqual({
      kind: "unavailable",
      detail: "le serveur ou le relais a renvoyé HTTP 503.",
    });
  });

  it("refuse un contenu HTML même si le statut HTTP est 200", async () => {
    const fetcher = vi.fn<typeof fetch>();
    fetcher.mockResolvedValue(
      new Response("<html></html>", {
        headers: {
          "Content-Type": "text/html",
        },
      }),
    );

    await expect(checkHealth(fetcher)).resolves.toEqual({
      kind: "unexpected",
      detail: "le contenu reçu n’est pas annoncé comme du JSON.",
    });
  });

  it("refuse une réponse sans type de contenu", async () => {
    const fetcher = vi.fn<typeof fetch>();
    fetcher.mockResolvedValue(new Response(null, { status: 200 }));

    await expect(checkHealth(fetcher)).resolves.toEqual({
      kind: "unexpected",
      detail: "le contenu reçu n’est pas annoncé comme du JSON.",
    });
  });

  it("signale un JSON invalide", async () => {
    const fetcher = vi.fn<typeof fetch>();
    fetcher.mockResolvedValue(jsonResponse("{"));

    await expect(checkHealth(fetcher)).resolves.toEqual({
      kind: "unexpected",
      detail: "le contenu reçu n’est pas un JSON valide.",
    });
  });

  it.each([
    ["statut différent", '{"status":"error"}'],
    ["champ absent", "{}"],
    ["valeur nulle", "null"],
    ["tableau", "[]"],
    ["chaîne", '"ok"'],
  ])("refuse une structure inattendue : %s", async (_name, body) => {
    const fetcher = vi.fn<typeof fetch>();
    fetcher.mockResolvedValue(jsonResponse(body));

    await expect(checkHealth(fetcher)).resolves.toEqual({
      kind: "unexpected",
      detail: "le JSON reçu ne contient pas le statut attendu.",
    });
  });

  it("signale une panne réseau", async () => {
    const fetcher = vi.fn<typeof fetch>();
    fetcher.mockRejectedValue(new TypeError("Panne réseau simulée"));

    await expect(checkHealth(fetcher)).resolves.toEqual({
      kind: "unavailable",
      detail:
        "la requête n’a pas pu aboutir. Vérifiez les serveurs Go et Vite.",
    });
  });

  it("signale une interruption pendant la lecture du corps", async () => {
    const response = jsonResponse('{"status":"ok"}');

    vi.spyOn(response, "json").mockRejectedValue(
      new TypeError("Lecture interrompue simulée"),
    );

    const fetcher = vi.fn<typeof fetch>();
    fetcher.mockResolvedValue(response);

    await expect(checkHealth(fetcher)).resolves.toEqual({
      kind: "unavailable",
      detail:
        "la requête n’a pas pu aboutir. Vérifiez les serveurs Go et Vite.",
    });
  });

  it("annule la requête après cinq secondes et nettoie le minuteur", async () => {
    vi.useFakeTimers();

    let observedSignal: AbortSignal | null = null;

    const fetcher = vi.fn<typeof fetch>();

    fetcher.mockImplementation(
      (_input, init) =>
        new Promise<Response>((_resolve, reject) => {
          const signal = init?.signal;

          if (!signal) {
            reject(new Error("Signal d’annulation absent"));
            return;
          }

          observedSignal = signal;

          signal.addEventListener(
            "abort",
            () => {
              reject(new DOMException("Annulation simulée", "AbortError"));
            },
            { once: true },
          );
        }),
    );

    const pending = checkHealth(fetcher);
    const isAborted = (): boolean => observedSignal?.aborted ?? false;

    await vi.advanceTimersByTimeAsync(HEALTH_TIMEOUT_MS - 1);
    expect(isAborted()).toBe(false);

    await vi.advanceTimersByTimeAsync(1);

    await expect(pending).resolves.toEqual({
      kind: "unavailable",
      detail: "le délai maximal de cinq secondes a été dépassé.",
    });

    expect(isAborted()).toBe(true);
    expect(vi.getTimerCount()).toBe(0);
  });

  it("nettoie le minuteur après un succès", async () => {
    vi.useFakeTimers();

    const fetcher = vi.fn<typeof fetch>();
    fetcher.mockResolvedValue(jsonResponse('{"status":"ok"}'));

    await checkHealth(fetcher);

    expect(vi.getTimerCount()).toBe(0);
  });

  it("nettoie le minuteur après une erreur réseau", async () => {
    vi.useFakeTimers();

    const fetcher = vi.fn<typeof fetch>();
    fetcher.mockRejectedValue(new TypeError("Panne réseau simulée"));

    await checkHealth(fetcher);

    expect(vi.getTimerCount()).toBe(0);
  });
});
