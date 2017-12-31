function StockQuoteGeneratorArrow(symbol: string){

   this.symbol = symbol; 

    setInterval(() => {
        console.log("Fat arrow. The price of " + this.symbol  // this points at our function obj
            + " is " + Math.random());
    }, 3000);

}

const stockQuoteGeneratorArrow = new StockQuoteGeneratorArrow("IBM");


function StockQuoteGeneratorAnonymous(symbol: string){

    this.symbol = symbol;

    setInterval(function () {
        console.log("   Anonymous.The price of " + this.symbol    // this points at the global obj
            + " is " + Math.random());
    }, 3000);

}

const stockQuoteGeneratorAnonymous = new StockQuoteGeneratorAnonymous("IBM");