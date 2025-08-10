// Wait for DOM
document.addEventListener('DOMContentLoaded', () => {
  // Navbar toggle for mobile
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  navToggle.addEventListener('click', () => {
    const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
    navToggle.setAttribute('aria-expanded', !expanded);
    navMenu.classList.toggle('active');
  });

  // Smooth scroll + Active link highlight
  const sections = document.querySelectorAll('section');
  const navLinks = document.querySelectorAll('.nav-link');

  function changeActiveLink() {
    let index = sections.length;

    while (--index && window.scrollY + 100 < sections[index].offsetTop) {}

    navLinks.forEach((link) => link.classList.remove('active'));
    navLinks[index].classList.add('active');
  }
  changeActiveLink();
  window.addEventListener('scroll', changeActiveLink);

  // Back to top button
  const backToTopBtn = document.getElementById('back-to-top');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 400) {
      backToTopBtn.classList.add('show');
    } else {
      backToTopBtn.classList.remove('show');
    }
  });

  backToTopBtn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // Typing effect in hero
  const typingElement = document.getElementById('typing');
  const phrases = [
    'IT Support Technician',
    'Cloud Computing Specialist',
    'Azure | AWS | OpenStack',
    'Helping solve technical challenges',
  ];
  let phraseIndex = 0;
  let letterIndex = 0;
  let typingDelay = 100;
  let erasingDelay = 50;
  let newPhraseDelay = 2000;

  function type() {
    if (letterIndex < phrases[phraseIndex].length) {
      typingElement.textContent += phrases[phraseIndex].charAt(letterIndex);
      letterIndex++;
      setTimeout(type, typingDelay);
    } else {
      setTimeout(erase, newPhraseDelay);
    }
  }

  function erase() {
    if (letterIndex > 0) {
      typingElement.textContent = phrases[phraseIndex].substring(0, letterIndex - 1);
      letterIndex--;
      setTimeout(erase, erasingDelay);
    } else {
      phraseIndex++;
      if (phraseIndex >= phrases.length) phraseIndex = 0;
      setTimeout(type, typingDelay + 200);
    }
  }

  setTimeout(type, newPhraseDelay);

  // Skills progress animation when section enters viewport
  const skillProgressBars = document.querySelectorAll('.skill-progress');
  const skillsSection = document.getElementById('skills');

  function animateSkills() {
    const sectionPos = skillsSection.getBoundingClientRect().top;
    const screenPos = window.innerHeight;

    if (sectionPos < screenPos - 100) {
      skillProgressBars.forEach((bar) => {
        bar.style.width = bar.style.getPropertyValue('--progress');
      });
      window.removeEventListener('scroll', animateSkills);
    }
  }
  window.addEventListener('scroll', animateSkills);
  animateSkills(); // in case already visible on load

  // Contact form validation & submission simulation
  const contactForm = document.getElementById('contact-form');
  const nameInput = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const messageInput = document.getElementById('message');

  const nameError = document.getElementById('name-error');
  const emailError = document.getElementById('email-error');
  const messageError = document.getElementById('message-error');
  const formSuccess = document.getElementById('form-success');

  function validateEmail(email) {
    // Simple regex email validation
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    // Reset errors and success message
    nameError.textContent = '';
    emailError.textContent = '';
    messageError.textContent = '';
    formSuccess.textContent = '';

    let valid = true;

    if (nameInput.value.trim().length < 2) {
      nameError.textContent = 'Please enter your name.';
      valid = false;
    }

    if (!validateEmail(emailInput.value.trim())) {
      emailError.textContent = 'Please enter a valid email.';
      valid = false;
    }

    if (messageInput.value.trim().length < 10) {
      messageError.textContent = 'Please enter a message (at least 10 characters).';
      valid = false;
    }

    if (valid) {
      // Simulate form submission delay
      formSuccess.textContent = 'Sending message...';

      setTimeout(() => {
        formSuccess.textContent = 'Thank you! Your message has been sent.';
        contactForm.reset();
      }, 1500);
    }
  });
});
