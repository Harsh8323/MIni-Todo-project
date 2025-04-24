// document.addEventListener("DOMContentLoaded", function () {
//   // DOM Elements
//   const taskForm = document.getElementById("task-form");
//   const taskInput = document.getElementById("task-input");
//   const leftBox = document.querySelector(".left-box");
//   const taskCount = document.querySelector(".task-count");
//   const allTaskBtn = document.querySelector(".all-task-btn");
//   const completedTaskBtn = document.querySelector(".completed-task-btn");
//   const pendingTaskBtn = document.querySelector(".pending-task-btn");

//   // Task array to store all tasks
//   let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

//   // Initialize the app
//   function init() {
//     renderTasks();
//     updateTaskCount();
//   }

//   // Add a new task
//   taskForm.addEventListener("submit", function (e) {
//     e.preventDefault();
//     const taskText = taskInput.value.trim();

//     if (taskText) {
//       const newTask = {
//         id: Date.now(),
//         text: taskText,
//         completed: false,
//         createdAt: new Date().toISOString(),
//       };

//       tasks.push(newTask);
//       saveTasks();
//       renderTasks();
//       updateTaskCount();
//       taskInput.value = "";
//     }
//   });

//   // Render tasks based on filter
//   function renderTasks(filter = "all") {
//     let filteredTasks = tasks;

//     if (filter === "completed") {
//       filteredTasks = tasks.filter((task) => task.completed);
//     } else if (filter === "pending") {
//       filteredTasks = tasks.filter((task) => !task.completed);
//     }

//     // Clear the left box except for the heading
//     const heading = leftBox.querySelector("h2");
//     leftBox.innerHTML = "";
//     leftBox.appendChild(heading);

//     if (filteredTasks.length === 0) {
//       const emptyMessage = document.createElement("div");
//       emptyMessage.className = "task-count";

//       if (filter === "all") {
//         emptyMessage.innerHTML = `
//                     <p>No tasks yet</p>
//                     <p>Add your first task to get started</p>
//                 `;
//       } else if (filter === "completed") {
//         emptyMessage.innerHTML = `
//                     <p>No completed tasks</p>
//                     <p>Complete some tasks to see them here</p>
//                 `;
//       } else {
//         emptyMessage.innerHTML = `
//                     <p>No pending tasks</p>
//                     <p>All tasks are completed!</p>
//                 `;
//       }

//       leftBox.appendChild(emptyMessage);
//     } else {
//       const taskList = document.createElement("div");
//       taskList.className = "task-list";

//       filteredTasks.forEach((task) => {
//         const taskItem = createTaskElement(task);
//         taskList.appendChild(taskItem);
//       });

//       leftBox.appendChild(taskList);
//     }
//   }

//   // Create a task element
//   function createTaskElement(task) {
//     const taskItem = document.createElement("div");
//     taskItem.className = `task-item ${task.completed ? "completed" : ""}`;
//     taskItem.dataset.id = task.id;

//     taskItem.innerHTML = `
//             <div class="task-content">
//                 <input type="checkbox" class="task-checkbox" ${
//                   task.completed ? "checked" : ""
//                 }>
//                 <span class="task-text">${task.text}</span>
//             </div>
//             <div class="task-actions">
//                 <button class="edit-btn"><i class="fa-solid fa-pen"></i></button>
//                 <button class="delete-btn"><i class="fa-solid fa-trash"></i></button>
//             </div>
//         `;

//     // Add event listeners to the buttons
//     const checkbox = taskItem.querySelector(".task-checkbox");
//     const editBtn = taskItem.querySelector(".edit-btn");
//     const deleteBtn = taskItem.querySelector(".delete-btn");
//     const taskText = taskItem.querySelector(".task-text");

//     checkbox.addEventListener("change", function () {
//       task.completed = this.checked;
//       taskItem.classList.toggle("completed", this.checked);
//       saveTasks();
//       updateTaskCount();
//     });

//     editBtn.addEventListener("click", function () {
//       const newText = prompt("Edit your task:", task.text);
//       if (newText !== null && newText.trim() !== "") {
//         task.text = newText.trim();
//         taskText.textContent = task.text;
//         saveTasks();
//       }
//     });

//     deleteBtn.addEventListener("click", function () {
//       if (confirm("Are you sure you want to delete this task?")) {
//         tasks = tasks.filter((t) => t.id !== task.id);
//         taskItem.remove();
//         saveTasks();
//         updateTaskCount();

//         // If no tasks left, show the default message
//         if (tasks.length === 0) {
//           renderTasks();
//         }
//       }
//     });

//     return taskItem;
//   }

//   // Update the task count
//   function updateTaskCount() {
//     const totalTasks = tasks.length;
//     const completedTasks = tasks.filter((task) => task.completed).length;
//     const pendingTasks = totalTasks - completedTasks;

//     // Update the count display if the default message is shown
//     const countDisplay = leftBox.querySelector(".task-count");
//     if (countDisplay && tasks.length > 0) {
//       countDisplay.innerHTML = `
//                 <p>Total: ${totalTasks} | Completed: ${completedTasks} | Pending: ${pendingTasks}</p>
//             `;
//     }
//   }

//   // Save tasks to localStorage
//   function saveTasks() {
//     localStorage.setItem("tasks", JSON.stringify(tasks));
//   }

//   // Filter buttons event listeners
//   allTaskBtn.addEventListener("click", function () {
//     renderTasks("all");
//     updateActiveButton(this);
//   });

//   completedTaskBtn.addEventListener("click", function () {
//     renderTasks("completed");
//     updateActiveButton(this);
//   });

//   pendingTaskBtn.addEventListener("click", function () {
//     renderTasks("pending");
//     updateActiveButton(this);
//   });

//   // Update active filter button style
//   function updateActiveButton(activeButton) {
//     [allTaskBtn, completedTaskBtn, pendingTaskBtn].forEach((btn) => {
//       if (btn === activeButton) {
//         btn.style.backgroundColor = "#e5e7eb";
//       } else {
//         btn.style.backgroundColor = "#fff";
//       }
//     });
//   }

//   // Initialize the app
//   init();
// });
