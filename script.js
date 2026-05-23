const navToggle = document.querySelector(".nav-toggle");
const navLinks = document.querySelector(".nav-links");
const intakeForm = document.querySelector("#intakeForm");
const intakeMessage = document.querySelector("#intakeMessage");
const intakeResult = document.querySelector("#intakeResult");
const intakeSummary = document.querySelector("#intakeSummary");
const intakeMailLink = document.querySelector("#intakeMailLink");
const copyInquiryButton = document.querySelector("#copyInquiryButton");

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
      showIntakeMessage("Thanks. Please email jonathan@jbcdevelopment.dev directly if you need help.", "success");
      return;
    }

    const summary = formatInquirySummary(inquiry);
    intakeSummary.value = summary;
    intakeMailLink.href = buildMailtoLink(inquiry, summary);
    intakeMailLink.hidden = false;
    intakeResult.hidden = false;
    showIntakeMessage("Inquiry prepared. Review the summary, then open the email draft when ready.", "success");
  });
}

if (copyInquiryButton && intakeSummary) {
  copyInquiryButton.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText(intakeSummary.value);
      showIntakeMessage("Inquiry summary copied.", "success");
    } catch {
      intakeSummary.focus();
      intakeSummary.select();
      showIntakeMessage("Select and copy the highlighted summary.", "success");
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
    return "Please complete the required fields before preparing the inquiry.";
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(inquiry.email)) {
    return "Please enter a valid email address.";
  }
  if (inquiry.painPoint.length < 20) {
    return "Please add a little more detail about the main problem or pain point.";
  }
  return "";
}

function formatInquirySummary(inquiry) {
  return [
    "Website inquiry for JBC Software Development LLC",
    "",
    `Business name: ${inquiry.businessName}`,
    `Contact name: ${inquiry.contactName}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone || "Not provided"}`,
    `Service needed: ${inquiry.serviceNeeded}`,
    `Desired timeline: ${inquiry.desiredTimeline}`,
    `Budget range: ${inquiry.budgetRange || "Not provided"}`,
    "",
    "Main problem / pain point:",
    inquiry.painPoint,
    "",
    "Notes:",
    inquiry.notes || "No additional notes.",
  ].join("\n");
}

function buildMailtoLink(inquiry, summary) {
  const subject = `Website inquiry: ${inquiry.businessName}`;
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
