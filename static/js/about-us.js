import { addResponsiveClassToNavbar, addExitAnimation, addMenuToggle } from "./animations.js";

window.onload = () => {
    //The next to sections allow the title and profiles to transition on once the viewer is at their location
  
    //observer for the title text
    const observerTitle = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            entry.target.classList.add('about-us-title-show');
            observerTitle.unobserve(entry.target);
        });
    })

    const hiddenElementsTitle = document.querySelectorAll(".about-us-title");
    hiddenElementsTitle.forEach((el) => observerTitle.observe(el));

    //observer for the profile elements on the page
    const observerProfile = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            entry.target.classList.add('show');
            observerProfile.unobserve(entry.target);
        });
    })

    const hiddenProfiles = document.querySelectorAll(".hidden");
    hiddenProfiles.forEach((el) => observerProfile.observe(el));
}

addResponsiveClassToNavbar();
addExitAnimation();
addMenuToggle();