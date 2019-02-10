// start particles.js
particlesJS.load('particles-js', 'assets/js/particles.json');
//  // Initialize Firebase
//  var config = {
//     apiKey: "AIzaSyDWuA0J2rffhNNunnrf8CrM9jwNku2t0jg",
//     authDomain: "first-group-project-users.firebaseapp.com",
//     databaseURL: "https://first-group-project-users.firebaseio.com",
//     projectId: "first-group-project-users",
//     storageBucket: "first-group-project-users.appspot.com",
//     messagingSenderId: "709505113322"
//   };
//   firebase.initializeApp(config);
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
