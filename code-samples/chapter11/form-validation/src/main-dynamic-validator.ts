import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/dynamic-validator/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
