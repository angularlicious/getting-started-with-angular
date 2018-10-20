# Matterial Design

Create a new Angular project that will use Material Design or target an existing application.

```ts
ng new matterial-design
CREATE matterial-design/README.md (1032 bytes)
CREATE matterial-design/angular.json (3638 bytes)
CREATE matterial-design/package.json (1321 bytes)
CREATE matterial-design/tsconfig.json (408 bytes)
CREATE matterial-design/tslint.json (2805 bytes)
CREATE matterial-design/.editorconfig (245 bytes)
CREATE matterial-design/.gitignore (503 bytes)
CREATE matterial-design/src/favicon.ico (5430 bytes)
CREATE matterial-design/src/index.html (302 bytes)
CREATE matterial-design/src/main.ts (370 bytes)
CREATE matterial-design/src/polyfills.ts (3194 bytes)
CREATE matterial-design/src/test.ts (642 bytes)
CREATE matterial-design/src/styles.css (80 bytes)
CREATE matterial-design/src/browserslist (375 bytes)
CREATE matterial-design/src/karma.conf.js (964 bytes)
CREATE matterial-design/src/tsconfig.app.json (170 bytes)
CREATE matterial-design/src/tsconfig.spec.json (256 bytes)
CREATE matterial-design/src/tslint.json (314 bytes)
CREATE matterial-design/src/assets/.gitkeep (0 bytes)
CREATE matterial-design/src/environments/environment.prod.ts (51 bytes)
CREATE matterial-design/src/environments/environment.ts (631 bytes)
CREATE matterial-design/src/app/app.module.ts (314 bytes)
CREATE matterial-design/src/app/app.component.css (0 bytes)
CREATE matterial-design/src/app/app.component.html (1141 bytes)
CREATE matterial-design/src/app/app.component.spec.ts (1025 bytes)
CREATE matterial-design/src/app/app.component.ts (220 bytes)
CREATE matterial-design/e2e/protractor.conf.js (752 bytes)
CREATE matterial-design/e2e/tsconfig.e2e.json (213 bytes)
CREATE matterial-design/e2e/src/app.e2e-spec.ts (312 bytes)
CREATE matterial-design/e2e/src/app.po.ts (208 bytes)
```

## Material Design
Add support for Material Design to the project. Use the `ng add` command to update the project resources. Note that this workflow is much different from adding Material Design using `npm install`. The `add` schematic will update an existing project and make the required modifications necesarry to use Material Design - save some headache and stpes.

```ts
ng add @angular/material
```

The result of using the `ng add` command will:
* adds some new packages
* update existing files in the project.

```ts
ng add @angular/material
Installing packages for tooling via npm.
npm WARN @angular/material@6.4.7 requires a peer of @angular/cdk@6.4.7 but none is installed. You must install peer dependencies yourself.

+ @angular/material@6.4.7
added 2 packages from 1 contributor in 6.369s
Installed packages for tooling via npm.
UPDATE package.json (1385 bytes)
UPDATE angular.json (3884 bytes)
UPDATE src/app/app.module.ts (423 bytes)
UPDATE src/index.html (479 bytes)
UPDATE src/styles.css (165 bytes)
added 1 package in 5.726s
```

The version of the `@angular/sdk` will need to be updated to the version required by the `@angular/material@6.4.7` version. 

```ts
npm install -D @angular/cdk@6.4.7
npm notice save @angular/cdk is being moved from dependencies to devDependencies
+ @angular/cdk@6.4.7
updated 1 package in 6.58s
```

### package.json

```json
"@angular/material": "^6.4.7",
"@angular/cdk": "^6.4.7",
```

### angular.json

The `ng add` command will update the project build configuration to use following style. Your options include:

* deeppurple-amber
* indigo-pink
* pink-bluegrey
* purple-green

```json
"styles": [
    {
    "input": "node_modules/@angular/material/prebuilt-themes/indigo-pink.css"
    },
    "src/styles.css"
]
```

### index.html

The `ng add` command will update the `index.html` file to reference `icons`, and a `font family`.

```html
<link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
<link href="https://fonts.googleapis.com/css?family=Roboto:300,400,500" rel="stylesheet">
```

### styles.css

The `ng add` command will add the following `css` to the project file.

```css
html, body { height: 100%; }
body { margin: 0; font-family: 'Roboto', sans-serif; }
```

### app.module

The `ng add` command will update the application's module to import `BrowserAnimationsModule`. 

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```

## Material Design Module

```ts
ng generate module materialDesign
```

Update the module with imports for the many/most of the Material Design moudules available. 

```ts
import { NgModule } from '@angular/core';

import {
  MatButtonModule,
  MatButtonToggleModule,
  MatSidenavModule,
  MatToolbarModule,
  MatIconModule,
  MatListModule,
  MatCardModule,
  MatDividerModule,
  MatTableModule,
  MatDialogModule,
  MatInputModule,
  MatSelectModule,
  MatPaginatorModule,
  MatProgressBarModule,
  MatProgressSpinnerModule,
  MatSortModule,
  MatMenuModule,
  MatTabsModule,
  MatFormFieldModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
  MatRadioModule,
  MatTooltipModule
} from '@angular/material';

@NgModule({
  imports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatMenuModule,
    MatTabsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTooltipModule
  ],
  exports: [
    MatButtonModule,
    MatButtonToggleModule,
    MatSidenavModule,
    MatToolbarModule,
    MatIconModule,
    MatListModule,
    MatCardModule,
    MatDividerModule,
    MatTableModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    MatPaginatorModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSortModule,
    MatMenuModule,
    MatTabsModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatRadioModule,
    MatTooltipModule
  ]
})
export class MaterialDesignModule {}
```

Import the module into the application. Now you are ready to get some Material Design on.

```ts
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ContentfulModule } from './contentful/contentful.module';
import { AngularEventComponent } from './angular-event/angular-event.component';
import { MdToHtmlPipe } from './pipes/md-to-html.pipe';
import { MaterialDesignModule } from './material-design/material-design.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@NgModule({
  declarations: [
    AppComponent,
    AngularEventComponent,
    MdToHtmlPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ContentfulModule,
    MaterialDesignModule,
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
```


## Material Schematic

Create a new component using the Material Schematic

* [Learn More: https://material.angular.io/guide/schematics](https://material.angular.io/guide/schematics)


Use the command to create a `HomeComponent` using the `material-nav` schematic.
```ts
ng generate @angular/material:material-nav --name home
CREATE src/app/home/home.component.css (129 bytes)
CREATE src/app/home/home.component.html (959 bytes)
CREATE src/app/home/home.component.spec.ts (691 bytes)
CREATE src/app/home/home.component.ts (573 bytes)
UPDATE src/app/app.module.ts (789 bytes)
```

Update the `app.component.html` 

```html
<app-home></app-home>
```

Run the app.

```ts
ng serve --open
```
