# MovieAngularApp

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 7.1.4.

## Choices

- plain Angular (for now)
- Angular material
- docker through docker toolbox

## Possible TODO's

- actions that are reflected in query string are tightly coupled with angular's router component; find out how to decouple that
- filter, datatable and pagination in seperate components
- more filters on movie-title table
- move docker-machine IP to docker-compose level

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

### Build and run
```
ng build
docker-compose up --build -d
```

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
