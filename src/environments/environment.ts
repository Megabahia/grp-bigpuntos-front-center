// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
    production: false,
    hmr: false,
    apiUrl: 'https://api-bp-test.bigpuntos.com',
    // apiUrl: 'http://127.0.0.1:8000',
    urlBigPuntos: 'https://credicompra-personas.netlify.app/#/',
    setKey: '6LdIKaglAAAAAEqIg6P6A6hqKndiISYXGGzpfTs-',
    firebaseConfig: {
        apiKey: 'AIzaSyBISFdku_C2M-rr4-bhpkeXtE4z8u07yRo',
        authDomain: 'grp-bigpuntos.firebaseapp.com',
        projectId: 'grp-bigpuntos',
        storageBucket: 'grp-bigpuntos.appspot.com',
        messagingSenderId: '1056585428972',
        appId: '1:1056585428972:web:b9991af9c50becb97d5ac9',
        measurementId: 'G-N6K6WZ5T59'
    }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
