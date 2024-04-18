import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import routeConfig from './app.routes';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routeConfig), provideAnimationsAsync()]
};
