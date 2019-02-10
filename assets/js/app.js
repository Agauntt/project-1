// start particles.js
particlesJS.load('particles-js', 'assets/js/particles.json');
  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyBJkrDhZtst2khWl8QVQUWKQWXgEyakkTc",
    authDomain: "tactapp-1.firebaseapp.com",
    databaseURL: "https://tactapp-1.firebaseio.com",
    projectId: "tactapp-1",
    storageBucket: "tactapp-1.appspot.com",
    messagingSenderId: "370051334641"
  };
  firebase.initializeApp(config);
$(document).ready(function(){
    var db = firebase.database();
// add new group modal functions 
$("#submitNewGroupName").on("click", function(){
    var value = $("#newGroupName").val().trim();
    if(value == ""){
       $("#newGroupNameError").show();
    } else {
       var newGroupName = $("#newGroupName").val();
       var newGroupNameDesc = $("#newGroupNameDesc").val();
       saveGroupToDB(newGroupName, newGroupNameDesc);
       $("#addGroupModal").modal('hide');
       $("#adminHome").hide();
       $("#addNewGroupUsers").show();       
    }
   });
    function saveGroupToDB(name, desc) {
        var data = {                                  
                group_long_desc : desc,
                createdBy : "Trent Davis",
                created : firebase.database.ServerValue.TIMESTAMP                  
                   
        };

        db.ref('groups').child(name).set(data)
            .then(function (snap) {
                console.log("Success!");
            }, function (err) {
                console.log(err + " error");
            });
    }    
});
