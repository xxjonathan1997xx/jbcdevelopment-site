const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const languageButtons = document.querySelectorAll("[data-language-option]");
const siteHeader = document.querySelector("[data-site-header]");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

/* ── Theme Switcher (Dark Studio vs Editorial Light) ── */
const THEME_STORAGE_KEY = "jbcdevelopment-theme";
function initThemeToggle() {
  const savedTheme = localStorage.getItem(THEME_STORAGE_KEY) || "dark";
  applyTheme(savedTheme);

  document.addEventListener("click", (e) => {
    const toggleBtn = e.target.closest("[data-theme-toggle]");
    if (toggleBtn) {
      const currentIsDark = !document.body.classList.contains("theme-editorial");
      applyTheme(currentIsDark ? "light" : "dark");
    }
  });
}

function applyTheme(theme) {
  if (theme === "light") {
    document.body.classList.remove("dark-studio");
    document.body.classList.add("theme-editorial");
  } else {
    document.body.classList.remove("theme-editorial");
    document.body.classList.add("dark-studio");
  }
  localStorage.setItem(THEME_STORAGE_KEY, theme);

  document.querySelectorAll("[data-theme-toggle]").forEach((btn) => {
    btn.setAttribute("aria-pressed", theme === "light" ? "true" : "false");
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initThemeToggle);
} else {
  initThemeToggle();
}


const LANGUAGE_STORAGE_KEY = "jbcdevelopment-language";
const SUPPORTED_LANGUAGES = new Set(["en", "es"]);
const LAB_CONSOLE_PHRASES = {
  en: ["Paw Care Academy", "PainTrail"],
  es: ["Paw Care Academy", "PainTrail"],
};

let currentLanguage = "en";
let labConsoleIndex = 0;
let labConsoleTimer;
const originalTextNodes = [];
const originalAttributeValues = [];

const translations = {
  es: {
    "$4.99 · One-time purchase · macOS 14+": "$4.99 · Compra única · macOS 14+",
    "42 discovered: 33 passed and nine installed-site-only skips by design.": "42 descubiertos: 33 aprobaron y nueve se omitieron por diseno porque requieren un sitio instalado.",
    "A JBC Development product": "Un producto de JBC Development",
    "A background experiment currently blocked and not being presented as a shipping product.": "Un experimento secundario actualmente bloqueado que no se presenta como producto publicado.",
    "A background game prototype retained in the project archive without active release work.": "Un prototipo de juego conservado en el archivo sin trabajo activo de lanzamiento.",
    "A calm workspace for organizing opportunities, resumes, applications, and practical next steps.": "Un espacio de trabajo tranquilo para organizar oportunidades, currículums, solicitudes y pasos prácticos.",
    "A calmer way to run your job search.": "Una forma más tranquila de gestionar tu búsqueda de empleo.",
    "A cohesive 12-icon set for apps and arcade-style games.": "Un set cohesivo de 12 iconos para apps y juegos estilo arcade.",
    "A construction compliance tool for tracking insurance, lien waivers, and payment holds. The MVP is live for pilot outreach.": "Una herramienta de cumplimiento para construccion que controla seguros, renuncias de gravamen y retenciones de pago. El MVP esta activo para pilotos.",
    "A cooperative Godot delivery game. Its core delivery loop and co-op foundation are working; release-quality content and polish remain.": "Un juego cooperativo de entregas en Godot. El ciclo principal y la base cooperativa funcionan; faltan contenido y pulido de calidad de lanzamiento.",
    "A free, local-first macOS dashboard for monitoring Claude Code, Codex, OpenCode, and Cursor sessions.": "Un panel gratuito y local para macOS que supervisa sesiones de Claude Code, Codex, OpenCode y Cursor.",
    "A free, open-source Mac helper for checking and troubleshooting user-installed Windows Steam compatibility setups.": "Una herramienta Mac gratuita y de codigo abierto para comprobar y resolver problemas de configuraciones de compatibilidad de Windows Steam instaladas por el usuario.",
    "A licensed local utility delivered with a software license key and a support path.": "Una utilidad local con licencia, entregada con una clave de licencia de software y una ruta de soporte.",
    "A macOS menu bar command center for Instagram, Threads, TikTok, X, LinkedIn, and YouTube Studio, with badge counts and compose staging.": "Un centro de control en la barra de menú de macOS para Instagram, Threads, TikTok, X, LinkedIn y YouTube Studio, con recuento de notificaciones y preparación de publicaciones.",
    "A mobile-first career manager. Version 1.2 development follows the initial release and subscription review work.": "Un gestor profesional pensado primero para movil. El desarrollo de la version 1.2 sigue al lanzamiento inicial y la revision de suscripciones.",
    "A native Mac and iPhone dictation app. Private on-device transcription works; the polished cloud path remains in development.": "Una app nativa de dictado para Mac y iPhone. La transcripcion privada en el dispositivo funciona; la ruta pulida en la nube sigue en desarrollo.",
    "A native iOS downhill mountain-bike racer built around time trials, ghost racing, and local-first play.": "Un juego nativo de ciclismo de montana cuesta abajo para iOS, centrado en contrarreloj, carreras fantasma y juego local.",
    "A native iPhone arcade water racer with five tracks and championship play. Build 18 is awaiting device QA and store metadata.": "Un juego de carreras acuaticas arcade nativo para iPhone con cinco pistas y campeonato. La compilacion 18 espera pruebas en dispositivo y metadatos de la tienda.",
    "A permission-aware ERP workflow and automation-control case study covering approvals, duplicate-safe execution, bounded retries, failure ownership, rollback, and audit history.": "Un caso de estudio de flujo ERP y control de automatizacion con permisos, aprobaciones, ejecucion sin duplicados, reintentos limitados, responsabilidad de fallos, reversion e historial de auditoria.",
    "A pet-care learning app with updates focused on visuals, performance, clarity, and parent trust.": "Una app educativa de cuidado de mascotas con mejoras enfocadas en visuales, rendimiento, claridad y confianza para padres.",
    "A practical guide to planning, signing, shipping, and supporting small software releases.": "Una guia practica para planificar, firmar, publicar y dar soporte a lanzamientos de software pequenos.",
    "A private pain journal and visit-preparation app. Version 0.2.1, build 44, was submitted for App Review on July 28.": "Un diario privado del dolor y app de preparacion de consultas. La version 0.2.1, compilacion 44, se envio a revision el 28 de julio.",
    "A private, account-free pain journal for logging pain, context, and medications, then preparing clearer visit summaries.": "Un diario privado del dolor, sin cuenta, para registrar dolor, contexto y medicamentos, y preparar resumenes mas claros para las consultas.",
    "A qualifying submission requires the participant to install PainTrail, record a first pain entry, and send the fixed eligibility confirmation with meaningful, honest product feedback.": "Un envío válido requiere que el participante instale PainTrail, registre una primera entrada de dolor y envíe la confirmación de elegibilidad con comentarios honestos sobre el producto.",
    "A reusable game-asset workspace kept as background material rather than a current product.": "Un espacio de recursos reutilizables para juegos conservado como material de apoyo, no como producto actual.",
    "A safety-focused couples platform. The routing, access model, backend, and native foundations exist; the product UI is being built.": "Una plataforma para parejas enfocada en la seguridad. El enrutamiento, modelo de acceso, backend y bases nativas existen; se esta construyendo la interfaz.",
    "A short description of the issue or request.": "Una descripcion corta del problema o solicitud.",
    "A short walkthrough: add a vendor, track the paperwork, and watch a non-compliant sub get held before the check goes out.": "Una guía breve: añade un proveedor, sigue el papeleo y observa cómo se retiene a un subcontratista no conforme antes de emitir el cheque.",
    "A small test gives you useful evidence without turning the whole library into a troubleshooting project.": "Una prueba pequena aporta evidencia util sin convertir toda la biblioteca en un proyecto de diagnostico.",
    "A transparent view of released products, work in progress, and experiments that are paused or archived. Statuses were reconciled with the project notes on July 30, 2026.": "Una vista transparente de productos publicados, trabajos en curso y experimentos pausados o archivados. Los estados se conciliaron con las notas de proyecto el 30 de julio de 2026.",
    "AI Workflow Starter Guide": "Guia inicial de flujos con IA",
    "AI Workflows": "Flujos de IA",
    "AI tools": "Herramientas de IA",
    "AI workflow systems": "Sistemas de flujo con IA",
    "AI workflow tools": "Herramientas de flujo con IA",
    "AI workflows": "Flujos con IA",
    "Accessibility settings, including Reduce Motion.": "Ajustes de accesibilidad, incluyendo Reducir movimiento.",
    "Account data export and permanent account deletion.": "Exportación de datos de la cuenta y eliminación permanente de la cuenta.",
    "Active development": "Desarrollo activo",
    "Add your vendors": "Añade tus proveedores",
    "After downloading, compare the file against the SHA-256 checksum above or download the checksum file from the release.": "Despues de descargar, compara el archivo con el checksum SHA-256 de arriba o descarga el archivo de checksum desde la version.",
    "After payment you get an immediate download link and an email copy. Software products may include a license key delivered the same way.": "Despues del pago recibes un enlace de descarga inmediato y una copia por email. Los productos de software pueden incluir una clave de licencia entregada de la misma forma.",
    "All JBC apps and tools.": "Todas las apps y herramientas de JBC.",
    "All rights reserved.": "Todos los derechos reservados.",
    "All your socials. One menu bar.": "Todas tus redes. Una barra de menú.",
    "An early family-game experiment retained for reference, with no active release work.": "Un experimento temprano de juego familiar conservado como referencia, sin trabajo activo de lanzamiento.",
    "Any screenshot or error message that helps explain the issue.": "Cualquier captura o mensaje de error que ayude a explicar el problema.",
    "Anything non-compliant is held automatically. Export the clear list for your bookkeeper and cut checks.": "Cualquier elemento no conforme se retiene automáticamente. Exporta la lista limpia para tu contable y emite los cheques.",
    "App Store": "App Store",
    "App Store app": "App del App Store",
    "App Store apps and Mac tools with support paths on this site.": "Apps del App Store y herramientas Mac con rutas de soporte en este sitio.",
    "App Store apps and signed Mac downloads with direct support links.": "Apps del App Store y descargas Mac firmadas con enlaces directos de soporte.",
    "App Store apps with clear privacy and support paths.": "Apps del App Store con privacidad y soporte claros.",
    "App privacy policies": "Politicas de privacidad de apps",
    "App support": "Soporte de apps",
    "Apple processes subscription payments. NextRole never asks for your Apple Account password.": "Apple procesa los pagos de suscripciones. NextRole nunca te pedirá la contraseña de tu cuenta de Apple.",
    "Application Intelligence": "Inteligencia de aplicaciones",
    "Approval": "Aprobacion",
    "Approval and accepted work": "Aprobacion y trabajo aceptado",
    "Apps": "Apps",
    "Apps and software": "Apps y software",
    "Apps, local tools, and workflow software with clear support paths.": "Apps, herramientas locales y software de flujo de trabajo con rutas claras de soporte.",
    "Archived": "Archivado",
    "Ask a campaign question": "Haz una pregunta sobre la campaña",
    "Asset pack": "Pack de recursos",
    "Audio and transcripts": "Audio y transcripciones",
    "Automatic payment holds": "Retenciones automáticas de pago",
    "Automatic payment holds. Non-compliant subs held from the check run, no manual review.": "Retenciones automáticas de pago. Subcontratistas no conformes retenidos de la tanda de pagos, sin revisión manual.",
    "Automatic updates": "Actualizaciones automáticas",
    "Automation": "Automatizacion",
    "Automation designed to fail safely.": "Automatizacion disenada para fallar de forma segura.",
    "Automation, AI workflows, and support tooling": "Automatizacion, flujos con IA y herramientas de soporte",
    "Available apps and local software": "Apps disponibles y software local",
    "Available downloads": "Descargas disponibles",
    "Available now": "Disponible ahora",
    "Badge counts, aggregated": "Recuentos de notificaciones agregados",
    "Become one of PainTrail’s First 100. Get Premium for life.": "Conviértete en uno de los primeros 100 de PainTrail. Obtén Premium de por vida.",
    "Before sending:": "Antes de enviar:",
    "Blocked": "Bloqueado",
    "Blocked anti-cheat is a compatibility limit, not a bypass target.": "Un anti-trampas bloqueado es un limite de compatibilidad, no un objetivo a evadir.",
    "Blocked-work and draft-invoice attention": "Atencion a trabajo bloqueado y factura borrador",
    "Book a call": "Reservar una llamada",
    "Browse products": "Ver productos",
    "Bug reports and crash reports.": "Informes de errores y fallos.",
    "Bugs, crashes, or visual issues on a specific track or device.": "Errores, fallos o problemas visuales en una pista o dispositivo específico.",
    "Build": "Crear",
    "Build focused resumes": "Crea currículums enfocados",
    "Build pipeline": "Pipeline de construccion",
    "Build the release": "Crear el lanzamiento",
    "Build the smallest useful version": "Construir la version util mas pequena",
    "Built and maintained by JBC Software Development LLC.": "Creado y mantenido por JBC Software Development LLC.",
    "Built for people who post to several platforms a week.": "Creado para quienes publican en varias plataformas a la semana.",
    "Built for real multi-agent work.": "Creado para trabajo real con múltiples agentes.",
    "Built in Florida": "Creado en Florida",
    "Built in Florida. Scoped for maintainable releases.": "Creado en Florida. Alcance claro para lanzamientos mantenibles.",
    "Buy now": "Comprar",
    "Buying is fast and secure. Checkout opens in a small overlay, payment is processed by the store provider, and your files are delivered instantly after purchase.": "Comprar es rapido y seguro. El pago se abre en una ventana pequena, lo procesa el proveedor de la tienda y tus archivos se entregan al instante despues de la compra.",
    "COI expiry alerts": "Alertas de vencimiento de COI",
    "COI expiry alerts. Every certificate tracked to the day, flagged before it lapses.": "Alertas de vencimiento de COI. Cada certificado rastreado al día, marcado antes de que expire.",
    "COI, lien waiver, and payment-hold tracking for small general contractors.": "Seguimiento de seguros, renuncias de gravamen y retenciones de pago para pequenos contratistas generales.",
    "COIs, lien waivers, and expirations, tracked per vendor, per pay app, with automatic reminders.": "COIs, renuncias de derecho de retención y vencimientos, con seguimiento por proveedor y por solicitud de pago, con recordatorios automáticos.",
    "Card payments are handled by the checkout provider. This website never sees or stores your card details, and no account is required to complete a purchase.": "Los pagos con tarjeta los gestiona el proveedor de pago. Este sitio nunca ve ni guarda los datos de tu tarjeta, y no se necesita cuenta para completar una compra.",
    "Changes": "Cambios",
    "Check one game": "Comprueba un juego",
    "Check the Mac, backend, Steam bottle, and graphics components.": "Comprueba el Mac, la capa, la botella de Steam y los componentes graficos.",
    "Checksums available": "Checksums disponibles",
    "Children": "Menores",
    "Clarify the goal, platform, timeline, and budget before anything gets built.": "Aclarar el objetivo, la plataforma, el cronograma y el presupuesto antes de construir nada.",
    "Clarify the user, constraints, and support path before code ships.": "Aclarar el usuario, las restricciones y la ruta de soporte antes de publicar codigo.",
    "Clarify the user, job, data, constraints, and support path before writing code.": "Aclarar el usuario, la tarea, los datos, las restricciones y la ruta de soporte antes de escribir codigo.",
    "Clear limits, before you download.": "Limites claros, antes de descargar.",
    "ClearWaive": "ClearWaive",
    "ClearWaive logo": "Logo de ClearWaive",
    "Communication, email, accounting, payment, banking, dunning, and Sales Invoice records remained zero.": "Los registros de comunicacion, correo, contabilidad, pagos, banca, cobros y facturas de venta permanecieron en cero.",
    "Compatibility varies by game, Mac, backend, graphics stack, and launcher behavior.": "La compatibilidad varia segun el juego, Mac, capa, sistema grafico y comportamiento del lanzador.",
    "Compatibility varies by game, backend, graphics stack, launcher behavior, and anti-cheat support.": "La compatibilidad varia segun el juego, el backend, el motor grafico, el comportamiento del launcher y el soporte anti-trampas.",
    "Compliance-checked payments": "Pagos verificados por cumplimiento",
    "Compose staging": "Preparación de publicaciones",
    "Concurrency": "Concurrencia",
    "Configure your own CrossOver or compatible Wine setup and your own Steam installation.": "Configura tu propia instalacion de CrossOver o Wine compatible y tu propia instalacion de Steam.",
    "Contact": "Contacto",
    "Contact support": "Contactar soporte",
    "Correctness": "Correccion",
    "Create clean resume versions and connect each one to the opportunity it supports.": "Crea versiones limpias de currículum y conecta cada una con la oportunidad a la que apoya.",
    "CrossOver is the preferred maintained backend.": "CrossOver es la capa mantenida preferida.",
    "Current": "Actuales",
    "Current apps and software downloads.": "Apps actuales y descargas de software.",
    "Current projects": "Proyectos actuales",
    "Current software by JBC Development.": "Software actual de JBC Development.",
    "Custom development": "Desarrollo personalizado",
    "Custom software, built and shipped": "Software personalizado, construido y publicado",
    "Custom work": "Trabajo personalizado",
    "DadBuildRepeat": "DadBuildRepeat",
    "DadBuildRepeat is Jonathan's hobby and creator account for motorcycle gear, camera setups, and personal content experiments. It is linked here for context, but JBC Development remains focused on apps and software.": "DadBuildRepeat es la cuenta personal y de hobby de Jonathan para equipo de moto, configuraciones de camara y experimentos de contenido. Se enlaza aqui como contexto, pero JBC Development se mantiene enfocado en apps y software.",
    "DadBuildRepeat stays personal.": "DadBuildRepeat se mantiene personal.",
    "Data retention": "Retencion de datos",
    "Deleting PainTrail removes data stored inside the app from the device. PainTrail does not currently provide an in-app reset, delete-all, or individual-entry deletion control. PDF and JSON files previously shared or exported must be deleted separately from the locations where the user chose to save them.": "Eliminar PainTrail quita del dispositivo los datos guardados dentro de la app. PainTrail no ofrece actualmente controles dentro de la app para restablecer, eliminar todo ni borrar entradas individuales. Los archivos PDF y JSON compartidos o exportados anteriormente deben eliminarse por separado de los lugares donde el usuario eligio guardarlos.",
    "Deployment": "Implementacion",
    "Design": "Disenar",
    "Deterministic keys, per-run locks, quotation row locking, a unique source constraint, and duplicate-race recovery protected repeated execution.": "Las claves deterministas, los bloqueos por ejecucion, el bloqueo de la cotizacion, una restriccion de origen unica y la recuperacion de carreras de duplicados protegieron la ejecucion repetida.",
    "Developer Utility License": "Licencia de utilidad para desarrolladores",
    "Digital art and assets": "Arte y recursos digitales",
    "Digital products from JBC Development.": "Productos digitales de JBC Development.",
    "Direct email support and documented limits, not a handoff into silence.": "Soporte directo por correo y limites documentados, no una entrega al silencio.",
    "Discover": "Descubrir",
    "Discovery, workflow design, Frappe engineering, validation": "Descubrimiento, diseno de flujos, ingenieria Frappe y validacion",
    "Discuss a workflow": "Hablar de un flujo",
    "Disposition": "Estado",
    "Do not include pain-entry contents, screenshots, diagnoses, medications, or other health information.": "No incluyas contenido de las entradas de dolor, capturas de pantalla, diagnósticos, medicamentos u otra información de salud.",
    "Do not send passwords, payment details, private customer records, or other sensitive data by email unless a secure process has been approved first.": "No envies contrasenas, datos de pago, registros privados de clientes u otros datos sensibles por email a menos que primero se apruebe un proceso seguro.",
    "Do not send passwords, payment information, private customer records, medical information, or other sensitive information through the website or email unless it has been specifically requested through a secure, approved process.": "No envies contrasenas, informacion de pago, registros privados de clientes, informacion medica u otra informacion sensible a traves del sitio o email, a menos que se haya solicitado especificamente mediante un proceso seguro y aprobado.",
    "Document limits": "Documentar limites",
    "Download CHECKSUMS.sha256": "Descargar CHECKSUMS.sha256",
    "Download M5SteamBridge": "Descargar M5SteamBridge",
    "Download Mac tools": "Descargar herramientas Mac",
    "Download NextRole and bring your jobs, resumes, applications, and strategy into one calm workspace.": "Descarga NextRole y reúne tus puestos, currículums, solicitudes y estrategia en un espacio de trabajo tranquilo.",
    "Download ThreadVigil": "Descargar ThreadVigil",
    "Download apps, Mac tools, and release verification files from JBC Development.": "Descarga apps, herramientas para Mac y archivos de verificacion de lanzamientos de JBC Development.",
    "Download current App Store products and local Mac app software from JBC Development.": "Descarga productos actuales del App Store y software local para Mac de JBC Development.",
    "Download current apps and free local Mac software.": "Descarga apps actuales y software local gratuito para Mac.",
    "Download on the App Store": "Descargar en el App Store",
    "Download signed DMG": "Descargar DMG firmado",
    "Download the ClearWaive demo": "Descargar la demo de ClearWaive",
    "Download the DMG, open it, and drag M5SteamBridge to Applications.": "Descarga el DMG, abrelo y arrastra M5SteamBridge a Aplicaciones.",
    "Download the signed DMG, verify its checksum, and move the app to Applications.": "Descarga el DMG firmado, verifica su checksum y mueve la app a Aplicaciones.",
    "Downloads": "Descargas",
    "DraftFlow support": "Soporte de DraftFlow",
    "Duplicate prevention was structural.": "La prevencion de duplicados fue estructural.",
    "E-book": "Ebook",
    "E-books and guides": "Ebooks y guias",
    "E-books, templates, digital art and assets, and software tools, delivered instantly through secure checkout. No account is required to buy.": "Ebooks, plantillas, arte y recursos digitales, y herramientas de software, con entrega instantanea mediante pago seguro. No se necesita cuenta para comprar.",
    "ERP workflow engineering case study": "Caso de estudio de ingenieria de flujos ERP",
    "ERPNext 16, Frappe 16, Python, MariaDB, Docker": "ERPNext 16, Frappe 16, Python, MariaDB, Docker",
    "Each person may receive one reward. Duplicate or automated submissions, false confirmations, placeholder feedback, and attempts to manipulate the offer are ineligible.": "Cada persona puede recibir una recompensa. Los envíos duplicados o automatizados, confirmaciones falsas, comentarios de relleno e intentos de manipular la oferta no son elegibles.",
    "Education / Games": "Educacion / Juegos",
    "Email JBC Development": "Enviar email a JBC Development",
    "Email jbcsdevs@gmail.com for support, app, download, setup, privacy, or software questions.": "Escribe a jbcsdevs@gmail.com para preguntas de soporte, apps, descargas, configuracion, privacidad o software.",
    "Email support": "Enviar email a soporte",
    "Engineering case studies": "Casos de estudio de ingenieria",
    "Engineering decisions": "Decisiones de ingenieria",
    "Every Mac build is signed, notarized, and checksum-verified.": "Cada compilacion Mac esta firmada, notarizada y verificada con checksum.",
    "Everything in one focused workspace.": "Todo en un espacio de trabajo enfocado.",
    "Evidence area": "Area de evidencia",
    "Exceptional discounts and project kickoff required human approval. External delivery, accounting, payments, and destructive actions were prohibited.": "Los descuentos excepcionales y el inicio del proyecto requirieron aprobacion humana. La entrega externa, la contabilidad, los pagos y las acciones destructivas estuvieron prohibidos.",
    "Experiments with an honest ending.": "Experimentos con un final honesto.",
    "Explore M5SteamBridge": "Explorar M5SteamBridge",
    "Export or delete your data": "Exporta o elimina tus datos",
    "Facebook": "Facebook",
    "Failure became an owned state.": "El fallo se convirtio en un estado con responsable.",
    "Featured app": "App destacada",
    "Feedback may be positive, neutral, or critical. No App Store rating or review is required, and the content of any rating or review does not affect eligibility.": "Los comentarios pueden ser positivos, neutros o críticos. No se requiere ninguna valoración ni reseña en el App Store, y el contenido de cualquier valoración o reseña no afecta a la elegibilidad.",
    "First-run setup": "Configuracion de primer uso",
    "Five bounded stages, with human approval where pricing or accepted work changes state.": "Cinco etapas limitadas, con aprobacion humana cuando el precio o el trabajo aceptado cambia de estado.",
    "Florida indie app studio": "Estudio indie de apps en Florida",
    "Follow up with Meridian Systems": "Hacer seguimiento con Meridian Systems",
    "For app questions, Mac setup, download checks, privacy, or software support.": "Para preguntas de apps, configuracion para Mac, descargas, privacidad o soporte de software.",
    "For current or future JBC Software Development LLC apps, include the app name and the version number if available. App-specific support links may be added as each product is released.": "Para apps actuales o futuras de JBC Software Development LLC, incluye el nombre de la app y la version si esta disponible. Los enlaces de soporte especificos se agregaran segun se publique cada producto.",
    "For privacy, support, or app-related questions, email": "Para preguntas de privacidad, soporte o relacionadas con apps, escribe a",
    "For privacy, support, or app-related questions, email jbcsdevs@gmail.com.": "Para preguntas de privacidad, soporte o apps, escribe a jbcsdevs@gmail.com.",
    "For purchase questions, download issues, or refund requests, email": "Para preguntas de compra, problemas de descarga o solicitudes de reembolso, escribe a",
    "For support, include your backend, game name, Steam App ID if known, health-check result, selected profile, and the visible error message. Compatibility is game-by-game.": "Para soporte, incluye tu backend, el nombre del juego, el ID de App de Steam si lo conoces, el resultado del chequeo de salud, el perfil seleccionado y el mensaje de error visible. La compatibilidad se evalua juego por juego.",
    "For the fastest review, include:": "Para una revision mas rapida, incluye:",
    "Four clean-install contracts and five lifecycle and permission tests passed on disposable ERPNext 16.27.0 and Frappe 16.26.3 sites.": "Cuatro contratos de instalacion limpia y cinco pruebas de ciclo de vida y permisos aprobaron en sitios desechables con ERPNext 16.27.0 y Frappe 16.26.3.",
    "Free": "Gratis",
    "Free during private beta.": "Gratis durante la beta privada.",
    "Free tier included. Pro is a one-time purchase — no subscription.": "Nivel gratuito incluido. Pro es una compra única, sin suscripción.",
    "Free to download · Optional NextRole Pro subscriptions": "Gratis para descargar · Suscripciones opcionales a NextRole Pro",
    "Free · Local-first · Donations welcome": "Gratis · Local primero · Donaciones bienvenidas",
    "Free, open-source Mac companion": "Companero Mac gratuito y de codigo abierto",
    "From inquiry to draft-invoice attention.": "De la consulta a la atencion de la factura borrador.",
    "From vendor list to a safe check run in three steps.": "De la lista de proveedores a una tanda de pagos segura en tres pasos.",
    "Game Center": "Game Center",
    "Game Icon Asset Pack": "Pack de iconos para juegos",
    "Game Profiles shows local, game-by-game checks and conservative launch guidance.": "Perfiles de juegos muestra comprobaciones locales para cada juego y orientación prudente para iniciarlos.",
    "Gameplay questions — controls, difficulty, medals, and scoring.": "Preguntas sobre el juego: controles, dificultad, medallas y puntuación.",
    "Gameplay, controls, and track questions.": "Preguntas sobre el juego, controles y pistas.",
    "Garage, upgrade, and cosmetic questions.": "Preguntas sobre el garaje, mejoras y cosméticos.",
    "Generate an editable, paste-ready continuation handoff locally when you request it.": "Genera un resumen de continuación editable y listo para pegar localmente cuando lo solicites.",
    "Get PainTrail": "Obtener PainTrail",
    "Get Paw Care Academy": "Obtener Paw Care Academy",
    "Get a local notification when a supported session explicitly starts waiting for input.": "Recibe una notificación local cuando una sesión compatible comience a esperar una entrada.",
    "Get direct help with purchases, downloads, license keys, or refunds.": "Obtén ayuda directa con compras, descargas, claves de licencia o reembolsos.",
    "Get support": "Obtener soporte",
    "Get support for JBC Software Development LLC apps, downloads, and local Mac app software.": "Recibe soporte para apps, descargas y software local para Mac de JBC Software Development LLC.",
    "Globe or Shift-Command-D shortcut conflicts.": "Conflictos con los atajos de Globo o Shift-Command-D.",
    "Gold signed": "Firma gold",
    "Gravline help": "Ayuda de Gravline",
    "Gravline support": "Soporte de Gravline",
    "Growth, $399/mo:": "Growth, $399/mes:",
    "Hand off without rediscovery": "Traspaso sin redescubrimiento",
    "Health & Fitness / Journal": "Salud y bienestar / Diario",
    "Help test the setup flow.": "Ayuda a probar el flujo de configuracion.",
    "Honest boundaries": "Limites honestos",
    "How JBC Software Development LLC handles website inquiries, app support requests, and privacy-sensitive information.": "Como JBC Software Development LLC maneja contacto del sitio, soporte de apps e informacion sensible de privacidad.",
    "How checkout works": "Como funciona el pago",
    "How custom work gets scoped and shipped.": "Como se acota y publica el trabajo personalizado.",
    "How information is used": "Como se usa la informacion",
    "How it works": "Cómo funciona",
    "How to claim": "Cómo reclamar",
    "How we ship": "Como publicamos",
    "If a game fails, capture diagnostics with preview enabled so private account data can be reviewed before sending anything.": "Si un juego falla, captura diagnosticos con la vista previa activada para que los datos privados de la cuenta puedan revisarse antes de enviar algo.",
    "If you contact JBC Software Development LLC by email, you may choose to share your name, email address, app or software details, device details, screenshots, and notes needed to answer your support question.": "Si contactas a JBC Software Development LLC por email, puedes compartir tu nombre, correo, detalles de la app o software, dispositivo, capturas y notas necesarias para responder tu pregunta de soporte.",
    "If your complete submission is among the first 100 valid entries, we reply with a one-time Apple redemption code.": "Si tu envío completo se encuentra entre las primeras 100 entradas válidas, te responderemos con un código de canje único de Apple.",
    "Import your sub list or add them one by one. ClearWaive requests the paperwork for you.": "Importa tu lista de subcontratistas o añádelos uno a uno. ClearWaive solicita el papeleo por ti.",
    "Important limits": "Limites importantes",
    "In App Review": "En revision de App Store",
    "In-app purchases": "Compras integradas",
    "Include your goal, platform, timeline, and budget range for the fastest reply.": "Incluye tu objetivo, plataforma, cronograma y rango de presupuesto para una respuesta mas rapida.",
    "Indie App Release Playbook": "Manual de lanzamiento de apps indie",
    "Information not collected": "Información no recopilada",
    "Information stored on the Mac": "Información almacenada en el Mac",
    "Information stored on the device": "Información almacenada en el dispositivo",
    "Information users provide": "Información proporcionada por los usuarios",
    "Information you choose to send may be used to:": "La informacion que decides enviar puede usarse para:",
    "Information you choose to share": "Informacion que decides compartir",
    "Inquiry and duplicate review": "Consulta y revision de duplicados",
    "Inquiry and support information may be kept as long as needed to respond, maintain records, manage support, or meet normal business needs. You may ask for correction or deletion of information you previously provided.": "La informacion de consultas y soporte puede conservarse durante el tiempo necesario para responder, mantener registros, gestionar el soporte o cumplir necesidades comerciales normales. Puedes solicitar la correccion o eliminacion de la informacion que hayas proporcionado anteriormente.",
    "Instagram": "Instagram",
    "Install PainTrail and record your first pain entry. Your health information stays on your device.": "Instala PainTrail y registra tu primera entrada de dolor. Tu información de salud permanece en tu dispositivo.",
    "Install the app": "Instala la app",
    "Install your own compatibility backend, such as Whisky or CrossOver.": "Instala tu propio backend de compatibilidad, como Whisky o CrossOver.",
    "Install your own compatibility backend, then run the first-run setup checks inside M5SteamBridge.": "Instala tu propio backend de compatibilidad y luego ejecuta las verificaciones de configuracion de primer uso dentro de M5SteamBridge.",
    "Installed validation": "Validacion instalada",
    "Instant delivery": "Entrega instantanea",
    "Inventory and manufacturing modules were outside the Northstar pilot.": "Los modulos de inventario y manufactura quedaron fuera del piloto Northstar.",
    "It does not bypass DRM, anti-cheat, ownership checks, or platform restrictions.": "No evita DRM, sistemas anti-trampas, verificaciones de propiedad ni restricciones de plataforma.",
    "It does not bypass DRM, ownership checks, platform restrictions, or anti-cheat.": "No evita DRM, comprobaciones de propiedad, restricciones de plataforma ni sistemas antitrampas.",
    "JBC Development": "JBC Development",
    "JBC Development designs and ships practical apps, local Mac tools, AI workflow systems, and automation that stay easy to understand, support, and improve after release.": "JBC Development disena y publica apps practicas, herramientas locales para Mac, sistemas de flujo con IA y automatizacion faciles de entender, apoyar y mejorar despues del lanzamiento.",
    "JBC Development designs apps, local Mac tools, AI workflow systems, and automation with visible release discipline.": "JBC Development disena apps, herramientas locales para Mac, sistemas de flujo con IA y automatizacion con disciplina de lanzamiento visible.",
    "JBC Development ships App Store apps and notarized Mac downloads — with support, privacy details, checksums, and scoped custom work when the fit is right.": "JBC Development publica apps del App Store y descargas Mac notarizadas, con soporte, privacidad, checksums y trabajo personalizado acotado cuando encaja.",
    "JBC Development ships focused App Store products with visible privacy details, direct support, and scoped custom work when the fit is right.": "JBC Development publica productos enfocados en el App Store con privacidad visible, soporte directo y trabajo personalizado acotado cuando encaja.",
    "JBC Development takes on scoped custom work: iOS apps, signed Mac utilities, automation, and AI-assisted workflows. One person handling the full stack, from scope to shipped build.": "JBC Development toma trabajo personalizado acotado: apps iOS, utilidades Mac firmadas, automatizacion y flujos asistidos por IA. Una sola persona a cargo de todo, desde el alcance hasta la publicacion.",
    "JBC Development | Software Development And Apps": "JBC Development | Desarrollo de software y apps",
    "JBC Development | iOS Apps & Mac Tools": "JBC Development | Apps iOS y herramientas Mac",
    "JBC Software Development LLC keeps privacy practices simple: collect only what is needed to respond to support questions, avoid unnecessary sensitive data, and keep app-specific privacy details visible for public releases.": "JBC Software Development LLC mantiene practicas de privacidad simples: recopilar solo lo necesario para responder preguntas de soporte, evitar datos sensibles innecesarios y mantener visibles los detalles de privacidad especificos de cada app para lanzamientos publicos.",
    "JBC Software Development LLC may reject fraudulent or incomplete claims and may modify, suspend, or end the offer if fraud, technical failure, legal requirements, or Apple platform limitations prevent fair operation.": "JBC Software Development LLC puede rechazar reclamaciones fraudulentas o incompletas y puede modificar, suspender o finalizar la oferta si el fraude, fallos técnicos, requisitos legales o limitaciones de la plataforma Apple impiden un funcionamiento justo.",
    "JBC Software Development LLC may use ordinary business services such as email, hosting, domain services, analytics, app stores, development tools, or support tools. These providers may process information according to their own terms and privacy policies.": "JBC Software Development LLC puede usar servicios comerciales ordinarios como email, hosting, servicios de dominio, analitica, tiendas de apps, herramientas de desarrollo o herramientas de soporte. Estos proveedores pueden procesar informacion segun sus propios terminos y politicas de privacidad.",
    "JBC apps and software downloads.": "Descargas de apps y software de JBC.",
    "JBC products": "Productos JBC",
    "JBC scopes practical ERP, automation, and internal-tool work around the decision, permissions, exceptions, and support path.": "JBC define trabajo practico de ERP, automatizacion y herramientas internas alrededor de la decision, los permisos, las excepciones y la ruta de soporte.",
    "JBC software work is presented with the setup details, release checks, and support paths needed for practical users.": "El trabajo de software de JBC se presenta con detalles de configuracion, verificaciones de lanzamiento y rutas de soporte para usuarios practicos.",
    "JBC takes on small custom jobs when the scope is clear: iOS apps, signed Mac utilities, automation, and AI-assisted internal tools.": "JBC acepta trabajos personalizados pequenos cuando el alcance es claro: apps iOS, utilidades Mac firmadas, automatizacion y herramientas internas asistidas por IA.",
    "Job-posting links and exports": "Enlaces a ofertas y exportaciones",
    "Keep coding history private": "Mantén privado tu historial de desarrollo",
    "Keep downloads, setup notes, privacy information, and known limits visible.": "Mantener visibles las descargas, notas de configuracion, privacidad y limites conocidos.",
    "Keep every coding agent in view.": "Mantén a la vista cada agente de desarrollo.",
    "Keep the role, salary, location, notes, and posting link together.": "Mantén juntos el puesto, el salario, la ubicación, las notas y el enlace a la oferta.",
    "Keep your next move clear.": "Mantén claro tu próximo paso.",
    "Kid-friendly pet-care learning for iPhone and iPad. Version 1.4 is live; the Godot 2.0 migration is in final device and release validation.": "Aprendizaje de cuidado de mascotas para iPhone y iPad. La version 1.4 esta disponible; la migracion a Godot 2.0 esta en validacion final de dispositivo y lanzamiento.",
    "Kid-friendly pet-care learning on iOS — the clearest place to start with JBC.": "Aprendizaje de cuidado de mascotas para ninos en iOS: el mejor punto de partida con JBC.",
    "Kid-friendly pet-care learning.": "Aprendizaje de cuidado de mascotas para ninos.",
    "Know who needs you": "Sabe quién te necesita",
    "Last updated: August 1, 2026": "Última actualización: 1 de agosto de 2026",
    "Last updated: July 10, 2026": "Ultima actualizacion: 10 de julio de 2026",
    "Last updated: July 15, 2026": "Última actualización: 15 de julio de 2026",
    "Last updated: July 27, 2026": "Última actualización: 27 de julio de 2026",
    "Last updated: July 30, 2026": "Última actualización: 30 de julio de 2026",
    "Last updated: July 31, 2026": "Última actualización: 31 de julio de 2026",
    "Launch Steam, scan installed games, and apply per-game profiles as needed.": "Ejecuta Steam, escanea los juegos instalados y aplica perfiles por juego segun sea necesario.",
    "Licensed local tools and scripts with setup notes and clear limits.": "Herramientas y scripts locales con licencia, con notas de configuracion y limites claros.",
    "Lien waiver tracking": "Seguimiento de renuncias de derecho de retención",
    "Lien waiver tracking, conditional and unconditional, per pay app, with reminders.": "Seguimiento de renuncias de derecho de retención, condicionales e incondicionales, por solicitud de pago, con recordatorios.",
    "Lifecycle": "Ciclo de vida",
    "LinkedIn": "LinkedIn",
    "Live App Store app": "App activa en App Store",
    "Live on App Store": "Disponible en App Store",
    "Local Mac software": "Software local para Mac",
    "Local Mac tools ship as signed, notarized DMGs with published checksums.": "Las herramientas Mac locales se publican como DMG firmados y notarizados con checksums publicados.",
    "Local Mac utilities and launchers": "Utilidades y lanzadores locales para Mac",
    "Local automation scripts with setup notes, usage examples, and clear limits.": "Scripts de automatizacion locales con notas de configuracion, ejemplos de uso y limites claros.",
    "Local by design.": "Local por diseño.",
    "Local handoff: preview an editable continuation brief before copying it.": "Traspaso local: previsualiza un resumen de continuación editable antes de copiarlo.",
    "Local launcher helper for user-installed compatibility backends.": "Ayudante local para capas de compatibilidad instaladas por el usuario.",
    "Local-first": "Local primero",
    "M5SteamBridge": "M5SteamBridge",
    "M5SteamBridge checks setup readiness, scans locally installed games, and turns common launch failures into understandable next steps. You bring your own compatibility backend, Steam account, and owned games.": "M5SteamBridge comprueba la configuracion, analiza juegos instalados localmente y convierte fallos comunes de inicio en proximos pasos claros. Tu proporcionas tu propia capa de compatibilidad, cuenta de Steam y juegos adquiridos.",
    "M5SteamBridge does not include Steam, games, Wine bottles, Whisky, CrossOver, or proprietary runtimes.": "M5SteamBridge no incluye Steam, juegos, botellas Wine, Whisky, CrossOver ni runtimes propietarios.",
    "M5SteamBridge does not include Steam, games, backends, Wine bottles, or proprietary runtimes.": "M5SteamBridge no incluye Steam, juegos, capas, botellas de Wine ni runtimes propietarios.",
    "M5SteamBridge does not replace CrossOver, Wine, or Steam. It makes their setup state and common failures easier to understand.": "M5SteamBridge no reemplaza CrossOver, Wine ni Steam. Facilita entender su configuracion y sus fallos comunes.",
    "M5SteamBridge for local Steam setup help.": "M5SteamBridge para ayuda local de configuracion de Steam.",
    "M5SteamBridge help": "Ayuda de M5SteamBridge",
    "M5SteamBridge is a Steam setup helper for user-installed compatibility backends. It does not include Steam, games, Whisky, CrossOver, Wine bottles, proprietary runtimes, or any anti-cheat, DRM, ownership, platform, or account bypass.": "M5SteamBridge es un ayudante de configuracion de Steam para backends de compatibilidad instalados por el usuario. No incluye Steam, juegos, Whisky, CrossOver, botellas Wine, runtimes propietarios, ni ningun tipo de evasion de anti-trampas, DRM, propiedad, plataforma o cuenta.",
    "M5SteamBridge is a local Mac app distributed from this website. M5SteamBridge keeps setup status, compatibility settings, and diagnostics previews local unless a user chooses to send support information by email.": "M5SteamBridge es una app local para Mac distribuida desde este sitio. M5SteamBridge mantiene el estado de configuracion, los ajustes de compatibilidad y las vistas previas de diagnostico de forma local, a menos que el usuario decida enviar informacion de soporte por email.",
    "M5SteamBridge is a local Mac tool with setup help and checksums for Steam compatibility workflows.": "M5SteamBridge es una herramienta local para Mac con ayuda de configuracion y checksums para flujos de compatibilidad con Steam.",
    "M5SteamBridge is a local helper for users who install their own backend such as Whisky or CrossOver. It provides first-run checks, Steam launch helpers, per-game profiles, compatibility scanning, health checks, and error recovery guidance without bundling Steam or games.": "M5SteamBridge es un ayudante local para usuarios que instalan su propio backend, como Whisky o CrossOver. Ofrece verificaciones de primer uso, ayudantes para iniciar Steam, perfiles por juego, escaneo de compatibilidad, chequeos de salud y guia de recuperacion de errores, sin incluir Steam ni juegos.",
    "M5SteamBridge is not affiliated with or endorsed by Valve Corporation, CodeWeavers, the Wine project, or the Whisky project.": "M5SteamBridge no esta afiliado ni respaldado por Valve Corporation, CodeWeavers, el proyecto Wine ni el proyecto Whisky.",
    "M5SteamBridge opens to its readiness overview and checks the user-installed compatibility backend.": "M5SteamBridge abre su resumen de preparación y comprueba la capa de compatibilidad instalada por el usuario.",
    "M5SteamBridge setup and troubleshooting": "Configuracion y solucion de problemas de M5SteamBridge",
    "M5SteamBridge | Open-Source Windows Steam Setup Help for Mac": "M5SteamBridge | Ayuda de codigo abierto para configurar Windows Steam en Mac",
    "MVP development": "Desarrollo de MVP",
    "Mac App Downloads | JBC Software Development LLC": "Descargas de apps para Mac | JBC Software Development LLC",
    "Mac Automation Script Bundle": "Paquete de scripts de automatizacion para Mac",
    "Mac Tools": "Herramientas Mac",
    "Mac app / Steam helper": "App Mac / ayuda de Steam",
    "Mac build": "Compilacion Mac",
    "Mac builds ship signed, notarized, with published checksums — same as every JBC release.": "Las compilaciones Mac se publican firmadas, notarizadas y con checksums publicados, igual que cada version de JBC.",
    "Mac download": "Descarga Mac",
    "Mac downloads": "Descargas para Mac",
    "Mac downloads are signed and notarized. M5SteamBridge does not include Steam, games, Wine bottles, CrossOver, Whisky, or proprietary runtimes and does not bypass DRM, anti-cheat, ownership checks, or platform restrictions.": "Las descargas Mac estan firmadas y notarizadas. M5SteamBridge no incluye Steam, juegos, botellas Wine, CrossOver, Whisky ni runtimes propietarios, y no evita DRM, sistemas anti-trampas, verificaciones de propiedad ni restricciones de plataforma.",
    "Mac helper": "Ayuda Mac",
    "Mac tools are prepared as signed and notarized downloads.": "Las herramientas Mac se preparan como descargas firmadas y notarizadas.",
    "Map the job, ship the smallest useful build, document the limits, and keep support visible.": "Definir el trabajo, publicar la version util mas pequena, documentar los limites y mantener el soporte visible.",
    "Map the workflow": "Mapear el flujo",
    "Menu bar: see the next session that needs attention without opening the dashboard.": "Barra de menú: mira la siguiente sesión que necesita atención sin abrir el panel.",
    "Microphone, Speech Recognition, and Accessibility permission setup.": "Configuración de permisos de micrófono, reconocimiento de voz y accesibilidad.",
    "Monitor active tools, catch waiting sessions, and create a clean continuation handoff.": "Supervisa herramientas activas, detecta sesiones en espera y crea un resumen de continuación limpio.",
    "Move from Saved to Applied, Response, Interview, and Closed.": "Pasa de Guardado a Enviado, Respuesta, Entrevista y Cerrado.",
    "Need a scoped app, Mac tool, or workflow?": "Necesitas una app, herramienta Mac o flujo de trabajo acotado?",
    "Need an operational workflow translated into software?": "Necesitas convertir un flujo operativo en software?",
    "Need help with an order?": "¿Necesitas ayuda con un pedido?",
    "Need help?": "Necesitas ayuda?",
    "Never cut a check blind again.": "No vuelvas a emitir un cheque a ciegas.",
    "Never lose track of an agent again.": "No vuelvas a perder el rastro de un agente.",
    "New controls installed safely.": "Los controles nuevos se instalaron de forma segura.",
    "NextRole": "NextRole",
    "NextRole help": "Ayuda de NextRole",
    "NextRole reads the information you choose to save and surfaces practical next steps. It does not apply for you, monitor your inbox, or invent employer activity.": "NextRole lee la información que eliges guardar y sugiere pasos prácticos. No postula por ti, ni vigila tu bandeja de entrada, ni inventa actividad de empleadores.",
    "NextRole stores the job-search information you choose to save so your workspace can follow you across devices.": "NextRole guarda la información de búsqueda de empleo que eliges para que tu espacio de trabajo te acompañe en todos tus dispositivos.",
    "NextRole support": "Soporte de NextRole",
    "NextRole | Calm Job Application Tracker": "NextRole | Organizador tranquilo de búsqueda de empleo",
    "No account required": "Sin cuenta requerida",
    "No accounts, ads, or analytics in Paw Care Academy or PainTrail.": "Sin cuentas, anuncios ni analiticas en Paw Care Academy o PainTrail.",
    "No ads": "Sin anuncios",
    "No advertising": "Sin publicidad",
    "No external AI": "Sin IA externa",
    "No scope creep. Ship what solves the stated problem first.": "Sin expansion de alcance. Publicar primero lo que resuelve el problema planteado.",
    "No telemetry": "Sin telemetria",
    "No tracking": "Sin seguimiento",
    "Normalized session history stays on your Mac. Full transcripts are not stored by ThreadVigil.": "El historial de sesiones normalizado permanece en tu Mac. Las transcripciones completas no son almacenadas por ThreadVigil.",
    "Northstar ERPNext Pilot": "Piloto Northstar ERPNext",
    "Northstar ERPNext Pilot — Engineering Case Study | JBC Development": "Piloto Northstar ERPNext — Caso de estudio de ingeniería | JBC Development",
    "Northstar used fabricated data in an isolated ERPNext environment. It was never a customer deployment, production ERP product, manufacturing module, or IFS integration.": "Northstar uso datos fabricados en un entorno ERPNext aislado. Nunca fue una implementacion de cliente, un producto ERP de produccion, un modulo de manufactura ni una integracion con IFS.",
    "Northstar validation evidence and recorded results": "Evidencias de validación de Northstar y resultados registrados",
    "Now shipping": "Publicando ahora",
    "Official offer terms": "Términos oficiales de la oferta",
    "Official terms last updated: July 31, 2026": "Términos oficiales actualizados por última vez: 31 de julio de 2026",
    "On-device recognition, personal dictionary terms, and text insertion.": "Reconocimiento en el dispositivo, diccionario personal e inserción de texto.",
    "One companion for the confusing parts.": "Un companero para las partes confusas.",
    "One glance. Every agent.": "Un vistazo. Cada agente.",
    "Only products that are released or already publicly accessible appear here.": "Aqui solo aparecen productos publicados o que ya son accesibles al publico.",
    "Open GitHub Release": "Abrir version en GitHub",
    "Open feedback templates": "Abrir plantillas de comentarios",
    "Open in App Store": "Abrir en App Store",
    "Open support": "Abrir soporte",
    "Open support page": "Abrir pagina de soporte",
    "Open to people age 18 or older where PainTrail and its Apple in-app purchases are available, except where prohibited.": "Abierto a personas de 18 años o más donde PainTrail y sus compras integradas de Apple estén disponibles, excepto donde esté prohibido.",
    "Operations": "Operaciones",
    "Overview: active providers, waiting work, and estimated daily cost.": "Resumen: proveedores activos, trabajo en espera y coste diario estimado.",
    "Owned opportunity and quotation": "Oportunidad asignada y cotizacion",
    "Page updates and reels": "Actualizaciones de pagina y reels",
    "PainTrail": "PainTrail",
    "PainTrail First 100": "Primeros 100 de PainTrail",
    "PainTrail First 100 Feedback Offer | JBC Development": "Oferta de comentarios Primeros 100 de PainTrail | JBC Development",
    "PainTrail app icon": "Icono de la app PainTrail",
    "PainTrail does not use advertising, analytics, or tracking software; create a user account; or sell or rent user data. Information leaves local app storage only when the user initiates PDF sharing or a manual JSON export.": "PainTrail no usa publicidad, analiticas ni software de seguimiento; no crea una cuenta de usuario; ni vende o alquila datos del usuario. La informacion sale del almacenamiento local de la app solo cuando el usuario inicia el envio de un PDF o una exportacion JSON manual.",
    "PainTrail is a personal record-keeping app designed so that health information stays under the user's control. PainTrail stores pain check-ins, medication records, visit-preparation notes and questions, app settings, and Pro unlock status locally on the device. PainTrail does not operate a server and does not automatically upload this information.": "PainTrail es una app de registro personal disenada para que la informacion de salud permanezca bajo el control del usuario. PainTrail guarda en el dispositivo registros de dolor, registros de medicamentos, notas y preguntas de preparacion para visitas, ajustes de la app y el estado de desbloqueo Pro. PainTrail no opera un servidor ni carga automaticamente esta informacion.",
    "PainTrail is not a medical device and does not provide medical advice, diagnosis, treatment recommendations, medication guidance, or emergency support. Users should consult a qualified healthcare professional about medical decisions.": "PainTrail no es un dispositivo medico y no proporciona consejos medicos, diagnosticos, recomendaciones de tratamiento, orientacion sobre medicamentos ni asistencia de emergencia. Los usuarios deben consultar a un profesional de salud cualificado sobre decisiones medicas.",
    "PainTrail offers an optional one-time Pro purchase processed by Apple through the App Store. JBC Software Development LLC does not receive or store payment information.": "PainTrail ofrece una compra Pro opcional de pago unico procesada por Apple mediante el App Store. JBC Software Development LLC no recibe ni almacena informacion de pago.",
    "PainTrail privacy policy": "Política de privacidad de PainTrail",
    "PainTrail provides a manual JSON backup. The backup contains pain check-ins and medication records only. It does not include visit details, questions, the pain profile, app settings, or Pro purchase state. The user chooses where to save or share the file through the iOS share sheet. PainTrail does not automatically upload backups to iCloud or any other service. Once a file leaves PainTrail, the selected destination handles that copy under its own terms and privacy practices.": "PainTrail ofrece una copia de seguridad JSON manual. La copia contiene solo registros de dolor y medicamentos. No incluye detalles de visitas, preguntas, el perfil de dolor, ajustes de la app ni el estado de compra Pro. El usuario elige donde guardar o compartir el archivo mediante la hoja para compartir de iOS. PainTrail no carga automaticamente copias en iCloud ni en otro servicio. Cuando un archivo sale de PainTrail, el destino seleccionado administra esa copia segun sus propios terminos y practicas de privacidad.",
    "Participants must not be asked to post their feedback publicly. Ratings and reviews are never required or rewarded.": "No se debe pedir a los participantes que publiquen sus comentarios de forma pública. Las valoraciones y reseñas nunca se requieren ni se recompensan.",
    "Paused": "Pausado",
    "Paused and archived": "Pausados y archivados",
    "Paused or archived": "Pausados o archivados",
    "Paw Care Academy": "Paw Care Academy",
    "Paw Care Academy stores local progress on the device, including lessons completed, mini-game scores, practice progress, earned badges, selected pet, and purchase entitlement after a successful Apple purchase or restore. This local data supports offline play and is not uploaded to a JBC server.": "Paw Care Academy guarda el progreso localmente en el dispositivo, incluyendo lecciones completadas, puntajes de minijuegos, progreso de practica, insignias obtenidas, mascota seleccionada y el derecho de compra despues de una compra o restauracion exitosa de Apple. Estos datos locales permiten el juego sin conexion y no se suben a un servidor de JBC.",
    "Paw, M5SteamBridge, custom work": "Paw, M5SteamBridge, trabajo personalizado",
    "Pay with confidence": "Paga con confianza",
    "Payment-hold CSV export": "Exportación CSV de retenciones de pago",
    "Payment-hold report and CSV export for your bookkeeper": "Informe de retenciones de pago y exportación CSV para tu contable",
    "Per-app support pages and direct email for troubleshooting.": "Paginas de soporte por app y email directo para resolver problemas.",
    "Permissions": "Permisos",
    "Personal channel": "Canal personal",
    "Personal creator tests": "Pruebas personales de creador",
    "Personal reels and hobby posts": "Reels personales y publicaciones de hobby",
    "Photo to GLB": "Foto a GLB",
    "Pilot": "Piloto",
    "Pilot scope": "Alcance del piloto",
    "Plan the workflow, build the smallest useful version, document the limits, and improve from real use.": "Planificar el flujo, crear la version util mas pequena, documentar los limites y mejorar con uso real.",
    "Plan, build, and ship products with a structured discover, design, build, ship board.": "Planifica, crea y publica productos con un tablero estructurado de descubrir, disenar, crear y publicar.",
    "Platform": "Plataforma",
    "Post-launch development": "Desarrollo posterior al lanzamiento",
    "Practical PDFs you can read today, written from real release work.": "PDFs practicos que puedes leer hoy, escritos desde trabajo real de lanzamiento.",
    "Practical internal tools and AI-assisted workflows for repetitive research, content, support, and operations tasks.": "Herramientas internas practicas y flujos asistidos por IA para tareas repetitivas de investigacion, contenido, soporte y operaciones.",
    "Practical software,": "Software practico,",
    "Practical software, built in the lab.": "Software practico, creado en el laboratorio.",
    "Pre-release": "Prelanzamiento",
    "Prepare feedback email": "Preparar correo de comentarios",
    "Prepare internal notes after review.": "Preparar notas internas despues de revisar.",
    "Preserved for lessons or possible reuse, but not represented as current releases.": "Conservados por sus aprendizajes o posible reutilizacion, pero no presentados como lanzamientos actuales.",
    "Pricing": "Precios",
    "Priority onboarding and support included for beta accounts.": "Incorporación prioritaria y soporte incluidos para cuentas beta.",
    "Privacy": "Privacidad",
    "Privacy Policy": "Politica de privacidad",
    "Privacy Policy for DraftFlow": "Política de privacidad de DraftFlow",
    "Privacy Policy for Gravline": "Política de privacidad de Gravline",
    "Privacy Policy for NextRole": "Política de privacidad de NextRole",
    "Privacy Policy for PainTrail": "Politica de privacidad de PainTrail",
    "Privacy Policy for ThreadVigil": "Política de privacidad de ThreadVigil",
    "Privacy Policy for Wave Rush!": "Política de privacidad de Wave Rush!",
    "Privacy Policy | JBC Software Development LLC": "Politica de privacidad | JBC Software Development LLC",
    "Privacy and support": "Privacidad y soporte",
    "Privacy for app and software support.": "Privacidad para soporte de apps y software.",
    "Privacy policy": "Politica de privacidad",
    "Privacy policy for JBC Software Development LLC, a Florida-based software and mobile app development company.": "Politica de privacidad de JBC Software Development LLC, una empresa de software y apps con sede en Florida.",
    "Private by design": "Privado por diseño",
    "Private mission control for coding agents": "Control de misión privado para agentes de desarrollo",
    "Private pain and symptom tracking with no account, advertising, or analytics.": "Registro privado de síntomas y dolor, sin cuenta, anuncios ni analíticas.",
    "Private pain tracking and clearer visit preparation.": "Registro privado del dolor y preparacion mas clara para consultas.",
    "Pro — $4.99": "Pro — $4.99",
    "Product build": "Construccion de producto",
    "Product ledger": "Registro de productos",
    "Product overview": "Descripcion del producto",
    "Production CSV import remained prohibited because preview validation was inadequate.": "La importacion CSV en produccion permanecio prohibida porque la validacion previa era insuficiente.",
    "Professional IFS Cloud experience is separate from this ERPNext/Frappe project.": "La experiencia profesional con IFS Cloud es independiente de este proyecto ERPNext/Frappe.",
    "Prohibited effects": "Efectos prohibidos",
    "Project Workflow Board": "Tablero de flujo de proyecto",
    "Project and three starter tasks": "Proyecto y tres tareas iniciales",
    "Projects": "Proyectos",
    "Projects | JBC Development": "Proyectos | JBC Development",
    "Provide support for JBC Software Development LLC apps and software.": "Dar soporte a apps y software de JBC Software Development LLC.",
    "Public App Store apps and software with direct support links.": "Apps publicas del App Store y software con enlaces directos de soporte.",
    "Public apps and tools.": "Apps y herramientas publicas.",
    "Public pilot": "Piloto publico",
    "Public releases, pilots, submissions, and products under active development.": "Lanzamientos publicos, pilotos, envios y productos en desarrollo activo.",
    "Published apps": "Apps publicadas",
    "Published apps and local Mac tools with direct support and release notes.": "Apps publicadas y herramientas locales para Mac con soporte directo y notas de lanzamiento.",
    "Published apps, local software, and workflow tools in active development.": "Apps publicadas, software local y herramientas de flujo de trabajo en desarrollo activo.",
    "Purchase support": "Soporte de compras",
    "Read setup help": "Leer ayuda de configuracion",
    "Read the case study": "Leer el caso de estudio",
    "Read the privacy details": "Leer los detalles de privacidad",
    "Read the privacy policy": "Leer la política de privacidad",
    "Read the video transcript": "Leer la transcripción del video",
    "Ready": "Listo",
    "Ready to scope your project?": "Listo para definir el alcance de tu proyecto?",
    "Ready-to-use art kits for apps, games, and prototypes.": "Kits de arte listos para usar en apps, juegos y prototipos.",
    "Real multi-account": "Multicuentas real",
    "Real products": "Productos reales",
    "Recorded result": "Resultado registrado",
    "Recover clearly.": "Recuperate con claridad.",
    "Recovering the latest dictation for copying when insertion is unavailable.": "Recuperar el dictado más reciente para copiar si la inserción no está disponible.",
    "Refunds and support": "Reembolsos y soporte",
    "Release Checklist Template Pack": "Pack de plantillas de checklist de lanzamiento",
    "Release discipline you can verify.": "Disciplina de lanzamiento que puedes verificar.",
    "Release discipline, shown clearly.": "Disciplina de lanzamiento, mostrada con claridad.",
    "Release files include verification paths for download confidence.": "Los archivos de lanzamiento incluyen rutas de verificacion para mayor confianza al descargar.",
    "Release notes": "Notas de version",
    "Released": "Publicado",
    "Released and actively developed.": "Publicados y en desarrollo activo.",
    "Released apps, Mac tools, and public software from JBC Development, with direct access and support paths where available.": "Apps publicadas, herramientas Mac y software publico de JBC Development, con acceso directo y soporte cuando estan disponibles.",
    "Repeated migration, upgrade preservation, rollback, backup integrity, and uninstall readiness passed.": "La migracion repetida, la conservacion durante actualizacion, la reversion, la integridad de respaldo y la preparacion para desinstalar aprobaron.",
    "Report one reproducible problem or one owned-game compatibility result. Never post credentials, account data, raw private logs, bottle contents, cookies, installers, or game files.": "Informa un problema reproducible o un resultado de compatibilidad de un juego adquirido. Nunca publiques credenciales, datos de cuenta, registros privados sin filtrar, botellas, cookies, instaladores ni archivos de juegos.",
    "Request a custom quote": "Solicitar cotizacion personalizada",
    "Respond to support, privacy, app, or software questions.": "Responder preguntas de soporte, privacidad, apps o software.",
    "Response expectations": "Expectativas de respuesta",
    "Results below apply only to the documented synthetic, offline, or disposable-site boundaries.": "Los resultados siguientes solo aplican a los limites sinteticos, sin conexion o de sitios desechables documentados.",
    "Resume editing, preview, printing, and PDF export.": "Edición de currículum, previsualización, impresión y exportación a PDF.",
    "Retention and deletion": "Retención y eliminación",
    "Reusable files that save setup time on your next project.": "Archivos reutilizables que ahorran tiempo de configuracion en tu proximo proyecto.",
    "Reusable release, QA, and support checklists for solo developers and small teams.": "Checklists reutilizables de lanzamiento, QA y soporte para desarrolladores individuales y equipos pequenos.",
    "Review input, output, and cache token estimates using a transparent pricing table.": "Revisa las estimaciones de tokens de entrada, salida y caché con una tabla de precios transparente.",
    "Review one game.": "Revisa un juego.",
    "Review the local scan, warnings, suggested profile, and any protected anti-cheat block.": "Revisa el analisis local, advertencias, perfil sugerido y cualquier bloqueo antitrampas protegido.",
    "Risky actions stayed explicit.": "Las acciones riesgosas se mantuvieron explicitas.",
    "Role": "Funcion",
    "Run one monitored launch when appropriate, then share only a sanitized result.": "Ejecuta un inicio supervisado cuando corresponda y comparte solo un resultado saneado.",
    "Run the first-run checks and install DXVK when prompted.": "Ejecuta las verificaciones de primer uso e instala DXVK cuando se te pida.",
    "Runs recorded attempts, bounded retries, one manual retry, failure ownership, pause controls, acknowledgement, resolution, and manual fallback.": "Las ejecuciones registraron intentos, reintentos limitados, un reintento manual, responsable del fallo, controles de pausa, reconocimiento, resolucion y alternativa manual.",
    "SHA-256": "SHA-256",
    "SHA-256 checksums": "Checksums SHA-256",
    "Safety and privacy": "Seguridad y privacidad",
    "Same discipline applies to custom work — not just the apps on this site.": "La misma disciplina aplica al trabajo personalizado, no solo a las apps de este sitio.",
    "Same release discipline as every JBC product — applied to your project.": "La misma disciplina de publicacion de cada producto JBC, aplicada a tu proyecto.",
    "Save promising opportunities": "Guarda oportunidades prometedoras",
    "Save the role, connect the right resume, and keep the next step visible.": "Guarda el puesto, vincula el currículum correcto y mantén visible el siguiente paso.",
    "Saved jobs, application tracking, search strategy, and account settings.": "Puestos guardados, seguimiento de solicitudes, estrategia de búsqueda y ajustes de cuenta.",
    "Scan local files for conservative profile suggestions and warnings.": "Analiza archivos locales para obtener perfiles conservadores y advertencias.",
    "Scope": "Alcance",
    "Scope the job": "Definir el alcance",
    "Scope the product": "Definir el producto",
    "Secure payment": "Pago seguro",
    "Security": "Seguridad",
    "See ClearWaive": "Ver ClearWaive",
    "See a payment run get checked.": "Mira cómo se verifica una tanda de pagos.",
    "See all publicly available JBC products": "Ver todos los productos JBC disponibles al publico",
    "See how custom work gets scoped and shipped": "Mira como se acota y publica el trabajo personalizado",
    "See how it works": "Mira cómo funciona",
    "See it in action": "Verlo en acción",
    "See the setup-check workflow": "Mira el flujo de comprobacion",
    "Send a concise note with the app, software, or download question.": "Envia una nota breve con la pregunta sobre app, software o descarga.",
    "Send the details or book a call — either way, expect a direct reply, not a form queue.": "Envia los detalles o reserva una llamada: en ambos casos, espera una respuesta directa, no una fila de formularios.",
    "Service providers and operational data": "Proveedores de servicios y datos operativos",
    "Set up and launch Windows Steam through your own Mac compatibility backend.": "Configura y ejecuta Steam de Windows a traves de tu propio backend de compatibilidad para Mac.",
    "Set up repeatable AI-assisted research, content, and support workflows from scratch.": "Configura desde cero flujos repetibles de investigacion, contenido y soporte asistidos por IA.",
    "Setup and download": "Configurar y descargar",
    "Setup help": "Ayuda de configuracion",
    "Setup notes, privacy details, and known limits stay on this site.": "Notas de configuracion, privacidad y limites conocidos permanecen en este sitio.",
    "Setup support": "Soporte de configuracion",
    "Sharing and support": "Uso compartido y soporte",
    "Ship": "Publicar",
    "Ship focused apps, Mac utilities, and automation tools with maintainable scope.": "Publicar apps enfocadas, utilidades Mac y herramientas de automatizacion con alcance mantenible.",
    "Ship it signed": "Publicarlo firmado",
    "Shorts and longer ride edits": "Shorts y ediciones de rutas mas largas",
    "Sign the Mac build": "Firmar la compilacion Mac",
    "Sign-in and magic-link delivery problems.": "Problemas de inicio de sesión y entrega de enlaces mágicos.",
    "Signed and notarized": "Firmado y notarizado",
    "Signed and notarized DMG": "DMG firmado y notarizado",
    "Signed downloads": "Descargas firmadas",
    "Signed macOS download": "Descarga macOS firmada",
    "Six ready-to-use background textures for apps, games, and prototypes.": "Seis texturas de fondo listas para usar en apps, juegos y prototipos.",
    "Skip to content": "Saltar al contenido",
    "Small service teams often track inquiries, quotes, accepted work, tasks, and invoice follow-up across disconnected screens and spreadsheets. The pilot explored whether those records could explain what needs attention, why it matters, and who owns the next action— without granting automation unsafe authority.": "Los equipos pequenos de servicios suelen seguir consultas, cotizaciones, trabajo aceptado, tareas y facturas en pantallas y hojas de calculo desconectadas. El piloto exploro si esos registros podian explicar que requiere atencion, por que importa y quien es responsable de la siguiente accion, sin dar autoridad insegura a la automatizacion.",
    "SocialBar": "SocialBar",
    "SocialBar stages posts. It does not auto-post.": "SocialBar prepara publicaciones. No publica automáticamente.",
    "SocialBar | All your socials. One menu bar.": "SocialBar | Todas tus redes. Una barra de menú.",
    "Software": "Software",
    "Software Development LLC": "Software Development LLC",
    "Software and tools": "Software y herramientas",
    "Software built for": "Software creado para",
    "Software built for clear business workflows.": "Software creado para flujos de trabajo claros.",
    "Software development with a practical release loop.": "Desarrollo de software con un ciclo practico de lanzamiento.",
    "Software systems": "Sistemas de software",
    "Software you can use today.": "Software que puedes usar hoy.",
    "Source contracts": "Contratos de codigo",
    "Start here": "Empieza aqui",
    "Start with one owned game.": "Empieza con un juego adquirido.",
    "Start with one owned lightweight game, run Check Game, then try the safe or performance profile before testing more titles.": "Empieza con un juego liviano que ya tengas, ejecuta Verificar Juego y luego prueba el perfil seguro o de rendimiento antes de probar mas titulos.",
    "Starter, $149/mo:": "Starter, $149/mes:",
    "Stay focused on the work instead of checking terminals one by one.": "Mantén el enfoque en el trabajo en lugar de revisar terminales uno a uno.",
    "Steps to reproduce a bug, if relevant.": "Pasos para reproducir un error, si aplica.",
    "Stop app-hopping. Start posting.": "Deja de saltar entre apps. Empieza a publicar.",
    "Store": "Tienda",
    "Store | JBC Software Development LLC": "Tienda | JBC Software Development LLC",
    "Superseded": "Reemplazado",
    "Support": "Soporte",
    "Support ThreadVigil": "Soporte de ThreadVigil",
    "Support and contact information for JBC Software Development LLC apps and local software.": "Informacion de soporte y contacto para apps y software local de JBC Software Development LLC.",
    "Support and privacy resources stay available for every app and software release.": "Los recursos de soporte y privacidad permanecen disponibles para cada lanzamiento de app y software.",
    "Support for JBC apps and software.": "Soporte para apps y software de JBC.",
    "Support for apps and software.": "Soporte para apps y software.",
    "Support is available for:": "El soporte está disponible para:",
    "Support it after": "Darle soporte despues",
    "Support page": "Pagina de soporte",
    "Support ready": "Soporte listo",
    "Support requests are reviewed manually. No automatic support tickets, proposals, billing, deployments, or external actions are created from this website.": "Las solicitudes de soporte se revisan manualmente. Este sitio no crea tickets automaticos, propuestas, facturacion, despliegues ni acciones externas.",
    "Support the product": "Dar soporte al producto",
    "Support the release": "Dar soporte al lanzamiento",
    "Support | JBC Software Development LLC": "Soporte | JBC Software Development LLC",
    "Support, privacy, limits, and setup notes stay visible.": "Soporte, privacidad, limites y notas de configuracion permanecen visibles.",
    "Synthetic 1–25-person professional-services business": "Empresa sintetica de servicios profesionales de 1 a 25 personas",
    "Synthetic data only; no employer or customer data.": "Solo datos sinteticos; sin datos de empleadores ni clientes.",
    "Synthetic pilot": "Piloto sintetico",
    "T01, T02, T04–T10, and T13–T17 passed inside recorded synthetic or offline boundaries.": "T01, T02, T04–T10 y T13–T17 aprobaron dentro de los limites sinteticos o sin conexion registrados.",
    "Technical proof from isolated or synthetic projects, presented separately from released products.": "Prueba tecnica de proyectos aislados o sinteticos, presentada por separado de los productos publicados.",
    "Template": "Plantilla",
    "Templates": "Plantillas",
    "Terms": "Términos",
    "Test and report": "Prueba e informa",
    "Tested beyond the happy path.": "Probado mas alla del camino ideal.",
    "That is the whole interface until you need it.": "Esa es toda la interfaz hasta que la necesites.",
    "The app uses manual update checks only. When a user clicks Check for Updates, the app reads a static JBC Development update manifest. The app does not run background telemetry, create accounts, upload files to hosted storage, or install updates automatically.": "La app solo usa verificaciones manuales de actualizacion. Cuando un usuario hace clic en Buscar actualizaciones, la app lee un manifiesto de actualizacion estatico de JBC Development. La app no ejecuta telemetria en segundo plano, no crea cuentas, no sube archivos a almacenamiento alojado ni instala actualizaciones automaticamente.",
    "The challenge": "El desafio",
    "The decision to stop is part of the work.": "La decision de detenerse es parte del trabajo.",
    "The demo uses the real app: review readiness, profile guidance, error recovery, and the diagnostics privacy preview.": "La demostracion usa la app real: revisa la preparacion, la guia de perfiles, la recuperacion de errores y la vista previa de privacidad de diagnosticos.",
    "The device, browser, or operating system if this is a technical issue.": "El dispositivo, navegador o sistema operativo si es un problema tecnico.",
    "The diagnostics preview shows what information will be shared before the user exports it.": "La vista previa de diagnóstico muestra qué información se compartirá antes de que el usuario la exporte.",
    "The earlier Godot racing build was superseded by the native Swift project Wave Rush!": "La version anterior de carreras en Godot fue reemplazada por el proyecto nativo Swift Wave Rush!",
    "The first 100 valid submissions are determined by the timestamp at which the complete feedback email reaches": "Los primeros 100 envíos válidos se determinan por la marca de tiempo en la que el correo de comentarios completo llega a",
    "The generated briefing and general assistant were deferred, not represented as completed.": "El informe generado y el asistente general se aplazaron, no se presentaron como completados.",
    "The language switcher may save your English or Spanish preference in your browser only. This preference is not sent by this website.": "El selector de idioma puede guardar tu preferencia de ingles o espanol solo en tu navegador. Esta preferencia no se envia por este sitio.",
    "The motorcycle racer was preserved in source control and replaced by Same Day Shipping Co.": "El juego de motos se conservo en el control de versiones y fue reemplazado por Same Day Shipping Co.",
    "The overview identifies which setup components are ready and which need attention.": "El resumen identifica qué componentes están listos y cuáles necesitan atención.",
    "The photo-to-3D Mac experiment was removed from the public product lineup and is not under active development.": "El experimento Mac de foto a 3D se retiro del catalogo publico y no esta en desarrollo activo.",
    "The records existed. The daily operating picture did not.": "Los registros existian. La vision operativa diaria no.",
    "The reward is one Apple offer code granting PainTrail Premium through the app’s non-consumable Premium product. There is no cash alternative or transfer.": "La recompensa es un código de oferta de Apple que otorga PainTrail Premium a través del producto Premium no consumible de la app. No hay alternativa en efectivo ni transferencia.",
    "The tracking is the point. ClearWaive does it per vendor, per pay app, automatically.": "El seguimiento es el punto clave. ClearWaive lo hace por proveedor y por solicitud de pago, de forma automática.",
    "Third-party services": "Servicios de terceros",
    "This 40-second screen recording has no audio. The visual sequence is described below.": "Esta grabación de pantalla de 40 segundos no tiene audio. La secuencia visual se describe a continuación.",
    "This free download is signed, notarized, and built for local use on Mac. It does not include cloud accounts, billing, hosted storage, Steam, games, or bundled compatibility backends.": "Esta descarga gratuita esta firmada, notarizada y hecha para uso local en Mac. No incluye cuentas en la nube, facturacion, almacenamiento alojado, Steam, juegos, ni backends de compatibilidad incluidos.",
    "This offer is sponsored solely by JBC Software Development LLC. Apple is not a sponsor and is not involved in administering the offer.": "Esta oferta está patrocinada exclusivamente por JBC Software Development LLC. Apple no es patrocinador ni participa en la administración de la oferta.",
    "This website uses direct email links for support and contact. It does not automatically send forms, store submissions, create leads, or add your information to a database.": "Este sitio usa enlaces directos de email para soporte y contacto. No envia formularios automaticamente, no guarda envios, no crea prospectos ni agrega tu informacion a una base de datos.",
    "ThreadVigil": "ThreadVigil",
    "ThreadVigil help": "Ayuda de ThreadVigil",
    "ThreadVigil is free for macOS 14 or later.": "ThreadVigil es gratuito para macOS 14 o posterior.",
    "ThreadVigil support": "Soporte de ThreadVigil",
    "ThreadVigil | Mission Control for Coding Agents on macOS": "ThreadVigil | Control de misión para agentes de código en macOS",
    "Threads": "Threads",
    "TikTok": "TikTok",
    "Toggle navigation": "Alternar navegacion",
    "Track every application": "Sigue cada solicitud",
    "Track every application, tailor each resume, and know your next move—without ads or noisy dashboards.": "Sigue cada solicitud, adapta cada currículum y conoce tu próximo paso, sin anuncios ni paneles ruidosos.",
    "Track local cost estimates": "Control de costes estimados locales",
    "Troubleshooting organizes recovery steps for common launch failures.": "Solución de problemas organiza pasos de recuperación para fallos de inicio comunes.",
    "Turn common launch failures into bounded troubleshooting steps.": "Convierte fallos comunes de inicio en pasos acotados de solucion.",
    "Turning inquiry, quotation, accepted work, and invoice-review records into a safe, permission-aware operational command center.": "Convertir registros de consultas, cotizaciones, trabajo aceptado y revision de facturas en un centro de operaciones seguro y consciente de permisos.",
    "Two platforms, one account each. Badge counts included.": "Dos plataformas, una cuenta en cada una. Recuentos de notificaciones incluidos.",
    "Two simultaneous kickoff processes returned one deterministic Project with exactly three Tasks.": "Dos procesos simultaneos de inicio devolvieron un Proyecto determinista con exactamente tres Tareas.",
    "UI Background and Texture Pack": "Pack de fondos y texturas de UI",
    "Understand app, download, setup, or troubleshooting needs.": "Entender necesidades de apps, descargas, configuracion o solucion de problemas.",
    "Understand your Windows Steam setup before you chase another fix.": "Entiende tu configuracion de Windows Steam antes de buscar otra solucion.",
    "Use email for privacy, support, app, or project questions.": "Usa email para preguntas de privacidad, soporte, apps o proyectos.",
    "Use the email button below to confirm completion and submit honest feedback about the product experience.": "Usa el botón de correo de abajo para confirmar la finalización y enviar comentarios honestos sobre el producto.",
    "Use this page for app support, Mac setup, download questions, privacy questions, or general contact with JBC Software Development LLC.": "Usa esta pagina para soporte de apps, configuracion para Mac, preguntas de descarga, privacidad o contacto general con JBC Software Development LLC.",
    "Use your backend": "Usa tu capa",
    "Use your own Steam installer, Steam account, and owned games.": "Usa tu propio instalador de Steam, tu cuenta de Steam y tus juegos.",
    "Useful guidance. Never manufactured urgency.": "Orientación útil. Nunca urgencia fabricada.",
    "User job, constraints, and local setup are clarified first.": "La tarea del usuario, las restricciones y la configuracion local se aclaran primero.",
    "Validated locally; not deployed to production": "Validado localmente; no implementado en produccion",
    "Validated work, with the boundaries visible.": "Trabajo validado, con los limites visibles.",
    "Validation evidence": "Evidencia de validacion",
    "Verify checksums": "Verificar checksums",
    "Verify downloads": "Verificar descargas",
    "Verify readiness.": "Verifica la preparacion.",
    "Version": "Version",
    "Version 0.1.0": "Versión 0.1.0",
    "View ClearWaive": "Ver ClearWaive",
    "View M5SteamBridge": "Ver M5SteamBridge",
    "View NextRole": "Ver NextRole",
    "View SocialBar": "Ver SocialBar",
    "View ThreadVigil": "Ver ThreadVigil",
    "View application in Tracker": "Ver solicitud en el Organizador",
    "View apps and software": "Ver apps y software",
    "View custom work": "Ver trabajo personalizado",
    "View live demo": "Ver demo en vivo",
    "View source": "Ver codigo fuente",
    "Wave Rush! help": "Ayuda de Wave Rush!",
    "Wave Rush! support": "Soporte de Wave Rush!",
    "We track the paperwork": "Hacemos seguimiento del papeleo",
    "Web app / Construction": "App web / Construccion",
    "Website contact": "Contacto del sitio",
    "What \"custom work\" means here.": "Qué significa \"trabajo personalizado\" aquí.",
    "What ClearWaive does today.": "Lo que ClearWaive hace hoy.",
    "What JBC builds": "Lo que crea JBC",
    "What JBC is shipping, building, and leaving behind.": "Lo que JBC publica, construye y deja atras.",
    "What is active now.": "Lo que esta activo ahora.",
    "What it doesn't do": "Lo que no hace",
    "What this is—and is not.": "Lo que esto es y lo que no es.",
    "What to include": "Que incluir",
    "Whisky-derived community paths are experimental and may break as other software changes.": "Las opciones comunitarias derivadas de Whisky son experimentales y pueden fallar cuando cambia otro software.",
    "Winners must redeem their code within 30 days of delivery and before Apple’s stated code expiration date.": "Los ganadores deben canjear su código dentro de los 30 días posteriores a la entrega y antes de la fecha de vencimiento del código indicada por Apple.",
    "Work": "Trabajo",
    "Workflow architecture": "Arquitectura del flujo",
    "Workflow mapped": "Flujo mapeado",
    "Workflows installed inactive and automation rules installed paused, with no customers, invoices, credentials, endpoints, or external delivery configuration seeded.": "Los flujos se instalaron inactivos y las reglas de automatizacion en pausa, sin sembrar clientes, facturas, credenciales, endpoints ni configuracion de entrega externa.",
    "You applied 8 days ago. Consider a short follow-up this week.": "Postulaste hace 8 días. Considera un breve seguimiento esta semana.",
    "YouTube": "YouTube",
    "YouTube Studio": "YouTube Studio",
    "Your browser does not support embedded video.": "Tu navegador no admite video incrustado.",
    "Your name and the app, software, or download you are asking about.": "Tu nombre y la app, software o descarga sobre la que preguntas.",
    "Your search stays yours.": "Tu búsqueda sigue siendo tuya.",
    "Your sessions, your Mac": "Tus sesiones, tu Mac",
    "active.tools": "herramientas.activas",
    "built by one person.": "construidas por una sola persona.",
    "built in the lab.": "creado en el laboratorio.",
    "by JBC Development": "por JBC Development",
    "clear business workflows.": "flujos de trabajo claros.",
    "for small general contractors.": "para pequeños contratistas generales.",
    "for support, app, download, setup, privacy, or software questions.": "para preguntas de soporte, apps, descargas, configuracion, privacidad o software.",
    "iOS Apps": "Apps iOS",
    "iOS apps & Mac tools,": "Apps iOS y herramientas Mac,",
    "iOS apps,": "Apps iOS,",
    "iOS or Mac app builds and prototypes": "Apps iOS o Mac y prototipos",
    "iOS, Mac, and AI tooling —": "Herramientas iOS, Mac y IA —",
    "is an iOS app for kids and parents with no ads, tracking, third-party analytics, custom account system, custom cloud save, chat, or push notifications. The app uses Apple StoreKit for optional non-consumable in-app purchases to unlock additional pet-care lessons and mini-games. JBC Software Development LLC does not operate a separate purchase, account, analytics, cloud-save, or gameplay data server for Paw Care Academy.": "es una app iOS para ninos y padres, sin anuncios, rastreo, analitica de terceros, sistema de cuentas propio, guardado en la nube propio, chat ni notificaciones push. La app usa Apple StoreKit para compras opcionales no consumibles dentro de la app que desbloquean lecciones adicionales de cuidado de mascotas y minijuegos. JBC Software Development LLC no opera un servidor separado de compras, cuentas, analitica, guardado en la nube o datos de juego para Paw Care Academy.",
    "local Mac tools": "herramientas Mac locales",
    "macOS menu bar social command center": "centro de control de redes en la barra de menú de macOS",
    "private and supported.": "privadas y con soporte.",
    "release.pipeline": "pipeline.lanzamiento",
    "replace the bracketed prompt with your product feedback. No health details, pain-entry contents, screenshots, App Store rating, or App Store review are needed.": "reemplaza el texto entre corchetes con tus comentarios sobre el producto. No se necesitan detalles de salud, contenido de la entrada de dolor, capturas de pantalla, valoración ni reseña en el App Store.",
    "see the launch": "ver el lanzamiento",
    "signed and supported.": "firmados y con soporte.",
    "signed, checked, supported": "firmado, verificado, con soporte",
    "support": "soporte",
    "the same shop behind these apps": "el mismo estudio detrás de estas apps",
    "up to 250 vendors, multi-project tracking, priority onboarding": "hasta 250 proveedores, seguimiento multiproyecto, incorporación prioritaria",
    "up to 75 vendors, document queue, payment-hold report": "hasta 75 proveedores, cola de documentos, informe de retenciones de pago",
    "with your order details.": "con los detalles de tu pedido.",
    "© 2026 JBC Software Development LLC": "© 2026 JBC Software Development LLC",
    "© 2026 Valve Corporation. Steam and the Steam logo are trademarks and/or registered trademarks of Valve Corporation in the U.S. and/or other countries.": "© 2026 Valve Corporation. Steam y el logotipo de Steam son marcas comerciales y/o registradas de Valve Corporation en EE. UU. y/u otros paises.",
    "— Game Profiles shows local, game-by-game checks and conservative launch guidance.": "— Perfiles de juegos muestra comprobaciones locales y orientación de inicio prudente.",
    "— M5SteamBridge opens to its readiness overview and checks the user-installed compatibility backend.": "— M5SteamBridge abre su resumen de preparación y comprueba la capa de compatibilidad.",
    "— The diagnostics preview shows what information will be shared before the user exports it.": "— La vista previa de diagnóstico muestra qué información se compartirá antes de exportarla.",
    "— The overview identifies which setup components are ready and which need attention.": "— El resumen identifica qué componentes de la configuración están listos y cuáles necesitan atención.",
    "— Troubleshooting organizes recovery steps for common launch failures.": "— Solución de problemas organiza pasos de recuperación para fallos de inicio comunes.",
    "“For life” means the Premium entitlement does not have a recurring expiration while PainTrail remains available and supported. It does not guarantee that the app or App Store will operate indefinitely.": "«De por vida» significa que el derecho Premium no tiene un vencimiento recurrente mientras PainTrail siga disponible y cuente con soporte. No garantiza que el App Store o la app funcionen indefinidamente.",
  }
};;

const attributeTranslations = {
  es: {
    "JBC Software Development LLC home": "Inicio de JBC Software Development LLC",
    "Primary navigation": "Navegacion principal",
    "Language selector": "Selector de idioma",
    "Core app and software areas": "Areas principales de apps y software",
    "Build repeat process preview": "Vista previa del proceso de lanzamiento",
    "JBC Development software workspace": "Espacio de trabajo de software de JBC Development",
    "Current build themes": "Temas actuales de construccion",
    "What JBC builds": "Lo que crea JBC",
    "JBC release pipeline": "Pipeline de lanzamientos de JBC",
    "DadBuildRepeat profile action shot": "Foto de accion del perfil DadBuildRepeat",
    "Personal social channels": "Canales sociales personales",
    "JBC apps and software downloads": "Descargas de apps y software de JBC",
    "Paw Care Academy app icon": "Icono de la app Paw Care Academy",
    "M5SteamBridge app icon": "Icono de la app M5SteamBridge",
    "Current projects": "Proyectos actuales",
    "Paw Care Academy resources": "Recursos de Paw Care Academy",
    "Local Mac software links": "Enlaces de software local para Mac",
    "AI workflow resources": "Recursos de flujos con IA",
    "Current JBC products": "Productos actuales de JBC",
    "Case study summary": "Resumen del caso de estudio",
    "JBC Development apps and tools": "Apps y herramientas de JBC Development",
    "Release proof": "Prueba de lanzamiento",
    "Privacy contact": "Contacto de privacidad",
    "E-books and guides": "Ebooks y guias",
    "Templates": "Plantillas",
    "Digital art and assets": "Arte y recursos digitales",
    "Software and tools": "Software y herramientas",
    "Store actions": "Acciones de la tienda",
    "Release facts": "Datos del lanzamiento",
    "M5SteamBridge setup and troubleshooting demonstration": "Demostracion de configuracion y diagnostico de M5SteamBridge",
    "Product attribution": "Atribucion del producto",
    "M5SteamBridge is a free, open-source Mac companion for checking and troubleshooting Windows Steam setups through a user-installed compatibility backend.": "M5SteamBridge es un companero Mac gratuito y de codigo abierto para comprobar y diagnosticar configuraciones de Windows Steam mediante una capa de compatibilidad instalada por el usuario.",
    "Check setup readiness, scan locally installed games, and understand common launch failures without telemetry or an account.": "Comprueba la configuracion, analiza juegos instalados localmente y entiende fallos comunes de inicio sin telemetria ni cuenta.",
  },
};

initializeTranslation();
initializeMotion();

if (navToggle && navLinks) {
  const closeNavigation = ({ restoreFocus = false } = {}) => {
    if (!navLinks.classList.contains("is-open")) return;
    navLinks.classList.remove("is-open");
    navToggle.setAttribute("aria-expanded", "false");
    if (restoreFocus) navToggle.focus();
  };

  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      closeNavigation();
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeNavigation({ restoreFocus: true });
  });

  document.addEventListener("click", (event) => {
    if (!siteHeader?.contains(event.target)) closeNavigation();
  });

  window.addEventListener("resize", () => {
    if (window.innerWidth > 900) closeNavigation();
  });
}

