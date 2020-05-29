import { Routes, RouterModule } from '@angular/router';
import {DataResolver} from "./data.resolver";
import {DataComponent} from "./data.component";
import {HomeComponent} from "./home.component";

const routes: Routes = [
  {path: '',        component: HomeComponent},
  {path: 'mydata', component: DataComponent,
    resolve:{
      loadedJsonData: DataResolver
    },
    runGuardsAndResolvers:'always'  
  }
];

export const routing = RouterModule.forRoot(routes,
  {onSameUrlNavigation: "reload"}   
  );
