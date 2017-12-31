let {Observable} = require('rxjs/Observable');
require('rxjs/add/observable/from');
require('rxjs/add/operator/map');
require('rxjs/add/operator/filter');

let beers = [
    {name: "Stella", country: "Belgium", price: 9.50},
    {name: "Sam Adams", country: "USA", price: 8.50},
    {name: "Bud Light", country: "USA", price: 6.50},
    {name: "Brooklyn Lager", country: "USA", price: 8.00},
    {name: "Sapporo", country: "Japan", price: 7.50}
];

Observable.from(beers)
    .filter(beer => beer.price < 8)
    .map(beer => beer.name + ": $" + beer.price)
    .subscribe(
        beer => console.log(beer),
        err => console.error(err),
        () => console.log("Streaming is over")
);