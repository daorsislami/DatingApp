import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

//platformBrowserDynamic() is responsible for providing the code to bootstrap our app module, and once our app module is
// bootstraped, it then boot straps our app component is declared as a selector inside our index.html
platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
