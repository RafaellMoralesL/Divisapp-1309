# DivisApp — conversor de divisas

Aplicación móvil híbrida que convierte un monto en quetzales guatemaltecos (GTQ) a dólares estadounidenses (USD) con una tasa fija de 8 GTQ por dólar. Está construida con Ionic React y se empaqueta para Android con Capacitor.

## Requisitos

| Herramienta | Versión | Se necesita para |
|---|---|---|
| Node.js | 24 LTS (verificado con 24.22.3) | instalar dependencias, ejecutar, compilar y probar |
| npm | 10 o superior (incluido con Node.js) | gestión de dependencias |
| Android Studio | Versión actual con Android SDK 36 | generar la APK |
| JDK | 21 | compilar el proyecto Android |

El proyecto Android usa `minSdkVersion 24` y `targetSdkVersion 36`. Gradle no hace falta instalarlo: el wrapper incluido descarga la versión 8.14.3 en la primera compilación.

Comprobación rápida en la terminal:

```bash
node -v
npm -v
java -version
```

Todo el proyecto está verificado con Node 24 LTS: instalación, compilación, pruebas y lint.

## Instalación

```bash
cd conversor-de-divisas
npm install
```

## Ejecutar en el navegador

```bash
npm run dev
```

Abre `http://localhost:5173`. Es la forma más rápida de probar la conversión; no requiere Android Studio.

## Generar la APK

```bash
npm run build
npx cap sync android
npx cap open android
```

`npx cap open android` abre el proyecto en Android Studio. Desde ahí: **Build → Build Bundle(s) / APK(s) → Build APK(s)**. El archivo queda en `android/app/build/outputs/apk/debug/app-debug.apk`.

El paso `npx cap sync android` es obligatorio después de cada `npm run build`: la carpeta `android/` no incluye los archivos web generados (`assets/`, `config.xml`, `local.properties`, `build/` están en `.gitignore`), y el sync es el que copia el contenido de `dist/` dentro del proyecto Android.

## Scripts

| Comando | Función |
|---|---|
| `npm run dev` | servidor de desarrollo con recarga en caliente |
| `npm run build` | comprueba tipos y genera la versión de producción en `dist/` |
| `npm run preview` | sirve localmente lo generado en `dist/` |
| `npm run lint` | ESLint, revisión de tipos de `e2e/` y Prettier |
| `npm run lint:fix` | corrige automáticamente lo que se pueda |
| `npm run test:unit` | pruebas unitarias con Vitest |
| `npm run test:unit:watch` | pruebas unitarias en modo vigilancia |
| `npm run test:e2e` | pruebas de extremo a extremo con Playwright |
| `npm test` | ejecuta unitarias y luego extremo a extremo |

## Estructura

```
src/pages/Home.tsx   pantalla del conversor y cálculo
src/App.tsx          configuración de rutas
android/             proyecto Android generado por Capacitor
e2e/                 prueba de extremo a extremo (Playwright)
public/              íconos y manifest
```

## Pruebas

- `npm run test:unit` (Vitest): monta el componente `App` y comprueba que se renderiza sin errores. Una prueba.
- `npm run test:e2e` (Playwright): comprueba el título de la pantalla, que no se muestre un resultado antes de calcular, la conversión de 800 quetzales a `$100.00` y el redondeo de 100 quetzales a `$12.50`. Tres pruebas.

La primera vez hay que descargar el navegador que usa Playwright:

```bash
npx playwright install chromium
```

`npm test` ejecuta las dos suites en orden. Ambas pasan con Node 24 LTS.

