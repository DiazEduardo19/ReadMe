```markdown
# ReadMe
# FinancIA Banorte

Sistema financiero inteligente con soporte dual para Persona Física (PF) y Persona Moral (PM), diseñado para dispositivos móviles. Ofrece visualización de datos, asistencia conversacional, simulación financiera y componentes interactivos optimizados para experiencia de usuario.

---

Características

### TypeScript Server (`financia/`)
- Consulta de saldos y movimientos bancarios
- Calculadora de préstamos
- Integración con Supabase para almacenamiento
- Asistente financiero con Gemini AI
- Implementación del protocolo MCP

### Python Tools (`herramientas-python/`)
- Simulador de inversiones
- Calculadora universal de préstamos
- Planificación de ahorro personalizada
- Comparativa de opciones financieras
- Módulo de educación financiera

## 📋 Requisitos

### Node.js Server
```json
{
  "dependencies": {
    "@google/generative-ai": "^0.21.0",
    "@modelcontextprotocol/sdk": "^1.20.2",
    "@supabase/supabase-js": "^2.76.1",
    "zod": "^3.25.76"
  }
}
```

### Python Tools
```
seaborn>=0.12.2
matplotlib>=3.7.0
pandas>=2.0.0
numpy>=1.24.0
```

## 🛠️ Instalación

1. **Node.js Server**
```bash
cd financia
npm install
npm run build
```

2. **Python Tools**
```bash
cd herramientas-python
pip install -r requirements.txt
```

## 📚 Uso

### Servidor TypeScript

El servidor ofrece las siguientes herramientas a través de MCP:

1. **Consulta de Saldo**
   - Obtiene el saldo de una cuenta bancaria
   - Muestra balance y disponible

2. **Consulta de Movimientos**
   - Lista transacciones recientes
   - Filtra por período de tiempo

3. **Calculadora de Préstamos**
   - Calcula pagos mensuales
   - Muestra total de intereses y monto final

4. **Asistente Financiero (Gemini AI)**
   - Responde preguntas financieras
   - Provee consejos personalizados

### Herramientas Python

Las herramientas Python incluyen:

1. **Simulador de Inversiones**
   - Proyección de crecimiento
   - Cálculo de rendimientos
   - Análisis de interés compuesto

2. **Calculadora Universal**
   - Análisis de préstamos
   - Cálculo de pagos
   - Evaluación de costos totales

3. **Planificación de Ahorro**
   - Estrategias personalizadas
   - Ajuste por tolerancia al riesgo
   - Metas financieras

4. **Comparativa Financiera**
   - Evaluación de opciones
   - Análisis comparativo
   - Recomendaciones basadas en datos

5. **Educación Financiera**
   - Conceptos básicos
   - Guías sobre CETES
   - Información sobre fondos de inversión

## ⚙️ Configuración

### TypeScript Server
Configure las variables de entorno en el archivo correspondiente:
```typescript
const SUPABASE_URL = 'https://ipolfhnytpvtjdcdflio.supabase.co';
const SUPABASE_ANON_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imlwb2xmaG55dHB2dGpkY2RmbGlvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjEzNTg1NTEsImV4cCI6MjA3NjkzNDU1MX0.B_r3hdC1ngsJ0krlgn4bQiEMs1Lhuvv1XRmRBA7wBwo';
const GEMINI_API_KEY = 'AIzaSyCMZTeFeUDSRUAzzfZrWkZDjEz5H7DBKYk'
```

## 📄 Licencia

ISC

## 👤 Autor

Manuel

## Diseño y Estructura

- Dispositivo objetivo: iPhone 14 Pro Max (430x932px)
- Elementos nativos: barra de status iOS, home indicator, bordes redondeados
- Paleta corporativa Banorte:
  - Rojo primario: `#ED1C24`
  - Amarillo secundario: `#FFC72C`
- Estilo visual: diseño minimalista, amplio whitespace, tipografía sans-serif limpia

---

## Sistema de Autenticación

### Login (`/components/Login.tsx`)
- Email y contraseña
- Botón de inicio de sesión
- Link para registro
- Validación de campos
- Logo FinancIA Banorte

### Registro (`/components/Register.tsx`)
- Nombre, email, contraseña, confirmación
- Selector de perfil (PF / PM)
- Validación completa
- Link para volver al login

### Selector de Perfil (`/components/ProfileSelector.tsx`)
- Elección entre PF y PM
- Contextos separados

---

## Pantallas Principales

### Dashboard PF (`/components/DashboardPF.tsx`)
- Header rojo con saludo personalizado
- KPI Cards: saldo, ingresos, gastos
- Consejo del día (tarjeta amarilla IA)
- Tarjeta “Cifras Clave” (gradiente rojo)
- Gráfica de barras (Recharts)
- Widget Maya con recomendaciones
- Navegación a Control de Gasto

### Dashboard PM (`/components/DashboardPM.tsx`)
- Header rojo con nombre de empresa
- KPI Cards: ingresos, gastos, utilidad
- Consejo del día empresarial
- Tarjeta “Cifras Clave”
- Widget de Alerta Crítica (animado)
- Botón “Tomar Acción”
- Gráfica de tendencia mensual
- Navegación a Reporte Contador

