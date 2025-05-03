

document.addEventListener("DOMContentLoaded", function() {
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

    prevButton.addEventListener("click", function() {
        showSlide(currentSlide - 1);
    });

    nextButton.addEventListener("click", function() {
        showSlide(currentSlide + 1);
    });

    // Auto-slide functionality
    setInterval(() => {
        showSlide(currentSlide + 1);
    }, 3000); // Change slide every 3 seconds

    // Smooth scrolling functionality
    const navLinks = document.querySelectorAll("nav ul li a");

    navLinks.forEach(link => {
        link.addEventListener("click", function(e) {
            const target = this.getAttribute("href");
            if (target.startsWith("#")) {
                e.preventDefault();
                const targetSection = document.querySelector(target);

                window.scrollTo({
                    top: targetSection.offsetTop,
                    behavior: "smooth"
                });
            }
        });
    });
});


const hamburger = document.querySelector('.hamburger-menu');
const navUl = document.querySelector('nav ul');

hamburger.addEventListener('click', () => {
    navUl.classList.toggle('show');
});