const todoForm = document.querySelector('.vote_form');
const todoInput = document.querySelector('.vote_input');
const templatesDropdown = document.getElementById('templatesDropdown');
const todoItemsList = document.querySelector('.list_items');
let todos = [];

todoForm.addEventListener('submit', handleFormSubmit);

function showTemplates() {
  const input = document.querySelector('.vote_input');
  const addButton = document.querySelector('.add_button');

  if (input.value.trim() !== '') {
    const enteredText = input.value.toLowerCase();

    const teamTemplates = ['Ливерпуль', 'Тоттенхем', 'Арсенал', 'Манчестер Сити', 'Челси', 'Манчестер Юнайтед'];
    const matchingTemplates = teamTemplates.filter(template =>
      template.toLowerCase().includes(enteredText)
    );

    const datalist = document.getElementById('teamList');
    datalist.innerHTML = '';

    matchingTemplates.forEach(template => {
      const option = document.createElement('option');
      option.value = template;
      datalist.appendChild(option);
    });

    if (matchingTemplates.length > 0) {
      datalist.style.display = 'block';
    } else {
      datalist.style.display = 'none';
    }

    addButton.disabled = true;
  } else {
    const datalist = document.getElementById('teamList');
    datalist.innerHTML = '';
    datalist.style.display = 'none';

    addButton.disabled = false;
  }
}

function addTemplate() {
  const input = document.querySelector('.vote_input');
  const selectedOption = document.querySelector('#teamList option[value="' + input.value + '"]');

  if (input.value.trim() !== '' && selectedOption) {
    const selectedTemplate = selectedOption.value;

    // Добавьте ваш код для обработки выбранного шаблона
    console.log('Выбранный шаблон:', selectedTemplate);

    // Очистите поле ввода
    input.value = '';

    // Скрыть список команд
    const datalist = document.getElementById('teamList');
    datalist.innerHTML = '';
    datalist.style.display = 'none';
  }
}

// Обработчики событий
const input = document.querySelector('.vote_input');
const addButton = document.querySelector('.add_button');

input.addEventListener('input', showTemplates);
addButton.addEventListener('click', addTemplate);

function handleFormSubmit(event) {
  event.preventDefault();
  const newTodoName = todoInput.value.trim();
  if (newTodoName !== '') {
    const newTodo = {
      name: newTodoName,
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
  if (todo.completed) {
    li.classList.add('checked');
  }
  const checkbox = document.createElement('input');
  checkbox.setAttribute('type', 'checkbox');
  checkbox.classList.add('checkbox');
  checkbox.checked = todo.completed;
  checkbox.addEventListener('change', () => toggleAndSave(todo));
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'X';
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener('click', () => deleteTodoAndSave(todo));
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

function toggleAndSave(todo) {
  todo.completed = !todo.completed;
  saveToLocalStorage();
}

function deleteTodoAndSave(todo) {
  todos = todos.filter(item => item !== todo);
  saveToLocalStorageAndRender();
}

todoItemsList.addEventListener('click', function (event) {
  if (event.target.type === 'checkbox') {
    const todo = todos.find(item => item.name === event.target.nextElementSibling.textContent);
    toggleAndSave(todo);
  }
  if (event.target.classList.contains('delete-button')) {
    const todo = todos.find(item => item.name === event.target.previousElementSibling.textContent);
    deleteTodoAndSave(todo);
  }
});

