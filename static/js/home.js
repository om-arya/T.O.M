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