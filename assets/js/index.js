hamburgerMenu.addEventListener('click', function() {
    this.classList.toggle('active');
    menuOverlay.classList.toggle('active');
});

languageMenuTrigger.addEventListener('click', function() {
    languageMenu.classList.add('active');
});

backFromLanguage.addEventListener('click', function() {
    languageMenu.classList.remove('active');
});

backButton.addEventListener('click', function() {
    menuOverlay.classList.remove('active');
    hamburgerMenu.classList.remove('active');
    languageMenu.classList.remove('active'); 
});

document.addEventListener('DOMContentLoaded', function() {
  const scrollTopBtn = document.querySelector('.scroll-top');

  window.addEventListener('scroll', function() {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', function() {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});




document.addEventListener('DOMContentLoaded', function() {
            lightGallery(document.getElementById('catalogGallery'), {
                selector: '.catalog-image',
                download: false,
                counter: false
            });
        });