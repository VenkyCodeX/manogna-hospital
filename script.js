// ===== SPLASH SCREEN =====
const splash = document.getElementById('splash');
const splashBar = document.getElementById('splashBar');
const splashText = document.getElementById('splashText');
const messages = ['Loading...', 'Preparing services...', 'Almost ready...'];
let progress = 0;
let msgIndex = 0;

const splashInterval = setInterval(() => {
  progress += 100 / 30;
  if (progress >= 100) progress = 100;
  splashBar.style.width = progress + '%';
  if (progress > 40 && msgIndex === 0) { msgIndex = 1; splashText.textContent = messages[1]; }
  if (progress > 75 && msgIndex === 1) { msgIndex = 2; splashText.textContent = messages[2]; }
  if (progress >= 100) {
    clearInterval(splashInterval);
    setTimeout(() => splash.classList.add('hide'), 300);
  }
}, 100);

setTimeout(() => splash.classList.add('hide'), 3300);

// ===== NAVBAR SCROLL =====
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 50);
});

// ===== HAMBURGER MENU =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const spans = hamburger.querySelectorAll('span');
  spans[0].style.transform = navLinks.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
  spans[1].style.opacity = navLinks.classList.contains('open') ? '0' : '1';
  spans[2].style.transform = navLinks.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
});

// Close menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    hamburger.querySelectorAll('span').forEach(s => { s.style.transform = ''; s.style.opacity = '1'; });
  });
});

// ===== SMOOTH SCROLL =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

// ===== SCROLL REVEAL =====
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry, i) => {
    if (entry.isIntersecting) {
      setTimeout(() => entry.target.classList.add('visible'), i * 80);
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(
  '.service-card, .doctor-card, .testimonial-card, .feature-item, .contact-item, .about-text, .appt-info, .appt-form, .contact-form'
).forEach(el => {
  el.classList.add('reveal');
  revealObserver.observe(el);
});

// ===== ACTIVE NAV LINK =====
const sections = document.querySelectorAll('section[id]');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  sections.forEach(section => {
    if (window.scrollY >= section.offsetTop - 120) current = section.getAttribute('id');
  });
  navItems.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === `#${current}`) link.classList.add('active');
  });
});

// ===== APPOINTMENT FORM =====
document.getElementById('appointmentForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const phone = document.getElementById('phone').value.trim();
  const date = document.getElementById('date').value;
  const dept = document.getElementById('department').value;
  const msg = document.getElementById('message').value.trim();

  if (!name || !phone || !date) return;

  // Open WhatsApp with pre-filled message
  const text = `Hello, I want to book an appointment.%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0ADate: ${encodeURIComponent(date)}${dept ? '%0ADepartment: ' + encodeURIComponent(dept) : ''}${msg ? '%0AMessage: ' + encodeURIComponent(msg) : ''}`;
  window.open(`https://wa.me/919666911192?text=${text}`, '_blank');

  showModal();
  this.reset();
});

// ===== CONTACT FORM =====
document.getElementById('contactForm').addEventListener('submit', function (e) {
  e.preventDefault();
  const name = document.getElementById('cname').value.trim();
  const phone = document.getElementById('cphone').value.trim();
  const msg = document.getElementById('cmessage').value.trim();

  if (!name || !phone || !msg) return;

  const text = `Hello, I have a query.%0AName: ${encodeURIComponent(name)}%0APhone: ${encodeURIComponent(phone)}%0AMessage: ${encodeURIComponent(msg)}`;
  window.open(`https://wa.me/919666911192?text=${text}`, '_blank');

  showModal();
  this.reset();
});

// ===== MODAL =====
function showModal() {
  document.getElementById('modalOverlay').classList.add('active');
}
function closeModal() {
  document.getElementById('modalOverlay').classList.remove('active');
}
document.getElementById('modalOverlay').addEventListener('click', function (e) {
  if (e.target === this) closeModal();
});

// ===== SET MIN DATE FOR APPOINTMENT =====
const dateInput = document.getElementById('date');
if (dateInput) {
  const today = new Date().toISOString().split('T')[0];
  dateInput.setAttribute('min', today);
}
