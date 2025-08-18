let slides = document.querySelectorAll('.slide');
let thumbnails = document.querySelectorAll('.thumbnail');
let slider = document.getElementById('slider'); 
let totalSlides = slides.length;

let currentSlide = 1; 
let selectedThumbnail = 0;

// Görünən slayd sayı
function getVisibleSlides() {
    if (window.innerWidth < 768) return 1;   // mobil
    else if (window.innerWidth < 1024) return 2; // tablet
    else return 3; // desktop
}

// Slide width %
function getSlideWidth() {
    return 100 / getVisibleSlides();
}

function updateSlider() {
    const visibleSlides = getVisibleSlides();
    const slideWidth = getSlideWidth();

    const maxOffset = totalSlides - visibleSlides;
    let offset = currentSlide;
    if (offset > maxOffset) offset = maxOffset;
    if (offset < 0) offset = 0;

    slider.style.transform = `translateX(-${offset * slideWidth}%)`;

    // Aktiv slayd
    slides.forEach((slide, index) => {
        slide.classList.toggle('active', index === currentSlide);
    });

    // Aktiv thumbnail
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === selectedThumbnail);
    });
}

// Sağ/sol düymələr
function changeSlide(direction) {
    currentSlide += direction;

    if (currentSlide < 0) currentSlide = 0;
    if (currentSlide >= totalSlides) currentSlide = totalSlides - 1;

    selectedThumbnail = currentSlide;
    updateSlider();
}

// Thumbnail klik
thumbnails.forEach((thumb, index) => {
    thumb.addEventListener('click', () => {
        selectedThumbnail = index;
        currentSlide = index;
        updateSlider();
    });
});

// Auto slide mobil üçün
function autoSlide() {
    if (window.innerWidth < 768) {
        currentSlide++;
        if (currentSlide >= totalSlides) currentSlide = 0;
        selectedThumbnail = currentSlide;
        updateSlider();
    }
}

// Auto slide interval
setInterval(autoSlide, 3000);

// Yenidən ölçü dəyişəndə slider yenilə
window.addEventListener('resize', updateSlider);

// İlk açılış
updateSlider();
