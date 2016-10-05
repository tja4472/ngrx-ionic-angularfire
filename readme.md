# Side Menu app with angularfire2

Created with ionic 2.0.0-rc.0.
```
Latest release
npm install -g ionic

Started using sidemenu template
ionic start my-side-menu sidemenu --v2
```

## Changes required
See: https://github.com/danbucholtz/ionic-rollup-angularfire2

Using CommonJS modules with rollup: 
https://github.com/driftyco/ionic-app-scripts/issues/16

### my-firebase-app-config.ts
``` typescript
import {
    FirebaseAppConfig
} from 'angularfire2';

export class MyFirebaseAppConfig {
    static config: FirebaseAppConfig = {
    apiKey: 'xxxxx',
    authDomain: 'xxxxx',
    databaseURL: 'xxxxx',
    storageBucket: 'xxxxxx''
  };
}
```
