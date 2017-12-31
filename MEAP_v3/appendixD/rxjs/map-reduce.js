let {Observable} = require('rxjs/Observable');
require('rxjs/add/observable/from');
require('rxjs/add/operator/map');
require('rxjs/add/operator/reduce');

let beers = [
    {name: "Stella", country: "Belgium", price: 9.50},
    {name: "Sam Adams", country: "USA", price: 8.50},
    {name: "Bud Light", country: "USA", price: 6.50}
];

Observable.from(beers)
    .map(beer => beer.price)
    .reduce((total,price) => total+price,0)
    .subscribe(
        totalPrice => console.log(`Total price: ${totalPrice}`),
        err => console.error(err)
    );