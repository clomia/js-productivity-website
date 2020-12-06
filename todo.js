const toDoForm = document.querySelector(".js-toDoForm"),
    toDoInput = toDoForm.querySelector("input");
const resetBtn = document.querySelector(".resetBtn");
const TODOS_LS = "toDos";
let toDos = [];
/* console.dir 도 있다
event는 (자신)target을 가지고 있어
target(html element).parentNode로 부모요소에 접근할수 있어
html element objects have.. parentNode
 */
function deleteToDo(event) {
    let btn = event.target;
    if (btn.tagName !== "BUTTON") {
        btn = btn.parentNode;
    }
    console.log(btn.tagName);
    const target_li = btn.parentNode;
    console.log(target_li.tagName);
    toDoList.removeChild(target_li);
    const cleanToDos = toDos.filter(function (toDo) {
        return toDo.id !== parseInt(target_li.id) //ㄱㅊ toDo.id랑 li.id 둘다 1부터 시작해
    });
    toDos = cleanToDos
    seveToDos()
}

function seveToDos() {
    localStorage.setItem(TODOS_LS, JSON.stringify(toDos));
}
/* local storage에는 자바스크립트의 data를 저장할 수 없어
오직 string만 저장할 수 있어 그래서 {object:[object]}이런 __str__로 저장되
JSON.stringify는 JS object를 sring으로 바꾸어 준다
가져올때도 마찬가지로 변환(parsing)해야함 */

function paintToDo(text) {
    todoForm.addEventListener("submit", enterToDo);
    const li = document.createElement("li"); //create하고 .appendChild로 위치잡아준다
    const delBtn = document.createElement("button");
    const div = document.createElement("div");
    const newId = toDos.length + 1;
    delBtn.innerHTML = '<i class="fas fa-check"></i>';
    delBtn.classList.add("main-li-delBtn");
    delBtn.addEventListener("click", deleteToDo)
    div.innerHTML = `<div class="ToDoText">${text}</div>`;
    div.classList.add("toDoText");
    li.appendChild(div);
    li.appendChild(delBtn);
    li.id = newId;
    li.classList.add("main-li");
    toDoList.appendChild(li);
    const toDoObj = {
        text: text,
        id: newId,
    };
    toDos.push(toDoObj);
    seveToDos();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = toDoInput.value;
    paintToDo(currentValue);
    toDoInput.value = "";
}



function loadToDos() {
    const loadedToDos = localStorage.getItem(TODOS_LS);
    if (loadedToDos !== null) {
        const parsedToDos = JSON.parse(loadedToDos);
        parsedToDos.forEach(function (toDo) {
            paintToDo(toDo.text);
        });
    }
}

function init() {
    loadToDos();
    toDoForm.addEventListener("submit", handleSubmit);
    resetBtn.addEventListener("click", function (event) {
        localStorage.clear();
        location.reload();
    })
}

init();