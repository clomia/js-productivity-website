const form = document.querySelector('.js-form'),
    input = document.querySelector("input"),
    greeting = document.querySelector(".js-greetings");

const SHOWING_CN = "showing", USER_LS = "currentUser";

function saveName(text) {
    localStorage.setItem(USER_LS, text) //todo :이름 지우고 다시 등록할수 있는 기능 추가
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
}

function paintGreeting(text) {
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    greeting.innerText = `Hello ${text}`;
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
    } else {
        paintGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();