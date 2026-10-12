"use strict";
// Configure somente um número real e autorizado, com DDI + DDD + número (apenas dígitos).
const WHATSAPP_NUMBER = "";
const toggle = document.querySelector(".menu-toggle");
const mobileNav = document.querySelector("#mobile-nav");
function closeMenu() {
  mobileNav.hidden = true;
  toggle.setAttribute("aria-expanded", "false");
  toggle.setAttribute("aria-label", "Abrir menu");
}
toggle.addEventListener("click", () => {
  const willOpen = mobileNav.hidden;
  mobileNav.hidden = !willOpen;
  toggle.setAttribute("aria-expanded", String(willOpen));
  toggle.setAttribute("aria-label", willOpen ? "Fechar menu" : "Abrir menu");
});
mobileNav
  .querySelectorAll("a")
  .forEach((link) => link.addEventListener("click", closeMenu));
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") closeMenu();
});
document.querySelector("#year").textContent = new Date().getFullYear();
const form = document.querySelector("#contact-form");
const status = document.querySelector("#form-status");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  if (!form.reportValidity()) return;
  const name = form.elements.name.value.trim();
  const pet = form.elements.pet.value.trim();
  const subject = form.elements.subject.value;
  const message = form.elements.message.value.trim();
  const text = `Olá! Meu nome é ${name}.\n${pet ? `Meu pet se chama ${pet}.\n` : ""}Assunto: ${subject}.${message ? `\nMensagem: ${message}` : ""}`;
  if (!/^\d{10,15}$/.test(WHATSAPP_NUMBER)) {
    status.textContent =
      "Formulário demonstrativo: o WhatsApp ainda não foi configurado. Nenhuma mensagem foi enviada.";
    return;
  }
  status.textContent = "Abrindo o WhatsApp para você revisar a mensagem...";
  const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(text)}`;
  window.open(url, "_blank", "noopener,noreferrer");
});

// Voltar ao topo: rolagem explícita, inclusive quando a URL já contém #inicio.
const backTop = document.querySelector(".back-top");
if (backTop) {
  backTop.addEventListener("click", (event) => {
    event.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
        ? "instant"
        : "smooth",
    });
  });
}
