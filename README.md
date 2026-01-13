# Academy Frontend

🎓 Plataforma web integral para la gestión académica de centros preuniversitarios. Sistema profesional que facilita la administración de usuarios, cursos, inscripciones, asistencias, pagos y generación de reportes educativos avanzados.

## 📋 Descripción General

**Academy Frontend** es una aplicación web moderna construida con **React 18**, **TypeScript** y **Vite** que proporciona una interfaz profesional, responsiva e intuitiva para la gestión operativa completa de centros de educación preuniversitaria.

El sistema implementa:

- ✅ Autenticación basada en tokens JWT con autorización granular por roles
- ✅ Arquitectura basada en características (Feature-based) escalable
- ✅ State management reactivo con Zustand
- ✅ Caching inteligente y gestión de datos con TanStack Query
- ✅ Validación type-safe con Zod y React Hook Form
- ✅ Componentes reutilizables inspirados en shadcn/ui
- ✅ Diseño responsivo con Tailwind CSS y animaciones Framer Motion

### ✨ Principales características

- **Autenticación y Control de Acceso**: Sistema de autenticación basado en JWT con autorización por roles granulares (Administrador, Profesor, Estudiante)
- **Gestión de Usuarios**: CRUD completo, importación CSV, edición masiva de perfiles de estudiantes, docentes y administradores
- **Administración Académica Integral**: Gestión de cursos, horarios, inscripciones, asistencias e historial académico
- **Gestión Financiera Avanzada**: Procesamiento, seguimiento y reporte de pagos estudiantiles
- **Sistema de Reportes**: Generación dinámica de reportes en PDF y CSV con múltiples formatos
- **Notificaciones en Tiempo Real**: Sistema de notificaciones para eventos académicos, administrativos y financieros
- **Validación Robusta**: Formularios reactivos con validación frontend completa (React Hook Form + Zod)
- **Interfaz Responsiva y Accesible**: Diseño mobile-first con soporte para tema claro/oscuro
- **Caché Inteligente y Sincronización**: Gestión eficiente de estado con sincronización automática entre pestañas

## 📋 Requisitos del Sistema

- **Node.js** 16.0.0 o superior (recomendado 18.0.0+)
- **npm** 8.0.0 o superior (o yarn 1.22.0+, pnpm 7.0.0+)
- **Git** para control de versiones
- Un navegador moderno (Chrome, Firefox, Safari, Edge)

## 🚀 Instalación y Configuración

### 1. Clonar el repositorio

```bash
git clone <repository-url>
cd academy-frontend
```

### 2. Instalar dependencias

```bash
npm install
```

**Alternativas:**

```bash
yarn install    # usando Yarn
pnpm install    # usando PNPM
```

### 3. Configurar variables de entorno

```bash
cp .env.example .env.local
```

Editar `.env.local` con los valores correspondientes a tu entorno:

```env
# API
VITE_API_BASE_URL=http://localhost:3000/api

# Aplicación
VITE_APP_NAME=Academy
VITE_APP_URL=http://localhost:5173

# Opcional: Features
VITE_ENABLE_ANALYTICS=false
```

### 4. Iniciar servidor de desarrollo

```bash
npm run dev
```

La aplicación estará accesible en **`http://localhost:5173`** con HMR (Hot Module Replacement) habilitado.

### 5. Verificar la instalación

```bash
npm run typecheck    # Verificar tipos
npm run lint         # Ejecutar linter
npm run test         # Ejecutar tests
```

## 🏗️ Arquitectura y Estructura del Proyecto

### Organización de Directorios