function initializeMotion() {
  document.body.classList.add("motion-ready");
  initializeHeaderState();
  initializeRevealMotion();
  initializeHeroFrameTilt();
  initializeLabConsole();
}

function initializeHeaderState() {
  if (!siteHeader) return;

  const updateHeaderState = () => {
    siteHeader.classList.toggle("is-scrolled", window.scrollY > 8);
  };

  updateHeaderState();
  window.addEventListener("scroll", updateHeaderState, { passive: true });
}

function initializeRevealMotion() {
  const revealTargets = document.querySelectorAll(
    ".personal-panel, .pipeline-step, .process-step, .ship-step, .featured-product-card, .custom-work-panel, .app-showcase-card, .app-showcase-card-static, .project-card, .contact-panel, .policy-grid, .content-panel, .side-panel, .download-card, .download-product",
  );

  if (!revealTargets.length) return;

  revealTargets.forEach((element, index) => {
    element.classList.add("reveal");
    element.style.transitionDelay = `${Math.min(index % 4, 3) * 70}ms`;
  });

  if (!("IntersectionObserver" in window) || reducedMotionQuery.matches) {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { rootMargin: "0px 0px -12% 0px", threshold: 0.16 },
  );

  revealTargets.forEach((element) => revealObserver.observe(element));
}

