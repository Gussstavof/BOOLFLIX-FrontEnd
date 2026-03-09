# FlixFrontend

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 16.2.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.

## Docker

### Subir com Docker Compose (porta 4200 para política de CORS)

```bash
docker compose up --build -d
```

A aplicação ficará disponível em `http://localhost:4200`, compatível com políticas que aceitam apenas essa origem.

### Parar os containers

```bash
docker compose down
```

### Build e execução manual (alternativo)

```bash
docker build -t flix-frontend .
docker run --rm -p 4200:80 flix-frontend
```
