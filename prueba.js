// Procesador de texto
document.getElementById('processBtn').addEventListener('click', function() {
    const input = document.getElementById('textInput');
    const result = document.getElementById('textResult');
    
    if (input.value.trim() === '') {
        result.textContent = 'Por favor, escribe algo en el campo de texto.';
        result.style.color = '#ff6b6b';
        return;
    }
    
    const text = input.value;
    const wordCount = text.trim().split(/\s+/).length;
    const charCount = text.length;
    const reversedText = text.split('').reverse().join('');
    
    result.innerHTML = `
        <strong>Texto original:</strong> ${text}<br>
        <strong>Texto invertido:</strong> ${reversedText}<br>
        <strong>Palabras:</strong> ${wordCount} | <strong>Caracteres:</strong> ${charCount}
    `;
    result.style.color = '#333';
});

// Contador
let count = 0;
const countElement = document.getElementById('count');

document.getElementById('incrementBtn').addEventListener('click', function() {
    count++;
    updateCount();
});

document.getElementById('decrementBtn').addEventListener('click', function() {
    count--;
    updateCount();
});

document.getElementById('resetBtn').addEventListener('click', function() {
    count = 0;
    updateCount();
});

function updateCount() {
    countElement.textContent = count;
    countElement.style.color = count > 0 ? '#4caf50' : count < 0 ? '#f44336' : '#333';
}

// Lista de tareas
let tasks = [];

document.getElementById('addTaskBtn').addEventListener('click', function() {
    const taskInput = document.getElementById('taskInput');
    const taskText = taskInput.value.trim();
    
    if (taskText === '') {
        alert('Por favor, escribe una tarea.');
        return;
    }
    
    addTask(taskText);
    taskInput.value = '';
});

function addTask(text) {
    const task = {
        id: Date.now(),
        text: text,
        completed: false
    };
    
    tasks.push(task);
    renderTasks();
}

function renderTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';
    
    tasks.forEach(task => {
        const li = document.createElement('li');
        li.className = `task-item ${task.completed ? 'completed' : ''}`;
        li.innerHTML = `
            <span>${task.text}</span>
            <div>
                <button onclick="toggleTask(${task.id})" class="complete-btn">
                    ${task.completed ? '↶' : '✓'}
                </button>
                <button onclick="deleteTask(${task.id})" class="delete-btn">X</button>
            </div>
        `;
        taskList.appendChild(li);
    });
}

function toggleTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            return { ...task, completed: !task.completed };
        }
        return task;
    });
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    renderTasks();
}

// Permitir agregar tareas con Enter
document.getElementById('taskInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        document.getElementById('addTaskBtn').click();
    }
});

// Inicializar la aplicación
document.addEventListener('DOMContentLoaded', function() {
    // Agregar algunas tareas de ejemplo
    addTask('Aprender HTML');
    addTask('Practicar CSS');
    addTask('Dominar JavaScript');
});