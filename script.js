document.addEventListener("DOMContentLoaded", function () {
  const taskForm = document.getElementById("taskForm");
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const todoList = document.getElementById("todo-List");
  const filterBtn = document.getElementById("filter-btn");

  let tasks = [];

  // taskForm.addEventListener("submit", (e) => {
  //   e.preventDefault();
  // });

  function addTask() {
    // const taskInput = document.getElementById("taskInput");
    const text = taskInput.value.trim();

    const newTask = {
      id: Date.now(),
      text: text,
      completed: false,
      isEditing: false,
    };

    if (!text) {
      alert("Please add a task");
      return;
    }
    console.log(tasks);

    tasks.unshift(newTask);
    // saveTasks();
    // renderTasks();
    taskInput.value = "";
    taskInput.focus();
  }

  addTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addTask();
  });
});

// function addTask() {
//   const taskText = taskInput.value.trim();

//   if (!taskText) {
//     alert("Please enter a task");
//     return;
//   }

//   const newTask = {
//     id: Date.now(),
//     text: taskText,
//     completed: false,
//     isEditing: false,
//   };

//   tasks.unshift(newTask);
//   saveTasks();
//   renderTasks();
//   taskInput.value = "";
//   taskInput.focus();
// }
