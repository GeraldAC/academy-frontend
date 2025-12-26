# Academy Frontend

Plataforma web para la gestión académica de centros preuniversitarios. Sistema integral que facilita la administración de usuarios, cursos, inscripciones, asistencias, pagos y generación de reportes educativos.

## Descripción General

Academy Frontend es una aplicación web construida con React 18, TypeScript y Vite que proporciona una interfaz profesional y responsiva para la gestión operativa de centros de educación preuniversitaria. El sistema implementa autenticación basada en roles, gestión completa de datos académicos y capacidades avanzadas de reporting.

### Principales características

- **Autenticación y Control de Acceso**: Sistema de autenticación basado en tokens con autorización por roles (Administrador, Profesor, Estudiante)
- **Gestión de Usuarios**: Registro, edición y administración de perfiles de estudiantes, docentes y administradores
- **Administración Académica**: Gestión de cursos, horarios, inscripciones y asistencias
- **Gestión Financiera**: Procesamiento y seguimiento de pagos de estudiantes
- **Reportes Avanzados**: Generación de reportes en formato PDF y CSV
- **Notificaciones**: Sistema de notificaciones para eventos académicos y administrativos
- **Validación Robusta**: Validación de datos mediante formularios reactivos con React Hook Form y Zod
- **Interfaz Responsiva**: Diseño adaptable a dispositivos de escritorio y móviles con Tailwind CSS
- **Caché Inteligente**: Gestión eficiente de datos con TanStack Query

## Requisitos del Sistema

- Node.js 16.0.0 o superior
- npm 7.0.0 o superior (o yarn 1.22.0+)
- Git

## Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd academy-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Actualizar `.env.local` con los valores correspondientes a tu entorno:

```
VITE_API_BASE_URL=http://localhost:3000/api
VITE_APP_NAME=Academy
```

### 4. Iniciar en desarrollo

```bash
npm run dev
```

La aplicación estará accesible en `http://localhost:5173`

## Arquitectura y Estructura del Proyecto

### Organización de Directorios

```
src/
├── api/
│   ├── axios.ts              # Configuración de Axios con interceptores
│   ├── client.ts             # Cliente HTTP centralizado
│   └── routes.ts             # Definición de rutas API
├── app/
│   ├── App.tsx               # Componente raíz
│   ├── main.tsx              # Punto de entrada
│   ├── index.css             # Estilos globales
│   ├── providers/            # Context providers
│   └── router/               # Configuración de ruteo
│       ├── router.tsx        # Router principal
│       ├── routesConfig.tsx  # Definición de rutas
│       ├── ProtectedRoute.tsx    # Rutas protegidas por rol
│       └── GuestRoute.tsx        # Rutas para usuarios no autenticados
├── components/
│   ├── ui/                   # Componentes primitivos (Button, Input, etc.)
│   ├── common/               # Componentes compartidos (Modal, ErrorBoundary, etc.)
│   └── users/                # Componentes específicos de usuarios
├── features/
│   ├── auth/                 # Autenticación y autorización
│   ├── courses/              # Gestión de cursos
│   ├── enrollments/          # Inscripciones
│   ├── schedules/            # Horarios
│   ├── attendances/          # Asistencias
│   ├── payments/             # Pagos
│   ├── reports/              # Reportes
│   ├── reservations/         # Reservaciones
│   ├── notifications/        # Notificaciones
│   └── users/                # Gestión de usuarios
├── hooks/
│   ├── useAuthCheck.ts       # Verificación de autenticación
│   ├── useAuthSync.ts        # Sincronización entre pestañas
│   ├── useDashboardData.ts   # Datos del dashboard
│   └── [otros hooks]         # Custom hooks específicos
├── layout/
│   ├── PrivateLayout/        # Layouts para usuarios autenticados
│   └── PublicLayout/         # Layouts públicos
├── lib/
│   └── utils.ts              # Utilidades y funciones helper
├── pages/
│   ├── AboutPage.tsx         # Página acerca de
│   ├── LandingPage.tsx       # Página principal
│   ├── NotFoundPage.tsx      # Página 404
│   ├── admin/                # Páginas de administrador
│   ├── student/              # Páginas de estudiante
│   └── teacher/              # Páginas de docente
├── services/
│   ├── api/                  # Servicios API por módulo
│   ├── pdf.ts                # Generación de PDF
│   ├── csv.ts                # Exportación CSV
│   ├── notifications.ts      # Gestión de notificaciones
│   └── permissions.ts        # Gestión de permisos
├── stores/
│   ├── useAuthStore.ts       # Store global de autenticación
│   └── useUiStore.ts         # Store global de UI
├── theme/
│   ├── colors.ts             # Paleta de colores
│   └── index.ts              # Configuración de tema
├── types/
│   └── index.ts              # Tipos compartidos de TypeScript
├── utils/
│   ├── formatDate.ts         # Formateo de fechas
│   ├── helpers.ts            # Funciones helper generales
│   └── money.ts              # Utilidades financieras
└── validation/
    ├── validators.ts         # Validadores personalizados
    └── index.ts              # Esquemas Zod
```

