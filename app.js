function attachEvents() {
    let loadBtn = document.getElementById('btnLoad');
    let phonebookUL = document.getElementById('phonebook');

    loadBtn.addEventListener('click', () => {
        phonebookUL.innerHTML = '';
        fetch('https://phonebook-nakov.firebaseio.com/phonebook.json')
            .then(responce => responce.json())
            .then(data => {
                let kvp = Object.entries(data);
                for (const iterator of kvp) {
                    let newLI = document.createElement('li');
                    newLI.innerHTML = `${iterator[1].person}: ${iterator[1].phone}`;
                    let deleteBtn = document.createElement('button');
                    deleteBtn.innerHTML = "Delete";
                    newLI.appendChild(deleteBtn);
                    phonebookUL.appendChild(newLI);
                    deleteBtn.addEventListener('click', () => {
                        fetch(`https://phonebook-nakov.firebaseio.com/phonebook/${iterator[0]}.json`, {
                            method: 'DELETE'
                        });
                    });
                };
            });
    });

    let createBtn = document.getElementById('btnCreate');
    let nameInput = document.getElementById('person');
    let phoneInput = document.getElementById('phone');

    createBtn.addEventListener('click', () => {
        if (nameInput.value !== '' && phoneInput.value !== '') {
            fetch('https://phonebook-nakov.firebaseio.com/phonebook.json', {
                method: 'POST',
                body: JSON.stringify({
                    person: nameInput.value,
                    phone: phoneInput.value,
                })
            });
            nameInput.value = '';
            phoneInput.value = '';
            let event = document.createEvent('Event');
            event.initEvent('click', true, false);
            loadBtn.dispatchEvent(event);
        };
    });
};
attachEvents();