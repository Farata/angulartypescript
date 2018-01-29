import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/lazy-injector/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
