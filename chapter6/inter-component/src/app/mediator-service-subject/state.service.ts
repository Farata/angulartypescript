import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {Observable} from "rxjs/Observable";
import {Injectable} from '@angular/core';

@Injectable()
export class StateService{

  private stateSubject: BehaviorSubject<string> = new BehaviorSubject('');

  set searchCriteria(value: string) {

    this.stateSubject.next(value);

    console.log(`StateService BehaviorSubject emitting ${value}`);
  }

  getState(): Observable<string>{
    return this.stateSubject.asObservable();  // to prevent amazon and ebay components from using next()
  }
}
