// Responsive Navigation Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  const expanded = navToggle.getAttribute('aria-expanded') === 'true' || false;
  navToggle.setAttribute('aria-expanded', !expanded);
  navMenu.classList.toggle('active');
});

// Smooth scroll & active link highlight
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.nav-link');

window.addEventListener('scroll', () => {
  let current = '';

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 80;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute('id');
    }
  });

  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href').substring(1) === current) {
      link.classList.add('active');
    }
  });

  // Show/hide back to top button
  const backToTop = document.getElementById('back-to-top');
  if (window.pageYOffset > 300) {
    backToTop.style.display = 'flex';
  } else {
    backToTop.style.display = 'none';
  }
});

// Back to top button functionality
document.getElementById('back-to-top').addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Animated typing effect for hero
const typingText = [
  'IT Support Technician',
  'Cloud Computing Specialist',
  'Freelance IT Expert',
  'Problem Solver & Automation Enthusiast',
];

let typingIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typingSpeed = 120;
const deletingSpeed = 50;
const delayBetween = 2000;

const typingElement = document.getElementById('typing');

function type() {
  const currentText = typingText[typingIndex];
  if (isDeleting) {
    charIndex--;
    typingElement.textContent = currentText.substring(0, charIndex);
    if (charIndex === 0) {
      isDeleting = false;
      typingIndex = (typingIndex + 1) % typingText.length;
      setTimeout(type, 400);
    } else {
      setTimeout(type, deletingSpeed);
    }
  } else {
    charIndex++;
    typingElement.textContent = currentText.substring(0, charIndex);
    if (charIndex === currentText.length) {
      isDeleting = true;
      setTimeout(type, delayBetween);
    } else {
      setTimeout(type, typingSpeed);
    }
  }
}

document.addEventListener('DOMContentLoaded', () => {
  type();
});

// FORM VALIDATION & SIMULATED SUBMISSION
const form = document.getElementById('quote-form');
const nameInput = document.getElementById('client-name');
const emailInput = document.getElementById('client-email');
const projectTypeSelect = document.getElementById('project-type');
const detailsInput = document.getElementById('project-details');

const nameError = document.getElementById('name-error');
const emailError = document.getElementById('email-error');
const projectTypeError = document.getElementById('project-type-error');
const detailsError = document.getElementById('details-error');
const successMessage = document.getElementById('form-success');

form.addEventListener('submit', e => {
  e.preventDefault();

  let valid = true;
  successMessage.textContent = '';
  
  // Name validation
  if (nameInput.value.trim() === '') {
    nameError.textContent = 'Please enter your full name.';
    nameError.style.display = 'block';
    valid = false;
  } else {
    nameError.style.display = 'none';
  }
  
  // Email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(emailInput.value.trim())) {
    emailError.textContent = 'Please enter a valid email address.';
    emailError.style.display = 'block';
    valid = false;
  } else {
    emailError.style.display = 'none';
  }
  
  // Project type validation
  if (!projectTypeSelect.value) {
    projectTypeError.textContent = 'Please select a project type.';
    projectTypeError.style.display = 'block';
    valid = false;
  } else {
    projectTypeError.style.display = 'none';
  }
  
  // Project details validation
  if (detailsInput.value.trim() === '') {
    detailsError.textContent = 'Please provide project details.';
    detailsError.style.display = 'block';
    valid = false;
  } else {
    detailsError.style.display = 'none';
  }

  if (valid) {
    // Simulate submission (you can integrate real backend or services later)
    form.reset();
    successMessage.textContent = 'Thank you! Your request has been sent successfully.';
  }
});
