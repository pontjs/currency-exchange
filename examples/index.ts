import { createFrankfurterClient } from "../src/index";

const client = createFrankfurterClient();

async function main() {
  const response = await client.exchangeRates.getLatestRates({
    base: "USD",
    symbols: "JPY,CNY",
  });
  console.log(response);
}

main();
