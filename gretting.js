const form = document.querySelector('.js-form'),
    todoForm = document.querySelector(".js-toDoForm"),
    input = document.querySelector("input"),
    greeting = document.querySelector(".js-greetings"),
    ulBox = document.querySelector(".ul-master");
const toDoList = document.querySelector(".js-toDoList");
const SHOWING_CN = "showing", USER_LS = "currentUser";
let isAsk = false;
function saveName(text) {
    localStorage.setItem(USER_LS, text) //todo :이름 지우고 다시 등록할수 있는 기능 추가
}

function handleSubmit(event) {
    greeting.classList.remove("noneDisplay");
    event.preventDefault();
    const currentValue = input.value;
    paintGreeting(currentValue);
    saveName(currentValue);
}

function askForName() {
    ulBox.classList.remove("ul-box");
    ulBox.classList.add("ul-box-hidden");
    greeting.classList.add("noneDisplay");
    form.classList.add(SHOWING_CN);
    form.addEventListener("submit", handleSubmit);
    todoForm.classList.remove(SHOWING_CN);
}

function paintGreeting(text) {
    let Dobj = new Date();
    let DHour = Dobj.getHours();
    let hello = "Hello";
    ulBox.classList.remove("ul-box-hidden");
    ulBox.classList.add("ul-box");
    form.classList.remove(SHOWING_CN);
    greeting.classList.add(SHOWING_CN);
    if (DHour < 5) {
        hello = "Good down";
    } else if (DHour < 12) {
        hello = "Good morning";
    } else if (DHour < 18) {
        hello = "Good afternoon"
    } else if (DHour < 22) {
        hello = "Good evening";
    } else {
        hello = "Good night";
    }
    function deleteinitial(event) {
        let btn = event.target;
        if (btn.tagName !== "BUTTON") {
            btn = btn.parentNode;
        }
        console.log(btn.tagName);
        const target_li = btn.parentNode;
        console.log(target_li.tagName);
        toDoList.removeChild(target_li);
    }
    function paintInitial(text) {
        todoForm.addEventListener("submit", enterToDo);
        const li = document.createElement("li"); //create하고 .appendChild로 위치잡아준다
        const delBtn = document.createElement("button");
        const div = document.createElement("div");
        delBtn.innerHTML = '<i class="fas fa-check"></i>';
        delBtn.classList.add("main-li-delBtn");
        delBtn.addEventListener("click", deleteinitial)
        div.innerHTML = `<div class="ToDoText">${text}</div>`;
        div.classList.add("toDoText");
        li.appendChild(div);
        li.appendChild(delBtn);
        li.classList.add("main-li");
        toDoList.appendChild(li);
    }
    greeting.innerText = `${hello}, ${text}.`;
    todoForm.classList.add(SHOWING_CN);
    greeting.addEventListener("click", goToDo);
    if (isAsk === true) {
        paintInitial(`"${hello}, ${text}." 클릭하고 할 일 입력하기`);
    }
}

function loadName() {
    const currentUser = localStorage.getItem(USER_LS);
    if (currentUser === null) {
        askForName();
        isAsk = true;
    } else {
        paintGreeting(currentUser);
        isAsk = false;
    }
}

function init() {
    loadName();
}

init();


