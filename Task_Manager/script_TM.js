const navbarButton = document.getElementById('navbarButton');
const dropdownButtons = document.getElementById('dropdownButtons');
const sort_By = document.getElementById('sort-by');
const dropdownButtons2 = document.getElementById('dropdownButtons-2');
const menuBtn = document.getElementById('menuBtn');

// Theme toggle
const themeToggleButton = document.getElementById('theme-toggle');
const currentTheme = localStorage.getItem('theme');
if (currentTheme === 'dark') {
  document.body.classList.add('dark');
}

themeToggleButton.addEventListener('click', function() {
  document.body.classList.toggle('dark');

  if (document.body.classList.contains('dark')) {
    localStorage.setItem('theme', 'dark');
  } else {
    localStorage.setItem('theme', 'light');
  }
});

// Navbar dropdown functionality
navbarButton.addEventListener('click', function(event) {
  event.stopPropagation();
  dropdownButtons.classList.toggle('show');
});

document.addEventListener('click', function(event) {
  if (!navbarButton.contains(event.target) && !dropdownButtons.contains(event.target)) {
    dropdownButtons.classList.remove('show');
  }
});

// Sorting dropdown functionality
sort_By.addEventListener('click', function(event) {
  event.stopPropagation();
  dropdownButtons2.classList.toggle('show');
});

document.addEventListener('click', function(event) {
  if (!sort_By.contains(event.target) && !dropdownButtons2.contains(event.target)) {
    dropdownButtons2.classList.remove('show');
  }
});

// Task management functionality
const createBtn = document.getElementById('createBtn');
const saveTaskBtn = document.getElementById('saveTask');
const cancelCreateTaskBtn = document.getElementById('cancelCreateTask');
const createTaskPopup = document.getElementById('createTaskPopup');
const noTaskMessage = document.getElementById('noTaskMessage');
const taskList = document.getElementById('taskList');

let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

// Show tasks initially
renderTasks();

createBtn.addEventListener('click', () => {
  createTaskPopup.style.display = 'block';
});

cancelCreateTaskBtn.addEventListener('click', () => {
  createTaskPopup.style.display = 'none';
});

saveTaskBtn.addEventListener('click', () => {
  const taskName = document.getElementById('taskName').value;
  const category = document.getElementById('category').value;
  const dueDate = document.getElementById('dueDate').value;
  const description = document.getElementById('description').value;

  if (!taskName || !dueDate) {
    alert('Task name and due date are required!');
    return;
  }

  const newTask = {
    id: Date.now(),
    taskName,
    category,
    dueDate,
    description,
    important: false
  };

  tasks.push(newTask);
  createTaskPopup.style.display = 'none';
  document.getElementById('taskName').value = '';
  document.getElementById('dueDate').value = '';
  document.getElementById('description').value = '';
  saveToLocalStorage();
  renderTasks();
});

// Save tasks to local storage
function saveToLocalStorage() {
  localStorage.setItem('tasks', JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = '';

  if (tasks.length === 0) {
    noTaskMessage.classList.add('show');
  } else {
    noTaskMessage.classList.remove('show');
  }

  tasks.forEach(task => {
    const taskElement = document.createElement('div');
    taskElement.classList.add('task');
    if (task.important) {
      taskElement.classList.add('important');
    }
    taskElement.innerHTML = `
      <div class="task-header">
        <span>${task.taskName}</span>                                                  
      </div>
      <div class="task-body">
        <p>${task.category}</p>
        <p><strong>Due Date:</strong> ${task.dueDate}</p>
        <p>${task.description}</p>
        ${task.important ? '<span class="important-text">Important</span>' : ''}
      </div>
      <div class="task-footer">
        <button onclick="toggleImportant(${task.id})">Important</button>
        <button onclick="deleteTask(${task.id})">Delete</button>
      </div>
    `;

    taskList.appendChild(taskElement);
  });
}

function toggleImportant(taskId) {
  const task = tasks.find(t => t.id === taskId);
  task.important = !task.important;
  saveToLocalStorage();
  renderTasks();
}

function deleteTask(taskId) {
  tasks = tasks.filter(t => t.id !== taskId);
  saveToLocalStorage();
  renderTasks();
}

// Sorting functionality
const dueDateBtn = document.querySelector('#dropdownButtons-2 button:nth-child(1)'); 
const importantBtn = document.querySelector('#dropdownButtons-2 button:nth-child(2)'); 

dueDateBtn.addEventListener('click', () => {
  tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  saveToLocalStorage();
  renderTasks();
});

importantBtn.addEventListener('click', () => {
  tasks = tasks.filter(t => t.important).concat(tasks.filter(t => !t.important));
  saveToLocalStorage();
  renderTasks();
});
