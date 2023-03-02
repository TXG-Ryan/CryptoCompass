window.onload = function() {
  const socket = new WebSocket('wss://stream.binance.com:9443/ws');

  // Subscribe to BTC/USDT, ETH/USDT, BNB/USDT, and SOL/USDT pairs
  socket.addEventListener('open', function (event) {
    socket.send(JSON.stringify({
      method: 'SUBSCRIBE',
      params: ['btcusdt@ticker', 'ethusdt@ticker', 'bnbusdt@ticker', 'solusdt@ticker'],
      id: 1
    }));
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

  // Handle incoming messages
  socket.addEventListener('message', function (event) {
    const data = JSON.parse(event.data);

    // Filter out non-ticker messages
    if (data.e !== '24hrTicker') {
      return;
    }

    // Extract symbol, price, and 24-hour price change data from message
    const symbol = data.s;
    const price = parseFloat(data.c);
    const priceChangePercent = parseFloat(data.P);
    const priceChangeUSD = parseFloat(data.p);

    // Calculate market cap based on circulating supply
    let circulatingSupply;
    switch (symbol) {
      case 'BTCUSDT':
        circulatingSupply = 19305581;
        break;
      case 'ETHUSDT':
        circulatingSupply = 122373866; // as of 2023-03-02
        break;
      case 'BNBUSDT':
        circulatingSupply = 157894957; // as of 2023-03-02
        break;
      case 'SOLUSDT':
        circulatingSupply = 378852730; // as of 2023-03-02
        break;
      default:
        return;
    }
    const marketCap = price * circulatingSupply;

    // Display price, 24-hour price change (in percentage and USD), and market cap in HTML
    document.getElementById(symbol.toLowerCase() + '-price').innerHTML = '$' + price.toFixed(2);

    const priceChangePercentEl = document.getElementById(symbol.toLowerCase() + '-price-change-percent');
    priceChangePercentEl.innerHTML = priceChangePercent.toFixed(2) + '%';
    priceChangePercentEl.style.color = priceChangePercent >= 0 ? '#14c784' : '#ea3943';

    const priceChangeUSDEl = document.getElementById(symbol.toLowerCase() + '-price-change-usd');
    priceChangeUSDEl.innerHTML = '$' + priceChangeUSD.toFixed(2);
    priceChangeUSDEl.style.color = priceChangeUSD >= 0 ? '#14c784' : '#ea3943';

    document.getElementById(symbol.toLowerCase() + '-market-cap').innerHTML = '$' + formatNumber(marketCap);
  });
}
