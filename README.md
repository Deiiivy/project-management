
# PROJECT MANAGEMENT

![imagen](https://github.com/user-attachments/assets/603fd66a-0e9d-4e18-a006-c4b6feab7844)

## Requisitos

Antes de comenzar con la instalación del proyecto, asegúrate de tener lo siguiente instalado en tu sistema:

- **Node.js**: [Descargar Node.js](https://nodejs.org/)
- **MySQL**: [Descargar MySQL](https://dev.mysql.com/downloads/installer/)
- **npm**: Se instala automáticamente con Node.js.
- **Sequelize CLI**: [Instalar Sequelize CLI](https://www.npmjs.com/package/sequelize-cli) (usaremos `npx` para no instalarlo globalmente).

---

## Instrucciones de instalación

### 1. Clonar el repositorio

Primero, clona el repositorio en tu máquina local:

```bash
git clone https://github.com/Deiiivy/project-management
```

### 2. Entrar al proyecto

Accede a la carpeta del proyecto:

```bash
cd project-management
```

### 3. Instalar dependencias en el cliente

Accede a la carpeta del cliente y ejecuta el siguiente comando para instalar las dependencias necesarias:

```bash
cd client
npm install
```

Inicia el cliente:

```bash
npm run dev
```

### 4. Entrar al servidor

Abre una nueva terminal y accede a la carpeta del servidor:

```bash
cd server
```

Luego instala las dependencias del servidor:

```bash
npm install
```

### 5. Crear la base de datos por medio de migraciones

Asegúrate de que MySQL esté en funcionamiento y que puedas acceder a tu base de datos. Si no has creado la base de datos aún, puedes hacerlo con el siguiente comando. Estando dentro de la carpeta `server`, ejecuta:

```bash
npx sequelize-cli db:create
```

### 6. Ejecutar las migraciones de la base de datos

Ahora, ejecuta las migraciones para crear las tablas necesarias en la base de datos:

```bash
npx sequelize-cli db:migrate
```

### 7. Arrancar el servidor

Dentro de la carpeta `server`, ejecuta el siguiente comando para iniciar el servidor:

```bash
npm start
```

---

## Verificación

- **Backend**: Abre tu navegador y ve a `http://localhost:3000` o el puerto que hayas configurado para el servidor.
- **Frontend**: Abre tu navegador y ve a `http://localhost:5173` (o el puerto que hayas configurado para el frontend).

---

## Enlaces útiles

- [Instalar Node.js](https://nodejs.org/)
- [Instalar MySQL](https://dev.mysql.com/downloads/installer/)
- [Documentación de Sequelize CLI](https://www.npmjs.com/package/sequelize-cli)

---

¡Listo! Ahora deberías tener la aplicación corriendo correctamente. Si tienes algún problema durante la instalación o ejecución, no dudes en avisarme para ayudarte. 😊
