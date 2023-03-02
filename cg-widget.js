window.onload = function() {
  fetch('https://api.coingecko.com/api/v3/global')
    .then(response => response.json())
    .then(data => {
      // Extract global crypto market cap, BTC market cap, BTC dominance, and ETH dominance data from API response
      const globalMarketCap = data?.data?.total_market_cap?.usd || 0;
      const btcMarketCap = data?.data?.market_cap_percentage?.btc || 0;
      const btcDominance = data?.data?.market_cap_percentage?.btc_dominance || 0;
      const ethDominance = data?.data?.market_cap_percentage?.eth_dominance || 0;

      // Display global crypto market cap, BTC market cap, BTC dominance, and ETH dominance data in HTML
      document.getElementById('global-market-cap').innerHTML = '$' + formatNumber(globalMarketCap);
      document.getElementById('btc-market-cap').innerHTML = '$' + formatNumber(btcMarketCap * globalMarketCap / 100);
      document.getElementById('btc-dominance').innerHTML = btcDominance.toFixed(2) + '%';
      document.getElementById('eth-dominance').innerHTML = ethDominance.toFixed(2) + '%';
    })
    .catch(error => {
      console.error(error);
      // Display error message in HTML
      document.getElementById('error-message').innerHTML = 'An error occurred while fetching data.';
    });

  // Format number to appropriate format
  function formatNumber(number) {
    if (number >= 1e12) {
      return (number / 1e12).toFixed(2) + 't';
    } else if (number >= 1e9) {
      return (number / 1e9).toFixed(2) + 'b';
    } else if (number >= 1e6) {
      return (number / 1e6).toFixed(2) + 'm';
    } else if (number >= 1e3) {
      return (number / 1e3).toFixed(2) + 'k';
    } else {
      return number.toFixed(2);
    }
  }
}