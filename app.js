function solve() {
    let current = 'depot';
    let infoEl = document.getElementsByClassName('info')[0];
    let departBtn = document.getElementById('depart');
    let arriveBtn = document.getElementById('arrive');
    let stopName;
    let nextStopId;

    function depart() {
        let url = `https://judgetests.firebaseio.com/schedule/${current}.json`;
        fetch(url)
            .then(responce => responce.json())
            .then(data => {
                if (typeof data === "object" && data !== null) {
                    stopName = data.name;
                    nextStopId = data.next;
                    departBtn.disabled = "disabled";
                    arriveBtn.removeAttribute("disabled");
                    current = nextStopId;
                    infoEl.innerHTML = `Next stop ${stopName}`;
                } else {
                    infoEl.innerHTML = "Error";
                    departBtn.disabled = "disabled";
                };
            });
    };

    function arrive() {
        infoEl.innerHTML = `Arriving at ${stopName}`;
        departBtn.removeAttribute("disabled");
        arriveBtn.disabled = "true";
        current = nextStopId;
    };

    return {
        depart,
        arrive
    };
};

let result = solve();