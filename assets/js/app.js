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

    // Logout functionality
       $(document).on("click","#logOutLink",function(){
        console.log("Logout");
        Cookies.remove('userDetail');
        $("#userLogin").show();
        window.location.replace( "../project-1/index.html");
     
   });
});
