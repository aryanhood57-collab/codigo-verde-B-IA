import { useState, useEffect, useRef } from "react";

const WORD = "MONITOREAR";
const COURSE = "Gestión Ambiental — EDA1002";
const PROGRAM = "Técnico Superior en Inteligencia Artificial";
const GROUP = "IA-3-1 | II Cuatrimestre 2026";
const VERSION = "B";

const TEAMS = ["BETA", "DELTA"];

const retos = [
  {
    id: 1,
    block: "🔥 BLOQUE 1 — CALENTAMIENTO",
    blockColor: "#16a34a",
    time: 600,
    title: "La factura invisible",
    context: `Un modelo de lenguaje de IA (tipo GPT) fue entrenado durante 30 días con 10,000 chips GPU de alta potencia. El consumo total de energía fue de 1,287 MWh. Para contextualizar: la ciudad de Colón consume aproximadamente 180 GWh anuales. El entrenamiento generó 284 toneladas de CO₂ equivalente.`,
    analysis: `Tu equipo debe analizar: (1) ¿Cuántos días de consumo eléctrico de la ciudad de Colón equivalen al entrenamiento de este modelo? (2) Si Panamá tiene una intensidad de carbono eléctrico de 0.221 kg CO₂/kWh, ¿es congruente la cifra de 284 tCO₂ o el modelo fue entrenado en otra región? (3) ¿Qué estrategias de IA eficiente (model pruning, transfer learning) podrían reducir esta huella? Elaboren su razonamiento con cálculos aproximados.`,
    question: `¿Cuál de los siguientes conceptos describe correctamente el indicador PUE (Power Usage Effectiveness) en el contexto de la eficiencia ambiental de un centro de datos?`,
    options: [
      "La velocidad de procesamiento de los chips de IA medida en FLOPS por segundo",
      "La proporción entre energía total consumida y energía usada solo por los equipos de cómputo",
      "El porcentaje de energía renovable en el suministro eléctrico total de la instalación",
      "El número de consultas de IA procesadas por cada kilovatio-hora consumido",
    ],
    correct: 1,
    letter: "M",
    explanation: "El PUE (Power Usage Effectiveness) = Energía Total del Data Center / Energía Consumida por los Equipos de TI. Un PUE de 1.0 sería perfecto (toda la energía va a cómputo). Un PUE de 2.0 significa que por cada vatio de cómputo se gastan 2 vatios en total (el extra va a enfriamiento, iluminación, UPS). La industria apunta a PUE ≤ 1.4 como estándar de eficiencia. Este indicador NO mide origen renovable ni velocidad de procesamiento.",
  },
  {
    id: 2,
    block: "🔥 BLOQUE 1 — CALENTAMIENTO",
    blockColor: "#16a34a",
    time: 600,
    title: "Mapa de ODS en tensión",
    context: `Una empresa panameña de logística implementa un sistema de IA para optimizar rutas de entrega y reducir combustible (ODS 13). Sin embargo, el sistema desplaza a 40 conductores (ODS 8: trabajo decente) y los servidores que lo alojan funcionan 24/7 con energía de una termoeléctrica (ODS 7). La empresa publica que "contribuye a tres ODS simultáneamente".`,
    analysis: `Construyan un mapa de tensiones entre los ODS involucrados: (1) ¿La empresa contribuye positivamente a los tres ODS o existe alguna contradicción? (2) ¿Qué ODS adicionales podrían estar involucrados considerando el contexto panameño? (3) ¿Cómo se podría rediseñar el sistema para maximizar el impacto positivo sobre todos los ODS identificados? Argumenten desde la perspectiva de la gestión ambiental sostenible.`,
    question: `Según el marco de los ODS de la ONU, ¿cuál de los siguientes ODS es el que DIRECTAMENTE aborda la reducción de residuos electrónicos (e-waste) generados por la obsolescencia acelerada de equipos de IA?`,
    options: [
      "ODS 9 — Industria, Innovación e Infraestructura",
      "ODS 11 — Ciudades y Comunidades Sostenibles",
      "ODS 12 — Producción y Consumo Responsables",
      "ODS 17 — Alianzas para lograr los Objetivos",
    ],
    correct: 2,
    letter: "O",
    explanation: "El ODS 12 (Producción y Consumo Responsables) aborda directamente el ciclo de vida de los productos, incluyendo la gestión de residuos electrónicos. La meta 12.5 establece específicamente 'reducir considerablemente la generación de desechos mediante actividades de prevención, reducción, reciclado y reutilización'. El e-waste de equipos de IA —servidores, chips, baterías— cae dentro del ámbito de este ODS, no del ODS 9 (que se centra en la infraestructura y la innovación tecnológica como tal).",
  },
  {
    id: 3,
    block: "🔥 BLOQUE 1 — CALENTAMIENTO",
    blockColor: "#16a34a",
    time: 600,
    title: "Huella tridimensional",
    context: `Un sistema de reconocimiento facial implementado en el Aeropuerto Internacional de Tocumen (Panamá) genera tres tipos de huella ambiental: (1) Huella de carbono: 120 tCO₂/año por consumo eléctrico, (2) Huella hídrica: 4,500 m³/año para enfriamiento de servidores, (3) Huella ecológica: minería de coltan en el Congo para fabricar los chips de procesamiento de imagen.`,
    analysis: `Analicen las tres huellas de forma comparativa: (1) ¿Cuál de las tres tiene mayor alcance geográfico y por qué? (2) ¿Cuál es más difícil de mitigar en el contexto panameño? (3) ¿Cómo relacionan estas tres huellas con el concepto de límites planetarios (planetary boundaries)? Apóyense en los contenidos de las primeras semanas del curso.`,
    question: `En el Análisis de Ciclo de Vida (ACV) de un chip de IA, ¿cuál es el impacto ambiental PRIMARIO asociado a la fase de extracción de materias primas (coltan, litio, neodimio)?`,
    options: [
      "Generación de residuos electrónicos al final de la vida del chip",
      "Consumo energético durante la operación continua del chip",
      "Destrucción de ecosistemas, contaminación hídrica y conflictos socioambientales en zonas de extracción",
      "Emisiones de CO₂ durante el transporte marítimo desde los países fabricantes",
    ],
    correct: 2,
    letter: "N",
    explanation: "La extracción de minerales para chips de IA (coltan en RDC, litio en Chile/Bolivia, neodimio en China) genera impactos primarios locales devastadores: deforestación de ecosistemas críticos, contaminación de ríos con mercurio y ácidos de procesamiento, desplazamiento de comunidades indígenas y, en el caso del coltan, financiamiento de conflictos armados. Estos impactos ocurren ANTES de que el chip llegue a la fábrica y son los más difíciles de revertir por su naturaleza físico-geográfica.",
  },
  {
    id: 4,
    block: "⚙️ BLOQUE 2 — NÚCLEO TÉCNICO",
    blockColor: "#1d4ed8",
    time: 480,
    title: "El vacío regulatorio",
    context: `Una empresa de inteligencia artificial con sede en Ciudad de Panamá presta servicios de análisis predictivo a empresas mineras en Chiriquí. Los servidores están físicamente ubicados en Miami (EE.UU.). La empresa no tiene instalaciones físicas en Panamá más allá de una oficina de ventas. Genera 450 tCO₂/año por operaciones de sus servidores en EE.UU. La empresa afirma que no le aplica ninguna regulación ambiental panameña porque sus operaciones son "digitales y transfronterizas".`,
    analysis: `Evalúen el argumento jurídico de la empresa: (1) ¿La Ley 41/1998 puede aplicarse a empresas cuya infraestructura física está fuera de Panamá pero cuyos efectos ambientales (emisiones, decisiones que afectan recursos naturales) ocurren en territorio panameño? (2) ¿Qué principio ambiental internacional fundamenta la jurisdicción ambiental extraterritorial? (3) ¿Existe algún instrumento panameño o internacional que podría aplicar? Construyan un argumento jurídico-ambiental.`,
    question: `¿Qué principio del derecho ambiental internacional sustenta la aplicación de regulaciones ambientales nacionales a empresas cuyos impactos físicos ocurren en el territorio, aunque su infraestructura esté en el exterior?`,
    options: [
      "Principio de soberanía absoluta: cada Estado regula solo lo que está físicamente en su territorio",
      "Principio de quien contamina paga: la empresa paga una tarifa y queda exenta de regulación",
      "Principio de responsabilidad de los efectos: la jurisdicción ambiental sigue al impacto, no a la ubicación del agente",
      "Principio de buena fe: las empresas cumplen voluntariamente las regulaciones del país donde operan",
    ],
    correct: 2,
    letter: "I",
    explanation: "El principio de responsabilidad de los efectos (también conocido como 'effects doctrine' en derecho internacional) establece que un Estado tiene jurisdicción regulatoria sobre actividades que, aunque se originen en el exterior, producen efectos tangibles en su territorio. En el caso ambiental, si las decisiones algorítmicas de la empresa afectan recursos naturales panameños (asesorando minería en Chiriquí), el Estado panameño puede exigir evaluación de impacto ambiental. Este principio es reconocido en la Declaración de Río (1992) y el Acuerdo de Escazú.",
  },
  {
    id: 5,
    block: "⚙️ BLOQUE 2 — NÚCLEO TÉCNICO",
    blockColor: "#1d4ed8",
    time: 480,
    title: "PHVA bajo presión",
    context: `Una empresa de telemedicina panameña con IA certificada ISO 14001 implementa un nuevo módulo de diagnóstico por imagen. Durante la revisión anual del Sistema de Gestión Ambiental (SGA), el comité detecta: (a) El consumo energético del nuevo módulo aumentó un 35% respecto a la línea base establecida, (b) Los objetivos de reducción de CO₂ no se cumplieron en ningún trimestre, (c) El plan de mejora presentado por el equipo técnico para abordar (a) y (b) no fue revisado ni aprobado por la dirección general, (d) No se comunicaron los resultados de la revisión ambiental a las partes interesadas externas.`,
    analysis: `Mapeen cada hallazgo (a), (b), (c) y (d) en la fase correspondiente del ciclo PHVA. Determinen: ¿Cuántas No Conformidades hay? ¿Son menores o mayores según ISO 14001? ¿Cuál es la No Conformidad de mayor gravedad para la continuidad de la certificación? Elaboren un plan de acciones correctivas con responsables y plazos hipotéticos.`,
    question: `En el ciclo PHVA de ISO 14001:2015, ¿a qué cláusula específica corresponde la obligación de que la ALTA DIRECCIÓN revise el desempeño ambiental y tome decisiones para la mejora continua?`,
    options: [
      "Cláusula 6.1 — Acciones para abordar riesgos y oportunidades (fase Planificar)",
      "Cláusula 8.1 — Planificación y control operacional (fase Hacer)",
      "Cláusula 9.1 — Seguimiento, medición, análisis y evaluación (fase Verificar)",
      "Cláusula 9.3 — Revisión por la dirección (fase Actuar)",
    ],
    correct: 3,
    letter: "T",
    explanation: "La cláusula 9.3 de ISO 14001:2015 (Revisión por la dirección) corresponde a la fase ACTUAR del ciclo PHVA. Establece que la alta dirección debe revisar periódicamente el SGA para asegurar su idoneidad, adecuación y eficacia continuas. Esta revisión debe incluir: el grado de cumplimiento de objetivos ambientales, el desempeño ambiental medido, los recursos necesarios, y las oportunidades de mejora. El incumplimiento del punto (c) del caso —plan de mejora no revisado por dirección— es una No Conformidad Mayor directamente vinculada a esta cláusula.",
  },
  {
    id: 6,
    block: "⚙️ BLOQUE 2 — NÚCLEO TÉCNICO",
    blockColor: "#1d4ed8",
    time: 480,
    title: "Aspecto ambiental transfronterizo",
    context: `Una empresa de IA panameña desarrolla un sistema de optimización de rutas para camiones cisternas que transportan combustible desde la refinería en Panamá Oeste hasta distribuidoras en Chiriquí. El sistema reduce el consumo de combustible en un 18% (aspecto positivo), pero su servidor central en Ciudad de Panamá consume 800 kWh/día y descarga agua de enfriamiento (30°C) a una quebrada tributaria del Río Cobre. La quebrada alimenta sistemas de riego de comunidades agrícolas de Arraiján.`,
    analysis: `Construyan la Matriz de Aspectos e Impactos Ambientales para este sistema identificando mínimo 5 aspectos ambientales. Para cada aspecto: (1) Clasifíquenlo como positivo o negativo, (2) Determinen su significancia (alta/media/baja) aplicando los criterios de probabilidad × severidad, (3) Identifiquen la parte interesada afectada. Argüyen cuál aspecto requiere control operacional URGENTE y por qué.`,
    question: `En la evaluación de significancia de aspectos ambientales (ISO 14001), la descarga de agua caliente (30°C) a una quebrada que abastece riego agrícola se clasifica como SIGNIFICATIVA principalmente porque:`,
    options: [
      "La temperatura del agua descargada supera los 25°C según la norma panameña",
      "La probabilidad de ocurrencia es alta Y el impacto afecta un recurso crítico para terceros (comunidades agrícolas)",
      "La empresa no tiene permiso de descarga de MiAMBIENTE, lo que la hace automáticamente significativa",
      "Todo vertimiento de agua al ambiente es significativo por definición en ISO 14001:2015",
    ],
    correct: 1,
    letter: "O",
    explanation: "La significancia en ISO 14001 se evalúa combinando criterios técnicos: probabilidad de ocurrencia + severidad del impacto + sensibilidad del receptor + partes interesadas afectadas + requisitos legales. La descarga de agua caliente a 30°C es significativa porque: ocurre cotidianamente (probabilidad alta), afecta un recurso vital para comunidades (severidad alta sobre receptor sensible — comunidades agrícolas), y existe un conflicto de intereses con terceros. La sola temperatura o la falta de permiso son criterios parciales, no el único determinante.",
  },
  {
    id: 7,
    block: "⚙️ BLOQUE 2 — NÚCLEO TÉCNICO",
    blockColor: "#1d4ed8",
    time: 480,
    title: "Indicadores en juicio",
    context: `El Ministerio de Ambiente (MiAMBIENTE) de Panamá le exige a una empresa de IA que presente su Plan de Gestión Ambiental con indicadores de desempeño verificables. La empresa presenta los siguientes indicadores: IND-1: "Ser una empresa responsable con el ambiente" (cualitativo, sin métrica). IND-2: "Reducir en 25% el consumo de energía por unidad de procesamiento (kWh/TFLOP) en 18 meses respecto a la línea base de enero 2026, verificado por medidor calibrado". IND-3: "Mejorar continuamente el desempeño ambiental cada año" (sin cuantificación). IND-4: "Mantener el 100% de los residuos electrónicos en gestores autorizados por MiAMBIENTE, con manifiestos de disposición archivados". IND-5: "Cero derrames de refrigerantes documentados trimestralmente".`,
    analysis: `Apliquen los criterios SMART y los requisitos de la cláusula 6.2 de ISO 14001 (objetivos ambientales) a cada indicador. Clasifiquen: (a) completamente válidos, (b) válidos con ajustes menores, (c) inválidos y deben reformularse. Para los inválidos, redacten la versión corregida que MiAMBIENTE podría aceptar.`,
    question: `Según los criterios SMART aplicados a indicadores de gestión ambiental y la cláusula 6.2 de ISO 14001:2015, ¿cuántos de los cinco indicadores presentados a MiAMBIENTE son técnicamente válidos sin necesitar modificación?`,
    options: [
      "Cinco — todos los indicadores cumplen con los requisitos mínimos de ISO 14001",
      "Tres — IND-2, IND-4 e IND-5 son válidos sin modificación",
      "Dos — únicamente IND-2 e IND-4 cumplen todos los criterios SMART requeridos",
      "Uno — solo IND-2 cumple todos los criterios SMART y los requisitos de la cláusula 6.2",
    ],
    correct: 2,
    letter: "R",
    explanation: "IND-2 y IND-4 son los únicos completamente válidos. IND-2 cumple todos los criterios SMART: Específico (kWh/TFLOP), Medible (medidor calibrado), Alcanzable (25%), Relevante (eficiencia energética), Temporal (18 meses, línea base definida). IND-4: Específico (100% a gestores autorizados), Medible (manifiestos), Alcanzable, Relevante, Temporal (implícito en 'archivados'). IND-5 falla porque 'cero derrames' es una meta, no un indicador de desempeño medible; debería ser '# de derrames documentados trimestralmente'. IND-1 e IND-3 son declaraciones de intención sin ningún criterio SMART.",
  },
  {
    id: 8,
    block: "🚀 BLOQUE 3 — SPRINT FINAL",
    blockColor: "#7c3aed",
    time: 300,
    title: "Decisión ética bajo presión",
    context: `Una empresa tecnológica panameña desarrolla un sistema de IA para predecir inundaciones en comunidades ribereñas de la Comarca Ngäbe-Buglé usando datos satelitales. El entrenamiento del modelo requiere 180 días de computación intensa (450 tCO₂). El modelo tendría una precisión del 87% y podría salvar aproximadamente 200 vidas al año. La empresa solicita a MiAMBIENTE una exención del EIA argumentando que el beneficio social supera ampliamente el impacto ambiental del entrenamiento.`,
    analysis: `Evalúen el argumento de compensación beneficio/impacto: (1) ¿Es jurídicamente válido solicitar exención de EIA por razones de beneficio social bajo la Ley 41/1998? (2) ¿Existe algún mecanismo legal panameño que permita este tipo de compensación? (3) ¿Qué condiciones o instrumentos alternativos al EIA convencional podrían aplicarse para agilizar el proyecto sin renunciar a la evaluación ambiental? Construyan una propuesta técnica-jurídica.`,
    question: `Ante la solicitud de exención del EIA argumentando beneficio social, ¿cuál es la posición técnicamente correcta según el marco jurídico ambiental panameño?`,
    options: [
      "La exención es válida porque el principio de precaución cede ante el beneficio humanitario documentado",
      "La Ley 41/1998 no contempla exenciones por beneficio social; el EIA es obligatorio pero puede agilizarse con una Evaluación Ambiental Estratégica de alcance reducido",
      "Si el 87% de precisión supera el umbral técnico de la resolución AG-0228, la exención se otorga automáticamente",
      "El beneficio de salvar 200 vidas anula cualquier obligación de evaluación ambiental según el principio de proporcionalidad",
    ],
    correct: 1,
    letter: "E",
    explanation: "La Ley 41/1998 no establece exenciones automáticas por beneficio social cuantificado. Sin embargo, el Decreto Ejecutivo 123/2009 (que reglamenta el EIA) sí contempla mecanismos de categorización que permiten Evaluaciones Ambientales de alcance reducido para proyectos con impactos limitados y claramente identificables. La alternativa técnica sería solicitar una categorización de impacto bajo (Categoría A) basada en la naturaleza digital del impacto, implementando medidas de compensación de carbono certificadas para las 450 tCO₂ del entrenamiento.",
  },
  {
    id: 9,
    block: "🚀 BLOQUE 3 — SPRINT FINAL",
    blockColor: "#7c3aed",
    time: 300,
    title: "Colapso sistémico",
    context: `Escenario 2032: Los 15 centros de datos instalados en Panamá entre 2026 y 2030 consumen el 18% de la generación eléctrica nacional. Durante la temporada seca de 2032, el nivel del Lago Gatún cae a su mínimo histórico, reduciendo la capacidad de generación hidroeléctrica en un 40%. Los data centers activan sus generadores diésel de respaldo (500 tCO₂ diarias adicionales). El Canal de Panamá reduce sus operaciones al 60%. Las comunidades de Arraiján y La Chorrera sufren cortes de electricidad de 8 horas diarias.`,
    analysis: `Apliquen el marco VUCA-BANI para diagnosticar este escenario: (1) ¿Qué elementos lo hacen Volátil, Incierto, Complejo y Ambiguo simultáneamente? (2) ¿Qué instrumentos de gestión ambiental —EIA estratégico, Evaluación Ambiental Estratégica, Planes de Adaptación al Cambio Climático— habrían PREVENIDO este colapso? (3) ¿Qué cláusulas de la Ley 41/1998 y de ISO 14001 se incumplieron sistemáticamente para llegar a este punto? Elaboren un diagnóstico prospectivo estructurado.`,
    question: `En el análisis VUCA-BANI de este escenario de colapso sistémico, ¿cuál de los elementos BANI es el que mejor describe la imposibilidad de predecir el impacto de los data centers sobre el sistema hídrico panameño en el momento de su aprobación inicial?`,
    options: [
      "Frágil (Brittle) — el sistema colapsa ante la primera perturbación sin capacidad de recuperación",
      "Ansioso (Anxious) — la incertidumbre genera paralización en la toma de decisiones institucionales",
      "No-lineal (Non-linear) — pequeños cambios en el nivel del lago producen efectos desproporcionados en todo el sistema",
      "Incomprensible (Incomprehensible) — la causalidad entre data centers y crisis hídrica no es visible hasta que el sistema colapsa",
    ],
    correct: 3,
    letter: "A",
    explanation: "El elemento BANI 'Incomprensible' (Incomprehensible) describe la imposibilidad de comprender las relaciones causales del sistema en tiempo real. Las interdependencias entre consumo hídrico de data centers, ciclos de lluvia, operaciones del Canal y suministro eléctrico residencial son tan complejas que solo se hacen visibles retrospectivamente, después del colapso. Esto justifica precisamente la Evaluación Ambiental Estratégica (EAE) como instrumento preventivo: evalúa impactos acumulativos de políticas completas (no instalación por instalación) antes de que el sistema alcance puntos de no retorno.",
  },
  {
    id: 10,
    block: "🚀 BLOQUE 3 — SPRINT FINAL",
    blockColor: "#7c3aed",
    time: 300,
    title: "Auditoría final: ¿verde de verdad?",
    context: `Una empresa panameña de IA presenta ante MiAMBIENTE su candidatura al Premio Nacional de Gestión Ambiental Empresarial 2026. Su expediente incluye: (1) Certificación ISO 14001:2015 vigente, (2) Informe de huella de carbono auditado: 580 tCO₂/año, (3) Compensación mediante 30,000 árboles plantados en Darién (proyecto propio, sin verificación independiente), (4) Objetivo declarado: "carbono neutro para 2028" sin metodología definida, (5) Consumo del 100% de energía renovable certificada (GOs), pero sus servidores de respaldo funcionan con diésel sin registro en el inventario de GEI.`,
    analysis: `Actúen como auditores de MiAMBIENTE: (1) Identifiquen todas las inconsistencias técnicas y de cumplimiento en el expediente. (2) Determinen si la empresa merece el Premio según los criterios de verificabilidad, transparencia y coherencia ambiental. (3) Redacten las observaciones técnicas que incluirían en el dictamen de auditoría con referencia a las normas aplicables (ISO 14001, ISO 14064, Ley 41/1998). Fundamenten cada observación.`,
    question: `Como auditor de MiAMBIENTE evaluando este expediente, ¿cuál es la No Conformidad MÁS GRAVE que comprometería la validez de la certificación ISO 14001 de esta empresa?`,
    options: [
      "La compensación con árboles en Darién sin verificación independiente certificada",
      "La ausencia de metodología definida para alcanzar el objetivo 'carbono neutro 2028'",
      "La omisión de las emisiones de GEI de los generadores diésel de respaldo en el inventario auditado de huella de carbono",
      "La declaración de 100% energía renovable cuando solo el suministro principal está certificado con GOs",
    ],
    correct: 2,
    letter: "R",
    explanation: "La omisión de las emisiones de los generadores diésel en el inventario de GEI constituye una No Conformidad Mayor bajo ISO 14064-1 (que regula los inventarios de GEI) e ISO 14001:2015 cláusula 9.1 (seguimiento y medición). Un inventario de huella de carbono que excluye sistemáticamente fuentes de emisión conocidas es técnicamente fraudulento. Los auditores ISO llaman a esto 'boundary manipulation' y es causal de retiro de certificación. Las otras opciones son No Conformidades menores o áreas de mejora, pero no invalidan el sistema de gestión completo.",
  },
];

