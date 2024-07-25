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
            }, 35);
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
});
