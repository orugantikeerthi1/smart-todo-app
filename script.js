let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks(filteredTasks) {

  const taskList = document.getElementById("taskList");

  if (!filteredTasks) {
    filteredTasks = tasks;
  }

  taskList.innerHTML = "";

  filteredTasks.forEach(function(task, index) {

    const taskDiv = document.createElement("div");

    if(task.completed){
      taskDiv.className = "task completed";
    } else {
      taskDiv.className = "task";
    }

    taskDiv.innerHTML =
    '<div class="task-info">' +
      '<h3>' + task.text + '</h3>' +
      '<p>Date: ' + task.date + '</p>' +
      '<span class="category">' + task.category + '</span>' +
    '</div>' +

    '<div class="task-actions">' +

      '<button class="complete-btn" onclick="toggleComplete(' + index + ')">' +
      (task.completed ? "Undo" : "Done") +
      '</button>' +

      '<button class="edit-btn" onclick="editTask(' + index + ')">' +
      'Edit' +
      '</button>' +

      '<button class="delete-btn" onclick="deleteTask(' + index + ')">' +
      'Delete' +
      '</button>' +

    '</div>';

    taskList.appendChild(taskDiv);

  });

  updateProgress();
}

function addTask() {

  const input = document.getElementById("taskInput");
  const category = document.getElementById("category");
  const taskDate = document.getElementById("taskDate");

  if(input.value.trim() === ""){
    alert("Please enter a task");
    return;
  }

  const task = {
    text: input.value,
    category: category.value,
    date: taskDate.value || "No Deadline",
    completed: false
  };

  tasks.push(task);

  saveTasks();
  renderTasks();

  input.value = "";
  taskDate.value = "";
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

function editTask(index) {

  const newTask = prompt("Edit Task", tasks[index].text);

  if(newTask !== null){
    tasks[index].text = newTask;
    saveTasks();
    renderTasks();
  }
}

function searchTasks() {

  const search = document.getElementById("searchTask").value.toLowerCase();

  const filtered = tasks.filter(function(task){
    return task.text.toLowerCase().includes(search);
  });

  renderTasks(filtered);
}

function updateProgress() {

  const completed = tasks.filter(function(task){
    return task.completed;
  }).length;

  const total = tasks.length;

  const progress = total === 0 ? 0 : (completed / total) * 100;

  document.getElementById("progressBar").style.width = progress + "%";

  document.getElementById("taskStatus").innerText =
    completed + " of " + total + " Tasks Completed";
}

renderTasks();