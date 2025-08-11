// Mobile Nav Toggle
const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('show');
  navToggle.setAttribute(
    'aria-expanded',
    navMenu.classList.contains('show')
  );
});

// Scroll to Top Button
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTop.style.display = 'block';
  } else {
    backToTop.style.display = 'none';
  }
});

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Typing Effect
const typingText = document.getElementById('typing');
const textArray = [
  'IT Support Technician',
  'Cloud Computing Specialist',
  'Network Administrator'
];
let textIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
  const currentText = textArray[textIndex];
  typingText.textContent = currentText.substring(0, charIndex);

  if (!isDeleting && charIndex < currentText.length) {
    charIndex++;
    setTimeout(type, 100);
  } else if (isDeleting && charIndex > 0) {
    charIndex--;
    setTimeout(type, 50);
  } else {
    isDeleting = !isDeleting;
    if (!isDeleting) {
      textIndex = (textIndex + 1) % textArray.length;
    }
    setTimeout(type, 1000);
  }
}

type();
