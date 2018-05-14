import { RouterStateSerializer } from '@ngrx/router-store';
import {Params, RouterStateSnapshot} from '@angular/router';

interface MyRouterState {
  url: string;
  queryParams: Params;
}

export class MyRouterSerializer implements RouterStateSerializer<MyRouterState> {
  serialize(routerState: RouterStateSnapshot): MyRouterState {

    const {url, root: {queryParams}} = routerState;  // destructuring

    return {url, queryParams}; // return an object with the properties url and queryParams
  }
}
