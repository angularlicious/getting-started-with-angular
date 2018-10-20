# Contentful

The following information demonstrates how to setup [Contentful](https://www.contnetful.com) API service to provide content for your Angular application. 
- [Contentful](#contentful)
    - [Create a new application](#create-a-new-application)
    - [Create a Contentful Module and Service](#create-a-contentful-module-and-service)
    - [Update Environment/Configuration for Contentful](#update-environmentconfiguration-for-contentful)
    - [Material Design](#material-design)
    - [App Component (Container)](#app-component-container)
        - [AngularEvent Model](#angularevent-model)
        - [App Component HTML Template](#app-component-html-template)
    - [Angular Event Component (Presentation)](#angular-event-component-presentation)
    - [Pipe :: Markdown to HTML](#pipe--markdown-to-html)


## Create a new application

```ts
ng new myContentfulApp --style=scss --verbose --routing
```

The output of the `new` CLI command:
```ts
ng new myContentfulApp --style=scss --verbose --routing
CREATE myContentfulApp/README.md (1032 bytes)
CREATE myContentfulApp/angular.json (3720 bytes)
CREATE myContentfulApp/package.json (1322 bytes)
CREATE myContentfulApp/tsconfig.json (408 bytes)
CREATE myContentfulApp/tslint.json (2805 bytes)
CREATE myContentfulApp/.editorconfig (245 bytes)
CREATE myContentfulApp/.gitignore (503 bytes)
CREATE myContentfulApp/src/favicon.ico (5430 bytes)
CREATE myContentfulApp/src/index.html (302 bytes)
CREATE myContentfulApp/src/main.ts (370 bytes)
CREATE myContentfulApp/src/polyfills.ts (3194 bytes)
CREATE myContentfulApp/src/test.ts (642 bytes)
CREATE myContentfulApp/src/styles.scss (80 bytes)
CREATE myContentfulApp/src/browserslist (375 bytes)
CREATE myContentfulApp/src/karma.conf.js (964 bytes)
CREATE myContentfulApp/src/tsconfig.app.json (170 bytes)
CREATE myContentfulApp/src/tsconfig.spec.json (256 bytes)
CREATE myContentfulApp/src/tslint.json (314 bytes)
CREATE myContentfulApp/src/assets/.gitkeep (0 bytes)
CREATE myContentfulApp/src/environments/environment.prod.ts (51 bytes)
CREATE myContentfulApp/src/environments/environment.ts (631 bytes)
CREATE myContentfulApp/src/app/app-routing.module.ts (245 bytes)
CREATE myContentfulApp/src/app/app.module.ts (393 bytes)
CREATE myContentfulApp/src/app/app.component.scss (0 bytes)
CREATE myContentfulApp/src/app/app.component.html (1173 bytes)
CREATE myContentfulApp/src/app/app.component.spec.ts (1139 bytes)
CREATE myContentfulApp/src/app/app.component.ts (220 bytes)
CREATE myContentfulApp/e2e/protractor.conf.js (752 bytes)
CREATE myContentfulApp/e2e/tsconfig.e2e.json (213 bytes)
CREATE myContentfulApp/e2e/src/app.e2e-spec.ts (311 bytes)
CREATE myContentfulApp/e2e/src/app.po.ts (208 bytes)
```

Install required packages:

```ts
npm install -S contentful
npm install -S marked
```

## Create a Contentful Module and Service

You will need to create a free account at [https://www.contentful.com](https://www.contentful.com). This will allow you to create and manage content for your application. This is using a serverless approach to providing features for your application.

* create a space for the content
  * create a content model for data
* retrieve API information
  * space identifier
  * API key for content delivery

Now, we'll need an Angular Module `@ngModule` dedicated to the Contentful API.

```ts
ng generate module contentful --spec=false
CREATE src/app/contentful/contentful.module.ts (194 bytes)
```

Create a new service for `contentful` in a target module.

```ts
ng generate service contentful/contentful -module contentful/contentful
CREATE src/app/contentful/contentful.service.spec.ts (398 bytes)
CREATE src/app/contentful/contentful.service.ts (139 bytes)
```


## Update Environment/Configuration for Contentful

In order to access your Contentful API, you will need (2) things.

* spaceId: the unique identifier for your Contentful space.
* access token: token to allow access to the data for the specified space.

Get your `spaceId` and content delivery `token` from the contentful site/api. Create a new item in your `environment` for this information.

```json
export const environment = {
    production: false,

    contentful: {
        spaceId: 'YOUR_SPACE_ID',
        token: 'YOUR_TOKEN_HERE'
    }
};
```

Update your service:

* add `contentful` api
* add `environment` to use the token and `spaceId` values.
* setup the `client` for `contentful` for the specified:
    * space
    * accessToken

```ts
import { Injectable } from '@angular/core';

import * as contentful from 'contentful';
import * as marked from 'marked';
import { environment } from '../../environments/environment';
import { from } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContentfulService {
  private client: any;

  constructor() {
    this.client = contentful.createClient({
      space: environment.contentful.spaceId,
      accessToken: environment.contentful.token
    });
  }

  retrieveEntries() {
    return from(this.client.getEntries());
  }

  markdownToHtml(md: string) {
    return marked(md);
  }
}

```


## Material Design

Use the `add` schematic for `@angular/material` this will add and update your project with the required Material Design elements. 

```ts
ng add @angular/material
Your global Angular CLI version (6.2.5) is greater than your local
version (6.*5). The local Angular CLI version is used.

To disable this warning use "ng config -g cli.warnings.versionMismatch false".
Installing packages for tooling via npm.
UPDATE package.json (1468 bytes)
UPDATE angular.json (3966 bytes)
UPDATE src/app/app.module.ts (907 bytes)
UPDATE src/index.html (493 bytes)
UPDATE src/styles.scss (166 bytes)
```

You will need to `import` the `MaterialDesignModule` into the application's `AppModule`. 

## App Component (Container)

Update the `AppComponent` to use the `ContentfulService` to retrieve entries for display. The main responsibility for the component is to coordinate the retrieval of information from the API and provide it to the presentational component.

The reponse is returning all of the `entries` in the specified space. If you have more than one Contentful `content type` you will need to filter and/or query using different parameters. 

```ts
import { Component, OnInit } from "@angular/core";
import { AngularEvent } from "./angular-event";
import { ContentfulService } from "./contentful/contentful.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"]
})
export class AppComponent implements OnInit {
  title = "myContentfulApp";

  entries: AngularEvent[] = [];

  constructor(private contentful: ContentfulService) { }

  ngOnInit(): void {
    this.contentful
      .retrieveEntries()
      .subscribe(
        response => this.handleRetrieveEventEntries(response),
        error => console.log(error),
        () => console.log(`Finished retrieving event entries.`)
      );
  }

  /**
   * Use to handle the Contentful API response for [Event] entries.
   * @param response
   */
  handleRetrieveEventEntries(response) {
    response.items.forEach(element => {
       const entry: AngularEvent = element.fields;
        entry.entryMeta = element.sys;
        this.entries.push(entry);
    });
  }
}

```

### AngularEvent Model

Create a new class for the application - we will use this to map the Contentful `content model` for Angular Events.

```ts
ng generate class angularEvent
```

The model below represents the content model in the Contenful space. It will be used to map the JSON object from the API and for binding to display HTML elements in the UI.

```ts
import { EntryMeta } from './models/EntryMeta.model';

export class AngularEvent {
  title: string;
  startDate: Date;
  endDate: Date;
  location: string;
  link: string;
  details: string;
  entryMeta: EntryMeta;
}
```

Notice that there is an `EntryMeta` type. This type maps the meta-data from the Contentful API to allow you to filter and get details for specific entries in the Contentful `space`. 

Generate a model class.

```ts
ng generate class models/EntryMeta
```

Update the model with the following.

```ts
import { Sys, ContentTypeLink } from 'contentful';

export class EntryMeta implements Sys {
    type: string;
    id: string;
    createdAt: string;
    updatedAt: string;
    locale: string;
    revision: number;
    contentType: {
        sys: ContentTypeLink
    };
}
```

### App Component HTML Template

The template uses an array of `AngularEvent` items to bind each `entry` to an instance of the `AngularEventComponent. 

```html
<app-angular-event *ngFor="let entry of entries" [entry]="entry"></app-angular-event>
<router-outlet></router-outlet>
```

## Angular Event Component (Presentation)

The component contains an `@Input` for the entry. This allows the Container component to provide an `AngularEvent` object for the `entry` input. This allows the template to bind the data properties of the object the template for display.

```ts
import { Component, OnInit, Input } from '@angular/core';
import { AngularEvent } from '../angular-event';

@Component({
  selector: 'app-angular-event',
  templateUrl: './angular-event.component.html',
  styleUrls: ['./angular-event.component.scss']
})
export class AngularEventComponent implements OnInit {
  @Input() entry: AngularEvent;


  ngOnInit() {
  }
}
```

The template of the component uses Material Design card to display each of the entries. 

```html
<mat-card *ngIf="entry">
  <mat-card-title>
    {{entry.title}}
  </mat-card-title>
  <mat-card-subtitle>
    {{entry.location}}
  </mat-card-subtitle>
  <mat-card-content>
    {{entry.startDate | date: 'fullDate' }} to {{entry.endDate | date: 'fullDate' }}

    <div [innerHtml]="entry.details | mdToHtml"></div>
    <a href="{{entry.link}}" target="_blank">
      <button mat-button>Details...</button>
    </a>
  </mat-card-content>
</mat-card>
<mat-divider></mat-divider>
```

## Pipe :: Markdown to HTML

Creat a pipe to display the markdown as HTML.

```ts
ng generate pipe mdToHtml
```

```ts
import { Pipe, PipeTransform } from '@angular/core';
import { ContentfulService } from './contentful.service';

@Pipe({
  name: 'mdToHtml'
})
export class MdToHtmlPipe implements PipeTransform {

  constructor(private contentful: ContentfulService ) {}

  transform(value: string): any {
    return this.contentful.markdownToHtml(value);
  }

}
```

