document.addEventListener("DOMContentLoaded", () => {
    const stars = document.querySelectorAll(".stars span, .stars1, .stars2, .stars3");
    const homeSection = document.querySelector(".home");

    function checkStarPosition() {
        stars.forEach(star => {
            const starRect = star.getBoundingClientRect();
            const homeRect = homeSection.getBoundingClientRect();

            if (starRect.top > homeRect.bottom) {
                star.style.visibility = "hidden";
            } else {
                star.style.visibility = "visible";
            }
        });

        requestAnimationFrame(checkStarPosition);
    }

    checkStarPosition();
});

document.addEventListener("DOMContentLoaded", () => {
    const sections = document.querySelectorAll("section");
    let index = 0; // Track current section
    let isScrolling = false; // Prevent multiple scrolls

    function disableScroll() {
        document.body.style.overflow = "hidden";
    }

    function enableScroll() {
        document.body.style.overflow = "auto";
    }

    function smoothScrollTo(targetPosition, duration) {
        const startPosition = window.scrollY;
        const distance = targetPosition - startPosition;
        let startTime = null;

        function animation(currentTime) {
            if (!startTime) startTime = currentTime;
            const timeElapsed = currentTime - startTime;
            const progress = Math.min(timeElapsed / duration, 1); // Progress from 0 to 1
            window.scrollTo(0, startPosition + distance * easeInOutQuad(progress));

            if (timeElapsed < duration) {
                requestAnimationFrame(animation);
            } else {
                isScrolling = false; // Allow next scroll
                enableScroll();
            }
        }

        function easeInOutQuad(t) {
            return t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;
        }

        disableScroll();
        requestAnimationFrame(animation);
    }

    function scrollToSection(i) {
        if (i >= 0 && i < sections.length && !isScrolling) {
            isScrolling = true;
            smoothScrollTo(sections[i].offsetTop, 2000); // Adjust speed (1000ms = 1 sec)
            index = i;
        }
    }

    document.addEventListener("wheel", (event) => {
        if (!isScrolling) {
            if (event.deltaY > 0) {
                scrollToSection(index + 1);
            } else {
                scrollToSection(index - 1);
            }
        }
        event.preventDefault();
    }, { passive: false });

    document.addEventListener("keydown", (event) => {
        if (!isScrolling) {
            if (event.key === "ArrowDown") {
                scrollToSection(index + 1);
            } else if (event.key === "ArrowUp") {
                scrollToSection(index - 1);
            }
        }
        event.preventDefault();
    }, { passive: false });
});
