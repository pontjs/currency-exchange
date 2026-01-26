import { currencyExchangeClient } from "../src/index";

async function main() {
  const response = await currencyExchangeClient.exchangeRates.getLatestRates({
    base: "USD",
    symbols: "JPY,CNY",
  });
  console.log(response);
}

main();