'use strict';

function onInit() {
    console.log('Hi');
    renderTodos();
}

function renderTodos() {
    var elFilterBy = document.querySelector('select[name=filterBy]');
    var filterBy = elFilterBy.value;
    
    var todos = getTodosForDisplay();
    var strHTMLs = todos.map(function (todo) {
        var className = (todo.isDone) ? 'done' : '';
        return `<li class="${className}" onclick="onToggleTodo('${todo.id}')">
        ${todo.txt}
        <button onclick="onRemoveTodo('${todo.id}', event)">x</button>
        </li>`
    })
    document.querySelector('.todo-list').innerHTML = strHTMLs.join('');
    document.querySelector('.total-todos').innerText = getTodosCount();
    document.querySelector('.active-todos').innerText = getActiveTodosCount();

    if (!getTodosCount()) document.querySelector('.todo-list').innerText = 'No todos at all! Add more or refresh the page.';
    if (filterBy === 'done' && todos.length === 0) document.querySelector('.todo-list').innerText = 'No Done Todos.';
    if (filterBy === 'active' && todos.length === 0) document.querySelector('.todo-list').innerText = 'No Active Todos.';
}

function onRemoveTodo(todoId, ev) {
    ev.stopPropagation();
    //model
    removeTodo(todoId);
    //dom
    renderTodos();
}

function onToggleTodo(todoId) {
    toggleTodo(todoId)
    renderTodos();
}

function onAddTodo(ev) {
    ev.preventDefault();
    var elTodoTxt = document.querySelector('input[name=todoTxt]');
    var elImportanceTxt = document.querySelector('input[name=importanceTxt]');
    var txt = elTodoTxt.value;
    var importance = elImportanceTxt.value;
    addTodo(txt, importance);
    elTodoTxt.value = '';
    elImportanceTxt.value = '';
    renderTodos();
}

function onSetFilter() {
    var elFilterBy = document.querySelector('select[name=filterBy]');
    var filterBy = elFilterBy.value;
    console.log('Filtering by', filterBy);
    setFilter(filterBy);
    renderTodos();
}