### Patrones de Arquitectura

**Estado Global (Zustand)**

El estado de autenticación se gestiona a través de Zustand en [src/stores/useAuthStore.ts](src/stores/useAuthStore.ts), que persiste el token y datos del usuario en localStorage.

**Comunicación API**

Todos los requests HTTP se canalizan a través de [src/api/client.ts](src/api/client.ts), que:

- Envuelve Axios con configuración centralizada
- Incluye el token de autenticación automáticamente en los headers
- Maneja errores globales mediante interceptores

**Caching y Sincronización**

TanStack Query (React Query) gestiona el caching de datos con un tiempo de expiración de 5 minutos. Las actualizaciones se sincronizan automáticamente sin refetch al recuperar el foco de la ventana.

**Validación de Datos**

Todos los formularios utilizan React Hook Form integrado con esquemas Zod para validación robusta y type-safe.

**Control de Acceso**

Las rutas protegidas utilizan el componente [src/app/router/ProtectedRoute.tsx](src/app/router/ProtectedRoute.tsx) que verifica:

- Autenticación del usuario
- Rol requerido para la ruta

## Flujo de Desarrollo

### Scripts Disponibles

```bash
npm run dev         # Iniciar servidor de desarrollo (Vite)
npm run build       # Compilar para producción con optimizaciones
npm run preview     # Previsualizar compilación de producción localmente
npm run lint        # Ejecutar ESLint (modo strict, 0 warnings)
npm run typecheck   # Verificar tipos sin compilar (tsc --noEmit)
npm run format      # Formatear código con Prettier
npm run test        # Ejecutar suite de pruebas con Vitest
```

### Ciclo de Desarrollo Típico

1. Crear rama de feature: `git checkout -b feature/nombre-feature`
2. Realizar cambios y commits: `git commit -m "feat: descripción"`
3. Ejecutar linter y tests: `npm run lint && npm run test`
4. Compilar para verificar: `npm run build`
5. Crear pull request al revisar

## Estándares de Código y Convenciones

### Conventional Commits

