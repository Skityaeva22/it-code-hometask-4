let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");
let select = document.getElementById("select");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    formValidation();
  });
}

// проверка вводимой информации. Заголовок задания не должен быть пустым
let formValidation = () => {
  if (textInput.value === "") {
    msg.innerHTML = "Заполните поле заголовка задания!";
    console.log("Запись задания провалена");
  } else {
    msg.innerHTML = "";
    console.log("Успешная запись задания");
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();
  
    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

// массив данных
let data = [];

// запись данных (чтение данных)
let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    status: select.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
  createTasks();
};

// создание записи. fa-edit - обновление/изменение данных. fa-trash-alt - удаление записи
let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
      <div id=${y}>
        <span class="fw-bold">${x.text}</span>
        <span class="small text-secondary">${x.date}</span>
        <p>${x.status}</p>
        <p>${x.description}</p>
    
        <span class="options">
          <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
          <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
        </span>
      </div>
    `);
  });
  
  resetForm();
};

// очистка формы
let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  select.value = "";
  textarea.value = "";
};

// удаление записи
let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  
  data.splice(e.parentElement.parentElement.id, 1);
  
  localStorage.setItem("data", JSON.stringify(data));
  
  console.log(data);
};

// обновление записи
let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;
  
  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  select.value = selectedTask.children[2].innerHTML;
  textarea.value = selectedTask.children[3].innerHTML;
  
  deleteTask(e);
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  createTasks();
})();
