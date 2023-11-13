const todoForm = document.querySelector('.vote_form');
const todoInput = document.querySelector('.vote_input');
const todoItemsList = document.querySelector('.list_items');
let todos = [];

todoForm.addEventListener('submit', handleFormSubmit);

function handleFormSubmit(event) {
  event.preventDefault();
  const newTodoName = todoInput.value.trim();
  if (newTodoName !== '') {
    const newTodo = {
      id: Date.now(),
      name: newTodoName,
      completed: false
    };
    addTodoAndSave(newTodo);
    todoInput.value = '';
  }
}

function addTodoAndSave(newTodo) {
  todos.push(newTodo);
  saveToLocalStorageAndRender();
}

function renderTodos(todos) {
  todoItemsList.innerHTML = '';
  todos.forEach(renderSingleTodo);
}

function renderSingleTodo(todo) {
  const todoElement = createTodoElement(todo);
  todoItemsList.appendChild(todoElement);
}

function createTodoElement(todo) {
  const li = document.createElement('li');
  li.setAttribute('class', 'item');
  li.setAttribute('data-key', todo.id);
  if (todo.completed) {
    li.classList.add('checked');
  }
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.classList.add('checkbox');
  checkbox.checked = todo.completed;
  checkbox.addEventListener('change', () => toggleAndSave(todo.id));
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener('click', () => deleteTodoAndSave(todo.id));
  li.appendChild(checkbox);
  li.appendChild(document.createTextNode(todo.name));
  li.appendChild(deleteButton);
  return li;
}

function saveToLocalStorageAndRender() {
  saveToLocalStorage();
  renderTodos(todos);
}

function saveToLocalStorage() {
  localStorage.setItem('todos', JSON.stringify(todos));
}

function getFromLocalStorage() {
  const storedTodos = localStorage.getItem('todos');
  if (storedTodos) {
    todos = JSON.parse(storedTodos);
    renderTodos(todos);
  }
}

function toggleAndSave(id) {
  todos.forEach(todo => {
    if (todo.id === id) {
      todo.completed = !todo.completed;
    }
  });
  saveToLocalStorage();
}

function deleteTodoAndSave(id) {
  todos = todos.filter(todo => todo.id !== id);
  saveToLocalStorageAndRender();
}

getFromLocalStorage();

todoItemsList.addEventListener('click', function (event) {
  if (event.target.type === 'checkbox') {
    const todoId = event.target.parentElement.getAttribute('data-key');
    toggleAndSave(todoId);
  }
  if (event.target.classList.contains('delete-button')) {
    const todoId = event.target.parentElement.getAttribute('data-key');
    deleteTodoAndSave(todoId);
  }
});
