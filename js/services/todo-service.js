'use strict';

const STORAGE_KEY = 'todosDB';
var gTodos;
var gFilterBy = 'all';

_createTodos();


function setFilter(filterBy) {
    gFilterBy = filterBy
}

function getTodosForDisplay() {
    if (gFilterBy === 'all') return gTodos;
    if (gFilterBy === 'txt') return sortTodosByTxt();
    if (gFilterBy === 'created') return sortTodosByTimeStamp();
    if (gFilterBy === 'importance') return sortTodosByImportance();

    var todos = gTodos.filter(function (todo) {
        return (gFilterBy === 'done' && todo.isDone) ||
            (gFilterBy === 'active' && !todo.isDone);
    })
    return todos;
}


function sortTodosByImportance(){
    var todos = gTodos.sort(function (todo1, todo2) {
        return todo1.importance - todo2.importance;
    });
    console.log('todos by time', todos);
    return todos;
}

function sortTodosByTimeStamp(){
    var todos = gTodos.sort(function (todo1, todo2) {
        return todo1.createdAt - todo2.createdAt;
    });
    console.log('todos by time', todos);
    return todos;
}

function sortTodosByTxt() {
    var todos = gTodos.sort(function (todo1, todo2) {
        if (todo1.txt.toLowerCase() > todo2.txt.toLowerCase()) {
            return 1;
        }
        if (todo1.txt.toLowerCase() < todo2.txt.toLowerCase()) {
            return -1;
        }
        return 0;
    })
    console.log('todos', todos);
    return todos;
}

function removeTodo(todoId) {
    var confirmReply = confirm('Are you sure you wish to delete this task?');
    if (!confirmReply) return;
    console.log('Removing Todo', todoId);
    var idx = gTodos.findIndex(function (todo) {
        return todo.id === todoId;
    })
    gTodos.splice(idx, 1);
    _saveTodosToStorage();
}

function toggleTodo(todoId) {
    console.log('Toggling Todo', todoId);
    var todoToToggle = gTodos.find(function (todo) {
        return todo.id === todoId;
    })
    todoToToggle.isDone = !todoToToggle.isDone;
    _saveTodosToStorage();
}

function addTodo(txt, importance) {
    if (!txt || !importance){
        alert('Please write down the task and the importance');
        return;
    }
    var todo = _createTodo(txt, importance);
    gTodos.unshift(todo);
    _saveTodosToStorage();
}

function getTodosCount() {
    return gTodos.length;
}
function getActiveTodosCount() {
    var activeTodos = gTodos.filter(function (todo) {
        return !todo.isDone;
    })
    return activeTodos.length;
}


// Those functions are private for this file only
function _makeId(length = 6) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function _createTodos() {
    var todos = loadFromStorage(STORAGE_KEY);
    if (!todos || !todos.length) {
        todos = ['Learn CSS', 'Master HTML'].map(_createTodo);
        //diffrent way
        // todos = ['Learn CSS', 'Master HTML'].map(function(txt){
        //     return _createTodo(txt)
        // });
    }
    gTodos = todos;
    _saveTodosToStorage();
}

function _createTodo(txt, importance) {
    if (!importance) importance = 1;
    var todo = {
        id: _makeId(),
        txt: txt,
        isDone: false,
        createdAt: new Date().getTime(),
        importance: importance
    }
    return todo;
}

function _saveTodosToStorage() {
    saveToStorage(STORAGE_KEY, gTodos);
}