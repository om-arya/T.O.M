let random= document.querySelector('tom-trigger');
let result= document.querySelector('h1');

let messages= ['womp1', 'womp2', 'womp3'];

function getRandomNumber(min, mix){
    let step1 = max - min + 1;
    let step2 = Math.random() * step1;
    let result = Math.floor(step2) + min;

    return result;
}

random.addEventListener('click', () => {
    let index = getRandomNumber(0, messages.length-1);
    result.innerText = messages[index];
})