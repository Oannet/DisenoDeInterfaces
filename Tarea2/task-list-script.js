document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('input', function() {
    this.style.height = 'auto'; // Resetea la altura a automática para permitir reducción
    this.style.height = (this.scrollHeight) + 'px'; // Ajusta altura basada en el contenido
});

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    const taskName = taskInput.value.trim();
    if (taskName !== '') {
        const taskItem = document.createElement('li');
        taskItem.className = 'list-group-item task-item';
        taskItem.textContent = taskName;
        
        // Estilo adicional para que el elemento se vea como un cuadrado azul
        taskItem.style.backgroundColor = '#0081CF'; // Azul
        taskItem.style.color = 'white';
        taskItem.style.width = '150px';
        taskItem.style.height = '150px';
        taskItem.style.display = 'flex';
        taskItem.style.flexDirection = 'column';
        taskItem.style.justifyContent = 'space-between';
        taskItem.style.alignItems = 'center';
        taskItem.style.margin = '10px';

        taskItem.addEventListener('click', () => toggleTaskCompleted(taskItem));
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.className = 'btn btn-danger btn-sm';
        deleteBtn.onclick = () => removeTask(taskItem);
        
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
        
        taskInput.value = '';
        taskInput.style.height = 'auto'; // Restablece la altura después de agregar tarea
        updateCounters();
    }
}

function adjustListSize() {
    const taskList = document.getElementById('taskList');
    let maxHeight = 0;
    document.querySelectorAll('.task-item').forEach(item => {
        maxHeight += item.scrollHeight;
    });
    taskList.style.height = `${maxHeight}px`; // Ajusta la altura al contenido
}

// Llamar a adjustListSize cada vez que se añada o se elimine una tarea
document.getElementById('addTaskBtn').addEventListener('click', () => {
    setTimeout(adjustListSize, 100); // Asegura que se ajuste después de que la DOM haya sido actualizada
});

function removeTask(taskItem) {
    const taskList = document.getElementById('taskList');
    taskList.removeChild(taskItem);
    updateCounters();
    adjustListSize(); // Asegura que el tamaño del contenedor se ajuste después de eliminar una tarea
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
