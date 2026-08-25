import { afterEach, describe, expect, it, vi } from "vitest";
import currencyExchangeClient, {
  createFrankfurterClient,
  currencyExchangeClient as namedClient,
} from "../../src/index";

describe("@pontx/frankfurter", () => {
  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it("exports the same client as the default and named entrypoint", () => {
    expect(currencyExchangeClient).toBe(namedClient);
  });

  it("serializes query parameters and returns the decoded response", async () => {
    const payload = {
      amount: 100,
      base: "USD",
      date: "2026-08-14",
      rates: { JPY: 14850 },
    };
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify(payload), {
        headers: { "content-type": "application/json" },
      }),
    );
    const client = createFrankfurterClient({ fetch: fetchMock });

    await expect(
      client.exchangeRates.getLatestRates({
        amount: 100,
        base: "USD",
        symbols: "JPY,CNY",
      }),
    ).resolves.toEqual(payload);

    expect(fetchMock).toHaveBeenCalledWith(
      "https://api.frankfurter.dev/v1/latest?amount=100&base=USD&symbols=JPY%2CCNY",
      expect.objectContaining({
        method: "GET",
        headers: { Accept: "application/json" },
      }),
    );
  });

  it("creates isolated clients with their own runtime origin", async () => {
    const fetchMock = vi.fn().mockResolvedValue(
      new Response(JSON.stringify({ rates: {} }), {
        headers: { "content-type": "application/json" },
      }),
    );
    const client = createFrankfurterClient({
      baseUrl: "https://rates.example.test/v1",
      fetch: fetchMock,
    });

    await client.exchangeRates.getLatestRates({});

    expect(fetchMock).toHaveBeenCalledWith(
      "https://rates.example.test/v1/latest",
      expect.any(Object),
    );
  });
});