function initializeHeroFrameTilt() {
  const heroMedia = document.querySelector(".hero-media");
  const mediaFrame = document.querySelector(".hero-media-frame");
  if (!heroMedia || !mediaFrame || reducedMotionQuery.matches) return;

  heroMedia.addEventListener("pointermove", (event) => {
    const rect = heroMedia.getBoundingClientRect();
    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;
    mediaFrame.style.setProperty("--hero-tilt-x", `${x * 5}deg`);
    mediaFrame.style.setProperty("--hero-tilt-y", `${y * -5}deg`);
  });

  heroMedia.addEventListener("pointerleave", () => {
    mediaFrame.style.removeProperty("--hero-tilt-x");
    mediaFrame.style.removeProperty("--hero-tilt-y");
  });
}

function initializeLabConsole() {
  const consoleValue = document.querySelector("[data-lab-console]");
  if (!consoleValue) return;

  updateLabConsole({ animate: false });

  if (reducedMotionQuery.matches) return;

  labConsoleTimer = window.setInterval(() => {
    labConsoleIndex += 1;
    updateLabConsole({ animate: true });
  }, 2200);
}

function updateLabConsole({ animate } = {}) {
  const consoleValue = document.querySelector("[data-lab-console]");
  if (!consoleValue) return;

  const phrases = LAB_CONSOLE_PHRASES[currentLanguage] || LAB_CONSOLE_PHRASES.en;
  const nextValue = phrases[labConsoleIndex % phrases.length];

  if (!animate) {
    consoleValue.textContent = nextValue;
    return;
  }

  consoleValue.classList.add("is-swapping");
  window.setTimeout(() => {
    consoleValue.textContent = nextValue;
    consoleValue.classList.remove("is-swapping");
  }, 180);
}

