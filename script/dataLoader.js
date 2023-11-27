async function updateRequest(firstCall) {
    const preloader = document.getElementById('preloader');
    const errorPlaceholder = document.createElement('div');

    let url = 'https://jsonplaceholder.typicode.com/posts/1/comments';

    if (firstCall) {
        url += '?id_gte=3'; // 1-ый вызов >= 3
    } else {
        url += '?id_lte=3'; // 2-ой вызов >= 3
    }

    try {
        const response = await fetch(url);
        const userList = await response.json();
        preloader.style.display = 'none'; // скрыть прелоадер
        console.log('Данные:', userList);
        renderUsers(userList);
        document.getElementById('refresh').style.display = 'block'; // отобразить кнопку "Обновить запрос"
    } catch (error) {
        errorPlaceholder.textContent = 'Упс... Что-то пошло не так';
        document.body.appendChild(errorPlaceholder);
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    const preloader = document.getElementById('preloader');

    preloader.style.animation = 'spin 2s linear infinite'; // Активация анимации

    let url = 'https://jsonplaceholder.typicode.com/posts/1/comments';
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

    let url = 'https://jsonplaceholder.typicode.com/posts/1/comments';

    if (firstCall) {
        url += `?_limit=${limit}`; // 1-ый вызов с ограничением
    } else {
        url += `?_start=${limit}&_limit=${limit}`; // 2-ой вызов с сдвигом и ограничением
    }

    try {
        const response = await fetch(url);
        const userList = await response.json();
        preloader.style.display = 'none'; // скрыть прелоадер
        console.log('Данные:', userList);
        renderUsers(userList);
        document.getElementById('refresh').style.display = 'block'; // отобразить кнопку "Обновить запрос"
    } catch (error) {
        errorPlaceholder.textContent = 'Упс... Что-то пошло не так';
        document.body.appendChild(errorPlaceholder);
    }
}

function renderUsers(userList) {
    const userListElement = document.getElementById('userList');
    userListElement.innerHTML = ''; // очистить существующие данные

    userList.forEach(user => {
        const userElement = document.createElement('div');
        const emailElement = document.createElement('p');
        const themeElement = document.createElement('p');
        const commentElement = document.createElement('p');

        emailElement.textContent = `Email: ${user.email}`;
        themeElement.textContent = `Theme: ${user.name}`;
        commentElement.textContent = `Comment: ${user.body}`;

        userElement.appendChild(emailElement);
        userElement.appendChild(themeElement);
        userElement.appendChild(commentElement);

        userListElement.appendChild(userElement);
    });
}
