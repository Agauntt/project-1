// get user details commented out for local development
    // var user={
    //     displayName:'',
    //     emailId:'',
    //     photoUrl:'',
    //     uid:''
    // }
    // function getUserDetailsFromCookies(){
        
    //     signIn=Cookies.getJSON('userDetail')
    //     if(signIn==null){
    //         window.location.replace( "../project-1/index.html");
    //     }
    //     else{
    //     user.displayName=signIn.displayName;
    //     user.emailId=signIn.email;
    //     user.photoUrl=signIn.photoURL;
    //     user.uid = signIn.uid;
        
    //     $("#userProfileName").text(user.displayName);
    //     $("#userProfilePic").attr("src",user.photoUrl);
    //     }
    // return user;
    // }
    // getUserDetailsFromCookies();
// start particles.js
particlesJS.load('particles-js', 'assets/js/particles.json');
function initAll(){
    $("#adminHome").show();
    $("#addNewGroupUsers").hide();
    $("#loremSelectedUsers").hide();
    $("#addGroupActivity").hide();       
    $("#userGroupSelect").hide();
    $("#userActivitySelect").hide();
    $("#newGroupNameError").hide();
    $("#userLogin").hide();
    $("#userGroupSelect").show();
}
initAll();
var path = window.location.pathname;
var page = path.split("/").pop();
var signIn;
  var signInSuccess = "";
  var db = firebase.database();
