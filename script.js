const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const intakeForm = document.querySelector("#intakeForm");
const intakeMessage = document.querySelector("#intakeMessage");
const intakeResult = document.querySelector("#intakeResult");
const intakeSummary = document.querySelector("#intakeSummary");
const intakeMailLink = document.querySelector("#intakeMailLink");
const copyInquiryButton = document.querySelector("#copyInquiryButton");
const languageButtons = document.querySelectorAll("[data-language-option]");

const LANGUAGE_STORAGE_KEY = "jbcdevelopment-language";
const SUPPORTED_LANGUAGES = new Set(["en", "es"]);

let currentLanguage = "en";
const originalTextNodes = [];
const originalAttributeValues = [];

const uiCopy = {
  en: {
    copyCopied: "Inquiry summary copied.",
    copyFallback: "Select and copy the highlighted summary.",
    honeypotSuccess: "Thanks. Please email jonathan@jbcdevelopment.dev directly if you need help.",
    invalidEmail: "Please enter a valid email address.",
    missingFields: "Please complete the required fields before preparing the inquiry.",
    painPointDetail: "Please add a little more detail about the main problem or pain point.",
    preparedSuccess: "Inquiry prepared. Review the summary, then open the email draft when ready.",
    summaryTitle: "Website inquiry for JBC Software Development LLC",
    summarySubject: "Website inquiry",
    labels: {
      budgetRange: "Budget range",
      businessName: "Business name",
      contactName: "Contact name",
      desiredTimeline: "Desired timeline",
      email: "Email",
      notes: "Notes",
      painPoint: "Main problem / pain point",
      phone: "Phone",
      serviceNeeded: "Service needed",
    },
    notProvided: "Not provided",
    noAdditionalNotes: "No additional notes.",
  },
  es: {
    copyCopied: "Resumen de consulta copiado.",
    copyFallback: "Selecciona y copia el resumen resaltado.",
    honeypotSuccess: "Gracias. Escribe directamente a jonathan@jbcdevelopment.dev si necesitas ayuda.",
    invalidEmail: "Ingresa un correo electrónico válido.",
    missingFields: "Completa los campos requeridos antes de preparar la consulta.",
    painPointDetail: "Agrega un poco más de detalle sobre el problema principal.",
    preparedSuccess: "Consulta preparada. Revisa el resumen y luego abre el borrador del correo.",
    summaryTitle: "Consulta del sitio web para JBC Software Development LLC",
    summarySubject: "Consulta del sitio web",
    labels: {
      budgetRange: "Rango de presupuesto",
      businessName: "Nombre del negocio",
      contactName: "Nombre de contacto",
      desiredTimeline: "Tiempo deseado",
      email: "Correo electrónico",
      notes: "Notas",
      painPoint: "Problema principal",
      phone: "Teléfono",
      serviceNeeded: "Servicio necesario",
    },
    notProvided: "No proporcionado",
    noAdditionalNotes: "Sin notas adicionales.",
  },
};

