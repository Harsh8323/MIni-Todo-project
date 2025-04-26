document.addEventListener("DOMContentLoaded", function () {
  const taskForm = document.getElementById("taskForm");
  const taskInput = document.getElementById("task-input");

  const addTaskButton = document.getElementById("addTaskButton");
  const taskList = document.getElementById("taskList");
  const allTaskButton = document.getElementById("allTaskButton");
  const completedTaskButton = document.getElementById("completedTaskButton");
  const pendingTaskButton = document.getElementById("pendingTaskButton");

  taskForm.addEventListener("submit", function (e) {
    e.preventDefault();
  });

  let tasks = JSON.parse(localStorage.getItem("tasks") || []);
  tasks.forEach((task) => renderTask(task));

  // adding tasks
  addTaskButton.addEventListener("click", () => {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
    };
    tasks.push(newTask);
    saveTasks();
    taskInput.value = "";
    // console.log(tasks);
  });

  // rendering tasks
  function renderTask(task) {
    console.log(task);
  }

  // saving tasks
  function saveTasks() {
    localStorage.setItem("taks", JSON.stringify(tasks));
  }
});
