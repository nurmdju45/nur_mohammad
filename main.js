const toggle = document.getElementById('nav-toggle');
const menu = document.getElementById('nav-menu');
toggle.addEventListener('click', () => menu.classList.toggle('show'));
document.querySelectorAll('.nav__link').forEach(l =>
  l.addEventListener('click', () => menu.classList.remove('show')));

const links = document.querySelectorAll('.nav__link');
const observer = new IntersectionObserver(entries => {
  entries.forEach(e => {
    if (e.isIntersecting) links.forEach(l =>
      l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
  });
}, { rootMargin: '-40% 0px -55% 0px' });
document.querySelectorAll('section[id]').forEach(s => observer.observe(s));

const filters = document.querySelectorAll('.filter');
const pubs = document.querySelectorAll('.pub');
filters.forEach(btn => btn.addEventListener('click', () => {
  filters.forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  const f = btn.dataset.filter;
  pubs.forEach(p => p.classList.toggle('hidden', f !== 'all' && p.dataset.type !== f));
}));
document.getElementById('year').textContent = new Date().getFullYear();
