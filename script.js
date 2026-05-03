const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('main section');
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-links');
const projectButtons = document.querySelectorAll('.project-details');
const modalOverlay = document.getElementById('modalOverlay');
const modalClose = document.getElementById('modalClose');
const modalTitle = document.getElementById('modalTitle');
const modalDescription = document.querySelector('.modal-description');
const modalFeatures = document.querySelector('.modal-features');
const modalStack = document.querySelector('.modal-stack');
const modalGithub = document.querySelector('.modal-github');

const projectData = {
  ambulance: {
    title: 'AI-powered Smart Ambulance Tracking System',
    description: 'A backend-driven ambulance tracking platform built to improve emergency responses with real-time GPS routing and hospital coordination.',
    features: [
      'Real-time ambulance tracking',
      'GPS integration and routing',
      'Nearest ambulance allocation',
      'Traffic clearance coordination',
      'Hospital coordination dashboard',
      'Admin monitoring console'
    ],
    tech: ['Java', 'Spring Boot', 'Microservices', 'Google Maps API'],
    github: 'https://github.com/ShrutiDhere'
  },
  codehire: {
    title: 'CodeHire AI: Smart Resume Analyzer',
    description: 'A resume evaluation solution that extracts keywords, scores ATS compatibility, and offers intelligent job recommendations.',
    features: [
      'Resume analysis engine',
      'Keyword extraction pipeline',
      'Job recommendation engine',
      'ATS scoring system',
      'Dashboard and admin panel',
      'Insightful feedback for applicants'
    ],
    tech: ['Java', 'Spring Boot', 'MySQL', 'NLP API'],
    github: 'https://github.com/ShrutiDhere'
  }
};

function toggleMobileMenu() {
  navMenu.classList.toggle('open');
  menuToggle.classList.toggle('open');
}

menuToggle?.addEventListener('click', toggleMobileMenu);

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
    menuToggle.classList.remove('open');
  });
});

const observerOptions = {
  root: null,
  rootMargin: '0px',
  threshold: 0.35
};

const sectionObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const id = entry.target.id;
    const activeLink = document.querySelector(`.nav-link[href='#${id}']`);
    if (entry.isIntersecting) {
      navLinks.forEach(link => link.classList.remove('active'));
      activeLink?.classList.add('active');
    }
  });
}, observerOptions);

sections.forEach(section => sectionObserver.observe(section));

function openProjectModal(projectKey) {
  const project = projectData[projectKey];
  if (!project) return;
  modalTitle.textContent = project.title;
  modalDescription.textContent = project.description;
  modalFeatures.innerHTML = project.features.map(item => `<li>${item}</li>`).join('');
  modalStack.innerHTML = project.tech.map(item => `<span>${item}</span>`).join('');
  modalGithub.href = project.github;
  modalGithub.textContent = 'View GitHub';
  modalOverlay.classList.add('open');
  gsap.fromTo('.modal-card', { opacity: 0, scale: 0.92, y: 24 }, { opacity: 1, scale: 1, y: 0, duration: 0.45, ease: 'power3.out' });
}

function closeProjectModal() {
  gsap.to('.modal-card', {
    opacity: 0,
    scale: 0.96,
    duration: 0.25,
    ease: 'power2.in',
    onComplete: () => modalOverlay.classList.remove('open')
  });
}

projectButtons.forEach(button => {
  button.addEventListener('click', (event) => {
    const projectCard = event.currentTarget.closest('.project-card');
    const projectKey = projectCard?.dataset.project;
    openProjectModal(projectKey);
  });
});

modalOverlay.addEventListener('click', (event) => {
  if (event.target === modalOverlay) {
    closeProjectModal();
  }
});

modalClose.addEventListener('click', closeProjectModal);
window.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && modalOverlay.classList.contains('open')) {
    closeProjectModal();
  }
});

const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach(card => {
  card.addEventListener('mousemove', (event) => {
    const bounds = card.getBoundingClientRect();
    const x = event.clientX - bounds.left;
    const y = event.clientY - bounds.top;
    const centerX = bounds.width / 2;
    const centerY = bounds.height / 2;
    const deltaX = (x - centerX) / centerX;
    const deltaY = (y - centerY) / centerY;
    card.style.transform = `perspective(900px) rotateX(${deltaY * 4}deg) rotateY(${deltaX * 6}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = 'perspective(900px) rotateX(0deg) rotateY(0deg)';
  });
});

window.addEventListener('scroll', () => {
  const scrollY = window.scrollY;
  document.body.style.setProperty('--scroll', scrollY / 1000);
});

window.addEventListener('load', () => {
  gsap.registerPlugin(ScrollTrigger);

  const heroTimeline = gsap.timeline();
  heroTimeline.from('.hero-copy .eyebrow', { opacity: 0, y: 20, duration: 0.7, ease: 'power3.out' });
  heroTimeline.from('.hero-copy h1', { opacity: 0, y: 40, duration: 0.9, ease: 'expo.out' }, '-=0.4');
  heroTimeline.from('.hero-role', { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out' }, '-=0.6');
  heroTimeline.from('.hero-text', { opacity: 0, y: 40, duration: 0.8, ease: 'power3.out' }, '-=0.6');
  heroTimeline.from('.hero-actions .btn', { opacity: 0, y: 30, stagger: 0.15, duration: 0.6, ease: 'power3.out' }, '-=0.55');

  gsap.utils.toArray('.reveal').forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 88%',
      },
      opacity: 0,
      y: 40,
      duration: 0.9,
      ease: 'power3.out',
      stagger: 0.15
    });
  });

  gsap.utils.toArray('.reveal-group').forEach((group) => {
    gsap.from(group.children, {
      scrollTrigger: {
        trigger: group,
        start: 'top 90%',
      },
      opacity: 0,
      y: 36,
      duration: 0.85,
      ease: 'power3.out',
      stagger: 0.18,
    });
  });

  gsap.from('.project-card', {
    scrollTrigger: {
      trigger: '.section-projects',
      start: 'top 85%',
    },
    y: 45,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    stagger: 0.15,
  });

  gsap.to('.hero-decor', {
    y: 35,
    ease: 'none',
    scrollTrigger: {
      trigger: '.hero',
      start: 'top top',
      end: 'bottom top',
      scrub: true,
    }
  });
});
