# currency-exchange

Currency exchange rate converter SDK powered by Frankfurter API

## Features

- Type-safe TypeScript SDK for accessing Frankfurter API
- Latest and historical exchange rates
- Time series data support
- Command-line interface (CLI)
- Full TypeScript type definitions

## Installation

```bash
npm install currency-exchange
# or
pnpm add currency-exchange
# or
yarn add currency-exchange
```

## SDK Usage

### Basic Usage

```typescript
import currencyExchangeClient from "currency-exchange";

async function main() {
  // Get latest exchange rates
  const response = await currencyExchangeClient.exchangeRates.getLatestRates({
    base: "USD",
    symbols: "JPY,CNY",
  });
  console.log(response);
}

main();
```

### API Methods

#### Get Latest Exchange Rates

Retrieves the most recent exchange rates. Rates are updated daily around 16:00 CET.

```typescript
const rates = await currencyExchangeClient.exchangeRates.getLatestRates({
  amount: 100,           // Optional: amount to convert (default: 1)
  base: "USD",          // Optional: base currency (default: EUR)
  symbols: "JPY,CNY"    // Optional: comma-separated currency codes
});
```

#### Get Historical Exchange Rates

Retrieves exchange rates for a specific date. Historical data is available from 1999-01-04 onwards.

```typescript
const historicalRates = await currencyExchangeClient.exchangeRates.getHistoricalRates(
  "2024-01-01",         // Date in YYYY-MM-DD format
  {
    base: "USD",
    symbols: "EUR,GBP"
  }
);
```

#### Get Time Series Exchange Rates

Retrieves exchange rates for a date range, returning daily rates between the start and end dates.

```typescript
const timeSeries = await currencyExchangeClient.exchangeRates.getTimeSeriesRates(
  "2024-01-01",         // Start date
  "2024-01-31",         // End date
  {
    base: "USD",
    symbols: "EUR"
  }
);
```

#### Get Supported Currencies

Returns a list of all currency codes supported by the API along with their full names.

```typescript
const currencies = await currencyExchangeClient.Currencies.getCurrencies();
```

### Supported Currencies

The API supports the following currency codes: `AUD`, `BRL`, `CAD`, `CHF`, `CNY`, `CZK`, `DKK`, `EUR`, `GBP`, `HKD`, `HUF`, `IDR`, `ILS`, `INR`, `ISK`, `JPY`, `KRW`, `MXN`, `MYR`, `NOK`, `NZD`, `PHP`, `PLN`, `RON`, `SEK`, `SGD`, `THB`, `TRY`, `USD`, `ZAR`

## CLI Usage

This package provides a command-line interface for quick currency conversions and rate lookups.

### Basic Commands

After installation, you can use the `currency` command:

```bash
# Get latest exchange rates
currency exchangeRates getLatestRates --base USD --symbols JPY,CNY

# Get historical rates
currency exchangeRates getHistoricalRates 2024-01-01 --base USD --symbols EUR

# Get time series data
currency exchangeRates getTimeSeriesRates 2024-01-01 2024-01-31 --base USD

# List supported currencies
currency Currencies getCurrencies
```

### CLI Help

To see all available commands and options:

```bash
currency --help

# Get help for a specific module
currency exchangeRates --help

# Get help for a specific command
currency exchangeRates getLatestRates --help
```

### Shell Completion

The CLI supports shell completion for bash, zsh, and fish.

#### Bash

Add to your `~/.bashrc`:

```bash
eval "$(currency completion bash)"
```

Or generate completion script to a file:

```bash
currency completion bash > /etc/bash_completion.d/currency
```

#### Zsh

Add to your `~/.zshrc`:

```zsh
eval "$(currency completion zsh)"
```

Or generate completion script:

```zsh
currency completion zsh > "${fpath[1]}/_currency"
```

#### Fish

Generate completion script:

```fish
currency completion fish > ~/.config/fish/completions/currency.fish
```

## Using Pontx CLI

This SDK is generated using [Pontx](https://github.com/nailyjs/pontx), a powerful OpenAPI SDK generator. You can use the generic `pontx` CLI to access the same functionality.

### Installation

First, install pontx globally or as a dev dependency:

```bash
npm install -g pontx
# or
npm install -D pontx
```

### Using Pontx CLI

The `pontx` CLI provides the same capabilities as the `currency` CLI:

```bash
# Execute API calls using pontx
pontx execute currency exchangeRates getLatestRates --base USD --symbols JPY,CNY

# With custom configuration
pontx execute --config pontx.config.ts currency exchangeRates getLatestRates --base USD

# Generate SDK from OpenAPI spec
pontx generate

# Build CLI
pontx cli build
```

### Configuration

The project includes a `pontx.config.ts` file that configures the SDK generation:

```typescript
import { defineConfig } from "pontx";

export default defineConfig({
  outDir: "src/apis",
  origins: [{
    name: "currency",
    localPath: "./openapi.json",
  }],
});
```

### Pontx Commands

```bash
# Generate TypeScript SDK from OpenAPI spec
pontx generate

# Build standalone CLI
pontx cli build

# Execute API directly via CLI
pontx execute [origin] [module] [method] [...args]

# Show available APIs
pontx list

# Validate OpenAPI specification
pontx validate
```

## Development

```bash
# Install dependencies
pnpm install

# Generate SDK from OpenAPI spec
pnpm pontx

# Build the package
pnpm build

# Run example
pnpm example

# Type checking
pnpm type-check
```

## Requirements

- Node.js >= 18.0.0

## License

MIT

## Related Links

- [Frankfurter API Documentation](https://www.frankfurter.app/docs/)
- [Pontx Documentation](https://github.com/nailyjs/pontx)
