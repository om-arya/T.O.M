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

window.onload = () => {
    //   The next to sections allow the title and profiles to transition on once the viewer is at their location
  
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

/**
 * EXIT ANIMATION CODE: We first select all the a href tags on the page- these are only used to lead away from the page itself
 * so page functionality isn't impacted. We then add an event listener for these links, and if any of them is clicked, we call 
 * preventDefault() to prevent them from directly sending the user to the next page. We then put all the elements we want to have disappear 
 * (in this case everything but the menu bar and footer) on the exit-animation classlist, which makes them fade into opacity 0. After that, 
 * the link directs the user to the page containing the link.
 */
const allLinks = document.querySelectorAll('.nav-items a');

allLinks.forEach(link => {
    //filter out the a href that is the menu icon when the page is smaller to avoid having elements transition before the user has selected another page
    if(!link.classList.contains('small-menu-link')) {
        link.addEventListener('click', (event) => {
    
            //stops link from just sending the user to the next page.
            event.preventDefault();
    
            //add everything below the menu bar and above the footer to the exit animation class list so the animation plays.
            const formElements = document.getElementById('profiles-section-wrapper');
            formElements.classList.add('exit');
            const title = document.getElementById('title');
            title.classList.add('exit');
      
            //delay after animation and send the user to the link
            setTimeout(() => {
                window.location.href = link.href;
            }, 500);
        });
    }
  });

const menuToggle = document.querySelector('.menu-toggle');
const menuContent = document.querySelector('.menu-content');

menuToggle.addEventListener('click', () => {
menuContent.classList.toggle('show-menu');
});