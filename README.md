# Lavandería Express — SPA con React

Aplicación web tipo SPA desarrollada para **Evaluación 3 (UA3) — Programación Front End**, que digitaliza la gestión de reservas de una lavandería: catálogo de servicios, formulario de reservas con CRUD completo y consumo de una API propia.

**Alumno/a:** Na Ra Shin Lim · **Sección:** C1 · **Tema 20:** Lavandería

## 📋 Descripción del negocio

Lavandería Express es un negocio que hasta ahora gestionaba sus servicios y reservas de clientes de forma manual. Esta SPA permite:

- Consultar el catálogo de servicios (lavado por kilo, lavado en seco, planchado, lavado de plumón, tintorería) obtenido desde una API propia.
- Seleccionar servicios y armar un pedido con cantidades y total en tiempo real.
- Crear, editar y eliminar reservas de clientes, con los datos guardados en `localStorage` (persisten aunque se recargue la página).
- Ver el estado de la conexión con la API (cargando / datos obtenidos / error) en una sección dedicada.

## 🧱 Stack técnico

- **React 18** + **Vite** (frontend)
- **React Router DOM v7** (navegación SPA)
- **FastAPI** (Python) como API propia de servicios
- **LocalStorage** para persistencia del CRUD de reservas

## 📂 Estructura del proyecto

```
evaluacion_03/
├── main.py                 # API de servicios (FastAPI)
├── requirements.txt        # Dependencias del backend
├── index.html
├── src/
│   ├── App.jsx              # Rutas, estado global, lógica de CRUD y fetch
│   ├── main.jsx              # Punto de entrada + BrowserRouter
│   ├── index.css
│   ├── pages/
│   │   ├── Inicio.jsx         # Catálogo de servicios
│   │   ├── Gestion.jsx        # Pedido + formulario + reservas
│   │   └── DatosApi.jsx       # Estados de la API (carga/ok/error)
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── ServiciosList.jsx
│   │   ├── ServiceCard.jsx
│   │   ├── PedidoPanel.jsx
│   │   ├── ReservaForm.jsx
│   │   ├── ReservasRecientes.jsx
│   │   ├── ReservaItem.jsx
│   │   └── ConfirmDialog.jsx
│   └── utils/
│       └── validarReserva.js  # Validación del formulario
```

## ▶️ Cómo correr el proyecto

El proyecto tiene dos partes que deben correr **al mismo tiempo**: el backend (API de servicios) y el frontend (React).

### 1. Backend (API de servicios)

```bash
pip install -r requirements.txt
python main.py
```

La API queda disponible en `http://127.0.0.1:8000/api/servicios` (documentación interactiva en `http://127.0.0.1:8000/docs`).

### 2. Frontend (React + Vite)

En otra terminal:

```bash
npm install
npm run dev
```

La aplicación queda disponible en `http://localhost:5173`.

> ⚠️ Si el backend no está corriendo, la sección **"Datos API"** mostrará el estado de error (❌) en vez de los servicios — esto es intencional y demuestra el manejo de errores pedido en la pauta, no un fallo de la app. El catálogo seguirá funcionando igual con datos de respaldo definidos en el frontend.

## 🧭 Rutas de la aplicación

| Ruta | Contenido |
|---|---|
| `/` | Catálogo de servicios (selección de servicios) |
| `/gestion` | Pedido actual, formulario de reserva y listado de reservas (CRUD) |
| `/api` | Estado del consumo de la API asignada (carga / datos / error) |

## ✅ Funcionalidades principales

- **CRUD de reservas** con `localStorage`: crear, listar, editar y eliminar reservas, persistiendo al recargar (F5). Incluye confirmación antes de eliminar.
- **Formulario validado**: nombre, teléfono, correo y fecha con reglas propias (`src/utils/validarReserva.js`) y mensajes de error por campo.
- **Consumo de API con Fetch**: estados de carga, éxito y error visibles en la interfaz, con botón de reintento.
- **Componentes reutilizables con props**: 9 componentes (Header, ServiceCard, ServiciosList, PedidoPanel, ReservaForm, ReservaItem, ReservasRecientes, ConfirmDialog, DatosApi).
- **useEffect** en 5 puntos justificados: cargar reservas desde `localStorage`, guardarlas cada vez que cambian, hacer fetch a la API al montar, y auto-cerrar los mensajes de éxito/error tras 3 segundos.

## 🤖 Uso de IA

Para este proyecto usé varias herramientas de IA (Claude, ChatGPT y otra adicional) de forma combinada durante distintas etapas: generación de código base para adaptarlo después, depuración de errores puntuales y explicación de conceptos como `useEffect`, el manejo de estados de fetch y la lógica de persistencia en `localStorage`.

Esto me ayudó a avanzar más rápido en partes repetitivas (como el CSS y la estructura de componentes), pero cada línea del proyecto fue revisada y puedo explicarla: por qué se usan los distintos `useEffect`, cómo se arma el array de dependencias en cada uno, qué pasa si la API falla, y dónde se guarda cada dato al hacer clic en "Guardar".

## 📌 Notas

- Repositorio con historial de commits descriptivos (`feat:`, `fix:`, `refactor:`, `style:`).
- HTML semántico (`header`, `nav`, `main`, `section`, `footer`) y layout con Flexbox/Grid en `src/index.css`.
