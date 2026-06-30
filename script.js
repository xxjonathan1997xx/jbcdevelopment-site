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
    "JBC Software Development LLC keeps privacy practices simple: collect only what is needed to respond to support questions, avoid unnecessary sensitive data, and review app-specific privacy needs before launch.": "JBC Software Development LLC mantiene practicas de privacidad simples: recopilar solo lo necesario para responder preguntas de soporte, evitar datos sensibles innecesarios y revisar necesidades de privacidad de cada app antes del lanzamiento.",
    "Last updated: June 25, 2026": "Ultima actualizacion: 25 de junio de 2026",
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
    "A clean, ready-to-use icon set for apps and arcade-style games.": "Un set de iconos limpio y listo para usar en apps y juegos estilo arcade.",
    "UI Background and Texture Pack": "Pack de fondos y texturas de UI",
    "Ready-to-use background textures for apps, games, and prototypes.": "Texturas de fondo listas para usar en apps, juegos y prototipos.",
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
    "Also available on": "Tambien disponible en",
    "Some products are listed on free marketplaces for extra reach.": "Algunos productos se publican en tiendas gratuitas para mayor alcance.",
    "itch.io store": "Tienda itch.io",
    "Ko-fi shop": "Tienda Ko-fi",
    "Purchase support": "Soporte de compras",
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
  },
};

initializeTranslation();
initializeMotion();

if (navToggle && navLinks) {
  navToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  navLinks.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      navLinks.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
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
