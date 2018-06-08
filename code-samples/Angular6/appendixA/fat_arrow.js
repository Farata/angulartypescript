function StockQuoteGenerator(symbol){
      this.symbol = symbol;
      setInterval(() => {
                 console.log("The price of " + this.symbol
                         + " is " + Math.random());
              }, 1000);
}

const stockQuoteGenerator = new StockQuoteGenerator("IBM");
