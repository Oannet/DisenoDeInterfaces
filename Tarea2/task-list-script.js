document.getElementById('addTaskBtn').addEventListener('click', addTask);

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const taskName = taskInput.value.trim();
    if (taskName !== '') {
        const taskItem = document.createElement('li');
        taskItem.className = 'list-group-item task-item';
        taskItem.textContent = taskName;
        taskItem.addEventListener('click', () => toggleTaskCompleted(taskItem));
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.className = 'btn btn-danger btn-sm float-right';
        deleteBtn.onclick = () => removeTask(taskItem);
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
        taskInput.value = '';
        updateCounters();
    }
}

function removeTask(taskItem) {
    const taskList = document.getElementById('taskList');
    taskList.removeChild(taskItem);
    updateCounters();
}

function toggleTaskCompleted(taskItem) {
    taskItem.classList.toggle('task-completed');
    updateCounters();
}

function updateCounters() {
    const totalTasks = document.querySelectorAll('#taskList .task-item').length;
    const completedTasks = document.querySelectorAll('#taskList .task-completed').length;
    document.getElementById('taskCounter').textContent = 'Total de Tareas: ' + totalTasks;
    document.getElementById('completedCounter').textContent = 'Tareas Completadas: ' + completedTasks;
}