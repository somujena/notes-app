console.log("Hello");
shownotes();

// If Add note clicked then add a note to local Storage
let addBtn = document.getElementById("addbtn");
addBtn.addEventListener("click", function (e) {
    let addTxtTitle = document.getElementById("addTxtTitle");
    let addTxtContent = document.getElementById("addTxtContent");
    if (addTxtTitle.value.length == 0) {
        // if title is empty
        alert("Add a valid Title");
        return;
    }
    if (addTxtContent.value.length == 0) {
        // if content is empty
        alert("Add a valid Content");
        return;
    }
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    let temp = {
        "title": addTxtTitle.value,
        "content": addTxtContent.value,
        "time": new Date()
    };
    notesobj.push(temp);
    localStorage.setItem("notes", JSON.stringify(notesobj));
    addTxtTitle.value = "";
    addTxtContent.value = "";
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
    <div class="notecard my-2 mx-2 card" style="width:  18rem; background-color: #f0f2f5;">
    <div class="card-body">
        <div  style = "float:left;width: 75%; font-size: 22px;">
            ${element.title}
         </div>
            
        <div  style = "float:left;">
            <a title="${element.time}" style="color: rgb(233, 53, 53); background-color: rgb(227, 251, 219);">Details</a>
        </div>
            
        <br><br>
        <p style="background-color: rgb(192, 196, 180);">${element.content}</p>
        <button id="${index}" onclick="deletenodes(${index})" class="btn btn-primary">Delete</button>
    </div>
</div>

        `
    });
    if (notesobj.length == 0) {
        html += `
            <h5>Notes is Empty. Click "Add Notes" to add a new note.</h5>
        `
    }
    let elem = document.getElementById("notes");
    elem.innerHTML = html;

}

// delete notes
function deletenodes(index) {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesobj = [];
    }
    else {
        notesobj = JSON.parse(notes);
    }
    notesobj.splice(index, 1);
    localStorage.setItem("notes", JSON.stringify(notesobj));

    shownotes();

}

// search function
let search = document.getElementById("searchTxt");
search.addEventListener("input", function () {
    let inputval = search.value.toLowerCase();
    let notecard = document.getElementsByClassName("notecard");
    Array.from(notecard).forEach(function (element) {
        let txt = element.getElementsByTagName("p")[0].innerText;
        txt = txt.toLowerCase();
        if (txt.includes(inputval)) {
            element.style.display = "block";
        }
        else {
            element.style.display = "none";
        }
    })

})

// clear All Notes
let clearall = document.getElementById("clearall");
clearall.addEventListener("click", function () {
    localStorage.clear();
    shownotes();
})