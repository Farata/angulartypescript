import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/comp-lifecycle/app.module';
import {enableProdMode} from '@angular/core';

enableProdMode();

platformBrowserDynamic().bootstrapModule(AppModule);
