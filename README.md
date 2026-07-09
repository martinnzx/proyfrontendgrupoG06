=======
# GymHub - Frontend

## Descripción general del proyecto

GymHub es el proyecto frontend que desarrollamos para la gestión integral de un gimnasio. La aplicación está pensada para cubrir las tareas más habituales del día a día de una institución de este tipo: administrar usuarios, asignar roles, organizar ejercicios y rutinas, controlar suscripciones y cuotas, registrar pagos y presentar información útil para la administración. Para ello, implementamos una interfaz web en Angular que organiza la experiencia en distintos módulos y adapta las opciones disponibles según el tipo de usuario que accede a la plataforma.

La estructura del proyecto refleja una lógica de trabajo basada en componentes, servicios y rutas protegidas. En la parte visual utilizamos Bootstrap para que la interfaz sea clara, ordenada y funcional, mientras que en la lógica de negocio incorporamos formularios reactivos, guards de acceso y comunicación con un backend mediante peticiones HTTP. La propuesta buscó convertir un conjunto de operaciones administrativas en una experiencia unificada, accesible y fácil de mantener.

---

# Plan de trabajo

## Objetivos generales del proyecto

Nuestro objetivo general fue construir una herramienta web que permitiera gestionar de forma centralizada las operaciones principales de un gimnasio. Queríamos que la plataforma funcionara como un punto de acceso para el administrador, el entrenador y el socio, incorporando funciones específicas para cada perfil y facilitando la organización del trabajo diario.

En términos más concretos, buscamos desarrollar una solución que permitiera controlar usuarios y permisos, mantener información sobre ejercicios y rutinas, manejar suscripciones y cuotas, registrar pagos y ofrecer un panel de control con métricas básicas. La idea fue que la aplicación no se limitara a mostrar datos, sino que también sirviera como herramienta operativa para la gestión del negocio.

## Objetivos específicos

Durante el desarrollo establecimos una serie de metas concretas que guiaron la implementación del proyecto:

1. Implementar un sistema de autenticación y registro de usuarios.
2. Diferenciar los accesos según el rol asignado a cada cuenta.
3. Permitir la administración de usuarios desde una vista exclusiva para administradores.
4. Facilitar la carga y mantenimiento de ejercicios y rutinas para el área de entrenamiento.
5. Gestionar suscripciones, tarifas y pagos vinculados a cada socio.
6. Integrar servicios externos para pagos y autenticación con Google.
7. Incorporar un panel de administración con gráficos y métricas.
8. Diseñar una interfaz clara, responsiva y coherente con la identidad del gimnasio.

## Etapas del desarrollo

La construcción del proyecto se realizó en etapas progresivas, de manera que cada avance consolidara una parte del sistema antes de pasar a la siguiente.

### Etapa 1: estructura inicial

Comenzamos con la creación de la base del proyecto en Angular, la configuración de dependencias y la organización inicial de la aplicación. En ese momento definimos la estructura general de los componentes y configuramos la navegación básica.

### Etapa 2: autenticación y primera interfaz

Luego incorporamos las pantallas de inicio, login y registro, junto con el layout principal de la aplicación. Este fue el punto de partida para dar forma a la experiencia de usuario y para establecer un flujo de acceso coherente.

### Etapa 3: gestión de usuarios y roles

Una vez definida la base, avanzamos en la administración de usuarios. Implementamos formularios para editar datos, activar o desactivar cuentas y modificar roles, con el objetivo de que el administrador pudiera controlar el acceso a la plataforma.

### Etapa 4: módulos del negocio

En la siguiente etapa desarrollamos las funcionalidades centrales del gimnasio: ejercicios, rutinas, suscripciones, tarifas y pagos. Este conjunto de módulos fue el núcleo del proyecto, porque permitió pasar de una interfaz básica a una herramienta con uso real dentro de la operación del negocio.

### Etapa 5: integración de servicios y panel administrativo

En la etapa final incorporamos funcionalidades de mayor alcance, como el dashboard, la integración con Mercado Pago, la autenticación con Google y la visualización de contenido externo como mapas y videos de YouTube. Estas mejoras ampliaron la utilidad del sistema y le dieron un carácter más completo.

## Planificación del trabajo

Nos organizamos de manera modular para que cada integrante pudiera avanzar sobre una parte del proyecto sin afectar el conjunto. La división por funcionalidades permitió trabajar de forma más ordenada e ir integrando cada componente a medida que se completaba.

