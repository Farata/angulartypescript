import { NgModule }      from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from '@angular/router';
import {LuxuryComponent} from "./luxury.component";
import {LuxuryService} from "./luxury.service";

@NgModule({
    imports: [ CommonModule,
        RouterModule.forChild([
        {path: '', component: LuxuryComponent}
    ]) ],
    providers: [LuxuryService],
    declarations: [ LuxuryComponent ]
})

export class LuxuryModule {}
