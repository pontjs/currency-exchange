import { createGracefulClient, type GracefulClient } from "@pontx/sdk";
import type { APIs } from "./apis/currency/apis";
import { specMeta } from "./apis/currency/apiMeta";

const DEFAULT_BASE_URL = "https://api.frankfurter.dev/v1";

export type FrankfurterClient = GracefulClient<APIs>;

export interface FrankfurterClientOptions {
  /** Override the official Frankfurter v1 origin, primarily for testing. */
  baseUrl?: string;
  /** Provide a custom fetch implementation without changing global state. */
  fetch?: typeof globalThis.fetch;
}

/** Create an isolated Frankfurter v1 SDK client. */
export function createFrankfurterClient(
  options: FrankfurterClientOptions = {},
): FrankfurterClient {
  return createGracefulClient<APIs>({
    pontxSpecMeta: specMeta as never,
    baseUrl: options.baseUrl ?? DEFAULT_BASE_URL,
    baseRequestFn: (url, init) => {
      const fetchRequest = options.fetch ?? globalThis.fetch;
      return fetchRequest(url, init as RequestInit).then((response) => response.json());
    },
  });
}

/** @deprecated Prefer createFrankfurterClient() so runtime configuration is explicit. */
const currencyExchangeClient = createFrankfurterClient();

export { currencyExchangeClient };
export default currencyExchangeClient;
