document.addEventListener("DOMContentLoaded", () => {
    // Carousel functionality
    const carouselContainer = document.querySelector(".carousel-container");
    const carouselSlides = document.querySelectorAll(".carousel-slide");
    const prevButton = document.querySelector(".carousel-prev");
    const nextButton = document.querySelector(".carousel-next");

    let currentSlide = 0;
    const totalSlides = carouselSlides.length;

    function showSlide(index) {
        if (index >= totalSlides) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = totalSlides - 1;
        } else {
            currentSlide = index;
        }
        carouselContainer.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function handlePrev() {
        showSlide(currentSlide - 1);
    }

    function handleNext() {
        showSlide(currentSlide + 1);
    }

    prevButton.addEventListener("click", handlePrev);
    nextButton.addEventListener("click", handleNext);

    // Auto-slide functionality
    const slideInterval = setInterval(handleNext, 3000); // Change slide every 3 seconds

    // Smooth scrolling functionality
    document.querySelectorAll("nav ul li a[href^='#']").forEach(link => {
        link.addEventListener("click", (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute("href"));
            if (target) {
                window.scrollTo({
                    top: target.offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });

    // Hamburger menu functionality
    const hamburger = document.querySelector('.hamburger-menu');
    const navUl = document.querySelector('nav ul');

    hamburger.addEventListener('click', () => {
        navUl.classList.toggle('show');
    });
});

// CSS for smooth carousel transition
const style = document.createElement('style');
style.textContent = `
.carousel-container {
    transition: transform 0.5s ease-in-out;
}
`;
document.head.appendChild(style);
