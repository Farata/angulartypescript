let {Observable} = require('rxjs/Observable');
let {Scheduler} = require('rxjs/Scheduler');
require('rxjs/add/observable/from');
require('rxjs/add/operator/mergeMap'); // flatMap is an alias of mergeMap

function getDrinks() {

    let beers = Observable.from([
        {name: "Stella", country: "Belgium", price: 9.50},
        {name: "Sam Adams", country: "USA", price: 8.50},
        {name: "Bud Light", country: "USA", price: 6.50}
    ], Scheduler.async);

    let softDrinks = Observable.from([
        {name: "Coca Cola", country: "USA", price: 1.50},
        {name: "Fanta", country: "USA", price: 1.50},
        {name: "Lemonade", country: "France", price: 2.50}
    ], Scheduler.async);

    return Observable.create( observer => {

            observer.next(beers);
            observer.next(softDrinks);
            observer.complete();
        }
    );
}

// We want to "unload" each palette and print the info about each drink

getDrinks()
  .flatMap(drinks => drinks)
  .subscribe(
      drink => console.log("Subscriber got " + drink.name + ": " + drink.price ),
      error => console.err(error),
      () => console.log("The stream of drinks is over")
  );