const translations = {
  es: {
    "Skip to content": "Saltar al contenido",
    "Toggle navigation": "Alternar navegación",
    "Services": "Servicios",
    "How We Work": "Cómo trabajamos",
    "Projects": "Proyectos",
    "Intake": "Consulta",
    "Privacy": "Privacidad",
    "Support": "Soporte",
    "Contact": "Contacto",
    "Privacy Policy": "Política de privacidad",
    "Practical software for small businesses.": "Software práctico para pequeños negocios.",
    "Custom apps, dashboards, AI tools, and automation built in clear, manageable phases.": "Apps, paneles, herramientas de IA y automatización creadas en fases claras y manejables.",
    "Tell me what you need built": "Cuéntame qué necesitas crear",
    "View services": "Ver servicios",
    "Apps": "Apps",
    "Dashboards": "Paneles",
    "AI tools": "Herramientas de IA",
    "Automation": "Automatización",
    "Built in Florida. Carefully scoped. Easy to maintain.": "Creado en Florida. Alcance claro. Fácil de mantener.",
    "Available apps": "Apps disponibles",
    "Apps by JBC Development.": "Apps de JBC Development.",
    "Download current apps from the App Store and free local Mac beta tools.": "Descarga las apps actuales desde App Store y herramientas beta gratuitas para Mac local.",
    "Education": "Educación",
    "Education / Games": "Educación / Juegos",
    "Kid-friendly pet-care learning.": "Aprendizaje de cuidado de mascotas para niños.",
    "Open in App Store": "Abrir en App Store",
    "Health & Fitness": "Salud y bienestar",
    "OpenCircle Men": "OpenCircle Men",
    "Mental wellness resources for men.": "Recursos de bienestar mental para hombres.",
    "OpenCircle Women": "OpenCircle Women",
    "Mental wellness resources for women.": "Recursos de bienestar mental para mujeres.",
    "Mac beta / 3D assets": "Beta Mac / activos 3D",
    "PhotoMesh Studio": "PhotoMesh Studio",
    "Local photo-to-GLB workflow for game assets.": "Flujo local de foto a GLB para activos de juegos.",
    "Download notarized DMG": "Descargar DMG notarizado",
    "Mac beta / Steam helper": "Beta Mac / ayuda para Steam",
    "M5SteamBridge": "M5SteamBridge",
    "Local launcher helper for user-installed compatibility backends.": "Ayuda local de lanzamiento para capas de compatibilidad instaladas por el usuario.",
    "Mac beta downloads are signed and notarized. PhotoMesh Studio requires users to configure their own local Stable Fast 3D model files and runner. Stable Fast 3D support is powered by Stability AI and subject to the Stability AI Community License. M5SteamBridge does not include Steam, games, Wine bottles, CrossOver, Whisky, or proprietary runtimes and does not bypass DRM, anti-cheat, ownership checks, or platform restrictions.": "Las descargas beta para Mac están firmadas y notarizadas. PhotoMesh Studio requiere que los usuarios configuren sus propios archivos de modelo y ejecutor local de Stable Fast 3D. El soporte de Stable Fast 3D funciona con tecnología de Stability AI y está sujeto a la licencia Stability AI Community License. M5SteamBridge no incluye Steam, juegos, botellas de Wine, CrossOver, Whisky ni runtimes propietarios, y no evita DRM, anti-cheat, verificaciones de propiedad ni restricciones de plataforma.",
    "Verify checksums": "Verificar checksums",
    "About": "Acerca de",
    "Focused technology for real business work.": "Tecnología enfocada para el trabajo real del negocio.",
    "JBC Software Development LLC builds simple, useful tools for small businesses that need better ways to collect requests, track work, and reduce repeat admin.": "JBC Software Development LLC crea herramientas simples y útiles para pequeños negocios que necesitan mejores formas de recibir solicitudes, dar seguimiento al trabajo y reducir tareas repetidas.",
    "What JBC Development builds.": "Lo que crea JBC Development.",
    "Focused software for everyday operations.": "Software enfocado para operaciones diarias.",
    "Intake and quote workflows": "Flujos de consulta y cotización",
    "Capture requests clearly and prepare the next step.": "Captura solicitudes con claridad y prepara el siguiente paso.",
    "Internal dashboards": "Paneles internos",
    "Track jobs, inventory, leads, approvals, and daily work.": "Da seguimiento a trabajos, inventario, prospectos, aprobaciones y tareas diarias.",
    "AI workflow tools": "Herramientas de IA para flujos de trabajo",
    "Summaries, review helpers, and internal assistants.": "Resúmenes, ayudas de revisión y asistentes internos.",
    "Mobile app MVPs": "MVPs de apps móviles",
    "Plan, build, and improve focused app releases.": "Planifica, crea y mejora lanzamientos enfocados de apps.",
    "Reduce repeat work while keeping key decisions reviewed.": "Reduce trabajo repetido manteniendo revisadas las decisiones importantes.",
    "Support and maintenance": "Soporte y mantenimiento",
    "Fixes, improvements, documentation, and release prep.": "Correcciones, mejoras, documentación y preparación de lanzamientos.",
    "Simple process. Clear scope.": "Proceso simple. Alcance claro.",
    "Define the problem, build the useful version, improve from feedback.": "Define el problema, crea la versión útil y mejora con comentarios.",
    "Understand the problem": "Entender el problema",
    "Clarify the workflow, users, and goal.": "Aclarar el flujo de trabajo, los usuarios y el objetivo.",
    "Build a focused solution": "Crear una solución enfocada",
    "Start with the smallest useful version.": "Empezar con la versión útil más pequeña.",
    "Improve and support it": "Mejorar y dar soporte",
    "Refine with feedback, fixes, and support.": "Mejorar con comentarios, correcciones y soporte.",
    "Apps and projects": "Apps y proyectos",
    "Current focus.": "Enfoque actual.",
    "Products and client work are built in reviewed phases.": "Los productos y trabajos para clientes se crean en fases revisadas.",
    "Paw Care Academy": "Paw Care Academy",
    "A pet-care learning app with updates focused on visuals, performance, clarity, and parent trust.": "Una app educativa de cuidado de mascotas con mejoras enfocadas en visuales, rendimiento, claridad y confianza para padres.",
    "App Store": "App Store",
    "Privacy policy": "Política de privacidad",
    "AI workflow systems": "Sistemas de trabajo con IA",
    "Internal tools for priorities, approvals, feedback, and project updates.": "Herramientas internas para prioridades, aprobaciones, comentarios y actualizaciones de proyectos.",
    "Future client projects": "Futuros proyectos de clientes",
    "Small-business websites, dashboards, apps, and automation projects.": "Sitios web, paneles, apps y proyectos de automatización para pequeños negocios.",
    "Small business focus": "Enfoque en pequeños negocios",
    "Best fit.": "Mejor encaje.",
    "Useful tools for teams that need structure without extra complexity.": "Herramientas útiles para equipos que necesitan estructura sin complejidad extra.",
    "Operational tools": "Herramientas operativas",
    "Requests, tasks, inventory, leads, and follow-up.": "Solicitudes, tareas, inventario, prospectos y seguimiento.",
    "Customer-facing support": "Soporte para clientes",
    "Forms, support pages, app resources, and intake flows.": "Formularios, páginas de soporte, recursos de apps y flujos de consulta.",
    "Growth systems": "Sistemas de crecimiento",
    "Marketing ideas, feedback, priorities, and review steps.": "Ideas de marketing, comentarios, prioridades y pasos de revisión.",
    "AI and automation": "IA y automatización",
    "AI support with guardrails.": "Soporte de IA con controles.",
    "AI can help summarize, organize, and review work. Public actions, payments, and business commitments stay human-reviewed.": "La IA puede ayudar a resumir, organizar y revisar trabajo. Las acciones públicas, pagos y compromisos de negocio siguen revisados por una persona.",
    "Discuss an automation idea": "Hablar sobre una idea de automatización",
    "Project intake": "Consulta de proyecto",
    "Tell me what you need built.": "Cuéntame qué necesitas crear.",
    "Share the problem, timeline, and type of help you need. The form prepares an email draft for review.": "Comparte el problema, el tiempo deseado y el tipo de ayuda que necesitas. El formulario prepara un borrador de correo para revisar.",
    "Business name": "Nombre del negocio",
    "Contact name": "Nombre de contacto",
    "Email": "Correo electrónico",
    "Phone": "Teléfono",
    "optional": "opcional",
    "Service needed": "Servicio necesario",
    "Select a service": "Selecciona un servicio",
    "Custom app or dashboard": "App o panel personalizado",
    "AI tool or agent": "Herramienta o agente de IA",
    "Workflow automation": "Automatización de flujo de trabajo",
    "Website or support page": "Sitio web o página de soporte",
    "Customer intake or quote workflow": "Consulta de cliente o flujo de cotización",
    "Mobile app MVP": "MVP de app móvil",
    "Not sure yet": "Todavía no estoy seguro",
    "Desired timeline": "Tiempo deseado",
    "Select a timeline": "Selecciona un tiempo",
    "As soon as practical": "Lo antes posible",
    "Within 1 month": "Dentro de 1 mes",
    "1 to 3 months": "1 a 3 meses",
    "3+ months": "Más de 3 meses",
    "Exploring options": "Explorando opciones",
    "Budget range": "Rango de presupuesto",
    "Prefer to discuss later": "Prefiero hablarlo después",
    "Under $1,000": "Menos de $1,000",
    "$1,000 to $3,000": "$1,000 a $3,000",
    "$3,000 to $5,000": "$3,000 a $5,000",
    "$5,000+": "$5,000+",
    "Main problem or pain point": "Problema principal",
    "Notes": "Notas",
    "Website": "Sitio web",
    "Nothing sends automatically. Do not include passwords, payment details, or private customer records.": "Nada se envía automáticamente. No incluyas contraseñas, datos de pago ni registros privados de clientes.",
    "Prepare inquiry email": "Preparar correo de consulta",
    "Open email draft": "Abrir borrador de correo",
    "Inquiry summary": "Resumen de consulta",
    "Copy inquiry summary": "Copiar resumen de consulta",
    "Start with a clear problem and a simple next step.": "Empieza con un problema claro y un siguiente paso simple.",
    "For apps, dashboards, AI tools, automation, or support.": "Para apps, paneles, herramientas de IA, automatización o soporte.",
    "Privacy and support": "Privacidad y soporte",
    "Support and privacy resources are reviewed before each release.": "Los recursos de soporte y privacidad se revisan antes de cada lanzamiento.",
    "Contact support": "Contactar soporte",
    "Privacy Policy": "Política de privacidad",
    "All rights reserved.": "Todos los derechos reservados.",
    "Support for apps, software projects, and business inquiries.": "Soporte para apps, proyectos de software y consultas de negocio.",
    "Use this page for app support, website questions, project inquiries, privacy questions, or general contact with JBC Software Development LLC.": "Usa esta página para soporte de apps, preguntas del sitio web, consultas de proyectos, privacidad o contacto general con JBC Software Development LLC.",
    "for support, business, app, website, AI tool, or automation questions.": "para preguntas de soporte, negocio, apps, sitio web, herramientas de IA o automatización.",
    "What to include": "Qué incluir",
    "For the fastest review, include:": "Para una revisión más rápida, incluye:",
    "Your name and the app, website, or project you are asking about.": "Tu nombre y la app, sitio web o proyecto sobre el que preguntas.",
    "A short description of the issue or request.": "Una descripción corta del problema o solicitud.",
    "The device, browser, or operating system if this is a technical issue.": "El dispositivo, navegador o sistema operativo si es un problema técnico.",
    "Steps to reproduce a bug, if relevant.": "Pasos para reproducir un error, si aplica.",
    "Any screenshot or error message that helps explain the issue.": "Cualquier captura o mensaje de error que ayude a explicar el problema.",
    "App support": "Soporte de apps",
    "For current or future JBC Software Development LLC apps, include the app name and the version number if available. App-specific support links may be added as each product is released.": "Para apps actuales o futuras de JBC Software Development LLC, incluye el nombre de la app y el número de versión si está disponible. Los enlaces de soporte específicos de cada app pueden agregarse cuando se lance cada producto.",
    "Business project inquiries": "Consultas de proyectos de negocio",
    "For small business software, AI tools, dashboards, automation, or app MVPs, use the intake form on the home page or send a short email explaining the workflow problem you need help solving.": "Para software de pequeños negocios, herramientas de IA, paneles, automatización o MVPs de apps, usa el formulario de consulta de la página principal o envía un correo corto explicando el problema de flujo de trabajo que necesitas resolver.",
    "Safety and privacy": "Seguridad y privacidad",
    "Do not send passwords, payment details, private customer records, or other sensitive data by email unless a secure process has been approved first.": "No envíes contraseñas, datos de pago, registros privados de clientes u otros datos sensibles por correo a menos que primero se haya aprobado un proceso seguro.",
    "Response expectations": "Expectativas de respuesta",
    "Support and business inquiries are reviewed manually. No automatic support tickets, proposals, billing, deployments, or external actions are created from this website.": "Las consultas de soporte y negocio se revisan manualmente. Este sitio no crea tickets, propuestas, facturación, despliegues ni acciones externas automáticamente.",
    "Start here": "Empieza aquí",
    "Send a concise note with the app, project, or business problem.": "Envía una nota breve con la app, proyecto o problema del negocio.",
    "Email support": "Enviar correo a soporte",
    "Project intake form": "Formulario de consulta",
    "Privacy for website inquiries and app support.": "Privacidad para consultas del sitio web y soporte de apps.",
    "JBC Software Development LLC keeps privacy practices simple: collect only what is needed to respond to inquiries, avoid unnecessary sensitive data, and review app-specific privacy needs before launch.": "JBC Software Development LLC mantiene prácticas de privacidad simples: recopilar solo lo necesario para responder consultas, evitar datos sensibles innecesarios y revisar las necesidades de privacidad de cada app antes del lanzamiento.",
    "Last updated: May 23, 2026": "Última actualización: 23 de mayo de 2026",
    "Information you choose to share": "Información que decides compartir",
    "If you contact JBC Software Development LLC by email or prepare an inquiry through the website form, you may choose to share your name, business name, email address, phone number, project needs, timeline, budget range, and notes.": "Si contactas a JBC Software Development LLC por correo o preparas una consulta con el formulario del sitio, puedes decidir compartir tu nombre, nombre del negocio, correo electrónico, teléfono, necesidades del proyecto, tiempo deseado, rango de presupuesto y notas.",
    "Do not send passwords, payment information, private customer records, medical information, or other sensitive information through the website or email unless it has been specifically requested through a secure, approved process.": "No envíes contraseñas, información de pago, registros privados de clientes, información médica u otros datos sensibles por el sitio o correo a menos que se haya solicitado específicamente mediante un proceso seguro y aprobado.",
    "Website intake form": "Formulario de consulta del sitio web",
    "The website intake form is currently static. It validates the required fields in your browser, prepares a copyable inquiry summary, and creates an email draft for you to review before sending.": "El formulario de consulta del sitio es estático por ahora. Valida los campos requeridos en tu navegador, prepara un resumen que puedes copiar y crea un borrador de correo para revisar antes de enviar.",
    "The form does not automatically send email, store submissions, create leads, or add your information to a database.": "El formulario no envía correos automáticamente, no guarda envíos, no crea prospectos ni agrega tu información a una base de datos.",
    "The language switcher may save your English or Spanish preference in your browser only. This preference is not sent by this website.": "El selector de idioma puede guardar tu preferencia de inglés o español solo en tu navegador. Esta preferencia no se envía desde este sitio web.",
    "How information is used": "Cómo se usa la información",
    "Information you choose to send may be used to:": "La información que decidas enviar puede usarse para:",
    "Respond to business, project, support, or app-related inquiries.": "Responder consultas de negocio, proyectos, soporte o apps.",
    "Understand requested services or software needs.": "Entender servicios solicitados o necesidades de software.",
    "Prepare internal notes, estimates, or proposal drafts after review.": "Preparar notas internas, estimados o borradores de propuestas después de revisar.",
    "Provide support for JBC Software Development LLC products or services.": "Dar soporte a productos o servicios de JBC Software Development LLC.",
    "App privacy policies": "Políticas de privacidad de apps",
    "App-specific privacy details may vary by product. When a JBC Software Development LLC app is released publicly, its App Store listing or support materials should identify any app-specific privacy practices that apply.": "Los detalles de privacidad pueden variar por producto. Cuando una app de JBC Software Development LLC se lance públicamente, su ficha de App Store o materiales de soporte deben identificar las prácticas de privacidad específicas que apliquen.",
    "Third-party services": "Servicios de terceros",
    "JBC Software Development LLC may use ordinary business services such as email, hosting, domain services, analytics, app stores, development tools, or support tools. These providers may process information according to their own terms and privacy policies.": "JBC Software Development LLC puede usar servicios comerciales comunes como correo, hosting, servicios de dominio, analíticas, tiendas de apps, herramientas de desarrollo o herramientas de soporte. Estos proveedores pueden procesar información según sus propios términos y políticas de privacidad.",
    "Data retention": "Retención de datos",
    "Inquiry and support information may be kept as long as needed to respond, maintain records, manage projects, or meet normal business needs. You may ask for correction or deletion of information you previously provided.": "La información de consultas y soporte puede conservarse el tiempo necesario para responder, mantener registros, gestionar proyectos o cubrir necesidades normales del negocio. Puedes solicitar corrección o eliminación de información que hayas proporcionado anteriormente.",
    "For privacy, support, or app-related questions, email": "Para preguntas de privacidad, soporte o apps, escribe a",
    "Need help?": "¿Necesitas ayuda?",
    "Use email for privacy, support, app, or project questions.": "Usa el correo para preguntas de privacidad, soporte, apps o proyectos.",
    "Email JBC Development": "Enviar correo a JBC Development",
    "Open support page": "Abrir página de soporte",
  },
};

