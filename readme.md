This folder contains code samples from the book "Angular Development with TypeScript", Second Edition (see https://www.manning.com/books/angular-development-with-typescript-second-edition). Currently, all code samples use Angular 5 but by the time this book goes to print, we'll upgrade the code to Angular 6. 

We used Angular CLI 1.7.3 (or newer) for projects generation. Install the latest version globally to run these samples.

Each chapter comes with serveral sample apps that are included in the same project, e.g. chapter3/router-samples. To run a particular app, you need to know its name - open the file .angular-cli.json and see the names of the apps configured in the apps property there. For example, the first app is configured as ```"name": "basic"```. To run this app (after you did ```npm install```), run the following command: ```ng serve --app basic```.

You can read more about configuring multiple apps in the same project here: https://yakovfain.com/2017/04/06/angular-cli-multiple-apps-in-the-same-project

In chapters 2, 3, and 5 we build the ngAuction app that uses Bootstrap 4, and starting from chapter 7 we re-write ngAuction to using Angular Material and Flex Layout libraries (no more Bootstrap). To run ngAction that comes with chapters 13,14, and 15, you need to start the server and the client in separate command windows. The ngAuction from chapter 15 uses ngrx for app state management.

In the video Angular Applied from http://bit.ly/2iiKjDV, Yakov Fain shows how to build one of the sample apps from the book from scratch. 

For Angular training inquiries send an email to training @ faratasystems.com
