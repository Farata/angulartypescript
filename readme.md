This folder contains code samples from the book "Angular Development with TypeScript", Second Edition (see https://www.manning.com/books/angular-development-with-typescript-second-edition). It's work in progress. All code samples use Angular 5. In the MEAP v4 of the book, we split some chapters to make them shorter. If you have an older version of the MEAP, get a new one so the chapters in the book correspond to the code samples.

We used Angular CLI 1.6.8 (or newer) for projects generation. Install the latest version globally to run these samples.

In chapter 2, code samples are separate projects and you need to switch to the project directory you'd like to run (e.g. pipes), run npm install and then ng serve. The same applies to the sample app ngAuction that exists in most of the chapters.

In other chapters, multiple code sample apps are included in the same project, e..g. chapter3/router-samples. To run a particular app, you need to know its name - open the file .angular-cli.json and see the names of the apps configured in the apps property there. For example, the first app is configured as ```"name": "basic"```. To run this app (after you did ```npm install```), run the following command: ```ng serve --app basic```.

You can read more about configuring multiple apps in the same project here: https://yakovfain.com/2017/04/06/angular-cli-multiple-apps-in-the-same-project

In chapters 2, 3, and 5 we build the ngAuction app that uses Bootstrap 4, and starting from chapter 7 we re-write ngAuction to using Angular Material and Flex Layout libraries (no more Bootstrap).

In the video Angular Applied from http://bit.ly/2iiKjDV, Yakov Fain shows how to build one of the sample apps from the book from scratch. 

For Angular training inquiries send an email to training @ faratasystems.com
