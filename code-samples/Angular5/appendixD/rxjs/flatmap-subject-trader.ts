import {Subject} from 'rxjs/Subject';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/reduce';
import 'rxjs/add/operator/map';

enum Action{
    Buy = 'BUY',
    Sell = 'SELL'
}

class Order{
    constructor(public orderId: number, public traderId: number, public stock: string, public shares: number, public action:Action){}
}

let traders: Subject<Trader> = new Subject<Trader>();

class Trader {

    orders: Subject<Order> = new Subject<Order>();

    constructor(private traderId:number, public traderName:string){}
}

let tradersSubscriber = traders.subscribe(trader => console.log(`Trader ${trader.traderName} arrived`))

let ordersSubscriber = traders
    .flatMap(trader => trader.orders)
/*
    .map(order => order.shares)
    .reduce((total,shares) => total+ shares,0)
    .subscribe(totalShares => console.log(`Total shares: ${totalShares}`));
*/
    .subscribe(ord => console.log(`Got order from trader ${ord.traderId} to ${ord.action} ${ord.shares} shares of ${ord.stock}`));

let firstTrader = new Trader(1, 'Joe');
let secondTrader = new Trader(2, 'Mary');

traders.next(firstTrader);
traders.next(secondTrader);



let order1:Order = new Order(1, 1,'IBM',100,Action.Buy);
let order2:Order = new Order(2, 1,'AAPL',200,Action.Sell);
let order3:Order = new Order(3, 2,'MSFT',500,Action.Buy);

firstTrader.orders.next( order1);
firstTrader.orders.next( order2);
secondTrader.orders.next( order3);