```
src/
├── api/                      # Configuración HTTP centralizada
│   ├── axios.ts              # Interceptores y configuración de Axios
│   ├── client.ts             # Cliente HTTP wrapper
│   ├── dashboardService.ts   # Servicio de dashboard
│   └── routes.ts             # Definición de endpoints de API
├── app/                      # Punto de entrada y configuración global
│   ├── App.tsx               # Componente raíz
│   ├── main.tsx              # Entry point
│   ├── index.css             # Estilos globales
│   ├── index.ts
│   ├── providers/            # Providers contextuales
│   │   ├── NotificationsProvider.tsx
│   │   └── QueryProvider.tsx
│   └── router/               # Configuración de ruteo
│       ├── router.tsx        # Router principal (React Router v6)
│       ├── routesConfig.tsx  # Definición centralizada de rutas
│       ├── ProtectedRoute.tsx    # HOC para rutas protegidas por rol
│       ├── GuestRoute.tsx        # Redirección para usuarios autenticados
│       └── roleRedirect.ts   # Lógica de redirección por rol
├── assets/                   # Recursos estáticos
│   ├── fonts/                # Fuentes personalizadas
│   └── images/               # Imágenes y logotipos
├── components/               # Componentes reutilizables
│   ├── ui/                   # Componentes primitivos (Button, Input, Card, etc.)
│   │   ├── Button.tsx
│   │   ├── Input.tsx
│   │   ├── card.tsx
│   │   ├── form.tsx
│   │   ├── badge.tsx
│   │   ├── alert.tsx
│   │   ├── toast.tsx
│   │   ├── button-variants.ts
│   │   └── label.tsx
│   ├── common/               # Componentes compartidos (ErrorBoundary, Modal, etc.)
│   │   ├── ConfirmDialog.tsx
│   │   ├── EmptyState.tsx
│   │   ├── ErrorBoundary.tsx
│   │   ├── LoadingScreen.tsx
│   │   ├── PageContainer.tsx
│   │   ├── PlaceholderPage.tsx
│   │   ├── StatCard.tsx
│   │   └── index.ts
│   └── users/                # Componentes específicos de usuarios
│       ├── EditUserModal.tsx
│       ├── UserRegistrationModal.tsx
│       └── UsersTable.tsx
├── features/                 # Módulos feature-based (escalable)
│   ├── auth/                 # Autenticación y autorización
│   │   ├── __tests__/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── types/
│   │   └── validations/
│   ├── courses/              # Gestión de cursos
│   ├── enrollments/          # Inscripciones de estudiantes
│   ├── schedules/            # Horarios y disponibilidad
│   ├── attendance/           # Asistencias (singular)
│   ├── attendances/          # Asistencias (plural)
│   ├── payments/             # Gestión de pagos
│   ├── reports/              # Generación de reportes
│   ├── reservations/         # Reservaciones de aulas/recursos
│   ├── notifications/        # Sistema de notificaciones
│   └── users/                # Gestión de usuarios
├── hooks/                    # Custom hooks reutilizables
│   ├── index.ts
│   ├── useAuthCheck.ts       # Verificación de autenticación al cargar
│   ├── useAuthSync.ts        # Sincronización entre pestañas del navegador
│   ├── useDashboardData.ts   # Hook para datos del dashboard
│   ├── useDebounce.ts        # Debouncing de valores
│   ├── usePagination.ts      # Lógica de paginación
│   └── use-toast.ts          # Sistema de notificaciones tipo toast
├── layout/                   # Layouts reutilizables
│   ├── PrivateLayout/        # Layout para usuarios autenticados
│   └── PublicLayout/         # Layout público (landing, login)
├── lib/
│   └── utils.ts              # Utilidades y funciones helper (cn, etc)
├── pages/                    # Páginas por rol
│   ├── AboutPage.tsx         # Página acerca de
│   ├── LandingPage.tsx       # Página principal (public)
│   ├── NotFoundPage.tsx      # Página 404
│   ├── admin/                # Páginas administrativas
│   ├── student/              # Páginas de estudiante
│   └── teacher/              # Páginas de docente
├── services/                 # Servicios globales
│   ├── api/                  # Servicios API por feature
│   ├── csv.ts                # Exportación de datos a CSV
│   ├── pdf.ts                # Generación de documentos PDF
│   ├── notifications.ts      # Gestión de notificaciones
│   └── permissions.ts        # Lógica de permisos y roles
├── stores/                   # State management global (Zustand)
│   ├── index.ts
│   ├── useAuthStore.ts       # Estado de autenticación y usuario
│   └── useUiStore.ts         # Estado global de UI
├── tests/                    # Tests e1e y de integración
│   ├── App.test.tsx
│   └── setupTests.ts
├── theme/                    # Configuración de tema
│   ├── colors.ts             # Paleta de colores HSL
│   └── index.ts              # Exportación de tema
├── types/                    # Tipos compartidos de TypeScript
│   └── index.ts
├── utils/                    # Funciones utility globales
│   ├── formatDate.ts         # Formateo de fechas con date-fns
│   ├── helpers.ts            # Helpers generales
│   └── money.ts              # Utilidades para cálculos monetarios
└── validation/               # Validación centralizada
    ├── validators.ts         # Validadores personalizados Zod
    └── index.ts              # Exportación de esquemas
```

