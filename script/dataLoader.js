document.addEventListener('DOMContentLoaded', async function() {
    const preloader = document.getElementById('preloader');

    preloader.style.animation = 'spin 2s linear infinite'; // Активация анимации

    let firstCall = false; // Флаг для отслеживания первого и второго обращения
    const limit = 3; // Ограничение по количеству пользователей

    const refreshButton = document.getElementById('refresh');
    refreshButton.addEventListener('click', function() {
        firstCall = !firstCall; // обновить флаг
        updateRequest(firstCall, limit); // вызов функции с обновленным флагом
    });

    await updateRequest(firstCall, limit); // вызов функции изначальной функции
});

async function updateRequest(firstCall, limit) {
    const preloader = document.getElementById('preloader');
    const errorPlaceholder = document.createElement('div');

    let url = 'https://jsonplaceholder.typicode.com/comments';

    if (firstCall) {
        const limit = 3; // Ограничение
        const randomStart = Math.floor(Math.random() * limit);
        url += `?_start=${randomStart}&_limit=${limit}`;
    } else {
        url += `?_start=${limit}&_limit=${limit}`;
    }
    try {
        preloader.style.display = 'block'; // Показать прелоадер перед отправкой запроса

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('Unable to response');
        }
        const userList = await response.json();
        console.log('Данные:', userList);
        renderUsers(userList);
        document.getElementById('refresh').style.display = 'block';
        preloader.style.display = 'none'; // Скрыть прелоадер после получения данных
    } catch (error) {
        console.error('Ошибка запроса:', error);
        preloader.style.display = 'none'; // Скрыть прелоадер в случае ошибки
        errorPlaceholder.textContent = 'Произошла ошибка при выполнении запроса.';
        document.getElementById('userList').appendChild(errorPlaceholder);
    }
}

function renderUsers(userList) {
    const userListElement = document.getElementById('userList');
    userListElement.innerHTML = ''; // очистить существующие данные

    const template = document.getElementById('userTemplate');

    userList.forEach(user => {
        const userElement = document.importNode(template.content, true);

        userElement.querySelector('.email').textContent = 'Email: ' + user.email;
        userElement.querySelector('.theme').textContent = 'Theme: ' + user.name;
        userElement.querySelector('.comment').textContent = 'Comment: ' + user.body;

        userListElement.appendChild(userElement);
    });
}
