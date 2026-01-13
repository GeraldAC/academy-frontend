# MANUAL DE USUARIO BÁSICO - PLATAFORMA ACADEMY

## 6.1. REQUISITOS DE INSTALACIÓN Y ACCESO AL SISTEMA

### Requisitos de Hardware

- Procesador: Intel Core i5 o equivalente
- Memoria RAM: Mínimo 4 GB
- Espacio en disco: 500 MB disponibles
- Conexión a internet: Banda ancha de 2 Mbps o superior

### Requisitos de Software

| Componente | Versión Mínima |
|-----------|-----------------|
| Navegador Web | Chrome 90+, Firefox 88+, Safari 14+ |
| Node.js (desarrollo) | 16.0.0 o superior |
| npm (desarrollo) | 7.0.0 o superior |

### Navegadores Soportados

- Google Chrome (versión actual y anterior)
- Mozilla Firefox (versión actual y anterior)
- Apple Safari (versión 14 y superior)
- Microsoft Edge (versión actual)

### Acceso al Sistema

1. Acceder mediante URL: `https://academy.ejemplo.com`
2. Credenciales requeridas:
   - Correo electrónico registrado
   - Contraseña segura (mínimo 8 caracteres)
3. La sesión permanecerá activa por 24 horas
4. Cierre de sesión automático tras 30 minutos de inactividad

---

## 6.2. DESCRIPCIÓN DE MÓDULOS Y PANTALLAS PRINCIPALES

### Arquitectura del Sistema

La plataforma Academy está estructurada en tres roles principales, cada uno con funcionalidades específicas:

#### 1. MÓDULO ADMINISTRADOR

**Panel de Control (Dashboard)**
- Vista general del sistema
- Estadísticas de usuarios, cursos e inscripciones
- Alertas de pagos pendientes
- Calendario académico

**Gestión de Usuarios**
- Crear, editar y eliminar usuarios (Estudiantes, Docentes, Administradores)
- Importación masiva de usuarios (CSV)
- Cambio de contraseñas
- Asignación de roles

**Administración de Cursos**
- Crear nuevos cursos
- Editar información de cursos
- Asignar docentes a cursos
- Gestionar contenido y horarios
- Eliminar cursos inactivos

**Gestión de Horarios**
- Crear y editar horarios de clases
- Asignar aulas
- Gestionar conflictos de programación
- Visualizar calendario de clases

**Inscripciones**
- Ver todas las inscripciones del sistema
- Aprobar o rechazar solicitudes pendientes
- Generar reportes de inscritos por curso

**Gestión Financiera**
- Registrar pagos de estudiantes
- Emitir recibos
- Generar reportes de ingresos
- Visualizar pagos pendientes

**Reportes**
- Reportes de asistencia
- Reportes financieros
- Estadísticas académicas
- Descargar en formatos PDF y CSV

#### 2. MÓDULO DOCENTE

**Panel de Control (Dashboard)**
- Cursos asignados
- Cantidad de estudiantes inscritos
- Próximas clases programadas
- Notificaciones pendientes

**Mis Cursos**
- Vista de cursos asignados
- Acceso a lista de estudiantes
- Gestión de contenido educativo

**Registro de Asistencia**
- Registrar asistencia de estudiantes
- Marcar como presente, ausente o tardío
- Descargar reportes de asistencia
- Justificar inasistencias

**Reportes de Desempeño**
- Visualizar estadísticas de asistencia
- Reporte de estudiantes por estado
- Análisis de asistencia por periodo

**Horarios y Reservas**
- Ver horario de clases asignado
- Reservar aulas adicionales
- Visualizar disponibilidad

**Perfil**
- Editar información personal
- Cambiar contraseña
- Actualizar datos de contacto

#### 3. MÓDULO ESTUDIANTE

**Panel de Control (Dashboard)**
- Cursos inscritos
- Próximas clases
- Estado de pagos
- Historial de asistencia

**Mis Cursos**
- Ver cursos en los que está inscrito
- Acceder a información del curso
- Ver docente asignado
- Horarios de clases

**Inscripciones**
- Solicitar inscripción en nuevos cursos
- Ver estado de solicitudes
- Cancelar inscripciones
- Consultar disponibilidad de cursos

**Mi Asistencia**
- Ver historial de asistencia
- Porcentaje de asistencia por curso
- Reportes personales de desempeño

**Pagos**
- Ver deuda pendiente
- Registrar pagos realizados
- Descargar recibos
- Historial de transacciones

**Reservas**
- Reservar espacios complementarios
- Ver disponibilidad
- Cancelar reservas

**Perfil**
- Editar información personal
- Cambiar contraseña
- Ver datos académicos registrados

---

## 6.3. PASOS PARA USAR EL SISTEMA

