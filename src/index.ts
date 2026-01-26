import { createGracefulClient } from "@pontx/sdk";
import { APIs } from "./apis/currency/apis";
import { specMeta } from "./apis/currency/apiMeta";

const currencyExchangeClient = createGracefulClient<APIs>({
  pontxSpecMeta: specMeta as any,
  baseUrl: "https://api.frankfurter.dev/v1",
  baseRequestFn: (url, init) => {
    return fetch(url, init).then(res => res.json());
  },
});

export { currencyExchangeClient }

export default currencyExchangeClient;