function initializeTranslation() {
  collectOriginalTextNodes();
  collectOriginalAttributeValues();

  languageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const language = normalizeLanguage(button.dataset.languageOption);
      setLanguage(language, { remember: true });
    });
  });

  setLanguage(getInitialLanguage(), { remember: false });
}

function collectOriginalTextNodes() {
  const walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      if (!node.parentElement || shouldSkipTranslation(node.parentElement)) {
        return NodeFilter.FILTER_REJECT;
      }

      const key = normalizeText(node.nodeValue);
      if (!key || !translations.es[key]) {
        return NodeFilter.FILTER_REJECT;
      }

      return NodeFilter.FILTER_ACCEPT;
    },
  });

  while (walker.nextNode()) {
    originalTextNodes.push({
      key: normalizeText(walker.currentNode.nodeValue),
      leading: walker.currentNode.nodeValue.match(/^\s*/)[0],
      node: walker.currentNode,
      trailing: walker.currentNode.nodeValue.match(/\s*$/)[0],
    });
  }
}

function collectOriginalAttributeValues() {
  const attributes = ["alt", "aria-label", "content", "placeholder"];

  document.querySelectorAll("*").forEach((element) => {
    if (shouldSkipTranslation(element)) return;

    attributes.forEach((attribute) => {
      const value = element.getAttribute(attribute);
      const key = normalizeText(value);

      if (key && attributeTranslations.es[key]) {
        originalAttributeValues.push({ attribute, element, key });
      }
    });
  });
}

