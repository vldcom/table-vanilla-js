const list = fetch('https://jsonplaceholder.typicode.com/users');

let listofUsers = [];

list.then(result => result.json())
    .then(result => {
        listofUsers = result;
        addRows(listofUsers);
    });


function addRows(array) {
    const table = document.getElementById('table-body');
    array.forEach(element => {
        const row = `
        <tr>
        <td>${element.name}</td>
        <td>${element.username}</td>
        <td>${element.email}</td>
        <td><input type="button" value="Delete" onclick="deleteRow(event)"></td>
        </tr>
        `
        table.innerHTML += row;
    });
}


const openModalButton = document.getElementById('create-button');
const closeModalButton = document.getElementById('close-button');
const overlay = document.getElementById('overlay');

openModalButton.addEventListener('click', () => {
    const modal = document.getElementById('modal');
    openModal(modal);
})

closeModalButton.addEventListener('click', () => {
    const modal = document.getElementById('modal');
    closeModal(modal)
})

function openModal(modal) {
    modal.classList.add('active')
    overlay.classList.add('active')
}

function closeModal(modal) {
    modal.classList.remove('active')
    overlay.classList.remove('active')
}

//form

const submit = document.getElementById('submit')

submit.addEventListener('click', (event) => {
    event.preventDefault();
    const formValues = Array.from(document.querySelectorAll('form input')).reduce((acc, input) => {

        console.log(acc, 'acc')
        console.log(input.id)
        console.log(input.value)

        return { ...acc, [input.id]: input.value }
    }, {})
    console.log(formValues)

    listofUsers.push(formValues);
    removeAllExistingRows()
    addRows(listofUsers);
})

const removeAllExistingRows = () => {
    const rows = document.querySelectorAll('tbody tr');
    const table = document.getElementById('table-body');

    rows.forEach(row => {
        table.deleteRow(row);
    })
}

//delete

function deleteRow(event) {
    //delete from html
    var parentNode = event.path[2]
    parentNode.parentNode.removeChild(parentNode);

    //delete from list
    const userToDelete = event.path[2].cells[0].innerHTML.toString();

    const newUserList = listofUsers.filter(person => person.name !== userToDelete);
    listofUsers = newUserList;
}

