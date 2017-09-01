import {Subject} from 'rxjs/Subject';

enum Action{
    buy = 'BUY',
    sell = 'SELL'
}

class Order{
    constructor(public orderId: number, public traderId: number, public stock: string, public shares: number, public action:Action){}
}

let orders: Subject<Order> = new Subject<Order>();

class Trader {

    constructor(private traderId:number, private traderName:string){}

    placeOrder(order: Order){
        orders.next(order);
    }
}

let subscriber1 = orders.subscribe(ord => console.log(`Subscriber 1 got order to ${ord.action} ${ord.shares} shares of ${ord.stock}`));
let subscriber2 = orders.subscribe(ord => console.log(`Subscriber 2 got order to ${ord.action} ${ord.shares} shares of ${ord.stock}`));

let trader: Trader = new Trader(1, 'Joe');
let order1:Order = new Order(1, 1,'IBM',100,Action.buy);
let order2:Order = new Order(2, 1,'AAPL',100,Action.sell);

trader.placeOrder( order1);
subscriber2.unsubscribe();
trader.placeOrder( order2);