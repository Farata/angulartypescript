import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule,
  MatInputModule, MatSelectModule, MatOptionModule,
  MatCardModule
} from '@angular/material';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MATERIAL_COMPATIBILITY_MODE} from '@angular/material';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [
    MatToolbarModule, MatIconModule, MatMenuModule, MatButtonModule,
    MatInputModule, MatSelectModule, MatOptionModule, MatCardModule,
    BrowserAnimationsModule
  ],
  providers: [ { provide: MATERIAL_COMPATIBILITY_MODE, useValue: true }]

})
export class AuctionMaterialModule { }
