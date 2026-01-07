// GovCon Inc. - tiny JS for mobile menu + active nav state
(function () {
  const btn = document.querySelector("[data-menu-btn]");
  const nav = document.querySelector("[data-nav]");
  if (btn && nav) {
    btn.addEventListener("click", function () {
      const open = nav.classList.toggle("open");
      btn.setAttribute("aria-expanded", open ? "true" : "false");
    });
  }

  // Active link highlight based on path
  const path = (location.pathname.split("/").pop() || "index.html").toLowerCase();
  document.querySelectorAll('a[data-nav-link]').forEach(a => {
    const href = (a.getAttribute("href") || "").toLowerCase();
    if (href === path) a.setAttribute("aria-current", "page");
  });
})();


// Site config
const BOOKING_URL = "https://calendar.google.com/calendar/appointments/schedules/REPLACE_ME";
const CONTACT_EMAIL = "info@govcon.info";
const CONTACT_PHONE_TEL = "+18136650308";

document.addEventListener("DOMContentLoaded", () => {
  // Wire booking links
  document.querySelectorAll("[data-booking]").forEach((a) => {
    a.setAttribute("href", BOOKING_URL);
    a.setAttribute("target", "_blank");
    a.setAttribute("rel", "noopener");
  });

  // Wire contact links (optional)
  document.querySelectorAll("[data-phone]").forEach((a) => {
    a.setAttribute("href", "tel:" + CONTACT_PHONE_TEL);
  });
  document.querySelectorAll("[data-email]").forEach((a) => {
    a.setAttribute("href", "mailto:" + CONTACT_EMAIL);
  });
});
