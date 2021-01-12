export default async function getAllTickers() {

  const proxyurl = "https://cors-anywhere.herokuapp.com/";

  const response = await fetch(
    proxyurl +
      "https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest",
    {
      qs: {
        start: "1",
        limit: "100",
        convert: "USD,BTC",
      },
      headers: {
        "X-CMC_PRO_API_KEY": `c376c1b8-e61b-4f95-9835-673f3abda6c9`,
      },
      json: true,
      gzip: true,
    }
  );

  const json = await response.json();

  return json.data;
}
