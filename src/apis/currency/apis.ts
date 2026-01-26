/**
 * @author pontx-generator
 * @description API 类型定义
 */

import type * as schemas from './schemas';

// ============ exchangeRates 模块 ============

export declare namespace exchangeRates {
  export type GetLatestRatesParams = {
    /**
     * @description The amount to be converted (default is 1)
     */
    amount?: number;
    /**
     * @description Base currency code (three-letter ISO 4217 code)
     */
    base?: 'AUD' | 'BRL' | 'CAD' | 'CHF' | 'CNY' | 'CZK' | 'DKK' | 'EUR' | 'GBP' | 'HKD' | 'HUF' | 'IDR' | 'ILS' | 'INR' | 'ISK' | 'JPY' | 'KRW' | 'MXN' | 'MYR' | 'NOK' | 'NZD' | 'PHP' | 'PLN' | 'RON' | 'SEK' | 'SGD' | 'THB' | 'TRY' | 'USD' | 'ZAR';
    /**
     * @description Comma-separated list of currency codes to limit the response.
    If not specified, all available currencies are returned.

     */
    symbols?: string;
  };

  export type GetHistoricalRatesParams = {
    /**
     * @description The amount to be converted (default is 1)
     */
    amount?: number;
    /**
     * @description Base currency code (three-letter ISO 4217 code)
     */
    base?: 'AUD' | 'BRL' | 'CAD' | 'CHF' | 'CNY' | 'CZK' | 'DKK' | 'EUR' | 'GBP' | 'HKD' | 'HUF' | 'IDR' | 'ILS' | 'INR' | 'ISK' | 'JPY' | 'KRW' | 'MXN' | 'MYR' | 'NOK' | 'NZD' | 'PHP' | 'PLN' | 'RON' | 'SEK' | 'SGD' | 'THB' | 'TRY' | 'USD' | 'ZAR';
    /**
     * @description Comma-separated list of currency codes to limit the response
     */
    symbols?: string;
  };

  export type GetTimeSeriesRatesParams = {
    /**
     * @description The amount to be converted (default is 1)
     */
    amount?: number;
    /**
     * @description Base currency code (three-letter ISO 4217 code)
     */
    base?: 'AUD' | 'BRL' | 'CAD' | 'CHF' | 'CNY' | 'CZK' | 'DKK' | 'EUR' | 'GBP' | 'HKD' | 'HUF' | 'IDR' | 'ILS' | 'INR' | 'ISK' | 'JPY' | 'KRW' | 'MXN' | 'MYR' | 'NOK' | 'NZD' | 'PHP' | 'PLN' | 'RON' | 'SEK' | 'SGD' | 'THB' | 'TRY' | 'USD' | 'ZAR';
    /**
     * @description Comma-separated list of currency codes to limit the response
     */
    symbols?: string;
  };

}

export type exchangeRates = {
  /**
   * GET /latest
   * Retrieves the most recent exchange rates. Rates are updated daily around 16:00 CET.
   * By default, returns all available currencies with EUR as the base currency.
   * 
   * @summary: Get latest exchange rates
   */
  getLatestRates: (
    params: exchangeRates.GetLatestRatesParams,
    requestInit?: RequestInit,
  ) => Promise<schemas.ExchangeRateResponse>;

  /**
   * GET /{date}
   * Retrieves exchange rates for a specific date in the past.
   * Historical data is available from 1999-01-04 onwards.
   * 
   * @summary: Get historical exchange rates
   */
  getHistoricalRates: (
    /**
     * @description Date in ISO 8601 format (YYYY-MM-DD)
     */
    date: string,
    params: exchangeRates.GetHistoricalRatesParams,
    requestInit?: RequestInit,
  ) => Promise<schemas.ExchangeRateResponse>;

  /**
   * GET /{start_date}..{end_date}
   * Retrieves exchange rates for a date range, returning daily rates between the start and end dates (inclusive).
   * If end_date is omitted, returns all rates from start_date to the latest available date.
   * 
   * @summary: Get time series of exchange rates
   */
  getTimeSeriesRates: (
    /**
     * @description Start date in ISO 8601 format (YYYY-MM-DD)
     */
    start_date: string,
    /**
     * @description End date in ISO 8601 format (YYYY-MM-DD).
    Can be omitted by using format "start_date.." to get all rates from start_date onwards.

     */
    end_date: string,
    params: exchangeRates.GetTimeSeriesRatesParams,
    requestInit?: RequestInit,
  ) => Promise<schemas.TimeSeriesResponse>;

};

// ============ Currencies 模块 ============

export type Currencies = {
  /**
   * GET /currencies
   * Returns a list of all currency codes supported by the API along with their full names.
   * This endpoint requires no parameters.
   * 
   * @summary: Get list of supported currencies
   */
  getCurrencies: (
    requestInit?: RequestInit,
  ) => Promise<schemas.CurrenciesResponse>;

};

// ============ API 集合类型 ============

/**
 * API 类型定义
 */
export type APIs = {
  /** exchangeRates 模块 */
  exchangeRates: exchangeRates;
  /** Currencies 模块 */
  Currencies: Currencies;
};

export declare namespace APIs {
  export { exchangeRates };
  export { Currencies };
}
