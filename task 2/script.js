const taskList = document.getElementById('tasks');
const newTaskForm = document.getElementById('add-task-form');
const newTaskInput = document.getElementById('new-task');
const noTasksMessage = document.getElementById('no-tasks-message');

// Load tasks from local storage (if available)
let tasks = localStorage.getItem('tasks') ? JSON.parse(localStorage.getItem('tasks')) : [];

// Function to render tasks on the page
function renderTasks() {
  taskList.innerHTML = ''; // Clear existing tasks

  if (tasks.length === 0) {
    noTasksMessage.style.display = 'block';
  } else {
    noTasksMessage.style.display = 'none';

    tasks.forEach(task => {
      const taskItem = document.createElement('li');
      const checkbox = document.createElement('input');
      const taskText = document.createElement('span');
      const editButton = document.createElement('button');
      const deleteButton = document.createElement('button');

      checkbox.type = 'checkbox';
      checkbox.checked = task.completed;
      checkbox.addEventListener('change', () => {
        task.completed = !task.completed;
        localStorage.setItem('tasks', JSON.stringify(tasks));
      });

      taskText.innerText = task.text;
      taskText.contentEditable = false;

      editButton.innerText = 'Edit';
      editButton.addEventListener('click', () => {
        taskText.contentEditable = true;
        taskText.focus();
        taskText.addEventListener('blur', () => {
          taskText.contentEditable = false;
          task.text = taskText.innerText;
          localStorage.setItem('tasks', JSON.stringify(tasks));
        });
      });

      deleteButton.innerText = 'Delete';
      deleteButton.addEventListener('click', () => {
        tasks = tasks.filter(t => t !== task);
        localStorage.setItem('tasks', JSON.stringify(tasks));
        renderTasks();
      });

      taskItem.appendChild(checkbox);
      taskItem.appendChild(taskText);
      taskItem.appendChild(editButton);
      taskItem.appendChild(deleteButton);
      taskList.appendChild(taskItem);
    });
  }
}

// Add task on form submission
newTaskForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTask = { text: newTaskInput.value, completed: false };
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  newTaskInput.value = '';
  renderTasks();
});

renderTasks();
