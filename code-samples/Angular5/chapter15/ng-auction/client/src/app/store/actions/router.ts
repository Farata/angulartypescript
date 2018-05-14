import { NavigationExtras } from '@angular/router';
import { Action } from '@ngrx/store';


export enum RouterActionTypes {
  Go = '[Router] Go',
  Back = '[Router] Back',
  Forward = '[Router] Forward',
}

export class Go implements Action {
  readonly type = RouterActionTypes.Go;

  /**
   * @param payload Payload repeats Router.navigate() API. See Router.navigate()
   *                for more details about valid property values.
   */
  constructor(public readonly payload: {
    commands: any[],
    extras?: NavigationExtras
  }) {}
}

export class Back implements Action {
  readonly type = RouterActionTypes.Back;
}

export class Forward implements Action {
  readonly type = RouterActionTypes.Forward;
}

export type RouterActions = Go | Back | Forward;
