const background = document.querySelector("#background");
let imageNode;
const IMG_NUMBER = 30;

function handleImageLoad() {
    console.log("finished loading");
}

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber}.jpg`;
    image.classList.add("backgroundImage");
    background.appendChild(image);
    imageNode = document.querySelector(".backgroundImage")
    imagefix();
}
function imagefix(event) {
    const image = document.querySelector(".backgroundImage")
    if (window.innerHeight * 16 < window.innerWidth * 9) {
        image.classList.add("widthfix");
        image.classList.remove("hightfix");
    } else if (window.innerHeight * 16 > window.innerWidth * 9) {
        image.classList.add("hightfix");
        image.classList.remove("widthfix");
    }
    console.log("image resized!!", image);
}
function genRandom() {
    const number = Math.ceil(Math.random() * IMG_NUMBER);
    return number;
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
    window.addEventListener("resize", imagefix);
}

//Math.random() 0~1까지니까 곱해지는 숫자가 최대값이 된다 + ceil
init();