### A. INICIO DE SESIÓN

**Paso 1:** Acceda a la URL principal de la plataforma

**Paso 2:** Ingrese sus credenciales:
- Campo "Correo Electrónico": Ingrese su correo registrado
- Campo "Contraseña": Ingrese su contraseña

**Paso 3:** Haga clic en el botón "Iniciar Sesión"

**Paso 4:** Si las credenciales son correctas, será redirigido al dashboard correspondiente a su rol

**Nota:** Si olvidó su contraseña, solicite asistencia al administrador

### B. NAVEGACIÓN GENERAL

**Menú Principal (Barra Lateral)**
- Ubique el menú en el lado izquierdo de la pantalla
- Haga clic en cada opción para acceder a los módulos
- Use el ícono de hamburguesa (☰) para contraer/expandir el menú en dispositivos móviles

**Barra Superior**
- Notificaciones: Campana de notificaciones en la esquina superior derecha
- Perfil: Acceso a opciones de usuario y cierre de sesión
- Búsqueda: Campo de búsqueda rápida disponible (cuando aplique)

### C. TAREAS COMUNES POR ROL

#### Para Administradores

**Crear un Nuevo Usuario:**
1. Vaya a "Gestión de Usuarios"
2. Haga clic en botón "+ Nuevo Usuario"
3. Complete el formulario con:
   - Nombre completo
   - Correo electrónico
   - Rol (Estudiante, Docente, Admin)
   - Contraseña temporal
4. Haga clic en "Guardar"
5. El sistema enviará un correo con credenciales

**Crear un Nuevo Curso:**
1. Vaya a "Cursos"
2. Haga clic en "+ Nuevo Curso"
3. Complete los campos:
   - Nombre del curso
   - Descripción
   - Nivel académico
   - Cupos disponibles
   - Precio (si aplica)
4. Asigne un docente responsable
5. Haga clic en "Guardar"

**Registrar Asistencia Masiva:**
1. Vaya a "Gestión de Usuarios" (si administrador)
2. Seleccione el curso
3. Importe archivo CSV con formato:
   - Columna A: Cédula del estudiante
   - Columna B: Nombre completo
   - Columna C: Presente/Ausente
4. Haga clic en "Importar"

#### Para Docentes

**Registrar Asistencia:**
1. Acceda a "Mis Cursos"
2. Seleccione el curso específico
3. Haga clic en "Registro de Asistencia"
4. Marque cada estudiante como:
   - ✓ Presente
   - ✗ Ausente
   - ⏰ Tardío
5. Agregue observaciones si es necesario
6. Haga clic en "Guardar"

**Visualizar Reportes de Asistencia:**
1. Vaya a "Reportes de Desempeño"
2. Seleccione el curso
3. Elija el período (mensual, trimestral, semestral)
4. Visualice el gráfico y tabla de datos
5. Use "Descargar PDF" o "Descargar CSV" para exportar

#### Para Estudiantes

**Inscribirse en un Curso:**
1. Acceda a "Mis Cursos"
2. Haga clic en "Solicitar Inscripción"
3. Seleccione el curso deseado
4. Confirme los datos
5. Haga clic en "Enviar Solicitud"
6. Espere aprobación del administrador

**Verificar Asistencia:**
1. Vaya a "Mi Asistencia"
2. Visualice el historial completo
3. Filtre por curso o fecha si es necesario
4. Observe el porcentaje de asistencia
5. Descargue reporte si lo requiere

**Registrar Pago:**
1. Acceda a "Pagos"
2. Vea la deuda pendiente total
3. Haga clic en "Registrar Pago"
4. Complete:
   - Monto a pagar
   - Método de pago (Transferencia, Efectivo, Tarjeta)
   - Referencia de transacción
5. Haga clic en "Confirmar Pago"
6. Descargue el recibo generado

---

## 6.4. FLUJOS PRINCIPALES

### Flujo 1: AUTENTICACIÓN Y ACCESO

```
┌─────────────────────┐
│   Acceso al Sistema │
└──────────┬──────────┘
           │
           ▼
┌──────────────────────────┐
│ ¿Tiene credenciales?     │
└──────────┬───────────────┘
     Sí    │    No
           │
      ┌────▼────────────────────────┐
      │  Ingrese correo y contraseña │
      └────┬──────────────────────────┘
           │
           ▼
    ┌──────────────────────┐
    │ Credenciales válidas │
    └──────────┬───────────┘
           Sí   │
               ▼
    ┌──────────────────────┐
    │ Verificar rol del    │
    │ usuario              │
    └──────────┬───────────┘
               │
       ┌───────┼────────┬─────────┐
       │       │        │         │
       ▼       ▼        ▼         ▼
    Admin  Docente  Estudiante  (Error)
       │       │        │
       └───────┼────────┘
               │
               ▼
    ┌──────────────────────┐
    │ Redirigir al        │
    │ Dashboard específico │
    └─────────────────────┘
```

