hamburgerMenu.addEventListener('click', function () {
  this.classList.toggle('active');
  menuOverlay.classList.toggle('active');
});

languageMenuTrigger.addEventListener('click', function () {
  languageMenu.classList.add('active');
});

backFromLanguage.addEventListener('click', function () {
  languageMenu.classList.remove('active');
});

backButton.addEventListener('click', function () {
  menuOverlay.classList.remove('active');
  hamburgerMenu.classList.remove('active');
  languageMenu.classList.remove('active');
});

document.addEventListener('DOMContentLoaded', function () {
  const scrollTopBtn = document.querySelector('.scroll-top');

  window.addEventListener('scroll', function () {
    if (window.scrollY > 300) {
      scrollTopBtn.classList.add('visible');
    } else {
      scrollTopBtn.classList.remove('visible');
    }
  });

  scrollTopBtn.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  });
});




document.addEventListener('DOMContentLoaded', function () {
  lightGallery(document.getElementById('catalogGallery'), {
    selector: '.catalog-image',
    download: false,
    counter: false
  });
});

const galleryCards = document.querySelectorAll('.gallery-card');
const lightbox = document.getElementById('lightbox');
const lightboxImage = document.querySelector('.lightbox-image');
const lightboxClose = document.querySelector('.lightbox-close');
const lightboxPrev = document.querySelector('.lightbox-prev');
const lightboxNext = document.querySelector('.lightbox-next');
const lightboxCounter = document.querySelector('.lightbox-counter');

let currentImageIndex = 0;
const images = [
  {
    src: "./assets/images/service-detail.jpg",
    alt: "Temel ve beton pompası ile çalışma"
  },
  {
    src: "./assets/images/service-detail.jpg",
    alt: "Temel ve beton pompası ile çalışma"
  },
  {
    src: "./assets/images/1-1.jpg",
    alt: "Temel ve beton pompası ile çalışma"
  },
  {
    src: "./assets/images/service-detail.jpg",
    alt: "Temel ve beton pompası ile çalışma"
  },
   {
    src: "./assets/images/service-detail.jpg",
    alt: "Temel ve beton pompası ile çalışma"
  }
];

galleryCards.forEach((card, index) => {
  card.addEventListener('click', () => {
    currentImageIndex = index;
    openLightbox();
  });
});

function openLightbox() {
  lightbox.classList.add('active');
  updateLightboxImage();
  document.body.style.overflow = 'hidden';
}

function closeLightbox() {
  lightbox.classList.remove('active');
  document.body.style.overflow = 'auto';
}

function updateLightboxImage() {
  lightboxImage.src = images[currentImageIndex].src;
  lightboxImage.alt = images[currentImageIndex].alt;
  lightboxCounter.textContent = `${currentImageIndex + 1} / ${images.length}`;
}

function nextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  updateLightboxImage();
}

function prevImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  updateLightboxImage();
}

lightboxClose.addEventListener('click', closeLightbox);
lightboxNext.addEventListener('click', nextImage);
lightboxPrev.addEventListener('click', prevImage);

lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox) {
    closeLightbox();
  }
});

document.addEventListener('keydown', (e) => {
  if (!lightbox.classList.contains('active')) return;

  switch (e.key) {
    case 'Escape':
      closeLightbox();
      break;
    case 'ArrowLeft':
      prevImage();
      break;
    case 'ArrowRight':
      nextImage();
      break;
  }
});

let touchStartX = 0;
let touchEndX = 0;

lightboxImage.addEventListener('touchstart', (e) => {
  touchStartX = e.changedTouches[0].screenX;
});

lightboxImage.addEventListener('touchend', (e) => {
  touchEndX = e.changedTouches[0].screenX;
  handleSwipe();
});

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;

  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      nextImage();
    } else {
      prevImage();
    }
  }
}


document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.other-services-down');
    const prevBtn = document.querySelector('.other-services-prev-button');
    const nextBtn = document.querySelector('.other-services-next-button');
    const services = document.querySelectorAll('.service');
    
    let currentIndex = 0;
    let cardsPerView = window.innerWidth <= 768 ? 1 : 2;
    const totalCards = services.length;
    let maxIndex = totalCards - cardsPerView;
    
    const sliderWrapper = document.createElement('div');
    sliderWrapper.style.overflow = 'hidden';
    sliderWrapper.style.width = '100%';
    
    slider.parentNode.insertBefore(sliderWrapper, slider);
    sliderWrapper.appendChild(slider);
    
    slider.style.display = 'flex';
    slider.style.transition = 'transform 0.5s ease';
    slider.style.width = '100%';
    
    services.forEach((service, index) => {
        if (window.innerWidth <= 768) {
            service.style.width = 'calc(100% - 10px)';
            service.style.minWidth = 'calc(100% - 10px)';
        } else {
            service.style.width = 'calc(50% - 10px)';
            service.style.minWidth = 'calc(50% - 10px)';
        }
        service.style.flexShrink = '0'; 
        if (index < services.length - 1) {
            service.style.marginRight = '20px';
        }
    });
    
    function updateSlider() {
        const oneCardWidth = (100 / cardsPerView);
        const translateX = -(currentIndex * oneCardWidth);
        slider.style.transform = `translateX(${translateX}%)`;
        updateButtons();
    }
    
    function updateButtons() {
        maxIndex = totalCards - cardsPerView;
        
        if (currentIndex === 0) {
            prevBtn.style.opacity = '0.5';
            prevBtn.style.pointerEvents = 'none';
        } else {
            prevBtn.style.opacity = '1';
            prevBtn.style.pointerEvents = 'auto';
        }
        
        if (currentIndex >= maxIndex) {
            nextBtn.style.opacity = '0.5';
            nextBtn.style.pointerEvents = 'none';
        } else {
            nextBtn.style.opacity = '1';
            nextBtn.style.pointerEvents = 'auto';
        }
    }
    
    function goToPrev() {
        if (currentIndex > 0) {
            currentIndex--;
            updateSlider();
        }
    }
    
    function goToNext() {
        if (currentIndex < maxIndex) {
            currentIndex++;
            updateSlider();
        }
    }
    
    prevBtn.addEventListener('click', goToPrev);
    nextBtn.addEventListener('click', goToNext);
    
    document.addEventListener('keydown', function(e) {
        if (e.key === 'ArrowLeft') goToPrev();
        if (e.key === 'ArrowRight') goToNext();
    });
    
    updateButtons();
    
    window.addEventListener('resize', function() {
        cardsPerView = window.innerWidth <= 768 ? 1 : 2;
        
        services.forEach((service, index) => {
            if (window.innerWidth <= 768) {
                service.style.width = 'calc(100% - 10px)';
                service.style.minWidth = 'calc(100% - 10px)';
            } else {
                service.style.width = 'calc(50% - 10px)';
                service.style.minWidth = 'calc(50% - 10px)';
            }
        });
        
        currentIndex = 0;
        updateSlider();
    });
});