function attachEvents() {
    let catchesDIV = document.getElementById('catches');
    let loadBtn = document.getElementsByClassName('load')[0];
    let addBtn = document.getElementsByClassName('add')[0];

    loadBtn.addEventListener('click', () => {
        catchesDIV.innerHTML = '';
        fetch(`https://fisher-game.firebaseio.com/catches.json`)
            .then(res => res.json())
            .then(data => {
                let kvpsArr = Object.entries(data);
                for (const element of kvpsArr) {
                    let newDiv = document.createElement('div');
                    newDiv.className = "catch";
                    newDiv.id = `${element[0]}`;
                    newDiv.innerHTML = ` <label>Angler</label>
                    <input type="text" class="angler" value="${element[1].angler}" />
                    <hr>
                    <label>Weight</label>      
                    <input type="number" class="weight" value="${element[1].weight}" />
                    <hr>
                    <label>Species</label>
                    <input type="text" class="species" value="${element[1].species}" />
                    <hr>
                    <label>Location</label>
                    <input type="text" class="location" value="${element[1].location}" />
                    <hr>
                    <label>Bait</label>
                    <input type="text" class="bait" value="${element[1].bait}" />
                    <hr>
                    <label>Capture Time</label>
                    <input type="number" class="captureTime" value="${element[1].captureTime}" />
                    <hr>`;

                    let updateBtn = document.createElement('button');
                    updateBtn.className = "update";
                    updateBtn.innerHTML = `Update`;
                    let deleteBtn = document.createElement('button');
                    deleteBtn.className = "delete";
                    deleteBtn.innerHTML = 'Delete';
                    updateBtn.addEventListener('click', update);
                    deleteBtn.addEventListener('click', deleteFunct);

                    newDiv.appendChild(updateBtn);
                    newDiv.appendChild(deleteBtn);
                    catchesDIV.appendChild(newDiv);
                };
            })
    });

    addBtn.addEventListener('click', () => {
        let addForm = document.getElementById('addForm');
        let angler = addForm.getElementsByTagName('input')[0].value;
        let weight = addForm.getElementsByTagName('input')[1].value;
        let species = addForm.getElementsByTagName('input')[2].value;
        let location = addForm.getElementsByTagName('input')[3].value;
        let bait = addForm.getElementsByTagName('input')[4].value;
        let captureTime = addForm.getElementsByTagName('input')[5].value;
        fetch(`https://fisher-game.firebaseio.com/catches.json`, {
            method: 'POST',
            body: JSON.stringify({
                angler: angler,
                weight: weight,
                species: species,
                location: location,
                bait: bait,
                captureTime: captureTime
            })
        })
        addForm.getElementsByTagName('input')[0].value = '';
        addForm.getElementsByTagName('input')[1].value = '';
        addForm.getElementsByTagName('input')[2].value = '';
        addForm.getElementsByTagName('input')[3].value = '';
        addForm.getElementsByTagName('input')[4].value = '';
        addForm.getElementsByTagName('input')[5].value = '';


    });

    function update(e) {
        let btnParentDivUpdate = e.target.parentElement;
        let anglerCatches = btnParentDivUpdate.getElementsByTagName('input')[0].value;
        let weightCatches = btnParentDivUpdate.getElementsByTagName('input')[1].value;
        let speciesCatches = btnParentDivUpdate.getElementsByTagName('input')[2].value;
        let locationCatches = btnParentDivUpdate.getElementsByTagName('input')[3].value;
        let baitCatches = btnParentDivUpdate.getElementsByTagName('input')[4].value;
        let captureTimeCatches = btnParentDivUpdate.getElementsByTagName('input')[5].value;
        fetch(`https://fisher-game.firebaseio.com/catches/${btnParentDivUpdate.id}.json`, {
            method: 'PUT',
            body: JSON.stringify({
                angler: anglerCatches,
                weight: weightCatches,
                species: speciesCatches,
                location: locationCatches,
                bait: baitCatches,
                captureTime: captureTimeCatches
            })
        });
        var event = document.createEvent('Event');
        event.initEvent('build', true, true);
        loadBtn.dispatchEvent(event); 
    }

    function deleteFunct(e) {
        let btnParentDiv = e.target.parentElement;
        fetch(`https://fisher-game.firebaseio.com/catches/${btnParentDiv.id}.json`, {
            method: 'DELETE'
        });
    }

}

attachEvents();