### Flujo 2: GESTIÓN DE INSCRIPCIONES (Estudiante)

```
┌─────────────────┐
│  Inicio Sesión  │
└────────┬────────┘
         │
         ▼
┌──────────────────────────┐
│ Acceder a "Mis Cursos"  │
└────────┬─────────────────┘
         │
         ▼
┌───────────────────────────────┐
│ Visualizar cursos disponibles │
└────────┬──────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Seleccionar curso deseado    │
└────────┬───────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Hacer clic en "Inscribirse" │
└────────┬───────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Confirmar datos             │
│ - Curso                     │
│ - Docente                   │
│ - Horario                   │
│ - Costo (si aplica)        │
└────────┬───────────────────────┘
         │
         ▼
┌────────────────────────────┐
│ Enviar solicitud           │
└────────┬──────────────────┘
         │
         ▼
┌────────────────────────────────────────┐
│ Estado de solicitud: "Pendiente"       │
│ (Aguardando aprobación del admin)      │
└────────┬────────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│ Notificación: Inscripción aprobada  │
│ o rechazada                         │
└────────────────────────────────────────┘
```

### Flujo 3: REGISTRO DE ASISTENCIA (Docente)

```
┌──────────────────┐
│ Inicio Sesión    │
│ como Docente     │
└────────┬─────────┘
         │
         ▼
┌────────────────────────┐
│ Acceder a "Mis Cursos" │
└────────┬───────────────┘
         │
         ▼
┌───────────────────────────────┐
│ Seleccionar curso específico  │
└────────┬──────────────────────┘
         │
         ▼
┌────────────────────────────────────┐
│ Hacer clic en "Registro de         │
│ Asistencia"                        │
└────────┬─────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│ Sistema carga lista de estudiantes  │
│ inscritos en el curso               │
└────────┬───────────────────────────────┘
         │
         ▼
┌──────────────────────────────────────┐
│ Marcar estado de cada estudiante:   │
│ ✓ Presente   ✗ Ausente   ⏰ Tardío  │
└────────┬───────────────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ Agregar observaciones (opcional) │
└────────┬───────────────────────────┘
         │
         ▼
┌────────────────────────────┐
│ Hacer clic en "Guardar"    │
└────────┬──────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Asistencia registrada        │
│ exitosamente                 │
└──────────────────────────────┘
```

### Flujo 4: GENERACIÓN DE REPORTES

```
┌────────────────────────┐
│ Seleccionar módulo     │
│ de reportes            │
└────────┬───────────────┘
         │
         ▼
┌────────────────────────────────┐
│ Elegir tipo de reporte:        │
│ - Asistencia                   │
│ - Financiero                   │
│ - Académico                    │
│ - Inscripciones                │
└────────┬─────────────────────────┘
         │
         ▼
┌──────────────────────────────┐
│ Seleccionar parámetros:      │
│ - Fecha inicio               │
│ - Fecha fin                  │
│ - Curso/Grupo (si aplica)   │
│ - Otros filtros              │
└────────┬─────────────────────┘
         │
         ▼
┌────────────────────────────────┐
│ Hacer clic en "Generar        │
│ Reporte"                       │
└────────┬──────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ Sistema procesa datos y muestra: │
│ - Gráficos                       │
│ - Tablas                         │
│ - Estadísticas                   │
└────────┬──────────────────────────┘
         │
         ▼
┌────────────────────────────────────┐
│ Opciones de exportación:           │
│ ☐ Descargar como PDF              │
│ ☐ Descargar como CSV              │
│ ☐ Imprimir                         │
│ ☐ Compartir                        │
└────────────────────────────────────┘
```

### Flujo 5: GESTIÓN DE PAGOS (Estudiante)

```
┌──────────────────┐
│ Inicio Sesión    │
│ como Estudiante  │
└────────┬─────────┘
         │
         ▼
┌──────────────────────┐
│ Acceder a "Pagos"   │
└────────┬─────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ Sistema muestra:                 │
│ - Deuda total                    │
│ - Desglose por curso             │
│ - Últimos pagos registrados     │
└────────┬──────────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│ Seleccionar "Registrar      │
│ Pago"                       │
└────────┬──────────────────────┘
         │
         ▼
┌──────────────────────────────────┐
│ Completar formulario de pago:    │
│ - Monto a pagar                  │
│ - Método (Transferencia/Efectivo)│
│ - Referencia                     │
│ - Descripción (opcional)         │
└────────┬──────────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│ Validar información         │
└────────┬──────────────────────┘
         │
         ▼
┌─────────────────────────────┐
│ Confirmar pago              │
└────────┬──────────────────────┘
         │
         ▼
┌────────────────────────────────────┐
│ Pago registrado en el sistema      │
│ Recibo disponible para descargar   │
└────────────────────────────────────┘
```

