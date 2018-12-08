import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'temperature'
})
export class TemperaturePipe implements PipeTransform {

  transform(value: any, fromTo: string): any {
    if (!fromTo) {
      throw new Error('Temperature pipe requires parameter FtoC or CtoF');
    }

    return (
      fromTo == 'FtoC'
        ? (value - 32) * 5 / 9  // F to C
        : value * 9 / 5 + 32    // C to F
    );  
  }
}
