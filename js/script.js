const todoForm = document.querySelector('.add-task');
const todoInput = document.querySelector('#input-task');
const todoItemsList = document.querySelector('ul');

let todos = [];

todoForm.addEventListener('submit', function (event) {
    event.preventDefault();
    addTodo(todoInput.value);
});

/**
 * Add new task.
 *
 * @param item
 */
function addTodo(item) {
    if (item !== '') {
        const todo = {
            id: Date.now(),
            name: item,
            completed: false
        };

        todos.push(todo);
        addToLocalStorage(todos);

        todoInput.value = '';
    }
}

/**
 * Show all tasks.
 */
function renderTodos() {
    todoItemsList.innerHTML = '';

    todos.forEach(function (item) {
        const checked = item.completed ? 'checked' : ''

        const li = document.createElement('li');
        li.setAttribute('class', 'item');
        li.setAttribute('data-key', item.id);
        let completion ='';
        if (item.completed === true) {
            completion = 'completed';
        }

        li.innerHTML = `
        <label><input type="checkbox" class="checkbox" ${checked}><span class="task ${completion}">${item.name}</span></label>
        <button class="delete-btn"><i class="fas fa-times-circle"></i></button>
        `;
        todoItemsList.append(li);
    });

    if (todos.length === 0) {
        todoItemsList.innerHTML = '<p class="empty">Your list is empty!</p>';
    }
}

/**
 * Add tasks to local storage.
 *
 * @param todos
 */
function addToLocalStorage(todos) {
    localStorage.setItem('tasks', JSON.stringify(todos));
    renderTodos();
}

/**
 * Fetch tasks from local storage.
 */
function getFromLocalStorage() {
    const reference = localStorage.getItem('tasks');
    if (reference) {
        todos = JSON.parse(reference) || [];
        renderTodos();
    }
}

todoItemsList.addEventListener('click', function (event) {
    if (event.target.type === 'checkbox') {
        toggle(event.target.parentElement.parentElement.getAttribute('data-key'));
    }
    if (event.target.classList.contains('delete-btn')) {
        deleteTodo(event.target.parentElement.getAttribute('data-key'));
    }
    if (event.target.classList.contains('fas')) {
        deleteTodo(event.target.parentElement.parentElement.getAttribute('data-key'));
    }
});

/**
 * Toggle task completion.
 *
 * @param id
 */
function toggle(id) {
    todos.forEach(function (item) {
        if (item.id.toString() === id) {
            item.completed = !item.completed;
        }
    });
    addToLocalStorage(todos);
}

/**
 * Delete task.
 *
 * @param id
 */
function deleteTodo(id) {
    todos = todos.filter(function (item) {
        return item.id.toString() !== id;
    });

    addToLocalStorage(todos);
}

getFromLocalStorage();
