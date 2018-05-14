import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/lazy/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
