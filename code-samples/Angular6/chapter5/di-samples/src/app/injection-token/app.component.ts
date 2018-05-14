import {Component, Inject, InjectionToken} from '@angular/core';

export const BACKEND_URL  = new InjectionToken('BackendUrl');

@Component({
  selector: 'app-root',
  template: '<h2>The value of BACKEND_URL is {{url}}</h2>',
  providers: [  {provide:BACKEND_URL, useValue: 'http://myQAserver.com'}]
})
export class AppComponent {
  constructor(@Inject(BACKEND_URL) public url) {}
}