### Patrones de Arquitectura Aplicados

#### 🎯 State Management con Zustand

El estado global se gestiona a través de **Zustand** ([src/stores/useAuthStore.ts](src/stores/useAuthStore.ts)), proporcionando:

- ✅ Persistencia automática en localStorage
- ✅ Sincronización entre pestañas del navegador
- ✅ Actualizaciones reactivas sin re-renders innecesarios
- ✅ Store mínimo y performante

**Ejemplo de uso:**

```typescript
import { useAuthStore } from "@/stores/useAuthStore";

const { user, token, login, logout } = useAuthStore();
```

#### 🔌 API Client Centralizado

Todos los requests HTTP se canalizan a través de [src/api/client.ts](src/api/client.ts), que:

- ✅ Envuelve Axios con configuración centralizada
- ✅ Incluye automáticamente el token JWT en headers
- ✅ Maneja errores globales mediante interceptores
- ✅ Proporciona métodos simplificados: `client.get()`, `client.post()`, `client.put()`, `client.delete()`

#### 💾 Caching y Sincronización de Datos

**TanStack Query (React Query)** gestiona el caching con:

- ✅ Tiempo de expiración de 5 minutos (staleTime)
- ✅ Sincronización automática en cambios de datos
- ✅ Sincronización entre pestañas sin refetch en focus
- ✅ Manejo centralizado de estados: `isLoading`, `isError`, `data`

**Configuración global en [src/app/providers/QueryProvider.tsx](src/app/providers/QueryProvider.tsx)**

#### ✔️ Validación Type-Safe

Todos los formularios utilizan **React Hook Form** integrado con **Zod**:

- ✅ Validación frontend completa
- ✅ Esquemas type-safe con TypeScript
- ✅ Mensajes de error personalizados
- ✅ Integración con componentes de UI

#### 🔐 Control de Acceso por Rol

Las rutas protegidas utilizan **ProtectedRoute.tsx** que verifica:

- ✅ Autenticación del usuario (token válido)
- ✅ Rol requerido para la ruta
- ✅ Redirección automática a login si no está autenticado
- ✅ Redirección al dashboard del rol si accede a ruta no permitida

#### 🏛️ Feature-Based Architecture

Cada módulo en `src/features/{featureName}/` sigue estructura consistente:

```
features/auth/
├── components/         # Componentes específicos del feature
├── hooks/             # Custom hooks del feature
├── pages/             # Páginas/rutas del feature
├── services/
│   └── api.ts         # Llamadas API centralizadas
├── types/             # Tipos e interfaces TypeScript
└── validations/       # Esquemas Zod para formularios
```

Esta estructura permite:

- ✅ Fácil escalabilidad
- ✅ Mantenimiento independiente
- ✅ Code splitting automático por feature
- ✅ Reutilización consistente

## 📊 Flujo de Desarrollo

### Scripts Disponibles

