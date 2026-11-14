export type HealthResult =
  | { kind: "success" }
  | { kind: "unavailable"; detail: string }
  | { kind: "unexpected"; detail: string };

export const HEALTH_TIMEOUT_MS = 5000;

function isHealthResponse(value: unknown): value is { status: "ok" } {
  return (
    typeof value === "object" &&
    value !== null &&
    "status" in value &&
    value.status === "ok"
  );
}

export async function checkHealth(
  fetcher: typeof fetch = globalThis.fetch,
): Promise<HealthResult> {
  const controller = new AbortController();
  const timeout = globalThis.setTimeout(
    () => controller.abort(),
    HEALTH_TIMEOUT_MS,
  );

  try {
    const response = await fetcher("/healthz", {
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
      return {
        kind: "unavailable",
        detail: `le serveur ou le relais a renvoyé HTTP ${response.status}.`,
      };
    }

    const mediaType = response.headers
      .get("Content-Type")
      ?.split(";")[0]
      ?.trim()
      .toLowerCase();

    if (mediaType !== "application/json") {
      return {
        kind: "unexpected",
        detail: "le contenu reçu n’est pas annoncé comme du JSON.",
      };
    }

    let body: unknown;

    try {
      body = await response.json();
    } catch (error: unknown) {
      if (controller.signal.aborted || error instanceof TypeError) {
        throw error;
      }

      return {
        kind: "unexpected",
        detail: "le contenu reçu n’est pas un JSON valide.",
      };
    }

    if (!isHealthResponse(body)) {
      return {
        kind: "unexpected",
        detail: "le JSON reçu ne contient pas le statut attendu.",
      };
    }

    return { kind: "success" };
  } catch {
    return {
      kind: "unavailable",
      detail: controller.signal.aborted
        ? "le délai maximal de cinq secondes a été dépassé."
        : "la requête n’a pas pu aboutir. Vérifiez les serveurs Go et Vite.",
    };
  } finally {
    globalThis.clearTimeout(timeout);
  }
}
