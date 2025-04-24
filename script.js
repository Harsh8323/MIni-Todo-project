// task form validation
document
  .getElementById("taskForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();
    // adding new task
    let taskInput = document.getElementById("task-input").value;
    console.log(taskInput);
    // if (taskInput === "") {
    //   return;
    // }

    let taskList = document.getElementById("taskList");

    let newTask = document.createElement("li");
    newTask.textContent = taskInput;

    taskList.appendChild(newTask);

    document.getElementById("task-input").value = "";
  });
// All task buttton
