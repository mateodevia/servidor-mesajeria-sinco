# servidor-mesajeria-sinco

## Requerimientos para la instalación

- Instalar Node JS
- Instalar RabbitMQ (si se quiere correr el servidor de mensajeria on premise)

## Instrucciones para la ejecucion (Remota)

Clonear el Repositorio
### `git clone https://github.com/mateodevia/servidor-mesajeria-sinco.git`

Instalar dependencias

En la carpeta raíz del proyecto ejecutar
### `npm install`

Agregar a las variables de entorno del sistema las credenciales del servidor de mensajería

### `CLOUDAMQP_URL='credenciales'`


Iniciar los workers que se considere necesarios.

Para iniciar un worker, en la terminal parece sobre la carpeta raíz del proyecto y ejecute
### `node serviceB/startWorkerToRemote.js`

Ingresar a la página web
### `https://prueba-sinco-componente-a.herokuapp.com`

Ingresar un nombre de usuario
![](https://res.cloudinary.com/drfggfn8f/image/upload/v1589179625/krzpy8lsb6epm90vysva.png)
Crear un proceso
![](https://res.cloudinary.com/drfggfn8f/image/upload/v1589179625/wsmyudvg3a98vps0oqck.png)
Monitorear el avance de los procesos en tiempo real
![](https://res.cloudinary.com/drfggfn8f/image/upload/v1589179625/jyqqtghazg4oe3t4wal6.png)

## Instrucciones para la ejecucion (on premise)

Clonear el Repositorio
### `git clone https://github.com/mateodevia/servidor-mesajeria-sinco.git`

Instalar dependencias

En la carpeta raíz del proyecto ejecutar
### `npm install`

Agregar a las variables de entorno del sistema las credenciales de la base de datos

### `SINCO_MONGO_URL='credenciales'`
Asegurese de quitar las credenciales del servidor de mensajería remoto ya que los componentes por defecto apuntan al servicio remoto a menos que no encuentren las credenciales.

Asegurese de que el servidor de mensajería está corriendo (por defecto después de instalar queda corriendo)

Iniciar los workers que se considere necesarios.

Para iniciar un worker, en la terminal parece sobre la carpeta raíz del proyecto y ejecute
### `node serviceB/startWorkerToLocal.js`

Ejecutar el Servicio A

Para iniciar el servidor web localmente, en la terminal parece sobre la carpeta raíz del proyecto y ejecute
### `npm start`

Ingresar a la página web
### `http://localhost:3001`

Ingresar un nombre de usuario
![](https://res.cloudinary.com/drfggfn8f/image/upload/v1589179625/krzpy8lsb6epm90vysva.png)
Crear un proceso
![](https://res.cloudinary.com/drfggfn8f/image/upload/v1589179625/wsmyudvg3a98vps0oqck.png)
Monitorear el avance de los procesos en tiempo real
![](https://res.cloudinary.com/drfggfn8f/image/upload/v1589179625/jyqqtghazg4oe3t4wal6.png)

## Instrucciones para ejecutar pruebas unitarias

Agregar a las variables de entorno del sistema las credenciales de la base de datos

### `SINCO_MONGO_URL='credenciales'`

Instalar dependencias

En la carpeta raíz del proyecto ejecutar
### `npm install`

En la carpeta raíz del proyecto ejecutar
### `npm test`
