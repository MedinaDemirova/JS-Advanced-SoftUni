function attachEvents() {
    let sendBtn = document.getElementById('submit');
    let nameInput = document.getElementById('author');
    let messageInput = document.getElementById('content');
    let refreshBtn = document.getElementById('refresh');
    let textArea = document.getElementById('messages');


    sendBtn.addEventListener('click', () => {
        if (nameInput.value !== '' && messageInput.value !== '') {
            fetch('https://rest-messanger.firebaseio.com/messanger.json', {
                method: 'POST',
                body: JSON.stringify({
                    author: nameInput.value,
                    content: messageInput.value,
                })
            });
            nameInput.value = '';
            messageInput.value = '';
        }
    });

    refreshBtn.addEventListener('click', () => {
        textArea.disabled = "false";
        textArea.innerHTML = '';
        fetch('https://rest-messanger.firebaseio.com/messanger.json')
            .then(responce => responce.json())
            .then(data => {
                let kvp = Object.entries(data);
                for (const iterator of kvp) {
                    textArea.innerHTML += `${iterator[1].author}: ${iterator[1].content}\n`;
                }
            });
    });

}

attachEvents();