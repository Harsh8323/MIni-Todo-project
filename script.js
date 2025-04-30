document.addEventListener("DOMContentLoaded", function () {
  // DOM elements
  const taskForm = document.getElementById("taskForm");
  const taskInput = document.getElementById("taskInput");
  const addTaskBtn = document.getElementById("addTaskBtn");
  const taskList = document.getElementById("taskList");
  const emptyState = document.getElementById("emptyState");
  const filterBtn = document.getElementById("filter-btn");

  let tasks = [];

  addTaskBtn.addEventListener("click", (e) => {
    e.preventDefault();
    addTask();
  });

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

  function toggleTask(index) {
    tasks[index].completed = !tasks[index].completed;
    console.log(tasks);
    saveTasks();
    renderTasks();
  }

  function deleteTask(id) {
    tasks = tasks.filter((task) => task.id !== id);
    saveTasks();
    renderTasks();
  }

  function editTask(index) {
    taskInput.value = tasks[index].text;
    tasks.splice(index, 1);
    // tasks[index].isEditing = !tasks[index].isEditing;
    saveTasks();
    renderTasks();
  }
  function renderTasks() {
    taskList.innerHTML = "";
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
      // const checkbox = listItem.querySelector(".checkbox");
      const editBtn = listItem.querySelector(".edit-btn, .save-btn");
      const deleteBtn = listItem.querySelector(".delete-btn");

      // checkbox.addEventListener("change", () => toggleTask(index));
      editBtn.addEventListener("click", () => editTask(index));
      deleteBtn.addEventListener("click", () => deleteTask(index));

      taskList.appendChild(listItem);

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
