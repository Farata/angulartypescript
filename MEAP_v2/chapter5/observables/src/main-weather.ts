import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/weather/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
