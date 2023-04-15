let clicked = false;

function handle_delete(id) {
    let a = confirm(`Are you sure you want to delete car with id ${id}?`)
    if (a) {
        location.href = `deleteCar?id=${id}`;
    }
}

function handle_edit(id) {
    if (!clicked) clicked = true;
    else return;
    let row = document.getElementById(id);
    console.log(row)
    let i = 0;
    for (const child of row.children) {
        console.log(child);
        if (i >= 1 && i < row.children.length - 2) {
            let name = "";
            switch (i) {

                case 1:
                    name = "ubezpieczony";
                case 2:
                    name = "benzyna";
                case 3:
                    name = "uszkodzony";
                case 4:
                    name = "naped4x4";
            }
            child.innerHTML = "";
            let select = document.createElement("select");
            select.name = name;
            select.classList.add("form-select");
            select.classList.add("form-select-lg");
            select.innerHTML = '<option value="TAK">TAK</option><option value = "NIE">NIE</option><option value="BRAKDANYCH">BRAKDANYCH</option>';
            child.appendChild(select);
        }
        else if (i == 5) {
            child.innerHTML = "";
            let submit = document.createElement("div");
            submit.type = "submit";

            submit.innerText = "UPDATE";
            submit.classList.add("btn");
            submit.classList.add("btn-danger");
            submit.onclick = function () {
                let confirmed = confirm("Are you sure you want to update record with id " + id + "?");
                if (!confirmed) return;
                console.log(id)
                for (let i = 0; i < document.getElementsByClassName(id).length; i++) {
                    console.log(document.getElementsByClassName(id)[i].children[0].value)
                }
                const data = document.getElementsByClassName(id);
                const ubezpieczony = data[0].children[0].value;
                const benzyna = data[1].children[0].value;
                const uszkodzony = data[2].children[0].value;
                const naped4x4 = data[3].children[0].value;
                console.log("SIUUU")
                location.href = `updateCar?ubezpieczony=${ubezpieczony}&benzyna=${benzyna}&uszkodzony=${uszkodzony}&naped4x4=${naped4x4}&id=${id}`;
            }
            child.appendChild(submit);


        }
        else if (i == 6) {
            let cancel = document.createElement("div");
            cancel.innerHTML = "CANCEL";
            cancel.classList.add("btn-primary");
            cancel.classList.add("btn");
            cancel.onclick = function () {
                location.reload();
            }
            child.appendChild(cancel);
        }
        i++;
    }

}