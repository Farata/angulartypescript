import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'nga-root',
  styleUrls: [ './app.component.scss' ],
  templateUrl: './app.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {}