const attributeTranslations = {
  es: {
    "JBC Software Development LLC home": "Inicio de JBC Software Development LLC",
    "Primary navigation": "Navegación principal",
    "Language selector": "Selector de idioma",
    "Core service areas": "Áreas principales de servicio",
    "JBC apps and Mac beta downloads": "Apps de JBC y descargas beta para Mac",
    "Paw Care Academy app icon": "Ícono de la app Paw Care Academy",
    "OpenCircle Men app icon": "Ícono de la app OpenCircle Men",
    "OpenCircle Women app icon": "Ícono de la app OpenCircle Women",
    "Website and dashboard build workspace": "Espacio de trabajo de sitio web y panel",
    "Website and dashboard workspace showing software planning, interface building, and automation review": "Espacio de trabajo con planificación de software, interfaces y revisión de automatización",
    "Software services": "Servicios de software",
    "Current projects": "Proyectos actuales",
    "Paw Care Academy resources": "Recursos de Paw Care Academy",
    "What is slowing the business down or creating repeat work?": "¿Qué está frenando el negocio o creando trabajo repetido?",
    "Useful context, current tools, links, or questions. Please do not include passwords, payment details, or private customer records.": "Contexto útil, herramientas actuales, enlaces o preguntas. No incluyas contraseñas, datos de pago ni registros privados de clientes.",
    "Support actions": "Acciones de soporte",
    "Privacy contact": "Contacto de privacidad",
  },
};

