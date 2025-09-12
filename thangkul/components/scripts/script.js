// Smooth scroll with fixed navbar offset
(function() {
  const nav = document.getElementById('mainNav');
  const offset = () => (nav ? nav.offsetHeight - 1 : 0);

  function smoothScrollTo(targetId) {
    const target = document.getElementById(targetId);
    if (!target) return;
    const y = target.getBoundingClientRect().top + window.pageYOffset - offset();
    window.scrollTo({ top: y, behavior: 'smooth' });
  }

  // Only handle clicks on navbar links
  document.addEventListener('click', function(e) {
    const a = e.target.closest('#mainNav a.nav-link[href^="#"]');
    if (!a) return;
    const href = a.getAttribute('href');
    e.preventDefault();
    smoothScrollTo(href.slice(1));
    history.pushState(null, '', href);
  });

  // Active nav link on scroll using section ranges
  const sections = Array.from(document.querySelectorAll('header[id], section[id]'));
  const navLinks = Array.from(document.querySelectorAll('#mainNav .nav-link'));

  function setActiveLink() {
    const scrollTop = window.scrollY + offset();
    let currentId = sections.length ? sections[0].id : '';

    for (let i = 0; i < sections.length; i++) {
      const sec = sections[i];
      const top = sec.offsetTop - 2;
      const bottom = top + sec.offsetHeight;
      if (scrollTop >= top && scrollTop < bottom) {
        currentId = sec.id;
        break;
      }
    }

    navLinks.forEach(link => {
      const href = link.getAttribute('href') || '';
      const id = href.startsWith('#') ? href.slice(1) : '';
      if (id === currentId) link.classList.add('active');
      else link.classList.remove('active');
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  window.addEventListener('resize', setActiveLink);
  window.addEventListener('load', setActiveLink);
  window.addEventListener('hashchange', setActiveLink);
})();

// Footer year
(function() {
  const el = document.getElementById('year');
  if (el) el.textContent = new Date().getFullYear();
})();
