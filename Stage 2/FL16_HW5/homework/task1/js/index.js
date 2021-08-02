const tbody = document.getElementById('tbody');
const table = document.getElementById('table');
const tr = document.createElement('tr');
const editBtnList = document.querySelectorAll('editBtn');
const spinner = document.querySelector('.spinner');
const btnLabels = {
    edit: 'editBtn',
    delete: 'deleteBtn',
    save: 'saveBtn',
    cancel: 'cancelBtn'
}
let userList = [];

function getUsers() {
    showSpinner();
    return fetch('https://jsonplaceholder.typicode.com/users')
        .then((response) => {
            return response.json();
        });
}

function deleteUser(id) {
    showSpinner();
    return fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'DELETE'
    }).then(response => response.json())
}

function updateUser(payload, id) {
    showSpinner();
    return fetch(`https://jsonplaceholder.typicode.com/users/${id}`, {
        method: 'PUT',
        body: JSON.stringify(payload)
    }).then((response) => {
        return response.json();
    })
}

function drawTable(id) {
    tbody.innerHTML = '';
    userList.forEach((user) => {
        if (id && id === user.id) {
            tbody.insertAdjacentHTML('beforeend', drawEditRow(user, id))
        } else {
            tbody.insertAdjacentHTML('beforeend', drawRow(user, id))
        }
    });
}

function drawRow(user) {
    return `<tr scope="row">
        <td>${user.id}</td>
        <td>${user.name}</td>
        <td>${user.username}</td>
        <td>${user.email}</td>
        <td>${user.phone}</td>
        <td>${user.website}</td>
        <td><button class="btn btn-warning" id="${btnLabels.edit}${user.id}" type="button">Edit</button></td>
        <td><button class="btn btn-danger" id="${btnLabels.delete}${user.id}" type="button">Delete</button></td>
        </tr>`
}

function drawEditRow(user) {
    return `<tr scope="row">
        <td>${user.id}</td>
        <td>
            <input class="form-control" name="name" form="my_form" value="${user.name}"/>
        </td>
        <td>
            <input class="form-control" name="username" form="my_form" value="${user.username}"/>
        </td>
        <td>
            <input class="form-control" name="email" form="my_form" value="${user.email}"/>
        </td>
        <td>
            <input class="form-control" name="phone" form="my_form" value="${user.phone}"/>
        </td>
        <td>
            <input class="form-control" name="website" form="my_form" value="${user.website}"/>
        </td>
        <td><button class="btn btn-success" id="${btnLabels.save}${user.id}" type="button">Save</button></td>
        <td><button class="btn btn-danger" id="${btnLabels.cancel}${user.id}" type="button">Cancel</button></td>
        </tr>`
}

table.addEventListener('click', (event) => {
    const isEditClicked = event.target.id.includes(btnLabels.edit);
    const isDeleteClicked = event.target.id.includes(btnLabels.delete);
    const isCancelClicked = event.target.id.includes(btnLabels.cancel);
    const isSaveClicked = event.target.id.includes(btnLabels.save);

    if (isEditClicked) {

        const id = +event.target.id.slice(btnLabels.edit.length);
        drawTable(id)

    } else if (isDeleteClicked) {

        const id = +event.target.id.slice(btnLabels.delete.length);
        deleteUser(id).then(() => {
            userList = userList.filter((user) => id !== user.id);
            drawTable();
            hideSpinner()
        })

    } else if (isCancelClicked) {

        drawTable();

    } else if (isSaveClicked) {

        const id = +event.target.id.slice(btnLabels.save.length);
        const formData = new FormData(document.getElementById('my_form'));
        const payload = {}
        for (let key of formData.keys()) {
            payload[key] = formData.get(key);
        }

        updateUser(payload, id).then(() => {
            let user = userList.find(user => id === user.id);
            for (let key of Object.keys(payload)) {
                user[key] = payload[key];
            }
            drawTable();
            hideSpinner();
        });

    }
})

function hideSpinner() {
    spinner.style.display = 'none';
}

function showSpinner() {
    spinner.style.display = 'block';
}

getUsers().then((users) => {
    userList = users
    drawTable();
    hideSpinner();
})