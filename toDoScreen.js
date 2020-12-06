let pressedGreeting = false;
function goToDo(event) {
    pressedGreeting = true;
    greeting.classList.add("noneDisplay");
    todoForm.classList.remove("noneDisplay");
}

function enterToDo(event) {
    pressedGreeting = false;
    greeting.classList.remove("noneDisplay");
    todoForm.classList.add("noneDisplay");
}