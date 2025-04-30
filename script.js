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
  // Event listeners

  //  setup event listeners
  function setupEventListeners() {
    taskForm.addEventListener("submit", (e) => {
      e.preventDefault();
      addTask();
    });

    // Add task events
    taskInput.addEventListener("keypress", function (e) {
      if (e.key === "Enter" && taskInput.value.trim() !== "") {
        return addTask();
      }
    });

    // Filter buttons
    filterBtns.forEach((btn) => {
      btn.addEventListener("click", function () {
        currentFilter = btn.dataset.filter;
        filterBtns.forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");
        renderTasks();
      });
    });

    // Task actions using event delegation
    // tasksContainer.addEventListener("click", handleTaskActions);
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

  // function deleteTask(id) {
  //   tasks = tasks.filter((task) => task.id !== id);
  //   saveTasks();
  //   renderTasks();
  // }
  function deleteTask(index) {
    if (index >= 0 && index < tasks.length) {
      taskInput.value = tasks[index].text; // Confusing UX
      tasks.splice(index, 1);
      taskInput.value = "";
      saveTasks();
      renderTasks();
    }
  }

  function editTask(index) {
    taskInput.value = tasks[index].text; // Confusing UX
    tasks.splice(index, 1);
  }

  function renderTasks() {
    taskList.innerHTML = "";
    if (tasks.legth === 0) {
      emptyState.style.display = "block";
      return;
    }
    tasks.forEach((task, index) => {
      const listItem = document.createElement("li");

      listItem.innerHTML = `  
  <div class="taskItem">
    <div class="task ${task.completed ? "completed" : ""}">
      <input type="checkbox" class="checkbox" ${
        task.completed ? "checked" : ""
      } onchange="toggleTask(${index})" />
      <p>${task.text}</p>
    </div>
          <div class="filter-btn">
                          <button class="task-btn ${
                            task.isEditing ? "save-btn" : "edit-btn"
                          }" onclick="editTask(${index})">
  ${task.isEditing ? "✓" : '<i class="fa-solid fa-pen-to-square"></i>'}
</button>

                <button class="task-btn delete-btn"  onclick ='deleteTask(${index}) '><i class="fa-solid fa-trash"></i> </button>
          </div>
          </div>
          `;
      // Add event listeners properly
      const checkbox = listItem.querySelector(".checkbox");

      const editBtn = listItem.querySelector(".edit-btn, .save-btn");
      const deleteBtn = listItem.querySelector(".delete-btn");

      // checkbox.addEventListener("change", () => toggleTask(index));
      editBtn.addEventListener("click", () => editTask(index));
      deleteBtn.addEventListener("click", () => deleteTask(index));

      listItem.addEventListener("change", () => toggleTask(index));
      listItem.dataset.id = task.id;
      taskList.appendChild(listItem);
      hideContent(); //-> hide empty state
    });
  }

  function hideContent() {
    emptyState.style.display = "none";
  }

  function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});
