// Dynamically include HTML components (navbar, footer, etc.)
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-include]").forEach(el => {
    fetch(el.getAttribute("data-include"))
      .then(r => r.text())
      .then(html => el.innerHTML = html)
      .catch(err => {
        el.innerHTML = "<!-- include failed -->";
        console.error("Include failed:", err);
      });
  });
});