$(document).ready(function(){
   
    //Check url 
    // if(isUserAuthenticated()){
    //     if (page=="index.html"){
    //      $("#userLogin").hide();
    //      $("#userGroupSelect").show();
        
    //     }
    //     $(".user-details").show();
    //     authNav(false);
         
    //  }
    //  else{
    //      console.log("in signup");
    //      if (page=="index.html"){
    //      $("#userLogin").show();
    //      $("#userGroupSelect").hide();
    //      $(".user-details").hide();
    //      }
    //      authNav(false);
    //  }
  
// add new group modal functions 
$("#submitNewGroupName").on("click", function(){
    // add new group validation
    var value = $("#newGroupName").val().trim();
    if(value == ""){
       $("#newGroupNameError").show();
    // else grab values and fire db function - hide/show necessary sections
    } else {
       var newGroupName = $("#newGroupName").val();
       var newGroupNameShortDesc = $("#newGroupNameShortDesc").val();
       var newGroupNameLongDesc = $("#newGroupNameLongDesc").val();
       saveGroupToDB(newGroupName, newGroupNameShortDesc, newGroupNameLongDesc);
       $("#addGroupModal").modal('hide');      
    }
   });
    function saveGroupToDB(name, shortDesc, longDesc) {
        var myRef = db.ref().push();
        var key = myRef.key;
        var data = { 
                group_id: key,                                 
                group_short_desc: shortDesc,                            
                group_long_desc : longDesc,
                // createdBy : user.displayName,
                created : firebase.database.ServerValue.TIMESTAMP                   
        };
        db.ref('groups').child(name).set(data)
            .then(function (snap) {
                console.log("Success!");
            }, function (err) {
                console.log(err + " error");
            });
    }
    // populate My Groups on admin page with groups created by user.uid    
    function populateMyGroups(admin){  
    
    db.ref('groups').orderByChild('createdBy').equalTo(admin).on("value", function(snap) {      
        $("#myGroups").empty();
        snap.forEach(function(data) {
           var newDiv = $("<div>");
           newDiv.addClass("admin-group");
           newDiv.attr("id", data.val().group_id);
           newDiv.html("<span>" + data.key + "</span>");
           $("#myGroups").append(newDiv);
        });
    });
    }
    populateMyGroups("-LYO_4FYLna5DK-Pmi_n");
    function clearFirebaseDataHTML() {
        $("#showGroupModalTitle").empty();
        $("#addGroupActivityTitle").empty();
        $("#showGroupCreatedBy").empty();
        $("#showGroupShortDesc").empty();
        $("#addGroupActivityShortDesc").empty();
        $("#showGroupLongDesc").empty();
        $("#adminActivitiesScheduled").empty();
        $("#addNewGroupActivity").attr("data-group-id", ""); 
        $("#showGroupResults").attr("data-group-id", ""); 
        $("adminShowResults").empty();
    }
    // show My Group info and Add Activity/See Results
    $(document).on("click", ".admin-group", function(){
        clearFirebaseDataHTML();
        var group_id = $(this).attr("id");
        db.ref('groups').orderByChild('group_id').equalTo(group_id).on("value", function(snap) {     
            snap.forEach(function(child) {
               var name = child.key;
                var cv = child.val();
                $("#showGroupModalTitle").text(name);
                $("#addGroupActivityTitle").text(name);                
                $("#showGroupCreatedBy").text(cv.createdBy);
                $("#showGroupCreatedOn").text(cv.created);
                $("#showGroupShortDesc").text(cv.group_short_desc);
                $("#addGroupActivityShortDesc").text(cv.group_short_desc);                
                $("#showGroupLongDesc").text(cv.group_long_desc); 
                if(child.hasChild('activities')) {
                    child.child('activities').forEach(function(children){
                    var activity_id = children.val().activity_id;                    
                    db.ref('activities').orderByChild('activity_id').equalTo(activity_id).on("child_added", function(snap) {
                        $("#adminActivitiesScheduled").append("<li>" + snap.key + "</li>");    
                    });                                                              
                    });
                } else {
                    $("#adminActivitiesScheduled").html("<li>You do not have any activities scheduled</li>");  
                }                
                $("#addNewGroupActivity").attr("data-group-id", cv.group_id);     
                $("#showGroupResults").attr("data-group-id", cv.group_id);                   
              });
        });
        db.ref('results').orderByChild('group_id').equalTo(group_id).once("value", function(snap) {  
            if(snap.val()) {
                var qtyPend = 0;
                var qtyIP = 0;
                var qtyComp = 0;
                var html = "";
                snap.forEach(function(snap) {
                    if(snap.val().status == "pending") {
                        qtyPend++; 
                    } else if(snap.val().status == "in progress") {
                        qtyIP++;
                    } else if(snap.val().status == "complete") {
                        qtyComp++;
                    }
                });
                if(qtyPend > 0) {
                    html += "<li>" + qtyPend + " Pending</li>";
                }
                if(qtyIP > 0) {
                    html += "<li>" + qtyIP + " In Progress</li>";
                }
                if(qtyComp > 0) {
                    html += "<li>" + qtyComp + " Complete</li>";
                }    
                $("#adminShowResults").html(html);
            } else {
                $("#adminShowResults").html("<li>You do not have an results to display</li>");
            }
           
        });
            $("#showGroupModal").modal('show');
    });
    // show Add New Group Activity section
    $("#addNewGroupActivity").on("click", function(){
        $("#adminHome").hide();
        $("#addGroupActivity").show();
        var dataGroupID = $(this).attr("data-group-id");
        db.ref('activities').on("value", function(snap) {      
            $("#addActivityRow").empty();
            snap.forEach(function(data) {  
                var dv =  data.val();
               var html = "<div class='card-body'>";
               html += "<div class='card border-dark mb-3' style='max-width: 18rem;'>";
               html += "<div class='card-header'>" + data.key + "</div>";
               html += "<div class='card-body'>";
               html += "<p class='card-text'>" + dv.activity_desc + "</p>";
               html += "<button data-group-id='" + dataGroupID + "' data-activity-id='" + dv.activity_id + "'";
               html += "data-activity-name='" + data.key + "' data-activity-desc='" + dv.activity_desc + "'";
               html += "id='addThisActivity' class='btn btn-success activity-btn'>Add to  Group</button>";
               html += "</div></div></div>";
               $("#addActivityRow").append(html);
 
            });
        });
    });
    // hide Add New Group Activity when 'Back to admin panel' is clicked
    $("#hideAddActivitySection").on("click", function(){
        $("#addGroupActivity").hide();
        $("#adminHome").show();       
    });
   
    // Show cofirm add activity modal on click
    $(document).on("click", ".activity-btn", function(){
        $('#confirmAddActivityModal').modal('show'); 
        var groupID = $(this).attr("data-group-id");
        var activityID = $(this).attr("data-activity-id");
        var activityName = $(this).attr("data-activity-name");
        var activityDesc = $(this).attr("data-activity-desc");
        $("#confirmAddActivityName").text(activityName);
        $("#confirmAddActivityDesc").text(activityDesc);
        $("#confirmAddActivityBtn").attr("data-group-id", groupID);
        $("#confirmAddActivityBtn").attr("data-activity-id", activityID);
    });

    // Add confirm add activity to Firebase
    $("#confirmAddActivityBtn").on("click", function(){
        var groupID = $(this).attr("data-group-id");
        var activityID = $(this).attr("data-activity-id");
        var query = db.ref('groups').orderByChild('group_id').equalTo(groupID);
        query.on("child_added", function(snapshot) {
        snapshot.ref.child('activities').push({activity_id: activityID });         
        });
        createResultsSet(groupID,activityID);
        $("#adminHome").show();
        $("#addGroupActivity").hide(); 
        $("#confirmAddActivityModal").modal("hide");
    });
    // function to obtain the newly created activity push key and insert it into the 'results' table for relational purposes
    function createResultsSet(groupID, activityID) {
        var query = db.ref('groups').orderByChild('group_id').equalTo(groupID);
        query.once("value", function(snapshot) {
            snapshot.forEach(function(groupSnapshot) {                
                groupSnapshot.child("activities").forEach(function(activitySnapshot) {  
                    if(activitySnapshot.val().activity_id == activityID) {                        
                        db.ref('results').push({
                           group_id : groupID,
                           activity_id : activityID,
                           activity_key : activitySnapshot.key,
                           users : "0",
                           status : "pending",
                           created : firebase.database.ServerValue.TIMESTAMP 
                        });
                    }
                });                         
            });
        });
    }
    // Logout functionality
       $(document).on("click","#logOutLink",function(){
        console.log("Logout");
        firebase.auth().signOut();
        Cookies.remove('userDetail');
        $("#userLogin").show();
        
        window.location.replace( "../project-1/index.html");
     
   });

   
});
// function isUserAuthenticated(){
//     signIn=Cookies.getJSON("userDetail");
//      if(signIn==null || typeof signIn === "undefined"){
//        return false;
//      }
//      else{
//          return true;
//      }
// }