| Script              | Descripción                                                   |
| ------------------- | ------------------------------------------------------------- |
| `npm run dev`       | Inicia servidor Vite en modo desarrollo (puerto 5173 con HMR) |
| `npm run build`     | Compila TypeScript y genera bundle optimizado para producción |
| `npm run preview`   | Previsualiza la compilación de producción localmente          |
| `npm run lint`      | Ejecuta ESLint en modo strict (sin tolerancia a warnings)     |
| `npm run typecheck` | Verifica tipos TypeScript sin compilar (tsc --noEmit)         |
| `npm run format`    | Formatea código automáticamente con Prettier                  |
| `npm run test`      | Ejecuta suite de pruebas con Vitest                           |

### Ciclo de Desarrollo Típico

```bash
# 1. Crear rama de feature
git checkout -b feature/nombre-descriptivo

# 2. Realizar cambios
npm run dev  # verificar en tiempo real

# 3. Validar calidad
npm run lint
npm run typecheck
npm run test

# 4. Compilar para verificar optimizaciones
npm run build

# 5. Hacer commit con estándar Conventional Commits
git add .
git commit -m "feat(modulo): descripción concisa del cambio"

# 6. Empujar cambios
git push origin feature/nombre-descriptivo
```

## 📐 Estándares de Código y Convenciones

### Conventional Commits