Este proyecto sigue estrictamente el estándar [Conventional Commits](https://www.conventionalcommits.org/) para mantener un historial claro y permitir automatización.

Formato:

```
<tipo>[alcance opcional]: <descripción breve>

[cuerpo opcional]

[pie opcional]
```

### Tipos de Commit Permitidos

| Tipo     | Descripción                                 | Ejemplo                                     |
| -------- | ------------------------------------------- | ------------------------------------------- |
| feat     | Introduce una nueva funcionalidad           | `feat(courses): agregar filtro por estado`  |
| fix      | Corrige un bug                              | `fix(auth): validar token expirado`         |
| refactor | Cambio de código sin alterar comportamiento | `refactor(api): simplificar interceptores`  |
| docs     | Cambios en documentación                    | `docs: actualizar guía de instalación`      |
| style    | Cambios de formato (sin lógica)             | `style(ui): alinear espacios en Button`     |
| test     | Agregar o modificar pruebas                 | `test(auth): validar login fallido`         |
| ci       | Cambios en configuración CI/CD              | `ci: actualizar workflow de GitHub Actions` |
| chore    | Cambios en dependencias o herramientas      | `chore(deps): actualizar React a v18.3`     |

### Convenciones de Naming

- **Componentes React**: PascalCase (`UserForm.tsx`, `CourseCard.tsx`)
- **Hooks personalizados**: camelCase con prefijo `use` (`useAuthCheck.ts`, `usePagination.ts`)
- **Funciones y variables**: camelCase (`formatDate()`, `authToken`)
- **Constantes**: UPPER_SNAKE_CASE (`API_BASE_URL`, `MAX_UPLOAD_SIZE`)
- **Archivos de tipos/interfaces**: PascalCase (`User.ts`, `Course.ts`)
- **Servicios API**: `api.ts` dentro de `features/{module}/services/`

### Importaciones

Utilizar path alias `@/` que mapea a `src/`:

```typescript
// Correcto
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/stores/useAuthStore";
import { formatDate } from "@/utils/formatDate";

// Evitar
import { Button } from "../../../components/ui/Button";
```

## Autenticación y Autorización

### Flujo de Autenticación

1. Usuario se autentica con credenciales
2. Backend retorna JWT token
3. Token se almacena en localStorage (via Zustand)
4. Token se incluye automáticamente en headers de requests (interceptor Axios)
5. Se sincroniza estado entre pestañas del navegador

### Roles y Permisos

El sistema soporta tres roles principales:

- **Administrador**: Acceso completo a todas las funcionalidades
- **Profesor**: Gestión de cursos asignados, asistencias y calificaciones
- **Estudiante**: Visualización de cursos inscritos, horarios y calificaciones

Los permisos se definen en [src/services/permissions.ts](src/services/permissions.ts) y se validan en cada ruta protegida.

## Generación de Reportes

### Reportes PDF

Utilizar el servicio [src/services/pdf.ts](src/services/pdf.ts) para generar documentos PDF con datos académicos.

Ejemplo de uso:

```typescript
import { generateAcademicReport } from "@/services/pdf";

const pdf = await generateAcademicReport(studentData, period);
```

### Exportación CSV

Utilizar [src/services/csv.ts](src/services/csv.ts) para exportar datos en formato CSV.

## Guía para Nuevos Desarrolladores

### Agregar un Endpoint API

1. Crear/actualizar servicio en `src/features/{modulo}/services/api.ts`
2. Utilizar el cliente HTTP centralizado:

   ```typescript
   import { client } from "@/api/client";

   export const fetchUsers = () => client.get("/users");
   export const createUser = (data) => client.post("/users", data);
   ```

3. Usar TanStack Query en el componente:

   ```typescript
   import { useQuery, useMutation } from "@tanstack/react-query";

   const { data, isLoading } = useQuery({
     queryKey: ["users"],
     queryFn: fetchUsers,
   });
   ```

### Crear una Ruta Protegida

1. Importar en [src/app/router/routesConfig.tsx](src/app/router/routesConfig.tsx)
2. Envolver con `ProtectedRoute`:
   ```typescript
   {
     path: 'admin/users',
     element: <ProtectedRoute requiredRole="ADMIN"><UsersPage /></ProtectedRoute>
   }
   ```

### Validar un Formulario

Utilizar React Hook Form + Zod:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres')
});

export function LoginForm() {
  const form = useForm({
    resolver: zodResolver(schema)
  });

  return (
    <form onSubmit={form.handleSubmit(onSubmit)}>
      {/* campos del formulario */}
    </form>
  );
}
```

## Stack Tecnológico

- **Framework**: React 18.2
- **Lenguaje**: TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **HTTP Client**: Axios
- **Data Fetching**: TanStack Query (React Query)
- **Forms**: React Hook Form
- **Validation**: Zod
- **Routing**: React Router v6
- **Icons**: Lucide React
- **Charts**: Recharts
- **Testing**: Vitest
- **Linting**: ESLint
- **Code Formatting**: Prettier

## Control de Calidad

### Linting

```bash
npm run lint
```

Configurado con ESLint en modo strict sin tolerancia a warnings.

### Type Checking

```bash
npm run typecheck
```

Verifica tipos de TypeScript sin compilar.

### Testing

```bash
npm run test
```

Suite de pruebas con Vitest y jsdom. Los tests deben incluirse en directorios `__tests__/` o con sufijo `.test.ts`.

### Pre-commit Hooks

Husky ejecuta automáticamente:

- ESLint (lint)
- commitlint (validar formato de commits)

## Despliegue

### Construcción para Producción

```bash
npm run build
```

Genera una carpeta `dist/` optimizada lista para desplegar.

### Requisitos de Producción

- Servidor web que sirva `index.html` para todas las rutas (SPA)
- Variable de entorno `VITE_API_BASE_URL` apuntando a la API backend

## Contribución

Reportar problemas y sugerir mejoras a través del sistema de issues del repositorio.

## Licencia

Este proyecto es propiedad del Centro Preuniversitario.

---

Última actualización: Diciembre 2025
