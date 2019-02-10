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
    // add new group validation
    var value = $("#newGroupName").val().trim();
    if(value == ""){
       $("#newGroupNameError").show();
    // else grab values and fire db function - hide/show necessary sections
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
        var myRef = db.ref().push();
        var key = myRef.key;
        var data = { 
                group_id: key,                                 
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
    function populateMyGroups(admin){  
    
    db.ref('groups').orderByChild('createdBy').equalTo(admin).on("value", function(snap) {      
        $("#myGroups").empty();
        snap.forEach(function(data) {
           var newDiv = $("<div>");
           newDiv.addClass("group");
           newDiv.attr("id", data.val().group_id);
           newDiv.html("<span>" + data.key + "</span>");
           $("#myGroups").append(newDiv);
        });
    });
    }
    populateMyGroups("Trent Davis");
});
