import {OnChanges, Input, SimpleChange, Component, ChangeDetectionStrategy} from "@angular/core";

@Component({
  selector: 'child',
  styles: ['.child{background:lightgreen}'],
  template: `
    <div class="child">
      <h2>Child</h2>
      <div>Greeting: {{greeting}}</div>
      <div>User name: {{user.name}}</div>
    </div>
  `
  // , changeDetection: ChangeDetectionStrategy.OnPush  // uncomment and child component's user name won't be updated
})
export class ChildComponent implements OnChanges {
  @Input() greeting: string;
  @Input() user: {name: string};

  ngOnChanges(changes: {[key: string]: SimpleChange}) {
    console.log(JSON.stringify(changes, null, 2));
  }
}
