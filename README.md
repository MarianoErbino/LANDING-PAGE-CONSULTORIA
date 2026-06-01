# SilverRiver Consulting — Landing Page

Landing page de la consultora ficticia **SilverRiver Consulting** (boutique de Workday HCM)
para el trabajo práctico de la materia **Consultoría**.

## Demo en vivo

Activá GitHub Pages en `Settings → Pages → Source: main / root` y se publica en:

```
https://<tu-usuario>.github.io/LANDING-PAGE-CONSULTORIA/
```

## Stack

HTML5 + CSS3 + JavaScript vanilla. Sin frameworks, sin build, sin servidor.
Solo abrís `index.html` y funciona.

- **Tipografía**: Fraunces (serif) + Manrope (sans) + JetBrains Mono (acentos), vía Google Fonts.
- **Animaciones**: IntersectionObserver para scroll reveal, canvas 2D para partículas del hero,
  CSS keyframes para el splash de intro.
- **Responsive**: mobile-first, breakpoints en 640, 860 y 1100 px.

## Estructura

```
LANDING/
├── index.html         Página completa (12 secciones)
├── styles.css         Sistema de diseño + componentes
├── script.js          Splash, nav, scroll reveal, contador, canvas
├── assets/
│   └── favicon.svg
└── README.md
```

## Secciones

1. **Splash de intro** — logo animado con stroke drawing + nombre con fade up.
2. **Hero** — canvas de partículas conectadas, glows, contador animado de KPIs.
3. **Trust strip** — clientes.
4. **Servicios** — 4 disciplinas (Diagnóstico, Configuración, Adopción, KPIs).
5. **Industrias** — grid 3×2 (Energía, Banca, Retail, Tech, Salud, Industria).
6. **Metodología SR** — timeline 4 fases (Discover · Design · Deploy · Drive).
7. **Caso de éxito** — AES Global, AS-IS vs TO-BE, 7 etapas, 4 KPIs.
8. **Insights** — 3 artículos.
9. **Nosotros** — valores Safety First / All Together / Building the Future.
10. **CTA + form** — solicitud de conversación.
11. **Footer** — multi-columna con selector de idioma.
12. **WhatsApp FAB** — botón flotante para chatear directo.

## Trabajo académico

Materia: **Consultoría**
Caso de negocio: implementación de **Workday Recruiting** en AES Global.

> Consultora **ficticia** con fines educativos. Cualquier parecido con firmas reales es coincidencia.
