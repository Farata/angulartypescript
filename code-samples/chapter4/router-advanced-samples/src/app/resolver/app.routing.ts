import { Routes, RouterModule } from '@angular/router';
import {DataResolver} from "./data.resolver";
import {DataComponent} from "./data.component";
import {HomeResComponent} from "./home.component";


const routes: Routes = [
  {path: '',        component: HomeResComponent},
  {path: 'mydata', component: DataComponent,
    resolve:{
      mydata: DataResolver
    },
    runGuardsAndResolvers:'always'  // requires Angular 5.1 or later
  }
];

export const routing = RouterModule.forRoot(routes,
  {onSameUrlNavigation: "reload"}   // requires Angular 5.1 or later
  );
