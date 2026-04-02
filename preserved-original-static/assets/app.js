(function () {
  const root = document.documentElement;
  const body = document.body;
  body.classList.add('js-ready');

  const progress = document.getElementById('progress');
  const updateProgress = () => {
    const scrollTop = root.scrollTop || document.body.scrollTop;
    const scrollHeight = root.scrollHeight - root.clientHeight;
    const pct = scrollHeight > 0 ? (scrollTop / scrollHeight) * 100 : 0;
    if (progress) progress.style.width = pct + '%';
  };

  updateProgress();
  window.addEventListener('scroll', updateProgress, { passive: true });
  window.addEventListener('resize', updateProgress);

  const links = Array.from(document.querySelectorAll('.sidebar-nav a[href^="#"]'));
  const sections = links
    .map((link) => document.querySelector(link.getAttribute('href')))
    .filter(Boolean);

  if (sections.length && 'IntersectionObserver' in window) {
    const linkMap = new Map();
    links.forEach((link) => linkMap.set(link.getAttribute('href').slice(1), link));

    const activeObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const link = linkMap.get(entry.target.id);
          if (!link) return;
          if (entry.isIntersecting) {
            links.forEach((candidate) => candidate.classList.remove('active'));
            link.classList.add('active');
          }
        });
      },
      { rootMargin: '-20% 0px -65% 0px', threshold: 0.01 }
    );

    sections.forEach((section) => activeObserver.observe(section));
  }

  const revealTargets = Array.from(document.querySelectorAll('[data-reveal]'));
  if (revealTargets.length && 'IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add('is-visible');
          revealObserver.unobserve(entry.target);
        });
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 }
    );

    revealTargets.forEach((target) => revealObserver.observe(target));
  } else {
    revealTargets.forEach((target) => target.classList.add('is-visible'));
  }

  const sidebar = document.getElementById('readerSidebar');
  const sidebarToggle = document.getElementById('sidebarToggle');
  const sidebarClosers = Array.from(document.querySelectorAll('[data-sidebar-close], .sidebar-nav a'));

  const setSidebar = (open) => {
    body.classList.toggle('sidebar-open', open);
    if (sidebarToggle) sidebarToggle.setAttribute('aria-expanded', String(open));
  };

  if (sidebar && sidebarToggle) {
    sidebarToggle.addEventListener('click', () => {
      setSidebar(!body.classList.contains('sidebar-open'));
    });

    sidebarClosers.forEach((node) => {
      node.addEventListener('click', () => setSidebar(false));
    });

    window.addEventListener('keydown', (event) => {
      if (event.key === 'Escape') setSidebar(false);
    });

    window.addEventListener('resize', () => {
      if (window.innerWidth > 1180) setSidebar(false);
    });
  }
})();
