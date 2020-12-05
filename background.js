const body = document.querySelector("body");
const IMG_NUMBER = 7;


function handleImageLoad() {
    console.log("finished loading");
}

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber}.jpg`;
    image.classList.add("backgroundImage");
    body.prepend(image);
}

function genRandom() {
    const number = Math.ceil(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
}

//Math.random() 0~1까지니까 곱해지는 숫자가 최대값이 된다 + ceil
init();