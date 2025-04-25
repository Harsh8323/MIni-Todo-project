// Task form validation
document
  .getElementById("taskForm")
  .addEventListener("submit", function (event) {
    event.preventDefault();

    let taskInput = document.getElementById("task-input").value.trim();
    if (taskInput === "") return; // simple validation

    let taskList = document.getElementById("taskList");

    let newTask = document.createElement("li");
    newTask.textContent = taskInput;

    taskList.appendChild(newTask);

    document.getElementById("task-input").value = ""; // Clear input
    toggleemptyState(); // Check if we need to hide "No tasks yet"
  });

// Function to hide/show "No tasks yet"
function toggleemptyState() {
  const taskList = document.getElementById("taskList");
  const emptyState = document.getElementById("emptyState");

  if (taskList.children.length > 0) {
    emptyState.style.display = "none"; // Hide message
  } else {
    emptyState.style.display = "block"; // Show message
  }
}

// All Tasks Button (example logic)
const allTasks = [];

document.getElementById("allTaskButton").addEventListener("click", function () {
  let tasks = document.querySelectorAll("#taskList li");

  allTasks.length = 0; // Clear array
  tasks.forEach((task) => {
    allTasks.push(task.textContent); // Store text of each task
  });

  console.log(allTasks); // Check all tasks in console
});
