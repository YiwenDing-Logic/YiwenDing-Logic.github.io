(() => {
  const button = document.getElementById('theme-toggle');
  const systemTheme = window.matchMedia('(prefers-color-scheme: dark)');
  let preference = null;
  try {
    const stored = localStorage.getItem('theme');
    if (stored === 'light' || stored === 'dark') preference = stored;
  } catch (_) {
    // Theme switching also works when browser storage is unavailable.
  }

  function applyTheme(theme) {
    const dark = theme === 'dark';
    document.body.classList.toggle('dark', dark);
    document.body.classList.toggle('light', !dark);
    if (button) {
      const label = `Switch to ${dark ? 'light' : 'dark'} theme`;
      button.textContent = dark ? '☀️' : '🌙';
      button.setAttribute('aria-label', label);
      button.setAttribute('title', label);
      button.hidden = false;
    }
  }

  applyTheme(preference || (systemTheme.matches ? 'dark' : 'light'));
  systemTheme.addEventListener('change', (event) => {
    if (!preference) applyTheme(event.matches ? 'dark' : 'light');
  });
  if (button) button.addEventListener('click', () => {
    preference = document.body.classList.contains('dark') ? 'light' : 'dark';
    applyTheme(preference);
    try { localStorage.setItem('theme', preference); } catch (_) {}
  });

  document.querySelectorAll('[data-current-year]').forEach((element) => {
    element.textContent = new Date().getFullYear();
  });
})();
