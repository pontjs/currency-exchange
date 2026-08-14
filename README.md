# @pontx/frankfurter

[![npm version](https://img.shields.io/npm/v/@pontx/frankfurter.svg)](https://www.npmjs.com/package/@pontx/frankfurter)
[![npm downloads](https://img.shields.io/npm/dm/@pontx/frankfurter.svg)](https://www.npmjs.com/package/@pontx/frankfurter)
[![license](https://img.shields.io/npm/l/currency-exchange-client.svg)](https://github.com/pontjs/currency-exchange/blob/main/LICENSE)

Currency exchange rate converter SDK powered by [Frankfurter API](https://frankfurter.dev/) and Pontx.

Browse the approved API documentation and SDK guide on [Pontx Hub](https://pontx-hub.vercel.app/en/sdks/frankfurter).

**Pontx Hub:** [https://pontx-hub.vercel.app/en/sdks/frankfurter](https://pontx-hub.vercel.app/en/sdks/frankfurter)

A TypeScript SDK for accessing foreign exchange rates and currency conversion data. The API is provided by [Frankfurter](https://frankfurter.dev/), a free and open-source currency data API that tracks reference exchange rates published by the European Central Bank.

## Why Choose This SDK?

### 🎯 Type-Safe SDK

- **Full TypeScript Support**: Complete type definitions for all API methods and responses
- **Auto-completion**: IntelliSense support in your IDE for all available currencies and parameters
- **Compile-time Safety**: Catch errors during development, not at runtime
- **Generated from OpenAPI**: SDK is auto-generated from the official OpenAPI specification, ensuring accuracy and up-to-date types

### 🚀 Powerful CLI

- **Interactive Commands**: Access all API features directly from your terminal
- **Shell Completion**: Built-in completion support for bash, zsh, and fish shells
- **No Code Required**: Quickly check exchange rates without writing any code
- **Scriptable**: Perfect for shell scripts and automation workflows
- **Help System**: Comprehensive help documentation for every command

## Features

- Type-safe TypeScript SDK for accessing Frankfurter API
- Latest and historical exchange rates
- Time series data support
- Command-line interface (CLI)
- Full TypeScript type definitions

## Installation

```bash
npm install @pontx/frankfurter
# or
pnpm add @pontx/frankfurter
# or
yarn add @pontx/frankfurter
```

## SDK Usage

### Basic Usage

```typescript
import currencyExchangeClient from "@pontx/frankfurter";

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

**Output:**

```json
{
  "amount": 1,
  "base": "USD",
  "date": "2024-01-15",
  "rates": {
    "JPY": 148.5,
    "CNY": 7.18
  }
}
```

### API Methods

#### Get Latest Exchange Rates

Retrieves the most recent exchange rates. Rates are updated daily around 16:00 CET.

```typescript
const rates = await currencyExchangeClient.exchangeRates.getLatestRates({
  amount: 100, // Optional: amount to convert (default: 1)
  base: "USD", // Optional: base currency (default: EUR)
  symbols: "JPY,CNY", // Optional: comma-separated currency codes
});
```

**Response:**

```typescript
{
  amount: 100,
  base: "USD",
  date: "2024-01-15",
  rates: {
    JPY: 14850.5,
    CNY: 718.2
  }
}
```

#### Get Historical Exchange Rates

Retrieves exchange rates for a specific date. Historical data is available from 1999-01-04 onwards.

```typescript
const historicalRates =
  await currencyExchangeClient.exchangeRates.getHistoricalRates(
    "2024-01-01", // Date in YYYY-MM-DD format
    {
      base: "USD",
      symbols: "EUR,GBP",
    }
  );
```

**Response:**

```typescript
{
  amount: 1,
  base: "USD",
  date: "2024-01-01",
  rates: {
    EUR: 0.91,
    GBP: 0.79
  }
}
```

#### Get Time Series Exchange Rates

Retrieves exchange rates for a date range, returning daily rates between the start and end dates.

```typescript
const timeSeries =
  await currencyExchangeClient.exchangeRates.getTimeSeriesRates(
    "2024-01-01", // Start date
    "2024-01-31", // End date
    {
      base: "USD",
      symbols: "EUR",
    }
  );
```

**Response:**

```typescript
{
  amount: 1,
  base: "USD",
  start_date: "2024-01-01",
  end_date: "2024-01-31",
  rates: {
    "2024-01-01": { EUR: 0.91 },
    "2024-01-02": { EUR: 0.92 },
    "2024-01-03": { EUR: 0.91 },
    // ... daily rates for the entire date range
  }
}
```

#### Get Supported Currencies

Returns a list of all currency codes supported by the API along with their full names.

```typescript
const currencies = await currencyExchangeClient.Currencies.getCurrencies();
```

**Response:**

```typescript
{
  AUD: "Australian Dollar",
  BRL: "Brazilian Real",
  CAD: "Canadian Dollar",
  CHF: "Swiss Franc",
  CNY: "Chinese Renminbi Yuan",
  // ... all supported currencies
  USD: "United States Dollar",
  ZAR: "South African Rand"
}
```

### Supported Currencies

The API supports the following currency codes: `AUD`, `BRL`, `CAD`, `CHF`, `CNY`, `CZK`, `DKK`, `EUR`, `GBP`, `HKD`, `HUF`, `IDR`, `ILS`, `INR`, `ISK`, `JPY`, `KRW`, `MXN`, `MYR`, `NOK`, `NZD`, `PHP`, `PLN`, `RON`, `SEK`, `SGD`, `THB`, `TRY`, `USD`, `ZAR`

## CLI Usage

This package provides a command-line interface for quick currency conversions and rate lookups.

### Basic Commands

After installation, you can use the `pontx-frankfurter` command:

```bash
# Get latest exchange rates
pontx-frankfurter exchangeRates getLatestRates --base USD --symbols JPY,CNY

# Get historical rates
pontx-frankfurter exchangeRates getHistoricalRates 2024-01-01 --base USD --symbols EUR

# Get time series data
pontx-frankfurter exchangeRates getTimeSeriesRates 2024-01-01 2024-01-31 --base USD

# List supported currencies
pontx-frankfurter Currencies getCurrencies
```

### CLI Help

To see all available commands and options:

```bash
pontx-frankfurter --help

# Get help for a specific module
pontx-frankfurter exchangeRates --help

# Get help for a specific command
pontx-frankfurter exchangeRates getLatestRates --help
```

### Shell Completion

The CLI supports shell completion for bash, zsh, and fish.

#### Bash

Add to your `~/.bashrc`:

```bash
eval "$(pontx-frankfurter completion bash)"
```

Or generate completion script to a file:

```bash
pontx-frankfurter completion bash > /etc/bash_completion.d/pontx-frankfurter
```

#### Zsh

Add to your `~/.zshrc`:

```zsh
eval "$(pontx-frankfurter completion zsh)"
```

Or generate completion script:

```zsh
pontx-frankfurter completion zsh > "${fpath[1]}/_pontx-frankfurter"
```

#### Fish

Generate completion script:

```fish
pontx-frankfurter completion fish > ~/.config/fish/completions/pontx-frankfurter.fish
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

The `pontx` CLI provides the same capabilities as the `pontx-frankfurter` CLI. The `currency` value below is the internal OpenAPI collection name:

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
  origins: [
    {
      name: "currency",
      localPath: "./openapi.json",
    },
  ],
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

- [Frankfurter API](https://frankfurter.dev/) - Official Frankfurter API website
- [Frankfurter API Documentation](https://www.frankfurter.app/docs/) - API documentation
