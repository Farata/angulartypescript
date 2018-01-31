let {Observable} = require('rxjs/Observable');
require('rxjs/add/operator/catch');
require('rxjs/add/operator/map');

function getData(){

    var beers = [
        {name: "Stella", country: "Belgium", price: 9.50},
        {name: "Sam Adams", country: "USA", price: 8.50},
        {name: "Bud Light", country: "USA", price: 6.50},
        {name: "Brooklyn Lager", country: "USA", price: 8.00},
        {name: "Sapporo", country: "Japan", price: 7.50}
    ];

    return Observable.create( observer => {
        let counter = 0;
        beers.forEach( beer => {
            observer.next(beer);
            counter++;

            if (counter > Math.random() * 5) {    // Randomly generate an error
                observer.error(
                    {
                        status: 500,
                        description: "Beer stream error"
                    }
                );
            }
        }
        );

        observer.complete();
      }
    );
}

// Subscribing to data from the primary source
getData()
    .catch(err => {  // failover

        console.error("Got " + err.status + ": " + err.description);
        if (err.status === 500){
            console.error(">>> Switching to retrieving cached data");
            return getCachedData();
        } else{
            return Rx.Observable.empty();  // don't handle the error
        }

    })
    .map(beer => beer.name + ", " + beer.country)
    .subscribe(
        beer => console.log("Subscriber got " + beer),
        err => console.error(err),
        () => console.log("The stream is over")
    );


function getCachedData(){

    var beers = [
        {name: "Leffe Blonde", country: "Belgium", price: 9.50},
        {name: "Miller Lite", country: "USA", price: 8.50},
        {name: "Corona", country: "Mexico", price: 8.00},
        {name: "Asahi", country: "Japan", price: 7.50}
    ];

    return Observable.create( observer => {

        beers.forEach( beer => {
                observer.next(beer);
            }
        );

        observer.complete();}
    );
}