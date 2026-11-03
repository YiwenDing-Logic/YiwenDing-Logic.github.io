(() => {
  // Keep links to sections of the former single-page homepage working.
  if (document.body.dataset.page === 'about') {
    const legacyPages = {
      '#publications': 'publications.html',
      '#publication-list': 'publications.html#publication-list',
      '#talks': 'talks.html',
      '#talk-list': 'talks.html#talk-list',
      '#contact': 'contact.html'
    };
    const followLegacyLink = () => {
      const page = legacyPages[window.location.hash];
      if (page) window.location.replace(page);
    };
    followLegacyLink();
    window.addEventListener('hashchange', followLegacyLink);
  }

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

  const gallery = document.querySelector('.photo-gallery');
  if (!gallery) return;

  const photo = gallery.querySelector('.profile-img');
  const frame = gallery.querySelector('.photo-frame');
  const caption = gallery.querySelector('.photo-caption');
  const controls = gallery.querySelector('.photo-controls');
  const count = gallery.querySelector('.photo-count');
  const configuredPhotos = Array.isArray(window.profilePhotos) ? window.profilePhotos : [];
  const photos = configuredPhotos.filter((item) => item && typeof item.src === 'string' && item.src.trim());
  if (!photos.length) return;

  let current = 0;
  let request = 0;
  let touchStart = null;

  function updateDetails(index) {
    current = index;
    photo.alt = photos[index].alt || 'Yiwen Ding';
    photo.style.objectPosition = photos[index].position || '50% 50%';
    caption.textContent = photos[index].caption || '';
    caption.hidden = !caption.textContent;
    count.textContent = `${index + 1} / ${photos.length}`;
    count.setAttribute('aria-label', `Photo ${index + 1} of ${photos.length}`);
  }

  function showPhoto(index) {
    const next = (index + photos.length) % photos.length;
    const token = ++request;
    const incoming = new Image();
    frame.setAttribute('aria-busy', 'true');
    incoming.onload = () => {
      if (token !== request) return;
      photo.src = photos[next].src;
      updateDetails(next);
      frame.setAttribute('aria-busy', 'false');
    };
    incoming.onerror = () => {
      if (token !== request) return;
      frame.setAttribute('aria-busy', 'false');
      // Leave the previous image visible, but allow navigation past a missing file.
      current = next;
      count.textContent = 'Photo unavailable';
      count.setAttribute('aria-label', `Photo ${next + 1} could not be loaded. Try another photo.`);
    };
    incoming.src = photos[next].src;
  }

  updateDetails(0);
  if (photo.getAttribute('src') !== photos[0].src) showPhoto(0);
  if (photos.length < 2) return;

  controls.hidden = false;
  gallery.setAttribute('role', 'region');
  gallery.setAttribute('aria-roledescription', 'carousel');
  gallery.querySelector('[data-photo-prev]').addEventListener('click', () => showPhoto(current - 1));
  gallery.querySelector('[data-photo-next]').addEventListener('click', () => showPhoto(current + 1));
  gallery.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey) return;
    if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
      event.preventDefault();
      showPhoto(current + (event.key === 'ArrowLeft' ? -1 : 1));
    }
  });
  frame.addEventListener('touchstart', (event) => {
    touchStart = event.touches.length === 1
      ? { x: event.touches[0].clientX, y: event.touches[0].clientY }
      : null;
  }, { passive: true });
  frame.addEventListener('touchend', (event) => {
    if (!touchStart || !event.changedTouches.length) return;
    const dx = event.changedTouches[0].clientX - touchStart.x;
    const dy = event.changedTouches[0].clientY - touchStart.y;
    touchStart = null;
    if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.5) {
      showPhoto(current + (dx < 0 ? 1 : -1));
    }
  }, { passive: true });
  frame.addEventListener('touchcancel', () => { touchStart = null; }, { passive: true });
})();
