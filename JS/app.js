console.log("Hello");
shownotes();
// If Add note clicked then add a note to local Storage
let addBtn = document.getElementById("addbtn");
if (addBtn == null) console.log("Hi");
addBtn.addEventListener("click", function (e) {
    let addTxt = document.getElementById("addTxt");
    if (addTxt.value.length == 0) {
        return;
    }
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.push(addTxt.value);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addTxt.value = "";
    console.log(notesobj);
    shownotes();

})

// shows notes
function shownotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let html = "";
    notesobj.forEach(function (element, index) {
        html += `
        <div class="notecard my-2 mx-2 card" style="width: 18rem;">
            <div class="card-body">
                <h5 class="card-title">Title ${index + 1}</h5>
                <p class="card-text" > ${element}</p>
                <button  class="btn btn-primary">Delete</button>
            </div>
        </div>
    </div>
        `
    });
    if(notesobj.length==0){
        html+=`
           Notes Empty
        `
    }
    let elem = document.getElementById("notes");
    elem.innerHTML = html;

}

// delete notes