function formatTime(s) {
  const m = Math.floor(s / 60).toString().padStart(2, "0");
  const sec = (s % 60).toString().padStart(2, "0");
  return `${m}:${sec}`;
}

export default function App() {
  const [screen, setScreen] = useState("login");
  const [team, setTeam] = useState("");
  const [current, setCurrent] = useState(0);
  const [selected, setSelected] = useState(null);
  const [openAnswer, setOpenAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [correct, setCorrect] = useState(false);
  const [letters, setLetters] = useState([]);
  const [timer, setTimer] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [showExplain, setShowExplain] = useState(false);
  const [wrongAttempts, setWrongAttempts] = useState(0);
  const [shake, setShake] = useState(false);
  const timerRef = useRef(null);
  const totalRef = useRef(null);

  useEffect(() => {
    if (screen === "game") {
      setTimer(retos[current].time);
      clearInterval(timerRef.current);
      timerRef.current = setInterval(() => {
        setTimer((t) => (t > 0 ? t - 1 : 0));
      }, 1000);
      return () => clearInterval(timerRef.current);
    }
  }, [screen, current]);

  useEffect(() => {
    if (screen === "game") {
      clearInterval(totalRef.current);
      totalRef.current = setInterval(() => {
        setTotalTime((t) => t + 1);
      }, 1000);
      return () => clearInterval(totalRef.current);
    }
  }, [screen]);

  const timerPct = retos[current] ? (timer / retos[current].time) * 100 : 0;
  const timerColor = timerPct > 50 ? "#22c55e" : timerPct > 20 ? "#f59e0b" : "#ef4444";

  function handleSubmit() {
    if (selected === null) return;
    const isCorrect = selected === retos[current].correct;
    setSubmitted(true);
    setCorrect(isCorrect);
    if (isCorrect) {
      setLetters((prev) => [...prev, retos[current].letter]);
      setShowExplain(true);
      clearInterval(timerRef.current);
      setWrongAttempts(0);
    } else {
      setWrongAttempts((n) => n + 1);
      setShake(true);
      setTimeout(() => {
        setShake(false);
        setSubmitted(false);
        setSelected(null);
      }, 1500);
    }
  }

  function handleNext() {
    if (current < retos.length - 1) {
      setCurrent((c) => c + 1);
      setSelected(null);
      setSubmitted(false);
      setCorrect(false);
      setOpenAnswer("");
      setShowExplain(false);
      setWrongAttempts(0);
    } else {
      clearInterval(totalRef.current);
      setScreen("end");
    }
  }

  if (screen === "login") {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f172a 0%, #1e3a5f 50%, #0f2d1f 100%)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "Arial, sans-serif" }}>
        <div style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: "16px", padding: "40px 32px", maxWidth: "420px", width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: "48px", marginBottom: "16px" }}>🤖</div>
          <div style={{ color: "#22c55e", fontSize: "11px", letterSpacing: "4px", fontWeight: "700", marginBottom: "8px", textTransform: "uppercase" }}>Operación</div>
          <div style={{ color: "#ffffff", fontSize: "28px", fontWeight: "900", letterSpacing: "3px", marginBottom: "4px" }}>CÓDIGO VERDE</div>
          <div style={{ color: "#94a3b8", fontSize: "12px", marginBottom: "4px" }}>Versión B · {GROUP}</div>
          <div style={{ color: "#64748b", fontSize: "11px", marginBottom: "28px" }}>{PROGRAM}</div>
          <div style={{ height: "1px", background: "rgba(34,197,94,0.2)", marginBottom: "28px" }} />
          <p style={{ color: "#cbd5e1", fontSize: "13px", marginBottom: "20px" }}>Selecciona tu equipo para comenzar la misión:</p>
          <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "28px" }}>
            {TEAMS.map((t) => (
              <button key={t} onClick={() => setTeam(t)} style={{ background: team === t ? "rgba(34,197,94,0.25)" : "rgba(255,255,255,0.05)", border: team === t ? "2px solid #22c55e" : "1px solid rgba(255,255,255,0.1)", color: team === t ? "#22c55e" : "#94a3b8", padding: "12px", borderRadius: "8px", fontSize: "14px", fontWeight: "700", letterSpacing: "2px", cursor: "pointer", transition: "all 0.2s" }}>
                EQUIPO {t}
              </button>
            ))}
          </div>
          <div style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "10px", padding: "14px", marginBottom: "24px", textAlign: "left" }}>
            <p style={{ color: "#22c55e", fontSize: "11px", fontWeight: "700", marginBottom: "8px", letterSpacing: "1px" }}>⚠️ REGLAS DE LA MISIÓN</p>
            <p style={{ color: "#94a3b8", fontSize: "11px", lineHeight: "1.7", margin: 0 }}>
              • 10 retos · 90 minutos totales<br />
              • Cada reto tiene 2 partes: análisis en equipo + respuesta de opción múltiple<br />
              • <strong style={{ color: "#fbbf24" }}>Si respondes incorrectamente NO podrás avanzar</strong> hasta seleccionar la respuesta correcta<br />
              • Cada respuesta correcta desbloquea una letra de la palabra secreta<br />
              • Al completar los 10 retos: captura de pantalla y publica en el <strong style={{ color: "#22c55e" }}>Canal General de TEAMS</strong>
            </p>
          </div>
          <button onClick={() => { if (team) setScreen("game"); }} disabled={!team} style={{ width: "100%", background: team ? "linear-gradient(135deg, #16a34a, #15803d)" : "#1e293b", border: team ? "none" : "1px solid #334155", color: team ? "#ffffff" : "#475569", padding: "14px", borderRadius: "10px", fontSize: "15px", fontWeight: "700", letterSpacing: "1px", cursor: team ? "pointer" : "not-allowed", transition: "all 0.2s" }}>
            {team ? `⚡ INICIAR MISIÓN — EQUIPO ${team}` : "Selecciona un equipo primero"}
          </button>
        </div>
      </div>
    );
  }

  if (screen === "game") {
    const r = retos[current];
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(180deg, #0f172a 0%, #0f2d1f 100%)", fontFamily: "Arial, sans-serif", padding: "16px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "16px" }}>
          <div>
            <div style={{ color: "#22c55e", fontSize: "10px", fontWeight: "700", letterSpacing: "2px" }}>VERSIÓN B · EQUIPO {team}</div>
            <div style={{ color: "#475569", fontSize: "10px" }}>⏱ Total: {formatTime(totalTime)}</div>
          </div>
          <div style={{ textAlign: "center" }}>
            <div style={{ color: timerColor, fontSize: "28px", fontWeight: "900", fontFamily: "monospace" }}>{formatTime(timer)}</div>
            <div style={{ height: "3px", width: "80px", background: "#1e293b", borderRadius: "2px" }}>
              <div style={{ height: "100%", width: `${timerPct}%`, background: timerColor, borderRadius: "2px", transition: "width 1s linear, background 0.5s" }} />
            </div>
          </div>
          <div style={{ textAlign: "right" }}>
            <div style={{ color: "#64748b", fontSize: "10px" }}>RETO</div>
            <div style={{ color: "#ffffff", fontSize: "20px", fontWeight: "900" }}>{current + 1}/10</div>
          </div>
        </div>

        <div style={{ display: "flex", gap: "4px", justifyContent: "center", marginBottom: "16px" }}>
          {WORD.split("").map((l, i) => (
            <div key={i} style={{ width: "28px", height: "32px", borderRadius: "4px", border: i < letters.length ? "1px solid #22c55e" : "1px solid #1e293b", background: i < letters.length ? "rgba(34,197,94,0.15)" : "#0f172a", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "14px", fontWeight: "900", color: i < letters.length ? "#22c55e" : "#1e293b", transition: "all 0.4s" }}>
              {i < letters.length ? letters[i] : "?"}
            </div>
          ))}
        </div>

        <div style={{ background: r.blockColor + "22", border: `1px solid ${r.blockColor}55`, borderRadius: "8px", padding: "6px 12px", marginBottom: "12px", textAlign: "center" }}>
          <span style={{ color: r.blockColor, fontSize: "11px", fontWeight: "700", letterSpacing: "1px" }}>{r.block}</span>
        </div>

        <div style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: "12px", padding: "20px", marginBottom: "12px" }}>
          <div style={{ color: "#22c55e", fontSize: "10px", fontWeight: "700", letterSpacing: "2px", marginBottom: "6px" }}>RETO {current + 1} — {r.title.toUpperCase()}</div>

          <div style={{ background: "rgba(30,58,95,0.4)", borderLeft: "3px solid #3b82f6", borderRadius: "0 8px 8px 0", padding: "12px", marginBottom: "12px" }}>
            <div style={{ color: "#60a5fa", fontSize: "10px", fontWeight: "700", letterSpacing: "1px", marginBottom: "6px" }}>📋 CONTEXTO DEL CASO</div>
            <p style={{ color: "#cbd5e1", fontSize: "12px", lineHeight: "1.7", margin: 0 }}>{r.context}</p>
          </div>

          <div style={{ background: "rgba(124,58,237,0.15)", borderLeft: "3px solid #7c3aed", borderRadius: "0 8px 8px 0", padding: "12px", marginBottom: "16px" }}>
            <div style={{ color: "#a78bfa", fontSize: "10px", fontWeight: "700", letterSpacing: "1px", marginBottom: "6px" }}>🧠 ANÁLISIS EN EQUIPO (discutan antes de responder)</div>
            <p style={{ color: "#ddd6fe", fontSize: "12px", lineHeight: "1.7", margin: 0 }}>{r.analysis}</p>
          </div>

          <div style={{ color: "#f1f5f9", fontSize: "13px", fontWeight: "600", marginBottom: "14px", lineHeight: "1.5" }}>{r.question}</div>

          <div className={shake ? "shake" : ""} style={{ display: "flex", flexDirection: "column", gap: "8px" }}>
            {r.options.map((opt, i) => {
              let bg = "rgba(255,255,255,0.04)";
              let border = "rgba(255,255,255,0.1)";
              let color = "#94a3b8";
              if (submitted && correct && i === r.correct) { bg = "rgba(34,197,94,0.2)"; border = "#22c55e"; color = "#22c55e"; }
              if (submitted && !correct && i === selected) { bg = "rgba(239,68,68,0.2)"; border = "#ef4444"; color = "#ef4444"; }
              if (!submitted && i === selected) { bg = "rgba(34,197,94,0.1)"; border = "#22c55e55"; color = "#e2e8f0"; }
              return (
                <button key={i} onClick={() => { if (!submitted || (!correct)) setSelected(i); }} disabled={submitted && correct} style={{ background: bg, border: `1px solid ${border}`, color, padding: "12px 14px", borderRadius: "8px", fontSize: "12px", textAlign: "left", cursor: "pointer", lineHeight: "1.5", transition: "all 0.2s" }}>
                  <span style={{ fontWeight: "700", marginRight: "8px" }}>{String.fromCharCode(65 + i)})</span>{opt}
                </button>
              );
            })}
          </div>

          {submitted && !correct && (
            <div style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: "8px", padding: "10px", marginTop: "12px", textAlign: "center" }}>
              <p style={{ color: "#f87171", fontSize: "12px", fontWeight: "700", margin: 0 }}>❌ Respuesta incorrecta — intento {wrongAttempts}. Vuelvan a analizar el caso y seleccionen de nuevo.</p>
            </div>
          )}

          {!submitted && (
            <button onClick={handleSubmit} disabled={selected === null} style={{ width: "100%", marginTop: "14px", background: selected !== null ? "linear-gradient(135deg, #16a34a, #15803d)" : "#1e293b", border: "none", color: selected !== null ? "#fff" : "#475569", padding: "13px", borderRadius: "8px", fontSize: "13px", fontWeight: "700", cursor: selected !== null ? "pointer" : "not-allowed", letterSpacing: "1px" }}>
              CONFIRMAR RESPUESTA
            </button>
          )}

          {showExplain && (
            <div style={{ marginTop: "14px", background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.3)", borderRadius: "10px", padding: "14px" }}>
              <div style={{ color: "#22c55e", fontSize: "11px", fontWeight: "700", letterSpacing: "1px", marginBottom: "8px" }}>✅ ¡CORRECTO! · LETRA DESBLOQUEADA: <span style={{ fontSize: "18px", fontWeight: "900" }}>{r.letter}</span></div>
              <p style={{ color: "#86efac", fontSize: "12px", lineHeight: "1.7", margin: "0 0 12px" }}>{r.explanation}</p>
              <button onClick={handleNext} style={{ width: "100%", background: "linear-gradient(135deg, #7c3aed, #6d28d9)", border: "none", color: "#fff", padding: "12px", borderRadius: "8px", fontSize: "13px", fontWeight: "700", cursor: "pointer", letterSpacing: "1px" }}>
                {current < retos.length - 1 ? `SIGUIENTE RETO →` : "🏁 FINALIZAR MISIÓN"}
              </button>
            </div>
          )}
        </div>

        <style>{`@keyframes shake { 0%,100%{transform:translateX(0)} 20%{transform:translateX(-8px)} 40%{transform:translateX(8px)} 60%{transform:translateX(-6px)} 80%{transform:translateX(6px)} } .shake{animation:shake 0.5s ease-in-out}`}</style>
      </div>
    );
  }

  if (screen === "end") {
    return (
      <div style={{ minHeight: "100vh", background: "linear-gradient(135deg, #0f172a, #0f2d1f)", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", padding: "24px", fontFamily: "Arial, sans-serif" }}>
        <div style={{ background: "rgba(34,197,94,0.06)", border: "1px solid rgba(34,197,94,0.4)", borderRadius: "20px", padding: "40px 32px", maxWidth: "420px", width: "100%", textAlign: "center" }}>
          <div style={{ fontSize: "56px", marginBottom: "16px" }}>🏆</div>
          <div style={{ color: "#22c55e", fontSize: "12px", fontWeight: "700", letterSpacing: "4px", marginBottom: "8px" }}>MISIÓN COMPLETADA</div>
          <div style={{ color: "#ffffff", fontSize: "22px", fontWeight: "900", marginBottom: "4px" }}>EQUIPO {team}</div>
          <div style={{ color: "#64748b", fontSize: "12px", marginBottom: "28px" }}>{GROUP} — Versión B</div>

          <div style={{ marginBottom: "24px" }}>
            <p style={{ color: "#94a3b8", fontSize: "12px", marginBottom: "10px" }}>PALABRA DESCIFRADA:</p>
            <div style={{ display: "flex", gap: "4px", justifyContent: "center", flexWrap: "wrap" }}>
              {WORD.split("").map((l, i) => (
                <div key={i} style={{ width: "36px", height: "42px", background: "rgba(34,197,94,0.2)", border: "2px solid #22c55e", borderRadius: "6px", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "18px", fontWeight: "900", color: "#22c55e" }}>{l}</div>
              ))}
            </div>
          </div>

          <div style={{ background: "rgba(255,255,255,0.04)", borderRadius: "12px", padding: "16px", marginBottom: "24px" }}>
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "8px" }}>
              <span style={{ color: "#64748b", fontSize: "12px" }}>Tiempo total empleado:</span>
              <span style={{ color: "#22c55e", fontWeight: "700", fontSize: "14px" }}>{formatTime(totalTime)}</span>
            </div>
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <span style={{ color: "#64748b", fontSize: "12px" }}>Retos completados:</span>
              <span style={{ color: "#22c55e", fontWeight: "700", fontSize: "14px" }}>10 / 10</span>
            </div>
          </div>

          <div style={{ background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.2)", borderRadius: "10px", padding: "16px", marginBottom: "8px" }}>
            <p style={{ color: "#22c55e", fontSize: "12px", fontWeight: "700", marginBottom: "8px", letterSpacing: "1px" }}>📸 SIGUIENTE PASO</p>
            <p style={{ color: "#94a3b8", fontSize: "12px", lineHeight: "1.7", margin: 0 }}>
              Toma una <strong style={{ color: "#e2e8f0" }}>captura de pantalla</strong> de esta pantalla y publícala en el <strong style={{ color: "#22c55e" }}>Canal General del grupo IA-3-1 en Microsoft TEAMS</strong> indicando el nombre de tu equipo.
            </p>
          </div>
        </div>
      </div>
    );
  }
}
