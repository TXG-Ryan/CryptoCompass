// define IDs for each element where we'll render the fetched data
const marketCapId = "market-cap";
const btcDominanceId = "btc-dominance";
const ethDominanceId = "eth-dominance";
const fearGreedIndexId = "fear-greed-index";

// define the API endpoint for fetching data
const apiEndpoint = "https://api.coingecko.com/api/v3/global";

// use Fetch API to get data from the endpoint
fetch(apiEndpoint)
  .then(response => response.json())
  .then(data => {
    // extract the desired data from the API response
    const marketCap = data.data.total_market_cap.usd;
    const btcDominance = data.data.market_cap_percentage.btc;
    const ethDominance = data.data.market_cap_percentage.eth;
    const fearGreedIndex = data.data.fear_and_greed_index.value;

    // render the data to the DOM via their respective IDs
    document.getElementById(marketCapId).innerHTML = `$${marketCap.toLocaleString()}`;
    document.getElementById(btcDominanceId).innerHTML = `${btcDominance.toFixed(2)}%`;
    document.getElementById(ethDominanceId).innerHTML = `${ethDominance.toFixed(2)}%`;
    document.getElementById(fearGreedIndexId).innerHTML = fearGreedIndex;
  })
  .catch(error => console.error(error));
