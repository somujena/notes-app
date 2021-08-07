console.log("Hello");
var db = firebase.firestore();
var notesobj;
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
    let doc = db.collection("notes").doc();
    doc.set({
        id: doc.id,
        title: addTxtTitle.value,
        content: addTxtContent.value,
        time: new Date().getTime()
    })
    addTxtTitle.value = "";
    addTxtContent.value = "";
    shownotes();

})

// shows notes
function shownotes() {
    notesobj = [];
    db.collection("notes").get().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
            notesobj.push(doc.data());
        });
        let html = "";
        notesobj.forEach(function (element, index) {
            html += `
    <div class="notecard my-2 mx-2 card" style="width:  18rem; background-color: #f0f2f5;">
    <div class="card-body">
        <div  style = "float:left;width: 75%; font-size: 22px;">
            ${element.title}
         </div>
            
        <div  style = "float:left;">
            <a title="${getTime(element.time)}" style="color: rgb(233, 53, 53); background-color: rgb(227, 251, 219);">Details</a>
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
    });
}

function getTime(elem) {
    let date = new Date(elem);
    let hours = date.getHours();
    let minutes = "0" + date.getMinutes();
    let seconds = "0" + date.getSeconds();
    let formattedTime = hours + ':' + minutes.substr(-2) + ':' + seconds.substr(-2);
    return formattedTime;
}

// delete notes
function deletenodes(index) {
    db.collection("notes").doc(notesobj[index].id).delete();
    notesobj.splice(index, 1);
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
clearall.addEventListener("click", async function () {
    var collectionReference = db.collection("notes");
    await notesobj.forEach(async (element) => {
        await collectionReference.doc(element.id).delete();
    });
    notesobj = [];
    shownotes();
})