Este proyecto sigue estrictamente el estándar [Conventional Commits](https://www.conventionalcommits.org/) para mantener un historial claro y permitir automatización (changelog automático, versionado semántico).

**Formato:**

```
<tipo>[(<alcance>)]: <descripción breve>

[cuerpo opcional explicativo]

[pie opcional de referencias a issues]
```

**Ejemplos:**

```bash
git commit -m "feat(auth): agregar autenticación de dos factores"
git commit -m "fix(courses): resolver error al guardar cambios de curso"
git commit -m "refactor(api): simplificar interceptores de Axios"
git commit -m "docs(README): actualizar guía de instalación"
git commit -m "test(auth): agregar tests para login fallido"
```

### Tipos de Commit Permitidos

| Tipo       | Descripción                       | Ejemplo                                   |
| ---------- | --------------------------------- | ----------------------------------------- |
| `feat`     | Nueva funcionalidad               | `feat(users): agregar búsqueda avanzada`  |
| `fix`      | Corrección de bug                 | `fix(payments): validar montos negativos` |
| `refactor` | Cambio sin alterar comportamiento | `refactor(api): usar async/await`         |
| `docs`     | Cambios en documentación          | `docs(README): actualizar requisitos`     |
| `style`    | Formato/espacios (sin lógica)     | `style: alinear indentación en Button`    |
| `test`     | Agregar/modificar tests           | `test(enrollments): validar inscripción`  |
| `ci`       | Cambios CI/CD                     | `ci: agregar GitHub Actions workflow`     |
| `chore`    | Actualizaciones de dependencias   | `chore(deps): actualizar React 18.3`      |

### Convenciones de Naming

**Componentes React**

```typescript
// ✅ PascalCase
UserForm.tsx;
CourseCard.tsx;
StudentEnrollmentModal.tsx;
```

**Hooks personalizados**

```typescript
// ✅ camelCase con prefijo 'use'
useAuthCheck.ts;
usePagination.ts;
useDashboardData.ts;
```

**Funciones y variables**

```typescript
// ✅ camelCase
const formatDate = () => {};
const authToken = localStorage.getItem("token");
```

**Constantes**

```typescript
// ✅ UPPER_SNAKE_CASE
const API_BASE_URL = process.env.VITE_API_BASE_URL;
const MAX_FILE_SIZE = 5242880; // 5MB
```

**Archivos de tipos**

```typescript
// ✅ PascalCase
User.ts;
Course.ts;
Enrollment.ts;
```

**Servicios API**

```typescript
// ✅ Ubicación estándar
features / { module } / services / api.ts;
// Ejemplo: features/auth/services/api.ts
```

### Importaciones y Path Aliases

**Utilizar path alias `@/` que mapea a `src/`**

```typescript
// ✅ Correcto - usar @/
import { Button } from "@/components/ui/Button";
import { useAuthStore } from "@/stores/useAuthStore";
import { formatDate } from "@/utils/formatDate";
import { User } from "@/types";

// ❌ Evitar - rutas relativas
import { Button } from "../../../components/ui/Button";
```

**Beneficios:**

- ✅ Mejora legibilidad
- ✅ Facilita refactoring
- ✅ Evita errores con rutas relativas
- ✅ Configurado en [tsconfig.json](tsconfig.json)

### Formateo y Linting

**Pre-commit hooks (Husky)**

Ejecuta automáticamente:

- ESLint (linting)
- commitlint (validación de commits)

```bash
# Si necesitas forzar un commit (usar con cuidado)
git commit --no-verify -m "..."
```

**Ejecutar manualmente:**

```bash
npm run lint      # Verificar código
npm run format    # Formatear automáticamente
npm run typecheck # Verificar tipos
```

## 🔐 Autenticación y Autorización

### Flujo de Autenticación

```
┌─────────────────────────────────────────────────────────────────┐
│                    FLUJO DE AUTENTICACIÓN                        │
├─────────────────────────────────────────────────────────────────┤
│ 1. Usuario ingresa credenciales en formulario de login          │
│ 2. POST /auth/login → Backend valida y retorna JWT token        │
│ 3. useAuthStore persiste token en localStorage                  │
│ 4. axios interceptor incluye token automáticamente en headers   │
│ 5. useAuthSync sincroniza estado entre pestañas                 │
│ 6. ProtectedRoute valida token antes de acceder a ruta          │
└─────────────────────────────────────────────────────────────────┘
```

**Implementación:**

- Autenticación basada en **JWT tokens**
- Token almacenado en **localStorage** (vía Zustand)
- **Sincronización automática** entre pestañas del navegador
- **Refresh automático** de token expirado (si está disponible endpoint)

### Roles y Sistema de Permisos

El sistema soporta tres roles principales con permisos específicos:

#### 👨‍💼 Administrador

- Acceso completo a todas las funcionalidades
- Gestión de usuarios (crear, editar, eliminar)
- Gestión de cursos y horarios
- Acceso a reportes avanzados
- Configuración del sistema

#### 👨‍🏫 Profesor

- Gestión de cursos asignados
- Registro de asistencias
- Calificación de estudiantes
- Visualización de estudiantes inscritos
- Reportes de su desempeño

#### 👨‍🎓 Estudiante

- Visualización de cursos inscritos
- Consulta de horarios
- Visualización de calificaciones
- Consulta de asistencias
- Gestión de pagos

**Definición de permisos:** [src/services/permissions.ts](src/services/permissions.ts)

**Validación en rutas:**

```typescript
<ProtectedRoute requiredRole="ADMIN">
  <AdminPage />
</ProtectedRoute>
```

## 🎨 Componentes y Estilos

### Componentes UI (shadcn/ui-inspired)

Ubicados en [src/components/ui/](src/components/ui/), los componentes siguen patrones modernos:

- ✅ Composables con props bien tipados
- ✅ Uso de `class-variance-authority` para variantes
- ✅ Merge de classNames con utilidad `cn()`
- ✅ Accesibilidad incluida (ARIA)
- ✅ Soporte para temas claro/oscuro

**Ejemplo de componente:**

```typescript
// Button.tsx
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "default" | "outline" | "ghost";
  size?: "sm" | "md" | "lg";
}

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = "default", size = "md", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(buttonVariants({ variant, size }), className)}
      {...props}
    />
  )
);
```

### Tailwind CSS y Temas

- ✅ Variables de color HSL en CSS (--primary, --destructive, etc.)
- ✅ Extensiones de Tailwind en [tailwind.config.js](tailwind.config.js)
- ✅ Dark mode activado: `darkMode: ["class"]`
- ✅ Toggle de tema añadiendo/removiendo clase `dark` en root

**Activar tema oscuro:**

```typescript
document.documentElement.classList.add("dark");
```

### Animaciones

- **Framer Motion** para animaciones complejas
- **Tailwind Animate** para transiciones simples
- **CSS transitions** para cambios de estado

## 📄 Generación de Reportes

### Reportes PDF

Utilizar el servicio [src/services/pdf.ts](src/services/pdf.ts) para generar documentos PDF con datos académicos.

**Ejemplo de uso:**

```typescript
import { generateAcademicReport } from "@/services/pdf";

const pdf = await generateAcademicReport(studentData, {
  period: "2025-01",
  includeGrades: true,
  includeAttendance: true,
});

// Descargar PDF
const link = document.createElement("a");
link.href = pdf;
link.download = "reporte-academico.pdf";
link.click();
```

**Casos de uso:**

- 📋 Reportes de calificaciones
- 📊 Reportes de asistencias
- 💰 Recibos de pago
- 📌 Certificados

### Exportación CSV

Utilizar [src/services/csv.ts](src/services/csv.ts) para exportar datos en formato CSV.

**Ejemplo de uso:**

```typescript
import { exportToCSV } from "@/services/csv";

const csvData = exportToCSV(studentsList, {
  filename: "estudiantes.csv",
  columns: ["name", "email", "enrollment_date", "status"],
});
```

**Casos de uso:**

- 👥 Listas de estudiantes
- 📚 Inventario de cursos
- 💳 Registros de pagos
- 📈 Datos de desempeño

## 📚 Guía para Nuevos Desarrolladores

### Agregar un Endpoint API

1. **Crear/actualizar servicio** en `src/features/{modulo}/services/api.ts`:

```typescript
import { client } from "@/api/client";

export const fetchUsers = () => client.get("/users");
export const createUser = (data: UserInput) => client.post("/users", data);
export const updateUser = (id: string, data: UserInput) => client.put(`/users/${id}`, data);
export const deleteUser = (id: string) => client.delete(`/users/${id}`);
```

2. **Usar en componente** con TanStack Query:

```typescript
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { fetchUsers, createUser } from "@/features/users/services/api";

export function UsersList() {
  const queryClient = useQueryClient();

  // Query para obtener datos
  const { data, isLoading, error } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 5 * 60 * 1000, // 5 minutos
  });

  // Mutation para crear usuario
  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
    }
  });

  return (
    // JSX
  );
}
```

### Crear una Ruta Protegida

1. **Agregar ruta** en [src/app/router/routesConfig.tsx](src/app/router/routesConfig.tsx):

```typescript
import { ProtectedRoute } from "@/app/router/ProtectedRoute";
import { AdminUsersPage } from "@/pages/admin/users";

export const routes = [
  {
    path: "admin/users",
    element: (
      <ProtectedRoute requiredRole="ADMIN">
        <AdminUsersPage />
      </ProtectedRoute>
    )
  }
];
```

2. **Implementar página:**

```typescript
// pages/admin/users/index.tsx
export function AdminUsersPage() {
  const { user } = useAuthStore();

  return (
    <PageContainer title="Gestión de Usuarios">
      {/* Contenido */}
    </PageContainer>
  );
}
```

### Validar un Formulario

Utilizar **React Hook Form** + **Zod** para validación type-safe:

```typescript
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

// 1. Definir schema Zod
const loginSchema = z.object({
  email: z.string().email('Email inválido'),
  password: z.string().min(6, 'Mínimo 6 caracteres'),
  rememberMe: z.boolean().optional()
});

type LoginInput = z.infer<typeof loginSchema>;

// 2. Usar en componente
export function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm<LoginInput>({
    resolver: zodResolver(loginSchema)
  });

  const onSubmit = (data: LoginInput) => {
    console.log('Form válido:', data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input
        {...register('email')}
        placeholder="Email"
        error={errors.email?.message}
      />
      <Input
        {...register('password')}
        type="password"
        placeholder="Contraseña"
        error={errors.password?.message}
      />
      <Button type="submit">Ingresar</Button>
    </form>
  );
}
```

### Crear un Custom Hook

```typescript
// hooks/useUserData.ts
import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "@/features/users/services/api";

export function useUserData(userId: string) {
  return useQuery({
    queryKey: ["user", userId],
    queryFn: () => fetchUser(userId),
    enabled: !!userId, // Solo ejecutar si userId existe
  });
}

// Uso en componente
function UserProfile({ userId }: { userId: string }) {
  const { data: user, isLoading } = useUserData(userId);

  if (isLoading) return <LoadingScreen />;
  return <div>{user?.name}</div>;
}
```

## 🛠️ Stack Tecnológico

### Frontend Framework

- **React** 18.2 - Librería UI reactiva
- **TypeScript** - Tipado estático para JavaScript
- **Vite** - Build tool ultra-rápido con HMR

### State Management & Data Fetching

- **Zustand** - State management minimalista y performante
- **TanStack Query v5** - Caching y sincronización de datos servidor
- **React Router v6** - Enrutamiento declarativo

### Formularios y Validación

- **React Hook Form** - Librería de formularios performante
- **Zod** - Validación type-safe con esquemas TypeScript

### Styling

- **Tailwind CSS** - Utilidades CSS para estilos rápidos
- **Tailwind Variants** - Extensión de variantes dinámicas
- **Framer Motion** - Animaciones declarativas
- **Lucide React** - Iconos SVG modernos

### HTTP Client

- **Axios** - Cliente HTTP con interceptores

### Charts & Data Visualization

- **Recharts** - Gráficos React composables
- **React Icons** - Librería de iconos alternativa

### UI Components

- **Radix UI** - Primitivos accesibles sin estilos
- **Chakra UI** - Componentes accesibles

### Herramientas de Desarrollo

- **Vitest** - Testing framework rápido (alternativa Mocha)
- **ESLint** - Linting estricto
- **Prettier** - Code formatter automático
- **Husky** - Git hooks pre-commit
- **CommitLint** - Validación de commits convencionales

## ✅ Control de Calidad

### Linting

```bash
npm run lint
```

Configurado con **ESLint en modo strict** - sin tolerancia a warnings. Valida:

- Reglas de ESLint
- Importaciones no utilizadas
- Variables no utilizadas
- Código muerto

### Type Checking

```bash
npm run typecheck
```

Verifica tipos de **TypeScript** sin compilar usando `tsc --noEmit`. Detecta:

- Tipos inválidos
- Propiedades inexistentes
- Argumentos de función incorrectos
- Errores de uso de unions

### Testing

```bash
npm run test
```

Suite de pruebas con **Vitest** y **jsdom**. Considera:

- Ubicación: `__tests__/` o sufijo `.test.ts`
- Tests de componentes con `@testing-library/react`
- Mocking de APIs con `vitest`

### Pre-commit Hooks (Husky)

Ejecuta automáticamente al hacer commit:

```bash
# 1. ESLint - Valida calidad de código
# 2. commitlint - Valida formato de commit (Conventional Commits)
```

Si necesitas omitir (usar con cuidado):

```bash
git commit --no-verify
```

## 🚀 Despliegue

### Build para Producción

```bash
npm run build
```

Genera carpeta `dist/` optimizada con:

- ✅ Code splitting por feature
- ✅ Tree-shaking de código no utilizado
- ✅ Minificación de JS y CSS
- ✅ Compresión de imágenes
- ✅ Source maps (dev-friendly)

### Requisitos de Producción

**Servidor Web:**

- Debe servir `index.html` para **todas las rutas** (SPA fallback)
- Configurar headers de caché para assets con hash

**Variables de Entorno:**

```env
VITE_API_BASE_URL=https://api.produccion.com/api
VITE_APP_NAME=Academy
```

**Nginx config ejemplo:**

```nginx
server {
  listen 80;
  server_name academia.com;

  root /var/www/academy-frontend/dist;

  location / {
    try_files $uri /index.html;
  }

  # Cache assets por 1 año
  location ~* \.(js|css|png|jpg|gif|ico|svg)$ {
    expires 365d;
    add_header Cache-Control "public, immutable";
  }
}
```

### Netlify Deployment

Proyecto incluye configuración de Netlify en [public/netlify.toml](public/netlify.toml):

```toml
[build]
  command = "npm run build"
  publish = "dist"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

Desplegar con:

```bash
npm install -g netlify-cli
netlify deploy --prod
```

## 🤝 Contribución

### Reportar Issues

Para reportar bugs o sugerir mejoras:

1. Abre un **Issue** en el repositorio
2. Proporciona descripción clara del problema
3. Incluye pasos para reproducir (si es un bug)
4. Adjunta screenshots o logs si es relevante

### Estructura de un buen Issue

```markdown
## Descripción

[Descripción clara del problema]

## Pasos para reproducir

1. [Primer paso]
2. [Segundo paso]
3. [Tercer paso]

## Comportamiento esperado

[Qué debería suceder]

## Comportamiento actual

[Qué sucede ahora]

## Información adicional

- Navegador y versión
- SO
- Screenshots/logs
```

### Pull Requests

1. Fork el repositorio
2. Crear rama de feature: `git checkout -b feature/nombre`
3. Hacer commits con mensaje descriptivo (Conventional Commits)
4. Push a tu fork
5. Abrir PR con descripción clara de cambios

**PR debe incluir:**

- ✅ Descripción de cambios
- ✅ Link a issue relacionado
- ✅ Tests (si aplica)
- ✅ Documentación actualizada

## 📖 Referencias Útiles

### Documentación Oficial

- [React 18 Docs](https://react.dev)
- [TypeScript Handbook](https://www.typescriptlang.org/docs)
- [Vite Guide](https://vitejs.dev/guide)
- [Tailwind CSS Docs](https://tailwindcss.com/docs)
- [Zustand Docs](https://zustand-demo.vercel.app)
- [TanStack Query Docs](https://tanstack.com/query/latest)
- [React Router Docs](https://reactrouter.com)
- [Zod Documentation](https://zod.dev)

### Recursos Adicionales

- [Conventional Commits](https://www.conventionalcommits.org)
- [Web Accessibility](https://www.w3.org/WAI)
- [JavaScript Design Patterns](https://www.patterns.dev/posts/javascript-design-patterns)

## 📝 Licencia

Este proyecto es propiedad del Centro Preuniversitario. Todos los derechos reservados.

---

## 📋 Archivos Clave

### Configuración

- [tsconfig.json](tsconfig.json) - Configuración TypeScript
- [vite.config.ts](vite.config.ts) - Configuración Vite
- [tailwind.config.js](tailwind.config.js) - Configuración Tailwind
- [postcss.config.js](postcss.config.js) - Configuración PostCSS
- [commitlint.config.cjs](commitlint.config.cjs) - Validación de commits
- [components.json](components.json) - Configuración de shadcn/ui

### Puntos de Entrada

- [src/app/App.tsx](src/app/App.tsx) - Componente raíz con providers
- [src/app/main.tsx](src/app/main.tsx) - Entry point de ReactDOM
- [src/stores/useAuthStore.ts](src/stores/useAuthStore.ts) - Store global de autenticación
- [src/api/client.ts](src/api/client.ts) - Cliente HTTP centralizado

---

**Última actualización:** Enero 2026  
**Versión del proyecto:** 1.0.0  
**Mantenedor:** Equipo de desarrollo - UNSAAC Ingeniería de Software I