function setLanguage(language, options = {}) {
  currentLanguage = normalizeLanguage(language);
  document.documentElement.lang = currentLanguage;

  originalTextNodes.forEach(({ key, leading, node, trailing }) => {
    node.nodeValue = `${leading}${getTranslation(key)}${trailing}`;
  });

  originalAttributeValues.forEach(({ attribute, element, key }) => {
    element.setAttribute(attribute, getAttributeTranslation(key));
  });

  languageButtons.forEach((button) => {
    const isActive = button.dataset.languageOption === currentLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  if (options.remember) {
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, currentLanguage);
    } catch {
      // Language preference still works for the current page if storage is blocked.
    }
  }

  updateLabConsole({ animate: false });
}

function getInitialLanguage() {
  try {
    const savedLanguage = localStorage.getItem(LANGUAGE_STORAGE_KEY);
    if (SUPPORTED_LANGUAGES.has(savedLanguage)) return savedLanguage;
  } catch {
    // Fall through to browser language detection.
  }

  const browserLanguages = navigator.languages?.length ? navigator.languages : [navigator.language];
  return browserLanguages.some((language) => String(language).toLowerCase().startsWith("es")) ? "es" : "en";
}

function getTranslation(key) {
  if (currentLanguage === "en") return key;
  return translations[currentLanguage]?.[key] || key;
}

function getAttributeTranslation(key) {
  if (currentLanguage === "en") return key;
  return attributeTranslations[currentLanguage]?.[key] || key;
}

function normalizeLanguage(language) {
  return SUPPORTED_LANGUAGES.has(language) ? language : "en";
}

function normalizeText(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function shouldSkipTranslation(element) {
  return Boolean(element.closest("script, style, noscript, .brand-name, .language-switcher"));
}

/* ── Scroll Reveal Observer for Smooth Page Entrance ── */
function initScrollReveal() {
  if (reducedMotionQuery.matches) return;
  const elements = document.querySelectorAll(".standard-card, .contact-card, .section-head, .animate-on-scroll");
  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  elements.forEach((el) => {
    el.classList.add("animate-on-scroll");
    observer.observe(el);
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initScrollReveal);
} else {
  initScrollReveal();
}

