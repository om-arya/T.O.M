document.addEventListener("DOMContentLoaded", () => {

    function typingEffect(element, text) {
        return new Promise((resolve) => {
            element.textContent = ""; 
            element.classList.add('visible');
            let ch = 0;
            const typeInterval = setInterval(() => {
                element.textContent += text[ch];
                ch += 1;
                if (ch === text.length) {
                    clearInterval(typeInterval);
                    resolve();
                }
            }, 40);
        });
    }

    const triggerTypingEffect = async () => {
        const bigTitle = document.querySelector(".big-title");
        const subtitle = document.querySelector(".subtitle");

        if (bigTitle) {
            await typingEffect(bigTitle, bigTitle.textContent);
        }
        if (subtitle) {
            await typingEffect(subtitle, subtitle.textContent);
        }
        activateObservers();
    };

    const activateObservers = () => {

        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show');
                }
            });
        });

        const observerRight = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('show-tom');
                }
            });
        });

        const hiddenElements = document.querySelectorAll(".hidden");
        hiddenElements.forEach((el) => observer.observe(el));

        const hiddenElementsRight = document.querySelectorAll(".hidden-tom");
        hiddenElementsRight.forEach((el) => observerRight.observe(el));
    };

    triggerTypingEffect();


    /**
    * EXIT ANIMATION CODE: We first select all the a href tags on the page- these are only used to lead away from the page itself
    * so page functionality isn't impacted. We then add an event listener for these links, and if any of them is clicked, we call 
    * preventDefault() to prevent them from directly sending the user to the next page. We then put all the elements we want to have disappear 
    * (in this case everything but the menu bar and footer) on the exit-animation classlist, which makes them fade into opacity 0. After that, 
    * the link directs the user to the page containing the link. If the responsive version of the nav bar is visible, the transitions 
    * do not play to prevent the page contents from transitioning away before the user has gone to a new page. 
     */
    const allLinks = document.querySelectorAll('a');

    allLinks.forEach(link => {
        link.addEventListener('click', (event) => {
    
            //stops link from just sending the user to the next page.
            event.preventDefault();

            //add everything below the menu bar and above the footer to the exit animation class list so the animation plays.
            const allElements = document.getElementById('all-content');
            allElements.classList.add('exit');
  
            //delay after animation and send the user to the link
            setTimeout(() => {
                window.location.href = link.href;
            }, 500);
        });
    });
});
