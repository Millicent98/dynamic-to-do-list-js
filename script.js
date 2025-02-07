<script>
    document.addEventListener('DOMContentLoaded', () => {
      const addTaskBtn = document.getElementById('add-task-btn');
      const taskInput = document.getElementById('task-input');
      const taskList = document.getElementById('task-list');

      function loadTasks() {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]'); 
        storedTasks.forEach(taskText => addTask(taskText, false)); 
      }

      function addTask(taskText, save = true) {
        if (taskText === "") {
          alert("Please enter a task.");
          return;
        }

        const listItem = document.createElement('li');
        listItem.textContent = taskText;

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove";
        removeButton.classList.add('remove-btn');

        removeButton.addEventListener('click', () => {
          taskList.removeChild(listItem);
          const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
          const updatedTasks = storedTasks.filter(storedTask => storedTask !== taskText);
          localStorage.setItem('tasks', JSON.stringify(updatedTasks));
        });

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);

        if (save) {
          const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
          storedTasks.push(taskText);
          localStorage.setItem('tasks', JSON.stringify(storedTasks));
        }

        taskInput.value = "";
      }

      addTaskBtn.addEventListener('click', addTask);

      taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
          addTask();
        }
      });

      loadTasks(); 
    });