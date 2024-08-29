document.getElementById('addTaskBtn').addEventListener('click', addTask);

/**
 * Agrega una nueva tarea a la lista de tareas.
 * Crea un elemento de lista, lo configura con los botones necesarios y lo añade.
 * También limpia el campo de entrada y actualiza los contadores de tareas.
 */
function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    let taskName = taskInput.value.trim();

    if (taskName !== '') {
        const taskItem = document.createElement('li');
        taskItem.className = 'list-group-item task-item';
        taskItem.innerHTML = taskName; 
        taskItem.addEventListener('click', () => toggleTaskCompleted(taskItem));
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Eliminar';
        deleteBtn.className = 'btn btn-danger btn-sm float-right';
        deleteBtn.onclick = () => removeTask(taskItem);
        taskItem.appendChild(deleteBtn);
        taskList.appendChild(taskItem);
        taskInput.value = ''; // Limpia el campo de entrada después de agregar la tarea
        updateCounters();
    }
}

/**
 * Elimina un elemento de tarea específico.
 * También actualiza los contadores y ajusta el tamaño del contenedor de la lista de tareas.
 * @param taskItem El elemento de la tarea a eliminar.
 */
function removeTask(taskItem) {
    const taskList = document.getElementById('taskList');
    taskList.removeChild(taskItem);
    updateCounters();
    adjustListSize(); 
}

/**
 * Alterna el estado de completado de una tarea.
 * Cambia la clase del elemento para reflejar su estado de completado o no completado.
 * También actualiza los contadores de tareas.
 * @param taskItem El elemento de la tarea a alterar.
 */
function toggleTaskCompleted(taskItem) {
    taskItem.classList.toggle('task-completed');
    updateCounters();
}

/**
 * Actualiza los contadores de tareas totales y completadas en la interfaz de usuario.
 * Recuenta y muestra el número de tareas totales y el número de tareas completadas.
 */
function updateCounters() {
    const totalTasks = document.querySelectorAll('#taskList .task-item').length;
    const completedTasks = document.querySelectorAll('#taskList .task-completed').length;
    document.getElementById('taskCounter').textContent = 'Total de Tareas: ' + totalTasks;
    document.getElementById('completedCounter').textContent = 'Tareas Completadas: ' + completedTasks;
}
