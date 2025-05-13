# Sistema de Recursos Humanos (RRHH)

Este proyecto es un **Sistema de Gestión de Empleados** desarrollado con una arquitectura Full Stack utilizando **React** en el front-end y **Spring Boot** con **MySQL** en el back-end.

## 📌 Funcionalidades

- Listado de empleados
- Agregar nuevo empleado
- Editar empleado existente
- Eliminar empleado
- Consumo de API REST desde el cliente React

---

## 🖼️ Arquitectura General

React (Front-end)
│
├── Vistas: AgregarEmpleado, EditarEmpleado, ListadoEmpleados
├── Componentes: Navegación y formularios reutilizables
├── Axios: Para consumir el API REST de Spring Boot
│
▼
Spring Boot (Back-end)
├── Controlador REST: Maneja las rutas de la API
├── Servicio: Lógica de negocio
├── Repositorio: Conexión a base de datos (Spring Data JPA)
├── Entidad: Empleado
├── MySQL: Almacenamiento persistente


---

## 🚀 Tecnologías Utilizadas

### Frontend (React)
- React 18
- React Router DOM
- Axios
- Bootstrap 5
- React Number Format

### Backend (Spring Boot)
- Spring Boot 3.x
- Spring Data JPA
- MySQL
- Maven

---

## ⚙️ Estructura del Proyecto

### 📁 Backend - Spring Boot

- `EmpleadoControlador.java`: Define los endpoints REST.
- `EmpleadoServicio.java` & `IEmpleadoServicio.java`: Lógica de negocio.
- `EmpleadoRepositorio.java`: Extiende `JpaRepository`.
- `Empleado.java`: Entidad que representa la tabla `empleado`.

### 📁 Frontend - React

- `App.js`: Rutas del sistema.
- `ListadoEmpleados.js`: Vista principal de empleados.
- `AgregarEmpleado.js`: Formulario para registrar nuevos empleados.
- `EditarEmpleado.js`: Formulario para actualizar empleados.
- `index.js`: Punto de entrada principal de la app.

---

## 🔌 Cómo ejecutar el proyecto

### Backend
1. Clonar el repositorio.
2. Crear una base de datos MySQL con nombre `rrhh_db` (o ajustar en `application.properties`).
3. Ejecutar el proyecto Spring Boot desde tu IDE o consola con Maven:
   ```bash
   mvn spring-boot:run
El backend quedará disponible en: http://localhost:8080/rrhh-app

Frontend
Ir a la carpeta frontend/ (crear si separaste los módulos).

Instalar las dependencias:
npm install

Ejecutar la aplicación:
npm start

El frontend estará disponible en: http://localhost:3000

🔗 Conexión entre Frontend y Backend
El archivo EmpleadoControlador.java habilita CORS para que React (puerto 3000) pueda comunicarse con el backend:
@CrossOrigin(value = "http://localhost:3000")

📦 API REST - Endpoints
Método	Endpoint	Descripción
GET	/rrhh-app/empleados	Listar empleados
GET	/rrhh-app/empleados/{id}	Obtener empleado por ID
POST	/rrhh-app/empleados	Agregar empleado
PUT	/rrhh-app/empleados/{id}	Actualizar empleado
DELETE	/rrhh-app/empleados/{id}	Eliminar empleado

✅ package.json (React)
Este archivo te permite gestionar dependencias y scripts para el front-end:
{
  "name": "rrhh-frontend",
  "version": "1.0.0",
  "private": true,
  "dependencies": {
    "axios": "^1.6.0",
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.11.0",
    "react-number-format": "^5.1.0"
  },
  "devDependencies": {
    "@testing-library/jest-dom": "^6.0.0",
    "@testing-library/react": "^14.0.0",
    "@testing-library/user-event": "^14.4.3",
    "web-vitals": "^3.3.0"
  },
  "scripts": {
    "start": "react-scripts start",
    "test": "react-scripts test",
    "build": "react-scripts build",
    "eject": "react-scripts eject"
  }
}
💡 Asegúrate de tener instalado react-scripts o usa vite/create-react-app para inicializar tu proyecto.

✅ application.properties (Spring Boot)
Este archivo configura la conexión a la base de datos y otros parámetros del backend:
# Puerto del servidor
server.port=8080

# Configuración de la base de datos
spring.datasource.url=jdbc:mysql://localhost:3306/rrhh_db?useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=tu_contraseña

# JPA / Hibernate
spring.jpa.show-sql=true
spring.jpa.hibernate.ddl-auto=update
spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect

# CORS y otros
spring.mvc.pathmatch.matching-strategy=ant_path_matcher
⚠️ Cambia tu_contraseña por la contraseña real de tu base de datos MySQL.

✅ Diagrama Entidad-Relación (ERD)
+------------------+
|     Empleado     |
+------------------+
| idEmpleado : PK  |
| nombre           |
| departamento     |
| sueldo           |
+------------------+
Este sistema maneja una sola entidad (Empleado), pero puedes escalarlo fácilmente a más relaciones: departamentos, roles, usuarios, etc.


👤 Autor
Proyecto educativo desarrollado con propósitos de práctica.

Desarrollado como parte de retos y formación en desarrollo full stack.



