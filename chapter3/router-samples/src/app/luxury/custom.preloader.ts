import { PreloadingStrategy, Route } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { empty } from 'rxjs/observable/empty';
import {Injectable} from "@angular/core";

@Injectable()
export class CustomPreloadingStrategy implements PreloadingStrategy {

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return (route.data && route.data['preloadme']) ?
      load(): empty();
  }
}
