# Side Menu app with angularfire2

Created with ionic 2.0.0-rc.0.
```
Latest release
npm install -g ionic

Started using sidemenu template
ionic start my-side-menu sidemenu --v2
```

### my-firebase-app-config.ts
``` typescript
import { FirebaseAppConfig } from 'angularfire2';

export const MyFirebaseAppConfig: Readonly<FirebaseAppConfig> = {
  apiKey: 'xxxxxx',
  authDomain: 'xxxxxx',
  databaseURL: 'xxxxxx',
  storageBucket: 'xxxxxx',
};
```
## State
- collection
  - loaded
  - loading
  - textItems
    - 0
      - description
      - title 
    - 1
      - description
      - title       
- login
  - displayName
  - isAuthenticated
  - isAuthenticating
  - error

## ngrx 4.1.1
### Actions
Using [example-app/book.ts](https://github.com/ngrx/platform/blob/master/example-app/app/books/actions/book.ts) as pattern.

[Action doc](https://github.com/ngrx/platform/blob/master/docs/store/actions.md)
### Reducers
https://github.com/ngrx/platform/blob/master/example-app/app/auth/reducers/auth.ts

