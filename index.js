document.addEventListener('DOMContentLoaded', function() {
    // Mobile menu toggle
    const hamburger = document.querySelector('.hamburger');
    const navbarCollapse = document.querySelector('.navbar-collapse');
    const hamburgerIcon = document.querySelector('.hamburger-icon');
    const closeIcon = document.querySelector('.close-icon');
    
    hamburger.addEventListener('click', function() {
      navbarCollapse.classList.toggle('active');
      hamburgerIcon.classList.toggle('active');
      closeIcon.classList.toggle('active');
      
      if (navbarCollapse.classList.contains('active')) {
        hamburgerIcon.style.display = 'none';
        closeIcon.style.display = 'block';
      } else {
        hamburgerIcon.style.display = 'block';
        closeIcon.style.display = 'none';
      }
    });
    
    // Dropdown toggle for mobile
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    dropdownToggles.forEach(toggle => {
      toggle.addEventListener('click', function() {
        if (window.innerWidth <= 992) {
          const dropdownMenu = this.nextElementSibling;
          const arrow = this.querySelector('img');
          
          dropdownMenu.classList.toggle('active');
          
          if (dropdownMenu.classList.contains('active')) {
            arrow.style.transform = 'rotate(180deg)';
          } else {
            arrow.style.transform = 'rotate(0)';
          }
        }
      });
    });
    
    // Close dropdown when clicking outside
    document.addEventListener('click', function(e) {
      if (!e.target.closest('.nav-item') && window.innerWidth <= 992) {
        dropdownToggles.forEach(toggle => {
          const dropdownMenu = toggle.nextElementSibling;
          const arrow = toggle.querySelector('img');
          
          dropdownMenu.classList.remove('active');
          arrow.style.transform = 'rotate(0)';
        });
      }
    });
  });