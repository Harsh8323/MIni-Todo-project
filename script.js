document.addEventListener("DOMContentLoaded", function () {
  const taskForm = document.getElementById("taskForm");
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const emptyState = document.getElementById("emptyState");
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
    renderTasks();
    taskInput.value = "";
    taskInput.focus();
  }

  function renderTasks() {
    taskList.innerHTML = "";

    tasks.forEach((task) => {
      const listItem = document.createElement("li");

      listItem.innerHTML = `
       <div class="task-item" data-id="${task.id}">
               <input type="checkbox" class="task-checkbox" ${
                 task.completed ? "checked" : ""
               }>
                ${
                  task.isEditing
                    ? `<input type="text" class="task-text editable" value="${task.text}">`
                    : `<span class="task-text ${
                        task.completed ? "completed" : ""
                      }">${task.text}</span>`
                }
                <button class="task-btn ${
                  task.isEditing ? "save-btn" : "edit-btn"
                }">
                    ${task.isEditing ? "✓" : "✎"}
                </button>
                <button class="task-btn delete-btn">🗑</button>
            </div>
      `;

      taskList.appendChild(listItem);
      // taskList.style.display = "hidden";
      hideContent();
    });
  }

  function hideContent() {
    emptyState.style.display = "none";
  }

  addTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addTask();
  });
});

// function renderTasks() {
//   const filteredTasks = getFilteredTasks();

//   if (filteredTasks.length === 0) {
//     tasksContainer.innerHTML = getEmptyMessage();
//     return;
//   }

//   tasksContainer.innerHTML = filteredTasks
//     .map(
//       (task) => `
//             <div class="task-item" data-id="${task.id}">
//                 <input type="checkbox" class="task-checkbox" ${
//                   task.completed ? "checked" : ""
//                 }>
//                 ${
//                   task.isEditing
//                     ? `<input type="text" class="task-text editable" value="${task.text}">`
//                     : `<span class="task-text ${
//                         task.completed ? "completed" : ""
//                       }">${task.text}</span>`
//                 }
//                 <button class="task-btn ${
//                   task.isEditing ? "save-btn" : "edit-btn"
//                 }">
//                     ${task.isEditing ? "✓" : "✎"}
//                 </button>
//                 <button class="task-btn delete-btn">🗑</button>
//             </div>
//         `
//     )
//     .join("");
// }

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