//  var user={
//  displayName:'',
//   emailId:'',
//   photoUrl:'',
//   uid:''
// }
// function setUsersFromCookies(){
//    signIn=Cookies.getJSON('userDetail');
//   if(signIn===null || typeof signIn === "undefined"){
//     return false;
//   }
//   else{
//   user.displayName=signIn.displayName;
//   user.emailId=signIn.email;
//   user.photoUrl=signIn.photoURL;
//   user.uid = signIn.uid;
//   $("#userProfileName").text(user.displayName);
//   $("#userProfilePic").attr("src",user.photoUrl);
//  }

//  return true;
// }

//  function authNav(isFreshLogin){
//   var isCookie= setUsersFromCookies();
//    if (isCookie==false) 
//    {
//         if (page=="index.html"){
//           $("#userLogin").show();
//           $("#userGroupSelect").hide();
//           $(".user-details").hide();
//       }
//       else
//       {
//           window.location.replace( "../project-1/index.html");
//       }
//    }
//    else {
//      if (signIn.email === "chandnibpatel@gmail.com")
//      {
//       if (page=="index.html" && isFreshLogin)
//        window.location.replace( "../project-1/continueAs.html");
//      }
//      else{
//        $("#userLogin").hide();
//        $("#userGroupSelect").show();
//        $(".user-details").show();
//      }
//    }
//  }
//Add Users

// var addGroupUser=function(){
//     if (setUsersFromCookies())
//     {
//      var myRef = db.ref().push();
//      var key = myRef.key;
//     user.uid=key;
//     db.ref('groupUsers').child(user.displayName).set(user)
//          .then(function (snap) {
//              console.log("Success!");
//          }, function (err) {
//              console.log(err + " error");
//          });
    
//      }
//    }

 
