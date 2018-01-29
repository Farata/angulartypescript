import {
  DoCheck, Input, Component, KeyValueDiffers, KeyValueChangeRecord,
  KeyValueDiffer
} from "@angular/core";

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
})
export class ChildComponent implements DoCheck {
  @Input() greeting: string;
  @Input() user: {name: string};

  _differ: KeyValueDiffer<string, string>;

  constructor(private _differs: KeyValueDiffers) { }

  ngOnInit(){
   this._differ = this._differs.find(this.user).create();
  }

  ngDoCheck() {

    if ( this.user && this._differ) {
      const changes = this._differ.diff(this.user);
      if (changes) {

        changes.forEachChangedItem(
          (record: KeyValueChangeRecord<string, string>) =>
            console.log(`Got changes in property ${record.key} 
               before: ${record.previousValue} after: ${record.currentValue}`));
      }
    }
  }
}
