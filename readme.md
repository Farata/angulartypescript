This repository contains code samples from the book "Angular Development with TypeScript", Second Edition (see https://www.manning.com/books/angular-development-with-typescript-second-edition). The code-samples directory has two versions of code samples: one for Angular 5, and another for Angular 6. The process of creating the Angular 6 version of these code samples is described at https://yakovfain.com/2018/05/16/how-i-migrated-a-dozen-of-projects-to-angular-6.

Each chapter comes with serveral sample apps that may be included in the same project, e.g. chapter3/router-samples. To run a particular app, you need to know its name. 

In Angular 5, you can open the file .angular-cli.json and see the names of the apps configured in the apps property there. For example, the first app is configured as ```"name": "basic"```. To run this app (after you did ```npm install```), run the following command: ```ng serve --app basic```. In Angular 6, the file .angular-cli.json is replaced with angular.json, and there's no need to specify the ```--app``` option; for example, you can start the app named basic like this ```ng serve basic```.

You can read more about configuring multiple apps in the same Angular 5 project here: https://yakovfain.com/2017/04/06/angular-cli-multiple-apps-in-the-same-project

In chapters 2, 3, and 5 we build the ngAuction app that uses Bootstrap 4, and starting from chapter 7 we re-write ngAuction to using Angular Material and Flex Layout libraries (no more Bootstrap). To run ngAction that comes with chapters 13,14, and 15, you need to start the server and the client in separate command windows. ngAuction from chapter 15 uses ngrx for app state management.

In the video Angular Applied (see https://www.youtube.com/watch?v=owZVKNg6cG4), Yakov Fain shows how to build one of the sample apps from the book from scratch. 

For Angular training inquiries send an email to training @ faratasystems.com
