This directory contains code samples from appendix B (TypeScript Essentials) plus some extras. To run these code samples download Node.js from https://nodejs.org (use the latest version) and install it. Then clone or download this repo into any directory on your computer. In the command window, change into this directory and run 
```
npm install
``` 

This will install the local version of the tsc compiler.

Then compile all the code samples into the dist dir by running the following command:
```
npm run tsc
```

You'll see one compilation error, that I don't fix for demo purposes. Ignore it.

The file tsconfig.json instructs tsc to run in the watch mode. After the compilation either CTRL-C it, or open another command window to run code samples from there.

To run any code sample located in the dist dir (e.g. fatarrow.js), run the following command from the root dir:
```
node dist/fatarrow.js
```

To run a sample Angular/TypeScript app that uses jQueryUI do the following:
 ```
 npm install live-server -g 
 cd src/hello-world-ts-jquery 
 live-server
 ```



