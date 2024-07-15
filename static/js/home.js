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

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show');
        } else {
            entry.target.classList.remove('show');
        }
    });
})

const hiddenElements = document.querySelectorAll(".hidden");
hiddenElements.forEach((el) => observer.observe(el));

/**
 * EXIT ANIMATION CODE: We first select all the a href tags on the page- these are only used to lead away from the page itself
 * so page functionality isn't impacted. We then add an event listener for these links, and if any of them is clicked, we call 
 * preventDefault() to prevent them from directly sending the user to the next page. We then put all the elements we want to have disappear 
 * (in this case everything but the menu bar and footer) on the exit-animation classlist, which makes them fade into opacity 0. After that, 
 * the link directs the user to the page containing the link.
 */
const allLinks = document.querySelectorAll('a');

allLinks.forEach(link => {
    link.addEventListener('click', (event) => {
    
        //stops link from just sending the user to the next page.
        event.preventDefault();

        //add everything below the menu bar and above the footer to the exit animation class list so the animation plays.
        const formElements = document.getElementById('home-container');
        formElements.classList.add('exit');
  
        //delay after animation and send the user to the link
        setTimeout(() => {
            window.location.href = link.href;
        }, 500);
    });
  });

  //one observer to create animations for Tom to come in from the right
const observerInput = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('show-tom');
            //stop observing after the animation plays once so that it doesn't replay everytime the user scrolls up
            observerInput.unobserve(entry.target);
        } else {
            entry.target.classList.remove('show-tom');
            observerInput.unobserve(entry.target);
        }
    });
})

const hiddenElementsInput = document.querySelectorAll(".hidden-tom");
hiddenElementsInput.forEach((el) => observerInput.observe(el));