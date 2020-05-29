import { PreloadingStrategy, Route } from '@angular/router';

import { Observable, EMPTY } from 'rxjs';
import {Injectable} from "@angular/core";

@Injectable()
export class CustomPreloadingStrategy implements PreloadingStrategy {

  preload(route: Route, load: () => Observable<any>): Observable<any> {
    return (route.data && route.data['preloadme']) ?
      load(): EMPTY;
  }
}
