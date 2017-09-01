let {Observable} = require('rxjs/Observable');

function getData(){

    var beers = [
        {name: "Stella", country: "Belgium", price: 9.50},
        {name: "Sam Adams", country: "USA", price: 8.50},
        {name: "Bud Light", country: "USA", price: 6.50},
        {name: "Brooklyn Lager", country: "USA", price: 8.00},
        {name: "Sapporo", country: "Japan", price: 7.50}
    ];

        
    return Observable.create( observer => {

              beers.forEach( beer => observer.next(beer));

              observer.complete();
           }
    );
}

getData()
     .subscribe(
         beer => console.log("Subscriber got " + beer.name),
         error => console.err(error),
            () => console.log("The stream is over")
);