---

## 6.5. CONTACTO PARA SOPORTE

### Canales de Soporte

| Canal | Información | Horario |
|-------|------------|---------|
| **Email** | soporte@academy.edu.pe | Lunes a Viernes: 8:00 - 18:00 |
| **Teléfono** | +51 (84) 123-456 | Lunes a Viernes: 9:00 - 17:00 |
| **WhatsApp** | +51 987 654 321 | Lunes a Viernes: 9:00 - 17:00 |
| **Chat en Vivo** | En la plataforma | Disponible en horario de atención |
| **Formulario Web** | Centro de Ayuda > Contacto | 24/7 (respuesta en 24h) |

### Procedure de Soporte

**Paso 1:** Identifique su tipo de problema:
- Error técnico
- Olvido de contraseña
- Consulta funcional
- Reporte de comportamiento extraño

**Paso 2:** Reúna información relevante:
- Número de ID de usuario
- Descripción detallada del problema
- Pasos que realizó antes del error (si aplica)
- Captura de pantalla (si es necesario)

**Paso 3:** Contacte al equipo de soporte por el canal de su preferencia

**Paso 4:** Proporcione información clara y espere respuesta del equipo técnico

### Problemas Frecuentes y Soluciones

#### P1: No puedo iniciar sesión

**Solución:**
1. Verifique que el correo electrónico sea correcto
2. Asegúrese de que la contraseña es correcta (mayúsculas/minúsculas importan)
3. Limpie el caché del navegador
4. Intente con otro navegador
5. Si persiste, solicite reinicio de contraseña

#### P2: La plataforma carga lentamente

**Solución:**
1. Verifique su conexión a internet
2. Cierre pestañas innecesarias del navegador
3. Desactile extensiones del navegador
4. Intente en otra red (ej: WiFi diferente)
5. Contacte a soporte si el problema continúa

#### P3: Los datos no se guardan

**Solución:**
1. Verifique conexión a internet activa
2. Busque mensajes de error en pantalla
3. Intente nuevamente la acción
4. Si el error persiste, recargue la página y reintente
5. Contacte a soporte con captura del error

#### P4: ¿Cómo cambio mi contraseña?

**Solución:**
1. Acceda a su perfil (esquina superior derecha)
2. Seleccione "Cambiar Contraseña"
3. Ingrese contraseña actual
4. Ingrese nueva contraseña (mínimo 8 caracteres)
5. Confirme la nueva contraseña
6. Haga clic en "Guardar"

#### P5: ¿Cómo descargo un reporte?

**Solución:**
1. Acceda al módulo de reportes correspondiente
2. Configure los parámetros deseados
3. Haga clic en "Generar Reporte"
4. Busque el botón "Descargar" en la esquina superior derecha
5. Seleccione formato: PDF o CSV
6. El archivo se descargará automáticamente

### Información del Sistema Técnico

- **Plataforma:** Academy - Sistema de Gestión Académica
- **Versión:** 1.0.0
- **Tecnología:** React 18 + TypeScript
- **Navegadores Soportados:** Chrome, Firefox, Safari, Edge
- **Sistema Operativo:** Compatible con Windows, macOS, Linux
- **Responsive:** Adaptado para computadoras, tablets y móviles

### Horario de Mantenimiento

El sistema realiza mantenimiento preventivo:
- **Día:** Domingo
- **Horario:** 22:00 - 23:00 (Hora Local)
- **Duración:** Aproximadamente 1 hora
- **Impacto:** Sistema no disponible durante este periodo

---

## ANEXO: GLOSARIO DE TÉRMINOS

| Término | Definición |
|---------|-----------|
| **Dashboard** | Pantalla principal que muestra información resumida del usuario |
| **Rol** | Categoría de usuario (Administrador, Docente, Estudiante) |
| **Inscripción** | Acto de registrarse en un curso académico |
| **Asistencia** | Registro de presencia/ausencia del estudiante en clases |
| **Reporte** | Documento que sintetiza información específica del sistema |
| **Sesión** | Período durante el cual un usuario permanece conectado |
| **CSV** | Formato de archivo para almacenar datos tabulares |
| **PDF** | Formato de documento digital portátil |
| **Token** | Credencial temporal para mantener sesión activa |

---

**Documento Versión:** 1.0  
**Fecha de Última Actualización:** Enero 2026  
**Autor:** Equipo de Documentación - Academy  
**Confidencialidad:** Público
