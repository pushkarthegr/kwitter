function load(){
    if(screen.height<567){
        document.body.style.overflow = "none";
    }
    else{
        document.body.style.overflow = "hidden";
    }
}
function login(){
    name = document.getElementById("nameInput").value;
    localStorage.setItem("kwitter_Name",name);
    window.location = "kwitter_room.html";
}
