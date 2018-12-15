import {Component} from '@angular/core';
import {LuxuryService} from "./luxury.service";

@Component({
    selector: 'luxury',
    template: `<h1 class="gold">Luxury Component</h1>
               The luxury service returned {{luxuryItem}} `,
    styles: ['.gold {background: yellow}']
})
export class LuxuryComponent {
  luxuryItem: string

  constructor(private luxuryService: LuxuryService){}

  ngOnInit() {
    this.luxuryItem = this.luxuryService.getLuxuryItem();
  }
}
