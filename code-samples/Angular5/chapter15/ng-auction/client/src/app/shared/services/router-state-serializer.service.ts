import { Injectable } from '@angular/core';
import { RouterStateSnapshot, Params } from '@angular/router';
import { RouterStateSerializer } from '@ngrx/router-store';

// The RouterStateSerializer takes the current RouterStateSnapshot
// and returns any pertinent information needed. The snapshot contains
// all information about the state of the router at the given point in time.
// The entire snapshot is complex and not always needed. In this case, you only
// need the URL and query parameters from the snapshot in the store. Other items could be
// returned such as route parameters and static route data.

export interface RouterStateUrl {
  url: string;
  params: Params;
  queryParams: Params;
}

/**
 * Naive custom router state serializer that doesn't account for auxiliary router outlets.
 */
@Injectable()
export class RouterStateSerializerService implements RouterStateSerializer<RouterStateUrl> {
  serialize(routerState: RouterStateSnapshot): RouterStateUrl {
    let route = routerState.root;

    while (route.firstChild) {
      route = route.firstChild;
    }

    const { url, root: { queryParams } } = routerState;
    const { params } = route;

    // Only return an object including the URL, params and query params
    // instead of the entire snapshot
    return { url, params, queryParams };
  }
}