Definimos el trabajo en torno a módulos concretos, como autenticación, usuarios, ejercicios, rutinas, suscripciones, tarifas y pagos. Esta forma de organizar el desarrollo nos ayudó a mantener una visión clara del estado del proyecto y a evitar que la implementación se concentrara en un único bloque de trabajo.

## División de tareas

La organización del trabajo se basó en la separación por dominio funcional. Mientras algunos integrantes se enfocaron en la estructura general de la aplicación y la navegación, otros trabajaron en los módulos de gestión de usuarios, ejercicios, rutinas y pagos. Esta distribución facilitó la construcción progresiva del sistema y permitió que cada parte del proyecto avanzara con mayor autonomía.

## Metodología de trabajo

No trabajamos con un esquema formal de Scrum ni con herramientas de seguimiento como tableros o sprints definidos. La metodología que adoptamos fue más práctica y estuvo centrada en el desarrollo incremental por funcionalidades. Cada avance se integraba en una rama de trabajo y, una vez consolidado, pasaba a la rama principal de desarrollo.

Este enfoque fue adecuado para el tamaño del proyecto y para la forma en que nos organizamos como grupo. Nos permitió avanzar de forma ordenada, revisar el progreso por módulos y mantener una estructura de trabajo más clara que si hubiéramos intentado construir toda la aplicación de manera simultánea.

## Cronograma del desarrollo

El desarrollo del proyecto se puede resumir en una secuencia temporal bastante clara:

| Fecha | Etapa principal |
|---|---|
| 29/06/2026 | Inicio del proyecto y estructura base en Angular |
| 03/07/2026 | Implementación inicial de login y registro |
| 04/07/2026 | Avance en la gestión de usuarios |
| 05/07/2026 | Integración de autenticación con Google y servicios auxiliares |
| 06/07/2026 | Desarrollo de ejercicios, rutinas, suscripciones y tarifas |
| 07/07/2026 | Incorporación de pagos, roles, dashboard y vistas de socios |
| 09/07/2026 | Ajustes generales de experiencia y mejoras de sesión |

## Decisiones técnicas tomadas

Durante el desarrollo tomamos varias decisiones de diseño que marcaron la forma final del proyecto. La primera fue optar por Angular como framework principal, porque nos permitía trabajar con una arquitectura basada en componentes y modularización. Además, elegimos Bootstrap para acelerar la construcción de la interfaz y mantener una apariencia coherente en toda la aplicación.

También decidimos separar la lógica de negocio de la interfaz mediante servicios inyectables. Esta decisión nos permitió centralizar las peticiones al backend, reutilizar código y mantener la estructura del proyecto más limpia. En el mismo sentido, incorporamos guards para proteger rutas según el rol del usuario y evitar que se acceda a contenido no autorizado.

Otra decisión importante fue trabajar con formularios reactivos para las operaciones de alta, edición y mantenimiento de datos. Esto nos dio mayor control sobre la validación y permitió que la interacción con la interfaz fuera más consistente.

---

# Organización del equipo

## Organización del trabajo

El trabajo se organizó de forma colaborativa y por módulos funcionales. Cada integrante participó en una parte del proyecto, pero la integración final se concentró en una estructura común que permitió reunir todos los avances en un mismo repositorio.

La distribución del trabajo estuvo orientada a las necesidades del sistema: mientras una parte del grupo trabajaba en la experiencia inicial de la aplicación, otra se encargaba de las funcionalidades administrativas y otra de la integración de servicios externos.

## Responsabilidades del grupo

El desarrollo fue compartido entre varios integrantes, y la revisión de los cambios se realizó de forma conjunta a través de la rama de desarrollo. En la práctica, una parte importante del trabajo se concentró en la implementación de los módulos del negocio, mientras que otra parte quedó dedicada a la estructura base, la navegación y la experiencia de usuario.

## Coordinación interna

La coordinación del equipo se llevó a cabo principalmente a través del repositorio. La creación de ramas específicas para cada funcionalidad permitió que cada integrante trabajara de manera independiente y, al mismo tiempo, mantuviera una referencia común del proyecto. Esta forma de trabajar facilitó la integración de avances y redujo la posibilidad de mezclar tareas distintas en el mismo bloque de desarrollo.

## Distribución de funcionalidades

La organización del proyecto reflejó una división clara por dominio funcional. Algunos cambios se centraron en la autenticación y el registro, otros en la gestión de usuarios, y otros en el manejo de ejercicios, rutinas, suscripciones, tarifas y pagos. La parte administrativa del sistema, en particular, recibió una atención especial, ya que incluía el panel de control y la gestión de roles.

