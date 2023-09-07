const inp = document.querySelector(".input input");
const add = document.querySelector(".input button");
let taskWrapper = document.querySelector(".task__wrapper");
const task = document.querySelector(".task");
const text = document.querySelectorAll(".text");

let allTask;
if (localStorage.getItem("Task")) {
  allTask = Array.from(JSON.parse(localStorage.getItem("Task")));
} else {
  allTask = [];
}

function showTusk() {
  taskWrapper.innerHTML = "";
  Array.from(JSON.parse(localStorage.getItem("Task"))).forEach((item) => {
    addTusk(item.text, item.id, item.done);
  });
}

if (JSON.parse(localStorage.getItem("Task"))) {
  showTusk();
}

add.addEventListener("click", () => {
  let inpValue = inp.value;
  taskWrapper = document.querySelector(".task__wrapper");
  let task = {
    id: allTask.length,
    text: inpValue,
    done: "",
  };
  allTask.push(task);

  localStorage.setItem("Task", JSON.stringify(allTask));
  showTusk();
  inp.value = "";
});

function addTusk(text, id, done) {
  const task = `<div class="task" >
<div class="check">
    <input type="checkbox" class="checkbox checkbox${id}" id="checkbox">
    <label for="checkbox" class="checkboxx">${done}</label>
</div>
<div class="text">${text}</div>
<div class="btn"><button class="btnDelite" data-id="${id}">Удалить</button></div>
</div>`;

  taskWrapper.insertAdjacentHTML("beforeend", task);
}

taskWrapper.addEventListener("click", (e) => {
  // Клик по кнопке удаления
  if (e.target.classList.contains("btnDelite")) {
    if (allTask.length === 1) {
      allTask.splice(0, 1);
    }
    allTask.splice(+e.target.dataset.id, 1);

    allTask.forEach((item, idx) => {
      item.id = idx;
    });
    localStorage.setItem("Task", JSON.stringify(allTask));
    showTusk();
  }
  // Клик по кнопке выполнения
  if (e.target.closest(".checkboxx")) {
    const childrens = e.target.closest(".check").children[1];
    if (childrens.innerHTML === '<i class="fa-solid fa-check"></i>') {
      allTask = Array.from(JSON.parse(localStorage.getItem("Task")));
      allTask.find((item) => {
        if (
          item.id ===
          +e.target.closest(".check").closest(".task").children[2].children[0]
            .dataset.id
        ) {
          item.done = "";
          localStorage.setItem("Task", JSON.stringify(allTask));
        }
      });
      childrens.innerHTML = "";
    } else {
      allTask = Array.from(JSON.parse(localStorage.getItem("Task")));

      allTask.find((item) => {
        if (
          item.id ===
          +e.target.closest(".check").closest(".task").children[2].children[0]
            .dataset.id
        ) {
          item.done = '<i class="fa-solid fa-check"></i>';

          localStorage.setItem("Task", JSON.stringify(allTask));
          console.log(Array.from(JSON.parse(localStorage.getItem("Task"))));
        }
      });
    }
    //  localStorage.setItem("Task", JSON.stringify(allTask))
    showTusk();
  }
});

// ТЕМА
const body = document.querySelector("body");
const tema = document.querySelector(".tema_checkbox");
const inputAdd = document.querySelector(".input_add");
const btnAdd = document.querySelector(".btn__add");
const title = document.querySelector(".title");



let localTema = JSON.parse(localStorage.getItem("Tema"));
let temaId = localTema;
tema.addEventListener("click", () => {
  if (temaId === 0) {
    temaId = 1;
  } else {
    temaId = 0;
  }
  localStorage.setItem("Tema", JSON.stringify(temaId));
  localTema = JSON.parse(localStorage.getItem("Tema"));
  temaShow()
});

function temaShow(){
  if (localTema === 0) {
    body.classList.remove("tema__black");
    inputAdd.classList.remove("tema__black");
    btnAdd.classList.remove("tema__black");
    title.classList.remove("tema__black");
    tema.checked = false;
  } else if (localTema === 1) {
    tema.checked = true;
    body.classList.add("tema__black");
    inputAdd.classList.add("tema__black");
    btnAdd.classList.add("tema__black");
    title.classList.add("tema__black");
  }
}
temaShow()