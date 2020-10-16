
var firebaseConfig = {
    apiKey: "AIzaSyBj-WyFNL0uKqcu30-a4XMHmbfWETUVdj8",
    authDomain: "kwitter2-f9b31.firebaseapp.com",
    databaseURL: "https://kwitter2-f9b31.firebaseio.com",
    projectId: "kwitter2-f9b31",
    storageBucket: "kwitter2-f9b31.appspot.com",
    messagingSenderId: "1031198609691",
    appId: "1:1031198609691:web:4eed81240c3bf8a19fc3be"
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

    user_name = localStorage.getItem("kwitter_Name");
    document.getElementById("welcome").innerHTML = "Hello, "+user_name+"!";

function addUser(){
  room_name = document.getElementById("room_name").value;
  firebase.database().ref("/").child(room_name).update({
    purpose : "adding the room"
  });
  localStorage.setItem("kwitter_room",room_name);
  window.location = "kwitter_page.html";
}
function getData(){
  firebase.database().ref("/").on('value',function(snapshot){
    console.log(snapshot);
    document.getElementById("output").innerHTML = "";
    snapshot.forEach(function(childSnapshot){
      console.log(childSnapshot);
      childKey = childSnapshot.key;
      roomName = childKey;
      //console.log("room name-"+roomName);
      row = "<div class='room_name' id="+roomName+" onclick='redirectToRoom(this.id)'>#"+roomName+"</div><hr>";
      document.getElementById("output").innerHTML+= row;
    });
  });
}
getData();
function redirectToRoom(name){
  console.log(name);
  room_name = name;
  localStorage.setItem("kwitter_room",name);
  window.location = "kwitter_page.html";
}
function logOut(){
  localStorage.removeItem("kwitter_room");
  localStorage.removeItem("kwitter_Name");
  window.location = "index.html";
}

