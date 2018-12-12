# Frutas

Este proyecto esta generado en [Angular CLI](https://github.com/angular/angular-cli) version 7.1.2.

Proyecto sencillo en el que se puede ver una lista de frutas y compara su precio y calorías además de añadirlas a un carrito virtual. Además, si se está logeado se puede gestionar las frutas: dar de alta, modificar y eliminar.

![img](https://github.com/Ainara86/frutas/blob/master/frutas.png?raw=true)

Realización de dos pipes para filtrar las frutas por:
- Busqueda de nombre
- Oferta o no.
![img](https://github.com/Ainara86/frutas/blob/master/filtros.PNG?raw=true)

Realización de guards:
- Si se esta logeado se podrán gestionar las frutas y ver el listado.
![img](https://github.com/Ainara86/frutas/blob/master/listado.PNG?raw=true)
![img](https://github.com/Ainara86/frutas/blob/master/formulario.PNG?raw=true)


## Prerequisitos
Instalar NODE JS(`https://nodejs.org/`)

## Cliente Angular
Debemos instalar de manera GLOBAL (usar parametro -g)  el cliente angular para poder ejecutarlo desde cualquier proyecto.
`npm install -g @angular/cli`

## Instalar dependencias o librerias
Run `npm install` descargan las librerias en la carpeta node_modules


## Development server

Para poner en funcionamiento el proyecto `ng serve -o`. La URL es: `http://localhost:4200/`. 

##Para arrancar el Json
Para poder ver el contenido del JSON donde se encuentran las frutas se ha de abrir una terminal nueva. Acceder a la carpeta donde está el db.json y ejecutar el siguiente comando: `json-server --watch db.json`
