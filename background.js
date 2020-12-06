const background = document.querySelector("#background");
let imageNode;
const IMG_NUMBER = 30;
const windowHeight = window.innerHeight;
const windowWidth = window.innerWidth;

function handleImageLoad() {
    console.log("finished loading");
}

function paintImage(imgNumber) {
    const image = new Image();
    image.src = `images/${imgNumber}.jpg`;
    image.classList.add("backgroundImage");
    background.appendChild(image);
    imageNode = document.querySelector(".backgroundImage")
}

function genRandom() {
    const number = Math.ceil(Math.random() * IMG_NUMBER);
    return number;
}
function sizeSetting(event) {
    if (windowHeight * 16 <= windowWidth * 9) {
        imageNode.classList.remove("horizontal_standard")
        imageNode.classList.add("vertical_standard")
    } else {
        imageNode.classList.remove("vertical_standard")
        imageNode.classList.add("horizontal_standard");
    }
}

function init() {
    const randomNumber = genRandom();
    paintImage(randomNumber);
    window.addEventListener("resize", function (event) {
        location.reload();
    });
    window.addEventListener("load", sizeSetting);
}

//Math.random() 0~1까지니까 곱해지는 숫자가 최대값이 된다 + ceil
init();