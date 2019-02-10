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
    $("#addActivity").hide();       
    $("#userGroupSelect").hide();
    $("#userActivitySelect").hide();
    $("#newGroupNameError").hide();
    $("#userLogin").hide();
    $("#userGroupSelect").show();
}
initAll();
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
    populateMyGroups("Trent Davis");
    // show My Group info and Add Activity/See Results
    $(document).on("click", ".admin-group", function(){
        $("#showGroupModalTitle").empty();
        $("#showGroupCreatedBy").empty()
        $("#showGroupShortDesc").empty()
        $("#showGroupLongDesc").empty() 
        $("#addNewGroupActivity").attr("data-group-id", ""); 
        $("#showGroupResults").attr("data-group-id", ""); 
        var group_id = $(this).attr("id");
        db.ref('groups').orderByChild('group_id').equalTo(group_id).on("value", function(snap) {     
            snap.forEach(function(child) {
               var name = child.key;
                var cv = child.val();
                $("#showGroupModalTitle").text(name);
                $("#showGroupCreatedBy").text(cv.createdBy);
                $("#showGroupCreatedOn").text(cv.created);
                $("#showGroupShortDesc").text(cv.group_short_desc);
                $("#showGroupLongDesc").text(cv.group_long_desc); 
                $("#addNewGroupActivity").attr("data-group-id", cv.group_id);     
                $("#showGroupResults").attr("data-group-id", cv.group_id);                   
              });
        });
            $("#showGroupModal").modal('show');
    });
    // Logout functionality
       $(document).on("click","#logOutLink",function(){
        console.log("Logout");
        Cookies.remove('userDetail');
        $("#userLogin").show();
        window.location.replace( "../project-1/index.html");
     
   });
});
