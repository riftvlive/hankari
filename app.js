const menu = document.querySelector('.menu-toggle');
const nav = document.querySelector('.main-nav');
document.querySelector('.text-link')?.setAttribute('href', '#location');
const whatsappButton = document.querySelector('.contact-actions a[href^="https://wa.me"]');
if (whatsappButton) whatsappButton.innerHTML = '<span class="wa-icon" aria-hidden="true"><svg viewBox="0 0 24 24"><path d="M20 11.5a8.5 8.5 0 0 1-12.6 7.4L4 20l1.2-3.2A8.5 8.5 0 1 1 20 11.5Z"/><path d="M8.5 8.8c.2-.4.4-.4.7-.4h.5c.2 0 .4.1.5.4l.6 1.4c.1.2.1.4-.1.6l-.5.6c.5 1 1.2 1.6 2.2 2.1l.6-.5c.2-.2.4-.2.6-.1l1.4.6c.3.1.4.3.4.5 0 .7-.3 1.3-.8 1.5-.4.2-1.2.2-2.5-.4-1.2-.6-2.2-1.4-3-2.4-.8-1-1.2-2-1.2-2.7 0-.5.2-.9.6-1.2Z"/></svg></span> واتساب 0662 825 047 <span>↗</span>';
document.querySelectorAll('main > section').forEach((section) => section.classList.add('reveal'));
const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
document.querySelectorAll('.reveal').forEach((section) => revealObserver.observe(section));
window.addEventListener('scroll', () => document.querySelector('.site-header')?.classList.toggle('scrolled', window.scrollY > 12), { passive: true });
menu?.addEventListener('click', () => {
  const open = menu.getAttribute('aria-expanded') === 'true';
  menu.setAttribute('aria-expanded', String(!open));
  nav.classList.toggle('is-open', !open);
});
nav?.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => {
  menu?.setAttribute('aria-expanded', 'false');
  nav.classList.remove('is-open');
}));

const map = document.querySelector('.map-visual');
if (map) {
  map.replaceChildren();
  const mapCanvas = document.createElement('div');
  mapCanvas.id = 'project-map';
  mapCanvas.setAttribute('role', 'application');
  mapCanvas.setAttribute('aria-label', 'خريطة تفاعلية لحدود المشروع');
  map.append(mapCanvas);
  const mapBadge = document.createElement('div');
  mapBadge.className = 'map-badge';
  mapBadge.innerHTML = '<span>●</span> موقع المشروع';
  map.append(mapBadge);
  const boundaryPoints = [[35.115731,-3.842043],[35.115449,-3.842023],[35.115089,-3.841998],[35.114909,-3.842051],[35.114730,-3.842162],[35.114936,-3.842336],[35.115436,-3.842724],[35.115579,-3.842393]];
  const projectMap = L.map(mapCanvas, { scrollWheelZoom: false }).setView([35.1152, -3.84225], 17);
  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', { attribution: '&copy; Esri, Maxar, Earthstar Geographics', maxZoom: 20 }).addTo(projectMap);
  const boundary = L.polygon(boundaryPoints, { color:'#d52626', weight:4, opacity:1, fillColor:'#ef4444', fillOpacity:.18 }).addTo(projectMap);
  boundary.bindTooltip('حدود المشروع', { permanent:true, direction:'center', className:'boundary-label' });
  const secondBoundaryPoints = [[35.114643,-3.842088],[35.114691,-3.842015],[35.114663,-3.841912],[35.114566,-3.841874],[35.114530,-3.841937],[35.114585,-3.842015]];
  const secondBoundary = L.polygon(secondBoundaryPoints, { color:'#d52626', weight:4, opacity:1, fillColor:'#ef4444', fillOpacity:.18 }).addTo(projectMap);
  secondBoundary.bindTooltip('الجزء الثاني', { permanent:true, direction:'center', className:'boundary-label' });
  const selectedLocation = [35.115249, -3.842269];
  L.circleMarker(selectedLocation, { radius:8, color:'#fff', weight:3, fillColor:'#d52626', fillOpacity:1 }).addTo(projectMap);
  L.marker(selectedLocation).addTo(projectMap).bindPopup('<strong>الموقع المحدد</strong><br>35.115249, -3.842269').openPopup();
  projectMap.fitBounds(L.featureGroup([boundary, secondBoundary]).getBounds(), { padding:[24,24] });
}
