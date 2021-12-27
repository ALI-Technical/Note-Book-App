/*Firebase Database*/

const firebaseConfig = {
    apiKey: "AIzaSyDfIMpypXaqIVjPkNE-S7Q4jWgZip4QDUw",
    authDomain: "ali-notebook.firebaseapp.com",
    databaseURL: "https://ali-notebook-default-rtdb.firebaseio.com",
    projectId: "ali-notebook",
    storageBucket: "ali-notebook.appspot.com",
    messagingSenderId: "419235758934",
    appId: "1:419235758934:web:d54165eea86c9cc57accf7",
    measurementId: "G-ZKWEGETYGQ"
};

   const app = firebase.initializeApp(firebaseConfig);
  
/*Firebase Database*/

var tileInput = document.getElementById("tile-input");
var descInput = document.getElementById("Desc-input");
var notes_box = document.getElementById("notes-box");

app.database().ref("todos").on("child_added" , function(data){
    var section = document.createElement("section");
    section.classList = "col-lg-4 col-md-6 col-sm-12 animate__animated animate__fadeInDown"
    notes_box.appendChild(section);
    var h4 = document.createElement("h4");
    h4.innerHTML = data.val().title;
    section.appendChild(h4);
    var p = document.createElement("p");
    p.innerHTML = data.val().description;
    section.appendChild(p);
    var div = document.createElement("div");
    div.setAttribute("class", "user-div");
    var del = document.createElement("i");
    del.setAttribute("id",data.val().key);
    del.setAttribute("onclick", "deleteBox(this)");
    del.classList = "fas fa-minus-circle";
    var edit = document.createElement("i");
    edit.setAttribute("onclick", "editBox(this)")
    edit.setAttribute("id",data.val().key);
    edit.classList = "far fa-edit";
    del.style.cursor="pointer";
    edit.style.cursor="pointer";
    div.appendChild(del);
    div.appendChild(edit);
    section.appendChild(div);
    
    var div = document.createElement("div");
    div.className="box-line";
    section.insertBefore(div,p);
    /* console.log(notes_box);*/
    tileInput.value = "";
    descInput.value = "";
})

function addItem() {
    if (tileInput.value != "" && descInput.value!=""){
        
        var database = app.database().ref("todos");
        var key = database.push().key;
        
        var todoObj = {
            title: tileInput.value,
            description: descInput.value,
            key: key
        }
        database.child(key).set(todoObj);
    }
    else{
        alert("Fill This Fields");
    }
}

function deleteAll() {
    tileInput.value = "";
    descInput.value = "";
    notes_box.innerHTML = "";
    firebase.database().ref('todos').remove();
}

function deleteBox(e) {
    e.parentNode.parentNode.remove();
    firebase.database().ref('todos').child(e.id).remove();
}

function editBox(e) {
    var title = prompt("Enter Title", e.parentNode.parentNode.childNodes[0].innerHTML);
    var desc = prompt("Enter Description", e.parentNode.parentNode.childNodes[1].innerHTML);
    e.parentNode.parentNode.childNodes[0].innerHTML=title;
    e.parentNode.parentNode.childNodes[1].innerHTML=desc;
    var editTodo = {
        title: title,
        description: desc,
        key: e.id
    }
    app.database().ref('todos').child(e.id).set(editTodo);
}