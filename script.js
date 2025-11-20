// ----- Dark mode toggle -----

const btn = document.getElementById("theme-toggle");
const body = document.body;

// load previous user preference
if (localStorage.getItem("theme") === "dark") {
  body.classList.remove("light");
  body.classList.add("dark");
  btn.textContent = "☀️";
}

// button toggle
btn.addEventListener("click", () => {
  if (body.classList.contains("light")) {
    body.classList.remove("light");
    body.classList.add("dark");
    localStorage.setItem("theme", "dark");
    btn.textContent = "☀️";
  } else {
    body.classList.remove("dark");
    body.classList.add("light");
    localStorage.setItem("theme", "light");
    btn.textContent = "🌙";
  }
});
