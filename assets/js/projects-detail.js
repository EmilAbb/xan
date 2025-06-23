document.addEventListener('DOMContentLoaded', function () {
    const slider = document.querySelector('.projects-slider');
    const cards = document.querySelectorAll('.projects-gallery-card');
    const prevBtn = document.querySelector('.slider-prev');
    const nextBtn = document.querySelector('.slider-next');

    if (cards.length === 0) return;

    let cardWidth = cards[0].offsetWidth + 15;
    let currentPosition = 0;
    let cardsToShow = window.innerWidth < 768 ? 1 : 3;
    let maxPosition = -((cards.length - cardsToShow) * cardWidth);

    function updateMaxPosition() {
        cardWidth = cards[0].offsetWidth + 15;
        cardsToShow = window.innerWidth < 768 ? 1 : 3;
        maxPosition = -((cards.length - cardsToShow) * cardWidth);

        // Sınırları kontrol et
        if (currentPosition < maxPosition) {
            currentPosition = maxPosition;
        } else if (currentPosition > 0) {
            currentPosition = 0;
        }

        slider.style.transform = `translateX(${currentPosition}px)`;
        updateButtons();
    }

    function updateButtons() {
        prevBtn.disabled = currentPosition === 0;
        nextBtn.disabled = currentPosition <= maxPosition;
        prevBtn.classList.toggle('disabled', prevBtn.disabled);
        nextBtn.classList.toggle('disabled', nextBtn.disabled);
    }

    nextBtn.addEventListener('click', () => {
        if (currentPosition > maxPosition) {
            currentPosition -= cardWidth;
            slider.style.transform = `translateX(${currentPosition}px)`;
            updateButtons();
        }
    });

    prevBtn.addEventListener('click', () => {
        if (currentPosition < 0) {
            currentPosition += cardWidth;
            slider.style.transform = `translateX(${currentPosition}px)`;
            updateButtons();
        }
    });

    window.addEventListener('resize', () => {
        updateMaxPosition();
    });

    updateMaxPosition(); // Başlangıçta ayarla

    lightGallery(document.getElementById('projectsGallery'), {
        selector: '.projects-gallery-card',
        download: false,
        counter: false
    });
});
