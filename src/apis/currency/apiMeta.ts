export const specMeta = {
  name: "Frankfurter API",
  hasTags: true,
  url: [
    {
      url: "https://api.frankfurter.dev/v1"
    }
  ],
  apis: {
    "exchangeRates/getLatestRates": {
      method: "GET",
      path: "/latest",
      consumes: [],
      produces: ["application/json"],
      pathParams: null,
      queryParams: ["amount", "base", "symbols"],
      bodyParams: null
    },

    "exchangeRates/getHistoricalRates": {
      method: "GET",
      path: "/{date}",
      consumes: [],
      produces: ["application/json"],
      pathParams: ["date"],
      queryParams: ["amount", "base", "symbols"],
      bodyParams: null
    },

    "exchangeRates/getTimeSeriesRates": {
      method: "GET",
      path: "/{start_date}..{end_date}",
      consumes: [],
      produces: ["application/json"],
      pathParams: ["start_date", "end_date"],
      queryParams: ["amount", "base", "symbols"],
      bodyParams: null
    },

    "Currencies/getCurrencies": {
      method: "GET",
      path: "/currencies",
      consumes: [],
      produces: ["application/json"],
      pathParams: null,
      queryParams: null,
      bodyParams: null
    }
  }
} as const;
