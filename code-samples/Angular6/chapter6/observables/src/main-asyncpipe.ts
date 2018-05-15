import './polyfills.ts';

import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { AppModule } from './app/asyncpipe/app.module';

platformBrowserDynamic().bootstrapModule(AppModule);
