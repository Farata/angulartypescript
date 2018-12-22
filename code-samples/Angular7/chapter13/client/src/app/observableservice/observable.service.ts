import {Observable, interval} from 'rxjs';

export class ObservableService{

    createObservableService(): Observable<Date>{

        return new Observable(
          observer => {
            interval(1000)
              .subscribe((_) => observer.next(new Date())
              );
          }
        );
    }
}
