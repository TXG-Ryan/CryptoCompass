fetch('https://api.coingecko.com/api/v3/global')
  .then(response => response.json())
  .then(data => {
    const marketCap = data.data.total_market_cap.usd;
    const btcDominance = data.data.market_cap_percentage.btc;
    const ethDominance = data.data.market_cap_percentage.eth;
    const fearGreedIndex = data.data.fear_and_greed_index;

    document.getElementById('market-cap').innerHTML = `$${marketCap.toLocaleString()}`;
    document.getElementById('btc-dominance').innerHTML = `${btcDominance.toFixed(2)}%`;
    document.getElementById('eth-dominance').innerHTML = `${ethDominance.toFixed(2)}%`;

    // check if the fearGreedIndex object exists before accessing its value property
    if (fearGreedIndex) {
      document.getElementById('fear-greed-index').innerHTML = fearGreedIndex.value;
    } else {
      document.getElementById('fear-greed-index').innerHTML = 'N/A';
    }
  })
  .catch(error => console.error(error));
