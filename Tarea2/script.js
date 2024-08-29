document.getElementById('addTaskBtn').addEventListener('click', addTask);
document.getElementById('taskInput').addEventListener('input', function() {
    this.style.height = 'auto'; 
    this.style.height = (this.scrollHeight) + 'px'; // Ajusta altura basada en el contenido
});

/**
 * Agrega una nueva tarea a la lista de tareas.
 * Crea un elemento de lista, lo configura con los botones necesarios y lo añade.
 * También limpia el campo de entrada y actualiza los contadores de tareas.
 */

function addTask() {
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');
    let taskName = taskInput.value.trim();

    // Convertir saltos de línea en <br> para HTML
    taskName = taskName.replace(/\n/g, '<br>');

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
        taskInput.value = '';
        taskInput.style.height = 'auto'; // Restablece la altura después de agregar tarea
        updateCounters();
    }
}

/**
 * Ajusta el tamaño del contenedor de la lista de tareas para que se adapte
 * a la altura de todos los elementos de tarea visibles.
 */
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
    setTimeout(adjustListSize, 100); 
});

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