---

# Forma de trabajo con Git

## Estrategia de ramas

Para el control de versiones utilizamos una estrategia basada en ramas temáticas. La rama principal de desarrollo fue `develop`, donde se integraron los avances de las distintas funcionalidades. Además, trabajamos con ramas específicas para cada módulo o característica, como autenticación, usuarios, ejercicios, rutinas, suscripciones, tarifas, pagos, roles y dashboard.

Esta forma de trabajo permitió que cada parte del proyecto avanzara de manera aislada y que luego se incorporara al desarrollo general una vez que estaba lista para integrarse.

## Rama principal y rama de desarrollo

La rama `main` funcionó como referencia principal del proyecto, mientras que `develop` sirvió como rama de integración para los cambios más completos. La mayoría de los avances se llevaron primero a `develop` y, desde allí, se consolidaron en la rama principal cuando el estado del proyecto lo permitía.

## Ramas de trabajo

Además de las ramas de funcionalidad, también utilizamos ramas de trabajo individuales para avanzar sobre tareas específicas. Este esquema nos permitió separar el desarrollo personal del trabajo conjunto y mantener un historial más claro de las modificaciones.

## Flujo de trabajo con Git

El flujo que seguimos fue el siguiente:

1. Creamos una rama dedicada a una funcionalidad concreta.
2. Desarrollamos los cambios correspondientes en esa rama.
3. Integramos la rama en `develop` una vez que el avance estaba listo.
4. Consolidamos los cambios en `main` cuando el proyecto alcanzaba un estado estable.

Este esquema fue sencillo, pero resultó eficaz para el tipo de proyecto que estábamos construyendo.

## Commits y mensajes

Los commits fueron redactados de manera clara y descriptiva. En general, utilizamos mensajes breves que indicaban el objetivo del cambio, como la implementación de una nueva vista, la integración de una funcionalidad o la corrección de un problema concreto. Esa práctica ayudó a seguir el historial del proyecto y a comprender rápidamente qué había cambiado en cada etapa.

## Pull requests y merges

El proceso de integración incluyó merges desde las ramas de funcionalidad hacia la rama de desarrollo. En varios momentos del proyecto también se trabajó con pull requests, lo que permitió incorporar cambios de forma más ordenada y dejar una trazabilidad clara del avance del desarrollo.

## Convención de nombres

La convención de nombres que adoptamos fue sencilla y consistente. Para las ramas de nuevas funcionalidades utilizamos el prefijo `feature/`, mientras que para correcciones empleamos `bugfixes/`. En los mensajes de commit, priorizamos la claridad sobre la complejidad, de modo que cada cambio pudiera reconocerse fácilmente en el historial.

## Buenas prácticas de Git

Durante el desarrollo intentamos mantener un uso ordenado de Git. Entre las prácticas que aplicamos se encuentran el trabajo por ramas, la integración progresiva de cambios, la redacción de mensajes de commit claros y la separación de tareas en módulos. Todo esto contribuyó a que el repositorio se mantuviera organizado y que la evolución del proyecto fuera más fácil de seguir.

---

# Desarrollo del proyecto

## Arquitectura

La arquitectura del proyecto responde a una Single Page Application desarrollada en Angular. La aplicación se organiza en componentes, servicios, rutas y modelos, de manera que cada parte del sistema tenga una responsabilidad concreta. Esta estructura nos permitió separar la interfaz de la lógica de acceso a datos y mantener el código más ordenado.

## Organización de carpetas

La estructura general del proyecto se organiza de la siguiente manera:

```text
src/
  app/
    components/
    services/
    models/
    guards/
    features/
    core/
```

Dentro de la carpeta `components` se concentran las vistas principales de la aplicación, como home, login, registro, usuarios, ejercicios, rutinas, suscripciones, tarifas, pagos y dashboard. En `services` dejamos la comunicación con el backend, mientras que en `models` definimos las entidades del dominio que se utilizan en la interfaz.

## Backend

El proyecto está centrado en el frontend, pero la aplicación se comunica con un backend externo mediante una API REST. Las peticiones se realizan hacia distintos endpoints relacionados con autenticación, usuarios, ejercicios, rutinas, suscripciones, tarifas, pagos y dashboard. En la configuración actual, estas llamadas apuntan a una URL local basada en `http://localhost:3000/api/...`.

## Frontend

