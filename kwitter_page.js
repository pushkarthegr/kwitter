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
room_name = localStorage.getItem("kwitter_room");

function logOut() {
      localStorage.removeItem("kwitter_room");
      localStorage.removeItem("kwitter_Name");
      window.location = "index.html";
}
function send(){
      msg = document.getElementById("message").value;
      firebase.database().ref(room_name).push({
            Name:user_name,
            message:msg,
            likes:0
      });
      document.getElementById("message").value = "";
}
function getData() {
      firebase.database().ref("/" + room_name).on('value', function (snapshot) {
            document.getElementById("output").innerHTML = ""; snapshot.forEach(function (childSnapshot) {
                  childKey = childSnapshot.key; 
                  childData = childSnapshot.val(); 
                  if (childKey != "purpose") {
                        firebase_message_id = childKey;
                        message_data = childData;
                        name = message_data["Name"];
                        Message = message_data["message"];
                        Likes = message_data["likes"];

                        name_tag = "<h4>"+name+"<img class='user_tick' src='tick.png'></h4>";
                        message_tag = "<h4 message_h4>"+Message+"</h4>";
                        button_tag = "<button class='btn btn-warning' id="+firebase_message_id+" value="+Likes+" onclick='updatelikes(this.id)'>";
                        span_tag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+Likes+"</span></button><hr>";

                        row = name_tag+message_tag+button_tag+span_tag;
                        document.getElementById("output").innerHTML += row;
                  }
            });
      });
}
getData();

function updatelikes(messageid){
      like = document.getElementById(messageid).value;
      updateLike =Number(like)+1;
      console.log(updateLike);
      firebase.database().ref(room_name).child(messageid).update({
            likes : updateLike
      });
}