initializeTranslation();

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

if (intakeForm && intakeMessage && intakeResult && intakeSummary && intakeMailLink) {
  intakeForm.addEventListener("submit", (event) => {
    event.preventDefault();
    clearIntakeMessage();

    const inquiry = readInquiryForm(intakeForm);
    const validationMessage = validateInquiry(inquiry);

    if (validationMessage) {
      showIntakeMessage(validationMessage, "error");
      intakeForm.reportValidity();
      return;
    }

    if (inquiry.websiteUrl) {
      showIntakeMessage(getUiCopy("honeypotSuccess"), "success");
      return;
    }

    const summary = formatInquirySummary(inquiry);
    intakeSummary.value = summary;
    intakeMailLink.href = buildMailtoLink(inquiry, summary);
    intakeMailLink.hidden = false;
    intakeResult.hidden = false;
    showIntakeMessage(getUiCopy("preparedSuccess"), "success");
  });
}

if (copyInquiryButton && intakeSummary) {
  copyInquiryButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(intakeSummary.value);
      showIntakeMessage(getUiCopy("copyCopied"), "success");
    } catch {
      intakeSummary.focus();
      intakeSummary.select();
      showIntakeMessage(getUiCopy("copyFallback"), "success");
    }
  });
}

function readInquiryForm(form) {
  const data = new FormData(form);
  return {
    businessName: cleanInput(data.get("businessName")),
    contactName: cleanInput(data.get("contactName")),
    email: cleanInput(data.get("email")),
    phone: cleanInput(data.get("phone")),
    serviceNeeded: cleanInput(data.get("serviceNeeded")),
    painPoint: cleanInput(data.get("painPoint")),
    desiredTimeline: cleanInput(data.get("desiredTimeline")),
    budgetRange: cleanInput(data.get("budgetRange")),
    notes: cleanInput(data.get("notes")),
    websiteUrl: cleanInput(data.get("websiteUrl")),
  };
}