El frontend está desarrollado en Angular y está compuesto por vistas específicas para cada rol. Implementamos pantallas de acceso público, pantallas de administración y vistas orientadas a la experiencia del socio y del entrenador. Esta organización nos permitió que cada usuario accediera solo a las funciones que correspondían a su perfil.

## Tecnologías utilizadas

Para la implementación utilizamos las siguientes tecnologías:

- Angular 21
- TypeScript
- Bootstrap 5
- RxJS
- Chart.js
- Angular Router
- Angular Forms
- HttpClient de Angular

## Librerías y frameworks

Además de Angular y TypeScript, incorporamos varias librerías y herramientas que facilitaron el desarrollo. Entre ellas se encuentran Bootstrap para la interfaz, Chart.js para los gráficos del dashboard, RxJS para la gestión de flujos asíncronos y Angular Forms para los formularios reactivos.

## APIs utilizadas

La aplicación interactúa con distintas APIs y servicios externos. Entre ellos, se destacan los endpoints internos del backend para la gestión de usuarios y operaciones del gimnasio, la API de Mercado Pago para la generación de links de pago y los servicios de Google para autenticación y mapas embebidos.

## Base de datos

El repositorio no incluye archivos de base de datos ni scripts de migración. La información que maneja la aplicación se organiza en el frontend a través de modelos y se obtiene desde el backend mediante peticiones HTTP.

## Relaciones entre componentes

La relación entre los distintos elementos del sistema es clara. Los componentes presentan la interfaz, los servicios encapsulan la comunicación con la API y los guards protegen las rutas según el rol activo. Los modelos traducen la información del backend a estructuras que la aplicación puede manejar de forma consistente.

---

# Decisiones de diseño

## Separación por capas

Una de las decisiones más importantes del proyecto fue separar la aplicación en capas bien diferenciadas. La interfaz quedó en los componentes, la lógica de acceso a datos se concentró en los servicios y la protección de rutas se delegó a los guards. Esta organización facilitó el mantenimiento y permitió que cada parte del sistema tuviera una responsabilidad concreta.

## Organización del código

La organización del código fue pensada para que los módulos fueran fáciles de localizar y modificar. Contamos con servicios específicos para usuarios, ejercicios, rutinas, suscripciones, tarifas, pagos y dashboard, lo que favorece la escalabilidad del proyecto y evita que toda la lógica se concentre en un solo archivo.

## Reutilización y modularidad

También priorizamos la reutilización del código. Los servicios y los guards se reutilizan en distintos componentes, mientras que los modelos representan entidades comunes que atraviesan el sistema. Esta modularidad fue una ventaja durante el desarrollo, porque permitió incorporar nuevas funcionalidades sin tener que rehacer la estructura general.

## Escalabilidad y mantenimiento

La estructura del proyecto permite seguir creciendo sin perder claridad. El hecho de trabajar con módulos funcionales y servicios separados facilita la incorporación de nuevas pantallas, nuevas reglas de negocio o nuevas integraciones externas. En ese sentido, la organización elegida fue apropiada para un sistema que podía evolucionar con el tiempo.

---

# Problemas encontrados

El desarrollo no estuvo exento de dificultades. Una de las principales fue la dependencia de un backend externo, ya que la aplicación frontend necesita consumir servicios que no forman parte de este repositorio. Esto implicó que la integración completa del sistema dependiera de una capa adicional que no podía desarrollarse en paralelo dentro del mismo proyecto.

Otra dificultad fue la incorporación de múltiples módulos en una misma interfaz. A medida que agregamos funciones para usuarios, ejercicios, rutinas, pagos y dashboard, la coherencia entre ellos se volvió cada vez más importante. La organización por módulos ayudó a resolver ese problema, aunque también exigió una coordinación más cuidadosa entre las distintas partes del desarrollo.

Además, la integración de servicios externos como Google y Mercado Pago requirió atención especial, porque dependían de configuraciones y credenciales externas. Aun así, logramos incorporar esas funciones de forma consistente dentro de la experiencia general de la aplicación.

---

# Buenas prácticas implementadas

Durante el proyecto intentamos aplicar buenas prácticas tanto de desarrollo como de organización. Entre ellas destacan el uso de componentes independientes, la separación de responsabilidades entre componentes y servicios, la protección de rutas con guards, la validación de formularios y la utilización de mensajes de feedback para el usuario.

También cuidamos la estructura del repositorio y la trazabilidad de los cambios mediante Git. Mantuvimos commits organizados, trabajamos por ramas y fuimos integrando las funcionalidades de forma progresiva. Estas decisiones contribuyeron a que el proyecto fuera más claro, más mantenible y más fácil de comprender para quienes participamos en su desarrollo.

