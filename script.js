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

// left box
document.querySelector(".left-box").addEventListener("click", function () {
  let taskCount = document.querySelector(".task-count");
  taskCount.style.display = "none";
});

// All task buttton
const allTasks = [];
document.getElementById("allTaskButton").addEventListener("click", function () {
  let taskList = document.getElementById("taskList");
  allTasks.push(taskList);
});
