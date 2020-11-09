let newStudentForm = document.createElement('div');
let body = document.getElementsByTagName('body')[0];
newStudentForm.innerHTML = `<form>
<h3 style="color:##0000A0">Create new student</h3>
<label for="id"style="color:##0000A0">ID:</label>
<input type="text" id="id" name="id">
<label for="fname" style="color:##0000A0">First name:</label>
<input type="text" id="fname" name="fname">
<label for="lname" style="color:##0000A0">Last name:</label>
<input type="text" id="lname" name="lname">
<label for="faculcityNumber" style="color:##0000A0">Faculty No:</label>
<input type="text" id="faculcityNumber" name="faculcityNumber">
<label for="garede" style="color:##0000A0">Grade:</label>
<input type="text" id="garede" name="garede">
</form>`;
let createButton = document.createElement('button');
createButton.innerHTML = 'Create';
createButton.style = 'color:#0000A0';
createButton.addEventListener('click', create);
newStudentForm.appendChild(createButton);
body.appendChild(newStudentForm);
let resultsTable = document.getElementById('results');
let tableBodyElement = resultsTable.getElementsByTagName('tbody')[0];
load();

function load() {

    fetch(`https://students-e118a.firebaseio.com/students.json`)
        .then(res => res.json())
        .then(data => {
            let kvpS = Object.entries(data).sort();
            kvpS.sort((a, b) => a[1].ID - b[1].ID);

            for (const kvp of kvpS) {
                let newRow = document.createElement('tr');
                newRow.setAttribute('data-id', `${kvp[0]}`);
                newRow.innerHTML = `
            <td>${kvp[1].ID}</td>
            <td>${kvp[1].FirstName}</td>
            <td>${kvp[1].LastName}</td>
            <td>${kvp[1].FacultyNumber}</td>
            <td>${kvp[1].Grade}</td>`
                tableBodyElement.appendChild(newRow);
            }
        })
}

function create(e) {
    e.preventDefault();
    let currentForm = e.target.parentElement;
    let id = currentForm.getElementsByTagName('input')[0];
    let firstName = currentForm.getElementsByTagName('input')[1];
    let lastName = currentForm.getElementsByTagName('input')[2];
    let facNum = currentForm.getElementsByTagName('input')[3];
    let grade = currentForm.getElementsByTagName('input')[4];


    if (id.value.match(/[0-9]+/) && firstName.value.match(/[A-Z][a-z]+/) && lastName.value.match(/[A-Z][a-z]+/) &&
        facNum.value.match(/[0-9]+/) && grade.value.match(/[0-9]+/)) {

        fetch(`https://students-e118a.firebaseio.com/students.json`, {
                method: 'POST',
                body: JSON.stringify({
                    ID: id.value,
                    FirstName: firstName.value,
                    LastName: lastName.value,
                    FacultyNumber: facNum.value,
                    Grade: grade.value
                })
            })
            .then(res => res.json())
            .then(data => {
                tableBodyElement.innerHTML = '';
                load();
                id.value = '';
                firstName.value = '';
                lastName.value = '';
                facNum.value = '';
                grade.value = '';

            })
    }

}