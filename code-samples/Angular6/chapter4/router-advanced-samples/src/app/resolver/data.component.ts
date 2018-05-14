import {Component} from "@angular/core";
import {ActivatedRoute} from "@angular/router";
@Component({
    selector: 'product',
    template: '<h1 class="stock">Data Component</h1>',
    styles: ['.stock {background: cyan}']
})
export class DataComponent{

  constructor(private route: ActivatedRoute){
    const someJsonData = route.snapshot.data['loadedJsonData'];

    console.log("Got the data");
  }
}

