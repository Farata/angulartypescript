//Numeric enums
/*const enum Action{
 buy,  // 0
 sell  // 1
 }*/

// String enums
const enum Action{
    buy = 'BUY',
    sell = 'SELL'
}

class Order{
    constructor(public orderId: number,
                public stock: string,
                public shares: number,
                public action: Action){}
}

function placeOrder(ord: Order){
    console.log(`Sending to NASDAQ the order to ${ord.action} ${ord.shares} shares of ${ord.stock}`);
}

let order1:Order = new Order(1, 'IBM',100,Action.buy);
let order2:Order = new Order(2, 'AAPL',100,Action.sell);

placeOrder( order1);
placeOrder( order2);