# React + TypeScript + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend updating the configuration to enable type aware lint rules:

- Configure the top-level `parserOptions` property like this:

```js
export default {
  // other rules...
  parserOptions: {
    ecmaVersion: "latest",
    sourceType: "module",
    project: ["./tsconfig.json", "./tsconfig.node.json"],
    tsconfigRootDir: __dirname,
  },
};
```

- Replace `plugin:@typescript-eslint/recommended` to `plugin:@typescript-eslint/recommended-type-checked` or `plugin:@typescript-eslint/strict-type-checked`
- Optionally add `plugin:@typescript-eslint/stylistic-type-checked`
- Install [eslint-plugin-react](https://github.com/jsx-eslint/eslint-plugin-react) and add `plugin:react/recommended` & `plugin:react/jsx-runtime` to the `extends` list

---

## Estilo de Commits Convencionales

Este proyecto sigue el estándar [Conventional Commits](https://www.conventionalcommits.org/) para mantener un historial claro y automatizable.

### [>] Formato

```
<tipo>[opcional alcance]: <descripción breve>
```

### [>] Tipos de Commit

| Tipo       | Descripción                                      | Ejemplo                                                   |
| ---------- | ------------------------------------------------ | --------------------------------------------------------- |
| `feat`     | Nueva funcionalidad                              | `feat: agregar validación de formularios`                 |
| `fix`      | Corrección de errores                            | `fix: corregir error de CORS en producción`               |
| `docs`     | Cambios en documentación                         | `docs: actualizar README con pasos de instalación`        |
| `style`    | Cambios de estilo (formato, espacios, etc.)      | `style: aplicar prettier a componentes de React`          |
| `refactor` | Mejora interna sin cambio funcional              | `refactor: simplificar lógica de autenticación`           |
| `test`     | Agregar o modificar pruebas                      | `test: agregar pruebas unitarias para el endpoint /login` |
| `chore`    | Tareas menores (configuración, dependencias)     | `chore: actualizar dependencias de desarrollo`            |
| `perf`     | Mejoras de rendimiento                           | `perf: optimizar renderizado de lista de productos`       |
| `ci`       | Cambios en configuración de integración continua | `ci: agregar workflow de GitHub Actions`                  |
| `build`    | Cambios que afectan el sistema de build          | `build: configurar bundler para producción`               |
| `revert`   | Revertir un commit anterior                      | `revert: revertir cambio en validación de email`          |

---

### [>] Recomendación

Usa `npx cz` para realizar commits guiados con formato convencional.
