import { runCLI } from 'pontx/sdk-cli';

export default runCLI({
  name: "currency",
  executeApi: {
    baseURL: "https://api.frankfurter.dev/v1",
  },
  generateSamples: [{
    case: "nodejs",
    "description": "Generate sample code for Node.js",
    "generateSample": async (api, options) => {
      return `import currencyClient from "@pontx/api-frankfurter";

async function main() {
  const response = await currencyClient.exchangeRates.getLatestRates({
    base: "USD",
    symbols: "JPY,CNY",
  });
  console.log(response);
}

main();
      `;
    }
  }]
});
