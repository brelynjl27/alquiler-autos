# Proyecto Alquiler de Autos

Este proyecto es una aplicación web full-stack para la gestión de alquiler de autos. Consiste en un backend desarrollado en Java con Spring Boot, un frontend en Angular y una base de datos MySQL.

## Levantamiento del Proyecto

Para levantar la aplicación completa (backend, frontend y base de datos), puedes usar Docker Compose.

1.  **Prerrequisitos:**
    *   Tener Docker y Docker Compose instalados.

2.  **Ejecución:**
    *   Clona este repositorio.
    *   En la raíz del proyecto, ejecuta el siguiente comando:
        ```bash
        docker-compose up --build
        ```
    *   Esto construirá las imágenes de Docker para el backend y el frontend, y levantará los tres servicios (backend, frontend, y base de datos).

    *   **Frontend:** Accesible en `http://localhost:4200`
    *   **Backend:** Accesible en `http://localhost:8081`
    *   **Base de Datos:** El servicio de MySQL se ejecuta en el puerto `3306`.

## Backend

El backend está desarrollado en Java utilizando el framework Spring Boot. Se encarga de toda la lógica de negocio y la gestión de la base de datos.

*   **Tecnología:** Java, Spring Boot
*   **Gestión de dependencias:** Maven
*   **Ubicación:** `/alquiler-autos-backend`

## Frontend

El frontend es una Single Page Application (SPA) desarrollada con Angular. Proporciona la interfaz de usuario para interactuar con la aplicación.

*   **Tecnología:** Angular, TypeScript
*   **Gestión de dependencias:** npm
*   **Ubicación:** `/alquiler-autos-frontend`

## Base de Datos

La base de datos utilizada es MySQL. Los scripts para la creación de las tablas se encuentran en la carpeta `/bd_alquiler-autos`. El servicio de la base de datos es orquestado por Docker Compose y los datos se persisten en un volumen de Docker.
