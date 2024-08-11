function addResponsiveClassToNavbar() {
    document.addEventListener('DOMContentLoaded', function () {
        document.querySelector('.icon').addEventListener('click', function () {
            var x = document.getElementById('navbar');
            if (x.className === 'nav-items') {
                x.className += ' responsive';
            } else {
                x.className = 'nav-items';
            }
        });
    });
}

function addMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuContent = document.querySelector('.menu-content');

    menuToggle.addEventListener('click', () => {
        menuContent.classList.toggle('show-menu');
    });
}

export { addResponsiveClassToNavbar, addMenuToggle }