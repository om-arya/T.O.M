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

/**
 * We first select all the a href tags on the page- these are only used to lead away from the page itself
 * so page functionality isn't impacted. We then add an event listener for these links, and if any of them is clicked, we call 
 * preventDefault() to prevent them from directly sending the user to the next page. We then put all the elements we want to have disappear 
 * (in this case everything but the menu bar and footer) on the exit-animation classlist, which makes them fade into opacity 0. After that, 
 * the link directs the user to the page containing the link.
 */
function addExitAnimation() {
    const allLinks = document.querySelectorAll('.nav-items a');

    allLinks.forEach(link => {
        if(!link.classList.contains('small-menu-link')) {
            link.addEventListener('click', (event) => {
        
                //stops link from just sending the user to the next page.
                event.preventDefault();
        
                //add everything below the menu bar and above the footer to the exit animation class list so the animation plays.
                const formElements = document.getElementById('timer-div');
                formElements.classList.add('exit');
        
                //delay after animation and send the user to the link
                setTimeout(() => {
                    window.location.href = link.href;
                }, 500);
            });
        }
    });
}

function addMenuToggle() {
    const menuToggle = document.querySelector('.menu-toggle');
    const menuContent = document.querySelector('.menu-content');

    menuToggle.addEventListener('click', () => {
        menuContent.classList.toggle('show-menu');
    });
}

export { addResponsiveClassToNavbar, addExitAnimation, addMenuToggle }