### Control de Gasto Detallado (`/components/ControlGasto.tsx`)
- Lista por categoría
- Slider emocional interactivo (0–10)
- Emojis dinámicos y feedback visual
- Total de gastos destacado

### Reporte Contador (`/components/ReporteContador.tsx`)
- Selector de período
- Modal animado de procesamiento
- Botón “Descargar PDF”
- KPIs: ingresos, egresos, EBITDA, ROI
- Tabla resumen

### Priorización de Gastos (`/components/PriorizacionGastos.tsx`)
- Drag & Drop con react-dnd
- Zonas de prioridad: 🔴 Alta, 🟡 Media, ⚪ Baja
- Sistema de bloqueos con candado
- Botón “Guardar Prioridades”

### Chat Asistente - Maya (`/components/ChatAsistente.tsx`)
- Avatar Maya + timestamps
- Gráficos integrados: Pie Chart, Line Chart
- Input con auto-resize
- Sugerencias rápidas (chips)
- Respuestas contextuales PF/PM

---

## ⚙ Pantallas Adicionales

### Cifras Clave (`/components/CifrasClave.tsx`)
- Límites y metas: gastos, ahorro, deuda
- Inputs numéricos + barras de progreso
- Consejería Maya
- Botón guardar cambios

### Perfil de Usuario (`/components/Profile.tsx`)
- Nombre, email, tipo de perfil
- Cambio PF ↔ PM
- Navegación a Cifras Clave
- Cierre de sesión

---

## Navegación

### Barra Inferior (`/components/BottomNav.tsx`)
- 5 pestañas:  Dashboard,  Análisis,  Priorización,  Chat,  Perfil
- Iconos Lucide React
- Indicador activo
- Fija y visible en todo momento

---

## Funcionalidades Compartidas

### Simulación Financiera
- Calculadora universal: intereses, monto del préstamo, plazo y pago inicial
- Proyección de gastos principales (TOP 5), análisis de tendencias y opción para agregar nuevas categorías
- Control de flujo de efectivo: reflejado en el monto disponible para gastar
- Visualización por períodos y generación de metas de destino

### Experiencias Inteligentes y Educación Financiera
- Recomendaciones inteligentes: alertas sobre pagos próximos, riesgos detectados y oportunidades de ahorro
- Mensajes proactivos personalizados: buenas prácticas financieras basadas en el historial del usuario

---

## Funcionalidades Específicas para Persona Moral

### Gestión Fiscal Avanzada
- Administración de CFDIs por clave, seguimiento de gastos y control fiscal
- Consolidación de información fiscal, incluyendo reportes en video si aplica

### El Factor WOW: Reporte Profesional
- Generación automática de un reporte mensual en PDF de alta fidelidad
- Consolidado único que elimina la necesidad de múltiples documentos
- Disponible para descarga desde la plataforma o mediante solicitud directa del PDF MCP

---

## Funcionalidades Específicas para Persona Física

### Herramientas de Ahorro y Crecimiento
- Simuladores de inversión y módulos “What If” personalizados
- Proyectos de optimización de capital bajo distintos escenarios
- Planificación de ahorro con recomendaciones adaptadas
- Educación financiera básica y herramientas para establecer metas alcanzables
- Recursos para nuevos usuarios

### Control Detallado de Gastos
- Seguimiento de gastos no esenciales, incluyendo gastos hormiga
- Clasificación detallada por categoría para mejorar la toma de decisiones

---

## Características Especiales

- Sistema Dual de Perfiles
  - PF: Finanzas personales
  - PM: Finanzas empresariales
  - KPIs, consejos y métricas diferenciadas
  - Cambio de perfil sin perder sesión

- Inteligencia Artificial - Maya
  - Consejos diarios
  - Recomendaciones en dashboards
  - Análisis predictivo de riesgos (PM)
  - Gráficos generados automáticamente

- Componentes Interactivos
  - Slider emocional
  - Drag & Drop con bloqueos
  - Modales animados
  - Barras de progreso
  - Gráficos con Recharts
  - Formularios con validación

---

## Librerías y Tecnologías

- React + TypeScript
- Tailwind CSS v4.0
- Recharts
- react-dnd
- Lucide React
- Shadcn/ui
- Motion (si se usa)

---

## Sistema de Diseño

- Paleta Banorte:
  - Rojo `#ED1C24`, Amarillo `#FFC72C`, grises para fondos
- Bordes redondeados (`rounded-2xl`, `rounded-3xl`)
- Sombras sutiles (`shadow-sm`, `shadow-lg`)
- Gradientes en elementos destacados
- Espaciado consistente (`px-6`, `mb-6`)
- Tipografía sin tamaños hardcodeados

---

## Archivos de Configuración

- `/styles/globals.css`: estilos globales y tipografía
- `/guidelines/Guidelines.md`: guías de diseño
- Componentes Shadcn UI: 48 componentes base

---

## Resumen Técnico

- Pantallas funcionales: 11
- Flujos principales: Autenticación, PF, PM
- Componentes interactivos únicos:
  - Slider emocional
  - Drag & Drop
  - Modal de procesamiento
  - Chat con gráficos
  - Cifras Clave
  - Sistema de bloqueos
```
