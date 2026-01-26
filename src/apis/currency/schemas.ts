/**
 * @description Response containing exchange rates for a single date
 */
export type ExchangeRateResponse = {
  /**
   * @description The amount used for conversion
   */
  amount: number;
  /**
   * @description The base currency code (ISO 4217)
   */
  base: string;
  /**
   * @description The date of the exchange rates in ISO 8601 format
   */
  date: string;
  /**
   * @description Exchange rates as key-value pairs (currency code to rate)
   */
  rates: Record<any, number>;
}

/**
 * @description Response containing exchange rates for a date range
 */
export type TimeSeriesResponse = {
  /**
   * @description The amount used for conversion
   */
  amount: number;
  /**
   * @description The base currency code (ISO 4217)
   */
  base: string;
  /**
   * @description The start date of the time series
   */
  start_date: string;
  /**
   * @description The end date of the time series
   */
  end_date: string;
  /**
   * @description Exchange rates organized by date
   */
  rates: Record<any, Record<any, number>>;
}

/**
 * @description Map of currency codes to their full names
 */
export type CurrenciesResponse = Record<any, string>

/**
 * @description Error response
 */
export type Error = {
  /**
   * @description Short error identifier
   */
  error?: string;
  /**
   * @description Detailed error message
   */
  message?: string;
}