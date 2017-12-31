import { Injectable } from '@angular/core';

@Injectable()
export class LuxuryService {

  getLuxuryItem() {
    return "I'm the Luxury service from lazy module";
  }
}
