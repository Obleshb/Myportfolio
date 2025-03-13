
// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
  navLinks.classList.toggle('active');
  hamburger.classList.toggle('active');
});

// Close menu when clicking a nav link
document.querySelectorAll('.nav-links a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('active');
    hamburger.classList.remove('active');
  });
});

// Active link highlighting
const sections = document.querySelectorAll('section');
const navItems = document.querySelectorAll('.nav-links a');

window.addEventListener('scroll', () => {
  let current = '';
  
  sections.forEach(section => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (scrollY >= sectionTop - 200) {
      current = section.getAttribute('id');
    }
  });

  navItems.forEach(item => {
    item.classList.remove('active');
    if (item.getAttribute('href').slice(1) === current) {
      item.classList.add('active');
    }
  });
});

// Form validation
const form = document.querySelector('form');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    
    // Simple validation
    const name = document.getElementById('name');
    const email = document.getElementById('email');
    const message = document.getElementById('message');
    let isValid = true;
    
    if (!name.value.trim()) {
      isValid = false;
      showError(name, 'Name is required');
    } else {
      removeError(name);
    }
    
    if (!email.value.trim()) {
      isValid = false;
      showError(email, 'Email is required');
    } else if (!isValidEmail(email.value)) {
      isValid = false;
      showError(email, 'Please enter a valid email');
    } else {
      removeError(email);
    }
    
    if (!message.value.trim()) {
      isValid = false;
      showError(message, 'Message is required');
    } else {
      removeError(message);
    }
    
    if (isValid) {
      // Here you would typically send the form data to a server
      alert('Form submitted successfully!');
      form.reset();
    }
  });
}

// Helper functions for form validation
function showError(input, message) {
  const formGroup = input.parentElement;
  let errorElement = formGroup.querySelector('.error-message');
  
  if (!errorElement) {
    errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.style.color = 'red';
    errorElement.style.fontSize = '0.8rem';
    errorElement.style.marginTop = '0.5rem';
    formGroup.appendChild(errorElement);
  }
  
  input.style.borderColor = 'red';
  errorElement.textContent = message;
}

function removeError(input) {
  const formGroup = input.parentElement;
  const errorElement = formGroup.querySelector('.error-message');
  
  input.style.borderColor = '';
  if (errorElement) {
    formGroup.removeChild(errorElement);
  }
}

function isValidEmail(email) {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}

// Smooth scroll behavior for all links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    
    const targetId = this.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    
    if (targetElement) {
      window.scrollTo({
        top: targetElement.offsetTop - 70,
        behavior: 'smooth'
      });
    }
  });
});

// Animate skill bars on scroll
const skillLevels = document.querySelectorAll('.skill-level');

// Initial state (0% width)
skillLevels.forEach(skill => {
  skill.style.width = '0%';
});

// Animate when in view
const animateSkills = () => {
  const triggerBottom = window.innerHeight * 0.8;
  
  skillLevels.forEach(skill => {
    const skillTop = skill.getBoundingClientRect().top;
    
    if (skillTop < triggerBottom) {
      const targetWidth = skill.getAttribute('style').split(':')[1].trim();
      skill.style.transition = 'width 1s ease-in-out';
      skill.style.width = targetWidth;
    }
  });
};

window.addEventListener('scroll', animateSkills);
window.addEventListener('load', animateSkills);