---

# Conclusiones

El desarrollo de GymHub nos permitió construir una aplicación web funcional orientada a la gestión de un gimnasio, con una estructura organizada y un enfoque claro en las necesidades del negocio. A lo largo del trabajo incorporamos distintas funcionalidades relacionadas con la administración de usuarios, la gestión de actividades de entrenamiento, el control de pagos y la visualización de información relevante para la dirección del gimnasio.

El proyecto nos ayudó a integrar conceptos de diseño de interfaces, arquitectura frontend, manejo de estados, seguridad básica en rutas y comunicación con servicios externos. Además, nos permitió trabajar con herramientas de control de versiones de forma colaborativa, lo que fue esencial para organizar el avance del trabajo y mantener la coherencia del código.

En conjunto, consideramos que el resultado alcanzado es una base sólida para una aplicación de gestión más completa. La estructura implementada deja espacio para seguir expandiendo la plataforma con nuevas funcionalidades y con un mayor grado de integración con el backend y con otros servicios.

---

# README del proyecto

## Proyecto

GymHub es una aplicación web frontend desarrollada en Angular para la gestión integral de un gimnasio. Permite administrar usuarios, roles, ejercicios, rutinas, suscripciones, cuotas, pagos y métricas de negocio desde una interfaz moderna y responsiva.

## Objetivos

- ofrecer una plataforma simple y eficiente para la gestión de un gimnasio;
- separar el acceso por roles de administrador, entrenador y socio;
- centralizar la operación administrativa de usuarios y pagos;
- permitir al socio consultar sus rutinas y cuotas desde una vista dedicada.

## Características principales

- autenticación y registro de usuarios;
- acceso por roles mediante guards;
- panel administrativo con métricas;
- gestión de usuarios y permisos;
- administración de ejercicios y rutinas;
- control de suscripciones y tarifas;
- registro de pagos y generación de links de Mercado Pago;
- autenticación con Google;
- integración de Google Maps para mostrar la ubicación del gimnasio.

## Tecnologías

- Angular 21
- TypeScript
- Bootstrap 5
- RxJS
- Chart.js
- Angular Router
- Angular Forms

## Requisitos

- Node.js 20 o superior
- npm 10 o superior

## Instalación

```bash
npm install
```

## Ejecución del frontend

```bash
npm start
```

La aplicación queda disponible en el puerto por defecto de Angular.

## Scripts disponibles

```bash
npm run start
npm run build
npm run test
```

## Configuración

La aplicación consume un backend externo mediante peticiones a `http://localhost:3000/api/...`, por lo que es necesario contar con ese servicio disponible para que la interfaz funcione de forma completa.

## Variables de entorno

No se incorporaron variables de entorno en este repositorio. La configuración actual queda definida directamente en el código de la aplicación.

## Estructura del proyecto

```text
src/
  app/
    components/
    services/
    models/
    guards/
    features/
    core/
```

## Organización de carpetas

- `components/`: vistas principales de la aplicación.
- `services/`: lógica de comunicación con la API.
- `models/`: entidades del dominio.
- `guards/`: control de acceso por rol.
- `features/` y `core/`: organización conceptual del proyecto.

## Capturas o imágenes

Recomendamos agregar capturas de pantalla de las siguientes vistas:

- pantalla de inicio;
- pantalla de login y registro;
- panel de administración;
- gestión de usuarios;
- gestión de rutinas y ejercicios;
- vista de pagos y suscripciones.

Una posible ubicación para estas imágenes es:

```text
src/assets/screenshots/
```

## Posibles mejoras futuras

- incorporar pruebas automatizadas;
- mover las URLs del backend a variables de entorno;
- desarrollar el backend dentro del mismo repositorio;
- mejorar el manejo de errores y estados de carga;
- ampliar la arquitectura con módulos más explícitos;
- documentar mejor los flujos de negocio y la API.

## Créditos

Proyecto desarrollado por el equipo Grupo G06 para la materia Programación y Servicios Web.

## Integrantes

- Martin Mamani
- Tiziano Gallo
- Valentín Lozano
- Valentín Iriarte
-Cesar Miranda


## Licencia

No se incorporó una licencia explícita en el repositorio.

---

## Verificación del proyecto

La aplicación compila correctamente con el siguiente comando:

```bash
npm run build
```

>>>>>>> Stashed changes
