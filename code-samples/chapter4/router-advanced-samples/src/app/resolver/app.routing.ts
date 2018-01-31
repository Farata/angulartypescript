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
    runGuardsAndResolvers:'always'
  }
];

export const routing = RouterModule.forRoot(routes,
  {onSameUrlNavigation: "reload"}
  );
