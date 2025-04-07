const fetchStockData = async (symbol) => {
    const apiKey = '55FTJIV9KMGVY0WI'; // Replace with your Alpha Vantage API key
    const url = `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${symbol}&interval=5min&apikey=${apiKey}`;
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error("Error fetching stock data:", error);
    }
  };
  
  