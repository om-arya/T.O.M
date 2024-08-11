import { addResponsiveClassToNavbar, addExitAnimation, addMenuToggle } from "./animations.js";

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        entry.target.classList.add('show');
        observer.unobserve(entry.target);
    });
})

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

    //one observer to create animations for Tom to come in from the right
const observerInput = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        entry.target.classList.add('show-tom');
        observerInput.unobserve(entry.target);
    });
})

const hiddenElementsInput = document.querySelectorAll(".hidden-tom");
hiddenElementsInput.forEach((el) => observerInput.observe(el));

addResponsiveClassToNavbar();
addExitAnimation();
addMenuToggle();