

// document.addEventListener('DOMContentLoaded', () => {
//     const title = document.querySelector(".big-title");
//     const subtitle = document.querySelector(".subtitle")

//     console.log(title.textContent);
//     console.log(subtitle.textContent);

//     typingEffect(title, title.textContent);
//     typingEffect(subtitle, subtitle.textContent);
// });

// async function typingEffect(element, text) {
//     setTimeout(() => {
//         element.textContent = "";
//     }, 0);

//     let ch = 0;
//     typeInterval = setInterval(() => {
//         element.textContent += text[ch];
//         ch += 1;
//         if (ch == text.length) {
//             clearInterval(typeInterval);
//         }
//     }, 50);
// }