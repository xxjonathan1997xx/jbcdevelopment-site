const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const languageButtons = document.querySelectorAll("[data-language-option]");
const siteHeader = document.querySelector("[data-site-header]");
const reducedMotionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");

const LANGUAGE_STORAGE_KEY = "jbcdevelopment-language";
const SUPPORTED_LANGUAGES = new Set(["en", "es"]);
const LAB_CONSOLE_PHRASES = {
  en: ["Paw Care Academy", "M5SteamBridge"],
  es: ["Paw Care Academy", "M5SteamBridge"],
};

let currentLanguage = "en";
let labConsoleIndex = 0;
let labConsoleTimer;
const originalTextNodes = [];
const originalAttributeValues = [];

const translations = {
  es: {
    "Skip to content": "Saltar al contenido",
    "Toggle navigation": "Alternar navegacion",
    "Work": "Trabajo",
    "How we ship": "Como publicamos",
    "Projects": "Proyectos",
    "JBC products": "Productos JBC",
    "Software you can use today.": "Software que puedes usar hoy.",
    "Released apps, Mac tools, and public software from JBC Development, with direct access and support paths where available.": "Apps publicadas, herramientas Mac y software publico de JBC Development, con acceso directo y soporte cuando estan disponibles.",
    "Available now": "Disponible ahora",
    "Public apps and tools.": "Apps y herramientas publicas.",
    "Only products that are released or already publicly accessible appear here.": "Aqui solo aparecen productos publicados o que ya son accesibles al publico.",
    "Public pilot": "Piloto publico",
    "See all publicly available JBC products": "Ver todos los productos JBC disponibles al publico",
    "Product ledger": "Registro de productos",
    "What JBC is shipping, building, and leaving behind.": "Lo que JBC publica, construye y deja atras.",
    "A transparent view of released products, work in progress, and experiments that are paused or archived. Statuses were reconciled with the project notes on July 30, 2026.": "Una vista transparente de productos publicados, trabajos en curso y experimentos pausados o archivados. Los estados se conciliaron con las notas de proyecto el 30 de julio de 2026.",
    "Current projects": "Proyectos actuales",
    "Paused and archived": "Pausados y archivados",
    "Current": "Actuales",
    "Released and actively developed.": "Publicados y en desarrollo activo.",
    "Public releases, pilots, submissions, and products under active development.": "Lanzamientos publicos, pilotos, envios y productos en desarrollo activo.",
    "Live on App Store": "Disponible en App Store",
    "Released": "Publicado",
    "Post-launch development": "Desarrollo posterior al lanzamiento",
    "In App Review": "En revision de App Store",
    "Pre-release": "Prelanzamiento",
    "Active development": "Desarrollo activo",
    "MVP development": "Desarrollo de MVP",
    "Pilot": "Piloto",
    "Kid-friendly pet-care learning for iPhone and iPad. Version 1.4 is live; the Godot 2.0 migration is in final device and release validation.": "Aprendizaje de cuidado de mascotas para iPhone y iPad. La version 1.4 esta disponible; la migracion a Godot 2.0 esta en validacion final de dispositivo y lanzamiento.",
    "Open in App Store": "Abrir en App Store",
    "A free, local-first macOS dashboard for monitoring Claude Code, Codex, OpenCode, and Cursor sessions.": "Un panel gratuito y local para macOS que supervisa sesiones de Claude Code, Codex, OpenCode y Cursor.",
    "A free, open-source Mac helper for checking and troubleshooting user-installed Windows Steam compatibility setups.": "Una herramienta Mac gratuita y de codigo abierto para comprobar y resolver problemas de configuraciones de compatibilidad de Windows Steam instaladas por el usuario.",
    "View M5SteamBridge": "Ver M5SteamBridge",
    "View ThreadVigil": "Ver ThreadVigil",
    "A private, account-free pain journal for logging pain, context, and medications, then preparing clearer visit summaries.": "Un diario privado del dolor, sin cuenta, para registrar dolor, contexto y medicamentos, y preparar resumenes mas claros para las consultas.",
    "A mobile-first career manager. Version 1.2 development follows the initial release and subscription review work.": "Un gestor profesional pensado primero para movil. El desarrollo de la version 1.2 sigue al lanzamiento inicial y la revision de suscripciones.",
    "A private pain journal and visit-preparation app. Version 0.2.1, build 44, was submitted for App Review on July 28.": "Un diario privado del dolor y app de preparacion de consultas. La version 0.2.1, compilacion 44, se envio a revision el 28 de julio.",
    "A native iPhone arcade water racer with five tracks and championship play. Build 18 is awaiting device QA and store metadata.": "Un juego de carreras acuaticas arcade nativo para iPhone con cinco pistas y campeonato. La compilacion 18 espera pruebas en dispositivo y metadatos de la tienda.",
    "A native iOS downhill mountain-bike racer built around time trials, ghost racing, and local-first play.": "Un juego nativo de ciclismo de montana cuesta abajo para iOS, centrado en contrarreloj, carreras fantasma y juego local.",
    "A cooperative Godot delivery game. Its core delivery loop and co-op foundation are working; release-quality content and polish remain.": "Un juego cooperativo de entregas en Godot. El ciclo principal y la base cooperativa funcionan; faltan contenido y pulido de calidad de lanzamiento.",
    "A safety-focused couples platform. The routing, access model, backend, and native foundations exist; the product UI is being built.": "Una plataforma para parejas enfocada en la seguridad. El enrutamiento, modelo de acceso, backend y bases nativas existen; se esta construyendo la interfaz.",
    "A native Mac and iPhone dictation app. Private on-device transcription works; the polished cloud path remains in development.": "Una app nativa de dictado para Mac y iPhone. La transcripcion privada en el dispositivo funciona; la ruta pulida en la nube sigue en desarrollo.",
    "A construction compliance tool for tracking insurance, lien waivers, and payment holds. The MVP is live for pilot outreach.": "Una herramienta de cumplimiento para construccion que controla seguros, renuncias de gravamen y retenciones de pago. El MVP esta activo para pilotos.",
    "View ClearWaive": "Ver ClearWaive",
    "Paused or archived": "Pausados o archivados",
    "Experiments with an honest ending.": "Experimentos con un final honesto.",
    "Preserved for lessons or possible reuse, but not represented as current releases.": "Conservados por sus aprendizajes o posible reutilizacion, pero no presentados como lanzamientos actuales.",
    "Archived": "Archivado",
    "Superseded": "Reemplazado",
    "Paused": "Pausado",
    "Blocked": "Bloqueado",
    "The motorcycle racer was preserved in source control and replaced by Same Day Shipping Co.": "El juego de motos se conservo en el control de versiones y fue reemplazado por Same Day Shipping Co.",
    "The earlier Godot racing build was superseded by the native Swift project Wave Rush!": "La version anterior de carreras en Godot fue reemplazada por el proyecto nativo Swift Wave Rush!",
    "The photo-to-3D Mac experiment was removed from the public product lineup and is not under active development.": "El experimento Mac de foto a 3D se retiro del catalogo publico y no esta en desarrollo activo.",
    "A background experiment currently blocked and not being presented as a shipping product.": "Un experimento secundario actualmente bloqueado que no se presenta como producto publicado.",
    "A background game prototype retained in the project archive without active release work.": "Un prototipo de juego conservado en el archivo sin trabajo activo de lanzamiento.",
    "An early family-game experiment retained for reference, with no active release work.": "Un experimento temprano de juego familiar conservado como referencia, sin trabajo activo de lanzamiento.",
    "A reusable game-asset workspace kept as background material rather than a current product.": "Un espacio de recursos reutilizables para juegos conservado como material de apoyo, no como producto actual.",
    "Florida indie app studio": "Estudio indie de apps en Florida",
    "iOS apps & Mac tools,": "Apps iOS y herramientas Mac,",
    "signed and supported.": "firmados y con soporte.",
    "JBC Development | iOS Apps & Mac Tools": "JBC Development | Apps iOS y herramientas Mac",
    "JBC Development ships App Store apps and notarized Mac downloads — with support, privacy details, checksums, and scoped custom work when the fit is right.": "JBC Development publica apps del App Store y descargas Mac notarizadas, con soporte, privacidad, checksums y trabajo personalizado acotado cuando encaja.",
    "Get Paw Care Academy": "Obtener Paw Care Academy",
    "Download M5SteamBridge": "Descargar M5SteamBridge",
    "Every Mac build is signed, notarized, and checksum-verified.": "Cada compilacion Mac esta firmada, notarizada y verificada con checksum.",
    "Now shipping": "Publicando ahora",
    "Real products": "Productos reales",
    "App Store apps and Mac tools with support paths on this site.": "Apps del App Store y herramientas Mac con rutas de soporte en este sitio.",
    "App Store app": "App del App Store",
    "Signed macOS download": "Descarga macOS firmada",
    "SHA-256 checksums": "Checksums SHA-256",
    "Built in Florida": "Creado en Florida",
    "Release discipline you can verify.": "Disciplina de lanzamiento que puedes verificar.",
    "Map the job, ship the smallest useful build, document the limits, and keep support visible.": "Definir el trabajo, publicar la version util mas pequena, documentar los limites y mantener el soporte visible.",
    "Scope the product": "Definir el producto",
    "Clarify the user, constraints, and support path before code ships.": "Aclarar el usuario, las restricciones y la ruta de soporte antes de publicar codigo.",
    "Sign the Mac build": "Firmar la compilacion Mac",
    "Local Mac tools ship as signed, notarized DMGs with published checksums.": "Las herramientas Mac locales se publican como DMG firmados y notarizados con checksums publicados.",
    "Document limits": "Documentar limites",
    "Setup notes, privacy details, and known limits stay on this site.": "Notas de configuracion, privacidad y limites conocidos permanecen en este sitio.",
    "Support the release": "Dar soporte al lanzamiento",
    "Per-app support pages and direct email for troubleshooting.": "Paginas de soporte por app y email directo para resolver problemas.",
    "Featured app": "App destacada",
    "Kid-friendly pet-care learning on iOS — the clearest place to start with JBC.": "Aprendizaje de cuidado de mascotas para ninos en iOS: el mejor punto de partida con JBC.",
    "All JBC apps and tools.": "Todas las apps y herramientas de JBC.",
    "App Store apps and signed Mac downloads with direct support links.": "Apps del App Store y descargas Mac firmadas con enlaces directos de soporte.",
    "Custom work": "Trabajo personalizado",
    "Custom development": "Desarrollo personalizado",
    "Need a scoped app, Mac tool, or workflow?": "Necesitas una app, herramienta Mac o flujo de trabajo acotado?",
    "JBC takes on small custom jobs when the scope is clear: iOS apps, signed Mac utilities, automation, and AI-assisted internal tools.": "JBC acepta trabajos personalizados pequenos cuando el alcance es claro: apps iOS, utilidades Mac firmadas, automatizacion y herramientas internas asistidas por IA.",
    "iOS or Mac app builds and prototypes": "Apps iOS o Mac y prototipos",
    "Local Mac utilities and launchers": "Utilidades y lanzadores locales para Mac",
    "Automation, AI workflows, and support tooling": "Automatizacion, flujos con IA y herramientas de soporte",
    "Request a custom quote": "Solicitar cotizacion personalizada",
    "Include your goal, platform, timeline, and budget range for the fastest reply.": "Incluye tu objetivo, plataforma, cronograma y rango de presupuesto para una respuesta mas rapida.",
    "DadBuildRepeat": "DadBuildRepeat",
    "Apps": "Apps",
    "Downloads": "Descargas",
    "Support": "Soporte",
    "Privacy": "Privacidad",
    "TikTok": "TikTok",
    "Instagram": "Instagram",
    "YouTube": "YouTube",
    "Facebook": "Facebook",
    "Contact": "Contacto",
    "Privacy Policy": "Politica de privacidad",
    "JBC Development | Software Development And Apps": "JBC Development | Desarrollo de software y apps",
    "Software built for clear business workflows.": "Software creado para flujos de trabajo claros.",
    "Software built for": "Software creado para",
    "clear business workflows.": "flujos de trabajo claros.",
    "Practical software, built in the lab.": "Software practico, creado en el laboratorio.",
    "Practical software,": "Software practico,",
    "built in the lab.": "creado en el laboratorio.",
    "JBC Development designs and ships practical apps, local Mac tools, AI workflow systems, and automation that stay easy to understand, support, and improve after release.": "JBC Development disena y publica apps practicas, herramientas locales para Mac, sistemas de flujo con IA y automatizacion faciles de entender, apoyar y mejorar despues del lanzamiento.",
    "JBC Development designs apps, local Mac tools, AI workflow systems, and automation with visible release discipline.": "JBC Development disena apps, herramientas locales para Mac, sistemas de flujo con IA y automatizacion con disciplina de lanzamiento visible.",
    "View apps and software": "Ver apps y software",
    "Download Mac tools": "Descargar herramientas Mac",
    "What JBC builds": "Lo que crea JBC",
    "local Mac tools": "herramientas Mac locales",
    "Paw Care Academy": "Paw Care Academy",
    "M5SteamBridge": "M5SteamBridge",
    "AI workflow tools": "Herramientas de flujo con IA",
    "Discover": "Descubrir",
    "Design": "Disenar",
    "Build": "Crear",
    "Ship": "Publicar",
    "Built in Florida. Scoped for maintainable releases.": "Creado en Florida. Alcance claro para lanzamientos mantenibles.",
    "Product build": "Construccion de producto",
    "Software systems": "Sistemas de software",
    "release.pipeline": "pipeline.lanzamiento",
    "signed, checked, supported": "firmado, verificado, con soporte",
    "active.tools": "herramientas.activas",
    "Paw, M5SteamBridge, custom work": "Paw, M5SteamBridge, trabajo personalizado",
    "Photo to GLB": "Foto a GLB",
    "Mac helper": "Ayuda Mac",
    "JBC Development": "JBC Development",
    "Apps, local tools, and workflow software with clear support paths.": "Apps, herramientas locales y software de flujo de trabajo con rutas claras de soporte.",
    "Published apps": "Apps publicadas",
    "Local Mac software": "Software local para Mac",
    "Signed downloads": "Descargas firmadas",
    "Setup support": "Soporte de configuracion",
    "AI workflows": "Flujos con IA",
    "Automation": "Automatizacion",
    "Build pipeline": "Pipeline de construccion",
    "Release discipline, shown clearly.": "Disciplina de lanzamiento, mostrada con claridad.",
    "JBC software work is presented with the setup details, release checks, and support paths needed for practical users.": "El trabajo de software de JBC se presenta con detalles de configuracion, verificaciones de lanzamiento y rutas de soporte para usuarios practicos.",
    "Workflow mapped": "Flujo mapeado",
    "User job, constraints, and local setup are clarified first.": "La tarea del usuario, las restricciones y la configuracion local se aclaran primero.",
    "Gold signed": "Firma gold",
    "Mac tools are prepared as signed and notarized downloads.": "Las herramientas Mac se preparan como descargas firmadas y notarizadas.",
    "Checksums available": "Checksums disponibles",
    "Release files include verification paths for download confidence.": "Los archivos de lanzamiento incluyen rutas de verificacion para mayor confianza al descargar.",
    "Support ready": "Soporte listo",
    "Support, privacy, limits, and setup notes stay visible.": "Soporte, privacidad, limites y notas de configuracion permanecen visibles.",
    "Software development with a practical release loop.": "Desarrollo de software con un ciclo practico de lanzamiento.",
    "Plan the workflow, build the smallest useful version, document the limits, and improve from real use.": "Planificar el flujo, crear la version util mas pequena, documentar los limites y mejorar con uso real.",
    "Map the workflow": "Mapear el flujo",
    "Clarify the user, job, data, constraints, and support path before writing code.": "Aclarar el usuario, la tarea, los datos, las restricciones y la ruta de soporte antes de escribir codigo.",
    "Build the release": "Crear el lanzamiento",
    "Ship focused apps, Mac utilities, and automation tools with maintainable scope.": "Publicar apps enfocadas, utilidades Mac y herramientas de automatizacion con alcance mantenible.",
    "Support the product": "Dar soporte al producto",
    "Keep downloads, setup notes, privacy information, and known limits visible.": "Mantener visibles las descargas, notas de configuracion, privacidad y limites conocidos.",
    "Current software by JBC Development.": "Software actual de JBC Development.",
    "Published apps and local Mac tools with direct support and release notes.": "Apps publicadas y herramientas locales para Mac con soporte directo y notas de lanzamiento.",
    "Education / Games": "Educacion / Juegos",
    "Kid-friendly pet-care learning.": "Aprendizaje de cuidado de mascotas para ninos.",
    "Open in App Store": "Abrir en App Store",
    "Ready": "Listo",
    "Mac app / Steam helper": "App Mac / ayuda de Steam",
    "Local launcher helper for user-installed compatibility backends.": "Ayudante local para capas de compatibilidad instaladas por el usuario.",
    "Setup and download": "Configurar y descargar",
    "Verify downloads": "Verificar descargas",
    "Apps and software": "Apps y software",
    "What is active now.": "Lo que esta activo ahora.",
    "Published apps, local software, and workflow tools in active development.": "Apps publicadas, software local y herramientas de flujo de trabajo en desarrollo activo.",
    "A pet-care learning app with updates focused on visuals, performance, clarity, and parent trust.": "Una app educativa de cuidado de mascotas con mejoras enfocadas en visuales, rendimiento, claridad y confianza para padres.",
    "App Store": "App Store",
    "Privacy policy": "Politica de privacidad",
    "M5SteamBridge is a local Mac tool with setup help and checksums for Steam compatibility workflows.": "M5SteamBridge es una herramienta local para Mac con ayuda de configuracion y checksums para flujos de compatibilidad con Steam.",
    "AI workflow systems": "Sistemas de flujo con IA",
    "Practical internal tools and AI-assisted workflows for repetitive research, content, support, and operations tasks.": "Herramientas internas practicas y flujos asistidos por IA para tareas repetitivas de investigacion, contenido, soporte y operaciones.",
    "AI tools": "Herramientas de IA",
    "Personal channel": "Canal personal",
    "DadBuildRepeat stays personal.": "DadBuildRepeat se mantiene personal.",
    "DadBuildRepeat is Jonathan's hobby and creator account for motorcycle gear, camera setups, and personal content experiments. It is linked here for context, but JBC Development remains focused on apps and software.": "DadBuildRepeat es la cuenta personal y de hobby de Jonathan para equipo de moto, configuraciones de camara y experimentos de contenido. Se enlaza aqui como contexto, pero JBC Development se mantiene enfocado en apps y software.",
    "Personal creator tests": "Pruebas personales de creador",
    "Personal reels and hobby posts": "Reels personales y publicaciones de hobby",
    "Shorts and longer ride edits": "Shorts y ediciones de rutas mas largas",
    "Page updates and reels": "Actualizaciones de pagina y reels",
    "Support for apps and software.": "Soporte para apps y software.",
    "For app questions, Mac setup, download checks, privacy, or software support.": "Para preguntas de apps, configuracion para Mac, descargas, privacidad o soporte de software.",
    "Support page": "Pagina de soporte",
    "Privacy and support": "Privacidad y soporte",
    "Support and privacy resources stay available for every app and software release.": "Los recursos de soporte y privacidad permanecen disponibles para cada lanzamiento de app y software.",
    "Contact support": "Contactar soporte",
    "All rights reserved.": "Todos los derechos reservados.",
    "Support | JBC Software Development LLC": "Soporte | JBC Software Development LLC",
    "Support and contact information for JBC Software Development LLC apps and local software.": "Informacion de soporte y contacto para apps y software local de JBC Software Development LLC.",
    "Get support for JBC Software Development LLC apps, downloads, and local Mac app software.": "Recibe soporte para apps, descargas y software local para Mac de JBC Software Development LLC.",
    "Support for JBC apps and software.": "Soporte para apps y software de JBC.",
    "Use this page for app support, Mac setup, download questions, privacy questions, or general contact with JBC Software Development LLC.": "Usa esta pagina para soporte de apps, configuracion para Mac, preguntas de descarga, privacidad o contacto general con JBC Software Development LLC.",
    "Email jbcsdevs@gmail.com for support, app, download, setup, privacy, or software questions.": "Escribe a jbcsdevs@gmail.com para preguntas de soporte, apps, descargas, configuracion, privacidad o software.",
    "What to include": "Que incluir",
    "For the fastest review, include:": "Para una revision mas rapida, incluye:",
    "Your name and the app, software, or download you are asking about.": "Tu nombre y la app, software o descarga sobre la que preguntas.",
    "A short description of the issue or request.": "Una descripcion corta del problema o solicitud.",
    "The device, browser, or operating system if this is a technical issue.": "El dispositivo, navegador o sistema operativo si es un problema tecnico.",
    "Steps to reproduce a bug, if relevant.": "Pasos para reproducir un error, si aplica.",
    "Any screenshot or error message that helps explain the issue.": "Cualquier captura o mensaje de error que ayude a explicar el problema.",
    "App support": "Soporte de apps",
    "For current or future JBC Software Development LLC apps, include the app name and the version number if available. App-specific support links may be added as each product is released.": "Para apps actuales o futuras de JBC Software Development LLC, incluye el nombre de la app y la version si esta disponible. Los enlaces de soporte especificos se agregaran segun se publique cada producto.",
    "Safety and privacy": "Seguridad y privacidad",
    "Do not send passwords, payment details, private customer records, or other sensitive data by email unless a secure process has been approved first.": "No envies contrasenas, datos de pago, registros privados de clientes u otros datos sensibles por email a menos que primero se apruebe un proceso seguro.",
    "Response expectations": "Expectativas de respuesta",
    "Support requests are reviewed manually. No automatic support tickets, proposals, billing, deployments, or external actions are created from this website.": "Las solicitudes de soporte se revisan manualmente. Este sitio no crea tickets automaticos, propuestas, facturacion, despliegues ni acciones externas.",
    "Start here": "Empieza aqui",
    "Send a concise note with the app, software, or download question.": "Envia una nota breve con la pregunta sobre app, software o descarga.",
    "Email support": "Enviar email a soporte",
    "M5SteamBridge help": "Ayuda de M5SteamBridge",
    "Mac download": "Descarga Mac",
    "Mac downloads": "Descargas para Mac",
    "Privacy Policy | JBC Software Development LLC": "Politica de privacidad | JBC Software Development LLC",
    "Privacy policy for JBC Software Development LLC, a Florida-based software and mobile app development company.": "Politica de privacidad de JBC Software Development LLC, una empresa de software y apps con sede en Florida.",
    "How JBC Software Development LLC handles website inquiries, app support requests, and privacy-sensitive information.": "Como JBC Software Development LLC maneja contacto del sitio, soporte de apps e informacion sensible de privacidad.",
    "Privacy for app and software support.": "Privacidad para soporte de apps y software.",
    "JBC Software Development LLC keeps privacy practices simple: collect only what is needed to respond to support questions, avoid unnecessary sensitive data, and keep app-specific privacy details visible for public releases.": "JBC Software Development LLC mantiene practicas de privacidad simples: recopilar solo lo necesario para responder preguntas de soporte, evitar datos sensibles innecesarios y mantener visibles los detalles de privacidad de cada app para lanzamientos publicos.",
    "Last updated: July 10, 2026": "Ultima actualizacion: 10 de julio de 2026",
    "Information you choose to share": "Informacion que decides compartir",
    "If you contact JBC Software Development LLC by email, you may choose to share your name, email address, app or software details, device details, screenshots, and notes needed to answer your support question.": "Si contactas a JBC Software Development LLC por email, puedes compartir tu nombre, correo, detalles de la app o software, dispositivo, capturas y notas necesarias para responder tu pregunta de soporte.",
    "Website contact": "Contacto del sitio",
    "This website uses direct email links for support and contact. It does not automatically send forms, store submissions, create leads, or add your information to a database.": "Este sitio usa enlaces directos de email para soporte y contacto. No envia formularios automaticamente, no guarda envios, no crea prospectos ni agrega tu informacion a una base de datos.",
    "The language switcher may save your English or Spanish preference in your browser only. This preference is not sent by this website.": "El selector de idioma puede guardar tu preferencia de ingles o espanol solo en tu navegador. Esta preferencia no se envia por este sitio.",
    "How information is used": "Como se usa la informacion",
    "Information you choose to send may be used to:": "La informacion que decides enviar puede usarse para:",
    "Respond to support, privacy, app, or software questions.": "Responder preguntas de soporte, privacidad, apps o software.",
    "Understand app, download, setup, or troubleshooting needs.": "Entender necesidades de apps, descargas, configuracion o solucion de problemas.",
    "Prepare internal notes after review.": "Preparar notas internas despues de revisar.",
    "Provide support for JBC Software Development LLC apps and software.": "Dar soporte a apps y software de JBC Software Development LLC.",
    "App privacy policies": "Politicas de privacidad de apps",
    "Privacy Policy for PainTrail": "Politica de privacidad de PainTrail",
    "PainTrail is a personal record-keeping app designed so that health information stays under the user's control. PainTrail stores pain check-ins, medication records, visit-preparation notes and questions, app settings, and Pro unlock status locally on the device. PainTrail does not operate a server and does not automatically upload this information.": "PainTrail es una app de registro personal disenada para que la informacion de salud permanezca bajo el control del usuario. PainTrail guarda en el dispositivo registros de dolor, registros de medicamentos, notas y preguntas de preparacion para visitas, ajustes de la app y el estado de desbloqueo Pro. PainTrail no opera un servidor ni carga automaticamente esta informacion.",
    "PainTrail provides a manual JSON backup. The backup contains pain check-ins and medication records only. It does not include visit details, questions, the pain profile, app settings, or Pro purchase state. The user chooses where to save or share the file through the iOS share sheet. PainTrail does not automatically upload backups to iCloud or any other service. Once a file leaves PainTrail, the selected destination handles that copy under its own terms and privacy practices.": "PainTrail ofrece una copia de seguridad JSON manual. La copia contiene solo registros de dolor y medicamentos. No incluye detalles de visitas, preguntas, el perfil de dolor, ajustes de la app ni el estado de compra Pro. El usuario elige donde guardar o compartir el archivo mediante la hoja para compartir de iOS. PainTrail no carga automaticamente copias en iCloud ni en otro servicio. Cuando un archivo sale de PainTrail, el destino seleccionado administra esa copia segun sus propios terminos y practicas de privacidad.",
    "PainTrail does not use advertising, analytics, or tracking software; create a user account; or sell or rent user data. Information leaves local app storage only when the user initiates PDF sharing or a manual JSON export.": "PainTrail no usa publicidad, analiticas ni software de seguimiento; no crea una cuenta de usuario; ni vende o alquila datos del usuario. La informacion sale del almacenamiento local de la app solo cuando el usuario inicia el envio de un PDF o una exportacion JSON manual.",
    "PainTrail offers an optional one-time Pro purchase processed by Apple through the App Store. JBC Software Development LLC does not receive or store payment information.": "PainTrail ofrece una compra Pro opcional de pago unico procesada por Apple mediante el App Store. JBC Software Development LLC no recibe ni almacena informacion de pago.",
    "Deleting PainTrail removes data stored inside the app from the device. PainTrail does not currently provide an in-app reset, delete-all, or individual-entry deletion control. PDF and JSON files previously shared or exported must be deleted separately from the locations where the user chose to save them.": "Eliminar PainTrail quita del dispositivo los datos guardados dentro de la app. PainTrail no ofrece actualmente controles dentro de la app para restablecer, eliminar todo ni borrar entradas individuales. Los archivos PDF y JSON compartidos o exportados anteriormente deben eliminarse por separado de los lugares donde el usuario eligio guardarlos.",
    "PainTrail is not a medical device and does not provide medical advice, diagnosis, treatment recommendations, medication guidance, or emergency support. Users should consult a qualified healthcare professional about medical decisions.": "PainTrail no es un dispositivo medico y no proporciona consejos medicos, diagnosticos, recomendaciones de tratamiento, orientacion sobre medicamentos ni asistencia de emergencia. Los usuarios deben consultar a un profesional de salud cualificado sobre decisiones medicas.",
    "Third-party services": "Servicios de terceros",
    "Data retention": "Retencion de datos",
    "For privacy, support, or app-related questions, email jbcsdevs@gmail.com.": "Para preguntas de privacidad, soporte o apps, escribe a jbcsdevs@gmail.com.",
    "Need help?": "Necesitas ayuda?",
    "Use email for privacy, support, app, or project questions.": "Usa email para preguntas de privacidad, soporte, apps o proyectos.",
    "Email JBC Development": "Enviar email a JBC Development",
    "Open support page": "Abrir pagina de soporte",
    "JBC apps and software downloads.": "Descargas de apps y software de JBC.",
    "Download current apps and free local Mac software.": "Descarga apps actuales y software local gratuito para Mac.",
    "Available apps and local software": "Apps disponibles y software local",
    "Download apps, Mac tools, and release verification files from JBC Development.": "Descarga apps, herramientas para Mac y archivos de verificacion de lanzamientos de JBC Development.",
    "Available downloads": "Descargas disponibles",
    "Current apps and software downloads.": "Apps actuales y descargas de software.",
    "Download current App Store products and local Mac app software from JBC Development.": "Descarga productos actuales del App Store y software local para Mac de JBC Development.",
    "Open support": "Abrir soporte",
    "Download CHECKSUMS.sha256": "Descargar CHECKSUMS.sha256",
    "Open GitHub Release": "Abrir version en GitHub",
    "Store": "Tienda",
    "Store | JBC Software Development LLC": "Tienda | JBC Software Development LLC",
    "Digital products from JBC Development.": "Productos digitales de JBC Development.",
    "E-books, templates, digital art and assets, and software tools, delivered instantly through secure checkout. No account is required to buy.": "Ebooks, plantillas, arte y recursos digitales, y herramientas de software, con entrega instantanea mediante pago seguro. No se necesita cuenta para comprar.",
    "Browse products": "Ver productos",
    "How checkout works": "Como funciona el pago",
    "E-books and guides": "Ebooks y guias",
    "Practical PDFs you can read today, written from real release work.": "PDFs practicos que puedes leer hoy, escritos desde trabajo real de lanzamiento.",
    "Templates": "Plantillas",
    "Reusable files that save setup time on your next project.": "Archivos reutilizables que ahorran tiempo de configuracion en tu proximo proyecto.",
    "Digital art and assets": "Arte y recursos digitales",
    "Ready-to-use art kits for apps, games, and prototypes.": "Kits de arte listos para usar en apps, juegos y prototipos.",
    "Software and tools": "Software y herramientas",
    "Licensed local tools and scripts with setup notes and clear limits.": "Herramientas y scripts locales con licencia, con notas de configuracion y limites claros.",
    "E-book": "Ebook",
    "Template": "Plantilla",
    "Asset pack": "Pack de recursos",
    "Software": "Software",
    "Indie App Release Playbook": "Manual de lanzamiento de apps indie",
    "A practical guide to planning, signing, shipping, and supporting small software releases.": "Una guia practica para planificar, firmar, publicar y dar soporte a lanzamientos de software pequenos.",
    "AI Workflow Starter Guide": "Guia inicial de flujos con IA",
    "Set up repeatable AI-assisted research, content, and support workflows from scratch.": "Configura desde cero flujos repetibles de investigacion, contenido y soporte asistidos por IA.",
    "Release Checklist Template Pack": "Pack de plantillas de checklist de lanzamiento",
    "Reusable release, QA, and support checklists for solo developers and small teams.": "Checklists reutilizables de lanzamiento, QA y soporte para desarrolladores individuales y equipos pequenos.",
    "Project Workflow Board": "Tablero de flujo de proyecto",
    "Plan, build, and ship products with a structured discover, design, build, ship board.": "Planifica, crea y publica productos con un tablero estructurado de descubrir, disenar, crear y publicar.",
    "Game Icon Asset Pack": "Pack de iconos para juegos",
    "A cohesive 12-icon set for apps and arcade-style games.": "Un set cohesivo de 12 iconos para apps y juegos estilo arcade.",
    "UI Background and Texture Pack": "Pack de fondos y texturas de UI",
    "Six ready-to-use background textures for apps, games, and prototypes.": "Seis texturas de fondo listas para usar en apps, juegos y prototipos.",
    "Mac Automation Script Bundle": "Paquete de scripts de automatizacion para Mac",
    "Local automation scripts with setup notes, usage examples, and clear limits.": "Scripts de automatizacion locales con notas de configuracion, ejemplos de uso y limites claros.",
    "Developer Utility License": "Licencia de utilidad para desarrolladores",
    "A licensed local utility delivered with a software license key and a support path.": "Una utilidad local con licencia, entregada con una clave de licencia de software y una ruta de soporte.",
    "Buy now": "Comprar",
    "Buying is fast and secure. Checkout opens in a small overlay, payment is processed by the store provider, and your files are delivered instantly after purchase.": "Comprar es rapido y seguro. El pago se abre en una ventana pequena, lo procesa el proveedor de la tienda y tus archivos se entregan al instante despues de la compra.",
    "Secure payment": "Pago seguro",
    "Card payments are handled by the checkout provider. This website never sees or stores your card details, and no account is required to complete a purchase.": "Los pagos con tarjeta los gestiona el proveedor de pago. Este sitio nunca ve ni guarda los datos de tu tarjeta, y no se necesita cuenta para completar una compra.",
    "Instant delivery": "Entrega instantanea",
    "After payment you get an immediate download link and an email copy. Software products may include a license key delivered the same way.": "Despues del pago recibes un enlace de descarga inmediato y una copia por email. Los productos de software pueden incluir una clave de licencia entregada de la misma forma.",
    "Refunds and support": "Reembolsos y soporte",
    "For purchase questions, download issues, or refund requests, email": "Para preguntas de compra, problemas de descarga o solicitudes de reembolso, escribe a",
    "with your order details.": "con los detalles de tu pedido.",
    "Need help with an order?": "¿Necesitas ayuda con un pedido?",
    "Get direct help with purchases, downloads, license keys, or refunds.": "Obtén ayuda directa con compras, descargas, claves de licencia o reembolsos.",
    "Purchase support": "Soporte de compras",
    "Custom software, built and shipped": "Software personalizado, construido y publicado",
    "iOS, Mac, and AI tooling —": "Herramientas iOS, Mac y IA —",
    "built by one person.": "construidas por una sola persona.",
    "JBC Development takes on scoped custom work: iOS apps, signed Mac utilities, automation, and AI-assisted workflows. One person handling the full stack, from scope to shipped build.": "JBC Development toma trabajo personalizado acotado: apps iOS, utilidades Mac firmadas, automatizacion y flujos asistidos por IA. Una sola persona a cargo de todo, desde el alcance hasta la publicacion.",
    "Book a call": "Reservar una llamada",
    "iOS Apps": "Apps iOS",
    "Mac Tools": "Herramientas Mac",
    "AI Workflows": "Flujos de IA",
    "How custom work gets scoped and shipped.": "Como se acota y publica el trabajo personalizado.",
    "Same release discipline as every JBC product — applied to your project.": "La misma disciplina de publicacion de cada producto JBC, aplicada a tu proyecto.",
    "Scope the job": "Definir el alcance",
    "Clarify the goal, platform, timeline, and budget before anything gets built.": "Aclarar el objetivo, la plataforma, el cronograma y el presupuesto antes de construir nada.",
    "Build the smallest useful version": "Construir la version util mas pequena",
    "No scope creep. Ship what solves the stated problem first.": "Sin expansion de alcance. Publicar primero lo que resuelve el problema planteado.",
    "Ship it signed": "Publicarlo firmado",
    "Mac builds ship signed, notarized, with published checksums — same as every JBC release.": "Las compilaciones Mac se publican firmadas, notarizadas y con checksums publicados, igual que cada version de JBC.",
    "Support it after": "Darle soporte despues",
    "Direct email support and documented limits, not a handoff into silence.": "Soporte directo por correo y limites documentados, no una entrega al silencio.",
    "Live App Store app": "App activa en App Store",
    "Same discipline applies to custom work — not just the apps on this site.": "La misma disciplina aplica al trabajo personalizado, no solo a las apps de este sitio.",
    "What \"custom work\" means here.": "Que significa \"trabajo personalizado\" aqui.",
    "Ready to scope your project?": "Listo para definir el alcance de tu proyecto?",
    "Send the details or book a call — either way, expect a direct reply, not a form queue.": "Envia los detalles o reserva una llamada: en ambos casos, espera una respuesta directa, no una fila de formularios.",
    "Mac downloads are signed and notarized. M5SteamBridge does not include Steam, games, Wine bottles, CrossOver, Whisky, or proprietary runtimes and does not bypass DRM, anti-cheat, ownership checks, or platform restrictions.": "Las descargas Mac estan firmadas y notarizadas. M5SteamBridge no incluye Steam, juegos, botellas Wine, CrossOver, Whisky ni runtimes propietarios, y no evita DRM, sistemas anti-trampas, verificaciones de propiedad ni restricciones de plataforma.",
    "See how custom work gets scoped and shipped": "Mira como se acota y publica el trabajo personalizado",
    "M5SteamBridge for local Steam setup help.": "M5SteamBridge para ayuda local de configuracion de Steam.",
    "This free download is signed, notarized, and built for local use on Mac. It does not include cloud accounts, billing, hosted storage, Steam, games, or bundled compatibility backends.": "Esta descarga gratuita esta firmada, notarizada y hecha para uso local en Mac. No incluye cuentas en la nube, facturacion, almacenamiento alojado, Steam, juegos, ni backends de compatibilidad incluidos.",
    "Set up and launch Windows Steam through your own Mac compatibility backend.": "Configura y ejecuta Steam de Windows a traves de tu propio backend de compatibilidad para Mac.",
    "M5SteamBridge is a local helper for users who install their own backend such as Whisky or CrossOver. It provides first-run checks, Steam launch helpers, per-game profiles, compatibility scanning, health checks, and error recovery guidance without bundling Steam or games.": "M5SteamBridge es un ayudante local para usuarios que instalan su propio backend, como Whisky o CrossOver. Ofrece verificaciones de primer uso, ayudantes para iniciar Steam, perfiles por juego, escaneo de compatibilidad, chequeos de salud y guia de recuperacion de errores, sin incluir Steam ni juegos.",
    "Version": "Version",
    "Mac build": "Compilacion Mac",
    "Signed and notarized DMG": "DMG firmado y notarizado",
    "First-run setup": "Configuracion de primer uso",
    "Download the DMG, open it, and drag M5SteamBridge to Applications.": "Descarga el DMG, abrelo y arrastra M5SteamBridge a Aplicaciones.",
    "Install your own compatibility backend, such as Whisky or CrossOver.": "Instala tu propio backend de compatibilidad, como Whisky o CrossOver.",
    "Use your own Steam installer, Steam account, and owned games.": "Usa tu propio instalador de Steam, tu cuenta de Steam y tus juegos.",
    "Run the first-run checks and install DXVK when prompted.": "Ejecuta las verificaciones de primer uso e instala DXVK cuando se te pida.",
    "Launch Steam, scan installed games, and apply per-game profiles as needed.": "Ejecuta Steam, escanea los juegos instalados y aplica perfiles por juego segun sea necesario.",
    "Important limits": "Limites importantes",
    "M5SteamBridge does not include Steam, games, Wine bottles, Whisky, CrossOver, or proprietary runtimes.": "M5SteamBridge no incluye Steam, juegos, botellas Wine, Whisky, CrossOver ni runtimes propietarios.",
    "It does not bypass DRM, anti-cheat, ownership checks, or platform restrictions.": "No evita DRM, sistemas anti-trampas, verificaciones de propiedad ni restricciones de plataforma.",
    "Compatibility varies by game, backend, graphics stack, launcher behavior, and anti-cheat support.": "La compatibilidad varia segun el juego, el backend, el motor grafico, el comportamiento del launcher y el soporte anti-trampas.",
    "Blocked anti-cheat is a compatibility limit, not a bypass target.": "Un anti-trampas bloqueado es un limite de compatibilidad, no un objetivo a evadir.",
    "After downloading, compare the file against the SHA-256 checksum above or download the checksum file from the release.": "Despues de descargar, compara el archivo con el checksum SHA-256 de arriba o descarga el archivo de checksum desde la version.",
    "for support, app, download, setup, privacy, or software questions.": "para preguntas de soporte, apps, descargas, configuracion, privacidad o software.",
    "M5SteamBridge is a Steam setup helper for user-installed compatibility backends. It does not include Steam, games, Whisky, CrossOver, Wine bottles, proprietary runtimes, or any anti-cheat, DRM, ownership, platform, or account bypass.": "M5SteamBridge es un ayudante de configuracion de Steam para backends de compatibilidad instalados por el usuario. No incluye Steam, juegos, Whisky, CrossOver, botellas Wine, runtimes propietarios, ni ningun tipo de evasion de anti-trampas, DRM, propiedad, plataforma o cuenta.",
    "Verify checksums": "Verificar checksums",
    "M5SteamBridge setup and troubleshooting": "Configuracion y solucion de problemas de M5SteamBridge",
    "Install your own compatibility backend, then run the first-run setup checks inside M5SteamBridge.": "Instala tu propio backend de compatibilidad y luego ejecuta las verificaciones de configuracion de primer uso dentro de M5SteamBridge.",
    "Start with one owned lightweight game, run Check Game, then try the safe or performance profile before testing more titles.": "Empieza con un juego liviano que ya tengas, ejecuta Verificar Juego y luego prueba el perfil seguro o de rendimiento antes de probar mas titulos.",
    "If a game fails, capture diagnostics with preview enabled so private account data can be reviewed before sending anything.": "Si un juego falla, captura diagnosticos con la vista previa activada para que los datos privados de la cuenta puedan revisarse antes de enviar algo.",
    "For support, include your backend, game name, Steam App ID if known, health-check result, selected profile, and the visible error message. Compatibility is game-by-game.": "Para soporte, incluye tu backend, el nombre del juego, el ID de App de Steam si lo conoces, el resultado del chequeo de salud, el perfil seleccionado y el mensaje de error visible. La compatibilidad se evalua juego por juego.",
    "Release notes": "Notas de version",
    "Setup help": "Ayuda de configuracion",
    "JBC Software Development LLC keeps privacy practices simple: collect only what is needed to respond to support questions, avoid unnecessary sensitive data, and keep app-specific privacy details visible for public releases.": "JBC Software Development LLC mantiene practicas de privacidad simples: recopilar solo lo necesario para responder preguntas de soporte, evitar datos sensibles innecesarios y mantener visibles los detalles de privacidad especificos de cada app para lanzamientos publicos.",
    "Do not send passwords, payment information, private customer records, medical information, or other sensitive information through the website or email unless it has been specifically requested through a secure, approved process.": "No envies contrasenas, informacion de pago, registros privados de clientes, informacion medica u otra informacion sensible a traves del sitio o email, a menos que se haya solicitado especificamente mediante un proceso seguro y aprobado.",
    "is an iOS app for kids and parents with no ads, tracking, third-party analytics, custom account system, custom cloud save, chat, or push notifications. The app uses Apple StoreKit for optional non-consumable in-app purchases to unlock additional pet-care lessons and mini-games. JBC Software Development LLC does not operate a separate purchase, account, analytics, cloud-save, or gameplay data server for Paw Care Academy.": "es una app iOS para ninos y padres, sin anuncios, rastreo, analitica de terceros, sistema de cuentas propio, guardado en la nube propio, chat ni notificaciones push. La app usa Apple StoreKit para compras opcionales no consumibles dentro de la app que desbloquean lecciones adicionales de cuidado de mascotas y minijuegos. JBC Software Development LLC no opera un servidor separado de compras, cuentas, analitica, guardado en la nube o datos de juego para Paw Care Academy.",
    "Paw Care Academy stores local progress on the device, including lessons completed, mini-game scores, practice progress, earned badges, selected pet, and purchase entitlement after a successful Apple purchase or restore. This local data supports offline play and is not uploaded to a JBC server.": "Paw Care Academy guarda el progreso localmente en el dispositivo, incluyendo lecciones completadas, puntajes de minijuegos, progreso de practica, insignias obtenidas, mascota seleccionada y el derecho de compra despues de una compra o restauracion exitosa de Apple. Estos datos locales permiten el juego sin conexion y no se suben a un servidor de JBC.",
    "M5SteamBridge is a local Mac app distributed from this website. M5SteamBridge keeps setup status, compatibility settings, and diagnostics previews local unless a user chooses to send support information by email.": "M5SteamBridge es una app local para Mac distribuida desde este sitio. M5SteamBridge mantiene el estado de configuracion, los ajustes de compatibilidad y las vistas previas de diagnostico de forma local, a menos que el usuario decida enviar informacion de soporte por email.",
    "The app uses manual update checks only. When a user clicks Check for Updates, the app reads a static JBC Development update manifest. The app does not run background telemetry, create accounts, upload files to hosted storage, or install updates automatically.": "La app solo usa verificaciones manuales de actualizacion. Cuando un usuario hace clic en Buscar actualizaciones, la app lee un manifiesto de actualizacion estatico de JBC Development. La app no ejecuta telemetria en segundo plano, no crea cuentas, no sube archivos a almacenamiento alojado ni instala actualizaciones automaticamente.",
    "JBC Software Development LLC may use ordinary business services such as email, hosting, domain services, analytics, app stores, development tools, or support tools. These providers may process information according to their own terms and privacy policies.": "JBC Software Development LLC puede usar servicios comerciales ordinarios como email, hosting, servicios de dominio, analitica, tiendas de apps, herramientas de desarrollo o herramientas de soporte. Estos proveedores pueden procesar informacion segun sus propios terminos y politicas de privacidad.",
    "Inquiry and support information may be kept as long as needed to respond, maintain records, manage support, or meet normal business needs. You may ask for correction or deletion of information you previously provided.": "La informacion de consultas y soporte puede conservarse durante el tiempo necesario para responder, mantener registros, gestionar el soporte o cumplir necesidades comerciales normales. Puedes solicitar la correccion o eliminacion de la informacion que hayas proporcionado anteriormente.",
    "For privacy, support, or app-related questions, email": "Para preguntas de privacidad, soporte o relacionadas con apps, escribe a",
    "M5SteamBridge | Open-Source Windows Steam Setup Help for Mac": "M5SteamBridge | Ayuda de codigo abierto para configurar Windows Steam en Mac",
    "Free, open-source Mac companion": "Companero Mac gratuito y de codigo abierto",
    "Understand your Windows Steam setup before you chase another fix.": "Entiende tu configuracion de Windows Steam antes de buscar otra solucion.",
    "M5SteamBridge checks setup readiness, scans locally installed games, and turns common launch failures into understandable next steps. You bring your own compatibility backend, Steam account, and owned games.": "M5SteamBridge comprueba la configuracion, analiza juegos instalados localmente y convierte fallos comunes de inicio en proximos pasos claros. Tu proporcionas tu propia capa de compatibilidad, cuenta de Steam y juegos adquiridos.",
    "Download signed DMG": "Descargar DMG firmado",
    "View source": "Ver codigo fuente",
    "Signed and notarized": "Firmado y notarizado",
    "Local-first": "Local primero",
    "No telemetry": "Sin telemetria",
    "No account required": "Sin cuenta requerida",
    "See the setup-check workflow": "Mira el flujo de comprobacion",
    "The demo uses the real app: review readiness, profile guidance, error recovery, and the diagnostics privacy preview.": "La demostracion usa la app real: revisa la preparacion, la guia de perfiles, la recuperacion de errores y la vista previa de privacidad de diagnosticos.",
    "Your browser does not support embedded video.": "Tu navegador no admite video incrustado.",
    "This 40-second screen recording has no audio. The visual sequence is described below.": "Esta grabación de pantalla de 40 segundos no tiene audio. La secuencia visual se describe a continuación.",
    "Read the video transcript": "Leer la transcripción del video",
    "M5SteamBridge opens to its readiness overview and checks the user-installed compatibility backend.": "M5SteamBridge abre su resumen de preparación y comprueba la capa de compatibilidad instalada por el usuario.",
    "The overview identifies which setup components are ready and which need attention.": "El resumen identifica qué componentes están listos y cuáles necesitan atención.",
    "Game Profiles shows local, game-by-game checks and conservative launch guidance.": "Perfiles de juegos muestra comprobaciones locales para cada juego y orientación prudente para iniciarlos.",
    "Troubleshooting organizes recovery steps for common launch failures.": "Solución de problemas organiza pasos de recuperación para fallos de inicio comunes.",
    "The diagnostics preview shows what information will be shared before the user exports it.": "La vista previa de diagnóstico muestra qué información se compartirá antes de que el usuario la exporte.",
    "One companion for the confusing parts.": "Un companero para las partes confusas.",
    "M5SteamBridge does not replace CrossOver, Wine, or Steam. It makes their setup state and common failures easier to understand.": "M5SteamBridge no reemplaza CrossOver, Wine ni Steam. Facilita entender su configuracion y sus fallos comunes.",
    "Verify readiness.": "Verifica la preparacion.",
    "Check the Mac, backend, Steam bottle, and graphics components.": "Comprueba el Mac, la capa, la botella de Steam y los componentes graficos.",
    "Review one game.": "Revisa un juego.",
    "Scan local files for conservative profile suggestions and warnings.": "Analiza archivos locales para obtener perfiles conservadores y advertencias.",
    "Recover clearly.": "Recuperate con claridad.",
    "Turn common launch failures into bounded troubleshooting steps.": "Convierte fallos comunes de inicio en pasos acotados de solucion.",
    "Clear limits, before you download.": "Limites claros, antes de descargar.",
    "CrossOver is the preferred maintained backend.": "CrossOver es la capa mantenida preferida.",
    "Whisky-derived community paths are experimental and may break as other software changes.": "Las opciones comunitarias derivadas de Whisky son experimentales y pueden fallar cuando cambia otro software.",
    "M5SteamBridge does not include Steam, games, backends, Wine bottles, or proprietary runtimes.": "M5SteamBridge no incluye Steam, juegos, capas, botellas de Wine ni runtimes propietarios.",
    "It does not bypass DRM, ownership checks, platform restrictions, or anti-cheat.": "No evita DRM, comprobaciones de propiedad, restricciones de plataforma ni sistemas antitrampas.",
    "Compatibility varies by game, Mac, backend, graphics stack, and launcher behavior.": "La compatibilidad varia segun el juego, Mac, capa, sistema grafico y comportamiento del lanzador.",
    "M5SteamBridge is not affiliated with or endorsed by Valve Corporation, CodeWeavers, the Wine project, or the Whisky project.": "M5SteamBridge no esta afiliado ni respaldado por Valve Corporation, CodeWeavers, el proyecto Wine ni el proyecto Whisky.",
    "Start with one owned game.": "Empieza con un juego adquirido.",
    "A small test gives you useful evidence without turning the whole library into a troubleshooting project.": "Una prueba pequena aporta evidencia util sin convertir toda la biblioteca en un proyecto de diagnostico.",
    "Install the app": "Instala la app",
    "Download the signed DMG, verify its checksum, and move the app to Applications.": "Descarga el DMG firmado, verifica su checksum y mueve la app a Aplicaciones.",
    "Use your backend": "Usa tu capa",
    "Configure your own CrossOver or compatible Wine setup and your own Steam installation.": "Configura tu propia instalacion de CrossOver o Wine compatible y tu propia instalacion de Steam.",
    "Check one game": "Comprueba un juego",
    "Review the local scan, warnings, suggested profile, and any protected anti-cheat block.": "Revisa el analisis local, advertencias, perfil sugerido y cualquier bloqueo antitrampas protegido.",
    "Test and report": "Prueba e informa",
    "Run one monitored launch when appropriate, then share only a sanitized result.": "Ejecuta un inicio supervisado cuando corresponda y comparte solo un resultado saneado.",
    "Help test the setup flow.": "Ayuda a probar el flujo de configuracion.",
    "Report one reproducible problem or one owned-game compatibility result. Never post credentials, account data, raw private logs, bottle contents, cookies, installers, or game files.": "Informa un problema reproducible o un resultado de compatibilidad de un juego adquirido. Nunca publiques credenciales, datos de cuenta, registros privados sin filtrar, botellas, cookies, instaladores ni archivos de juegos.",
    "Open feedback templates": "Abrir plantillas de comentarios",
    "Read setup help": "Leer ayuda de configuracion",
    "Built and maintained by JBC Software Development LLC.": "Creado y mantenido por JBC Software Development LLC.",
    "© 2026 Valve Corporation. Steam and the Steam logo are trademarks and/or registered trademarks of Valve Corporation in the U.S. and/or other countries.": "© 2026 Valve Corporation. Steam y el logotipo de Steam son marcas comerciales y/o registradas de Valve Corporation en EE. UU. y/u otros paises.",
    "Explore M5SteamBridge": "Explorar M5SteamBridge",
    "Product overview": "Descripcion del producto",
  },
};

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
