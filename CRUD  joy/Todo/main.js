/*
let form = document.getElementById("form");
let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");
let msg = document.getElementById("msg");
let tasks = document.getElementById("tasks");
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formValidation();
});

let formValidation = () => {
  if (textInput.value === "") {
    console.log("failure");
    msg.innerHTML = "Task cannot be blank";
  } else {
    console.log("success");
    msg.innerHTML = "";
    acceptData();
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

let data = [{}];

let acceptData = () => {
  data.push({
    text: textInput.value,
    date: dateInput.value,
    description: textarea.value,
  });

  localStorage.setItem("data", JSON.stringify(data));

  console.log(data);
  createTasks();
};

let createTasks = () => {
  tasks.innerHTML = "";
  data.map((x, y) => {
    return (tasks.innerHTML += `
    <div id=${y}>
          <span class="fw-bold">${x.text}</span>
          <span class="small text-secondary">${x.date}</span>
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

let deleteTask = (e) => {
  e.parentElement.parentElement.remove();
  data.splice(e.parentElement.parentElement.id, 1);
  localStorage.setItem("data", JSON.stringify(data));
  console.log(data);
};

let editTask = (e) => {
  let selectedTask = e.parentElement.parentElement;

  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  deleteTask(e);
};

let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  createTasks();
})();

*/

// form id

let form = document.querySelector("#form");

// inputs id's

let textInput = document.getElementById("textInput");
let dateInput = document.getElementById("dateInput");
let textarea = document.getElementById("textarea");

// error msg

let msg = document.getElementById("msg");
let msg1 = document.getElementById("msg1");
let msg2 = document.getElementById("msg2");

// tasks div
let tasks = document.getElementById("tasks");

// form add btn
let add = document.getElementById("add");

form.addEventListener("submit", (e) => {
  e.preventDefault();
  // console.log("from submitted");
  fromValidation(); //from submit agum pothu ellam fun run agum.
});

let fromValidation = () => {
  if (
    textInput.value === "" &&
    dateInput.value === "" &&
    textarea.value === ""
  ) {
    console.log("Validation failed");
    //console.log("failure");

    //! set error messages

    msg.innerHTML = "Please enter task name";
    msg1.innerHTML = "Please enter task date";
    msg2.innerHTML = "Please enter task description";
  } else {
    console.log("Validation successful");
    // console.log("success");

    //! clear error messages

    msg.innerHTML = "";
    msg1.innerHTML = "";
    msg2.innerHTML = "";

    acceptData();

    // look html id
    //! Close modal programmatically

    // close form        key             value
    add.setAttribute("data-bs-dismiss", "modal");
    add.click();

    //! Immediately reset the modal dismiss attribute

    (() => {
      add.setAttribute("data-bs-dismiss", "");
    })();
  }
};

// accept data

// let data = {};  //! object

// let acceptData = () => {
//   data = {
//     taskName: textInput.value,
//     taskDate: dateInput.value,
//     taskDescription: textarea.value,
//   };
//   //    console.log(data);
//   createTasks();
// };

// Data array for storing tasks

let data = []; //! Array

// Accept data from the form and store it

let acceptData = () => {
  data.push({
    taskName: textInput.value,
    taskDate: dateInput.value,
    taskDescription: textarea.value,
  });

  // Store data in localStorage

  localStorage.setItem("Data", JSON.stringify(data));
  console.log(data);
  createTasks();
};

// Display tasks on the UI

let createTasks = () => {
  ///tasks.innerHTML = "Task has been updated";
  tasks.innerHTML = ""; // avold item repet
  // get data from ls
  data.map((task, index) => {
    return (tasks.innerHTML += `
      <div  id = ${index}>
          <span class="fw-bold">${task.taskName}</span>
          <span class="small text-srcondary">${task.taskDate}</span>
          <p>${task.taskDescription}</p>
         <span>
             <i onClick= "editTask(this)" data-bs-toggle="modal" data-bs-target="#form" class="fas fa-edit"></i>
            <i onClick ="deleteTask(this);createTasks()" class="fas fa-trash-alt"></i>
         </span>
      </div>
    
    `);
  });

  // Clear form after task creation
  resetForm();
};

// delete a task

let deleteTask = (e) => {
  // span         div
  e.parentElement.parentElement.remove();

  // ls remove
  // console.log( e.parentElement.parentElement.id);
  data.splice(e.parentElement.parentElement.id, 1);
  // ls update
  localStorage.setItem("Data", JSON.stringify(data));
};

let editTask = (e) => {
  // span        div
  let selectedTask = e.parentElement.parentElement;
  // reassign form values  on UI
  textInput.value = selectedTask.children[0].innerHTML;
  dateInput.value = selectedTask.children[1].innerHTML;
  textarea.value = selectedTask.children[2].innerHTML;

  //selectedTask.remove(); // edit appo antha pleace aa uo laa remove pannum.
  deleteTask(e);
};

// reset
let resetForm = () => {
  textInput.value = "";
  dateInput.value = "";
  textarea.value = "";
};

//retrive ls  1st refres panna ithu dhan ls laa irukkurathu ellm eduthuttu vaaarum ui ku.
(() => {
  data = JSON.parse(localStorage.getItem("data")) || [];
  console.log(data);
  createTasks();
})();
