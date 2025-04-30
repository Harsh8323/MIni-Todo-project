document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const taskForm = document.getElementById("taskForm");
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const emptyState = document.getElementById("emptyState");
  const filterBtns = document.querySelectorAll(".filter-btn");

  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
  let currentFilter = "all";

  // Initialize the app
  init();

  function init() {
    renderTasks();
    setupEventListeners();
  }

  //  setup event listeners
  function setupEventListeners() {
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault(); // This prevents page refresh
      const taskText = taskInput.value.trim();

      if (taskText === "") {
        alert("Please add a task");
        return;
      }
      addTask();
    });

    // Filter buttons event listeners
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        currentFilter = btn.dataset.filter;

        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderTasks();
      });
    });
  }
  function addTask() {
    const taskText = taskInput.value.trim();
    console.log(taskText);

    if (taskText === "") {
      alert("Please add a task");
      return;
    }
    const newTask = {
      id: Date.now(),
      text: taskText,
      completed: false,
      isEditing: false,
    };

    tasks.unshift(newTask);
    saveTasks();
    renderTasks();
    taskInput.value = "";
    taskInput.focus();
  }

  function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;

    console.log(tasks);
    saveTasks();
    renderTasks();
  }

  function deleteTask(index) {
    if (index >= 0 && index < tasks.length) {
      taskInput.value = tasks[index].text;
      tasks.splice(index, 1);
      taskInput.value = "";
      saveTasks();
      renderTasks();
    }
  }

  function editTask(index) {
    taskInput.value = tasks[index].text;
    tasks.splice(index, 1);
  }

  function filterTasks() {
    return tasks.filter((task) => {
      if (currentFilter === "all") return true;
      if (currentFilter === "completed") return task.completed;
      if (currentFilter === "pending") return !task.completed;
      return true;
    });
  }

  //  render tasks
  function renderTasks() {
    taskList.innerHTML = "";
    const filteredTasks = filterTasks();

    if (filteredTasks.length === 0) {
      // emptyState.style.display = "block";
      return;
    }
    emptyState.style.display = "none";

    filteredTasks.forEach((task, index) => {
      const listItem = document.createElement("li");

      listItem.innerHTML = `  
  <div class="taskItem">
    <div class="task ${task.completed ? "completed" : ""}">
      <input type="checkbox" class="checkbox" ${
        task.completed ? "checked" : ""
      } onchange="toggleTask(${index})" />
      <p>${task.text}</p>
    </div>
          <div class="task-actions">
            <button class="task-btn ${
              task.isEditing ? "save-btn" : "edit-btn"
            }">
              ${
                task.isEditing
                  ? "✓"
                  : '<i class="fa-solid fa-pen-to-square"></i>'
              }
</button>
                <button class="task-btn delete-btn">
                <i class="fa-solid fa-trash"></i> 
                </button>
          </div>
          </div>
          `;
      // Add event listeners
      const checkbox = listItem.querySelector(".checkbox");
      const editBtn = listItem.querySelector(".edit-btn, .save-btn");
      const deleteBtn = listItem.querySelector(".delete-btn");

      checkbox.addEventListener("change", () => {
        const taskIndex = tasks.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) toggleTask(taskIndex);
      });

      editBtn.addEventListener("click", () => {
        const taskIndex = tasks.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) editTask(taskIndex);
      });

      deleteBtn.addEventListener("click", () => {
        const taskIndex = tasks.findIndex((t) => t.id === task.id);
        if (taskIndex !== -1) deleteTask(taskIndex);
      });

      taskList.appendChild(listItem);
      // listItem.addEventListener("change", () => toggleTask(index));
      // listItem.dataset.id = task.id;
      hideContent();
    });
  }

  function hideContent() {
    emptyState.style.display = "none";
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