function validateInquiry(inquiry) {
  if (!intakeForm.checkValidity()) {
    return getUiCopy("missingFields");
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) {
    return getUiCopy("invalidEmail");
  }
  if (inquiry.painPoint.length < 20) {
    return getUiCopy("painPointDetail");
  }
  return "";
}

function formatInquirySummary(inquiry) {
  const labels = getUiCopy("labels");
  return [
    getUiCopy("summaryTitle"),
    "",
    `${labels.businessName}: ${inquiry.businessName}`,
    `${labels.contactName}: ${inquiry.contactName}`,
    `${labels.email}: ${inquiry.email}`,
    `${labels.phone}: ${inquiry.phone || getUiCopy("notProvided")}`,
    `${labels.serviceNeeded}: ${inquiry.serviceNeeded}`,
    `${labels.desiredTimeline}: ${inquiry.desiredTimeline}`,
    `${labels.budgetRange}: ${inquiry.budgetRange || getUiCopy("notProvided")}`,
    "",
    `${labels.painPoint}:`,
    inquiry.painPoint,
    "",
    `${labels.notes}:`,
    inquiry.notes || getUiCopy("noAdditionalNotes"),
  ].join("\n");
}

function buildMailtoLink(inquiry, summary) {
  const subject = `${getUiCopy("summarySubject")}: ${inquiry.businessName}`;
  return `mailto:jonathan@jbcdevelopment.dev?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(summary)}`;
}

function cleanInput(value) {
  return String(value || "").replace(/\s+/g, " ").trim();
}

function showIntakeMessage(message, type) {
  if (!intakeMessage) return;
  intakeMessage.textContent = message;
  intakeMessage.className = `form-message ${type}`;
  intakeMessage.hidden = false;
}

function clearIntakeMessage() {
  if (!intakeMessage) return;
  intakeMessage.textContent = "";
  intakeMessage.className = "form-message";
  intakeMessage.hidden = true;
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

function getUiCopy(key) {
  return uiCopy[currentLanguage]?.[key] || uiCopy.en[key];
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
