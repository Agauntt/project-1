function initAdmin(){
    $(".group").hide();
    $("#adminHome").show();
    $("#addNewGroupUsers").hide();
    $("#loremSelectedUsers").hide();
    $("#addActivity").hide();       
    $("#userGroupSelect").hide();
    $("#userActivitySelect").hide();
    
}
initAdmin();
// Modal functionality
$(document).ready(function(){
    // testing only
    function showAddUsers() {
        $("#adminHome").show();
        $("#addNewGroupUsers").show();       
        $("#loremSelectedUsers").hide();
       
        
    }
   
    $("#submitNewGroupName").on("click", function(){
        $("#adminHome").hide();
        $("#addNewGroupUsers").show();
    });
    // test onclick function
    $("#selectAdd").on("click", function(){
        $("#loremAvailUsers").hide();
        $("#loremSelectedUsers").show();
    });
    // test onclick function
    $("#selectRemove").on("click", function(){
        $("#loremSelectedUsers").hide();
        $("#loremAvailUsers").show();
    });
    // test show groups function
    $("#addUsersSubmit").on("click", function(){
        $(".group").show();
        $("#addNewGroupUsers").hide();
        $("#adminHome").show();
    });
    // test show group modal
    $("#group1").on("click", function(){
        $('#showGroupModal').modal('show');  
    });
    // test add activity modal
    $("#addNewActivity").on("click", function(){
        $("#adminHome").hide();
        $("#addNewGroupUsers").hide();
        $("#addActivity").show();
    });
    // test add single activity
    $("#addThisActivity").on("click", function(){
        $('#confirmAddActivityModal').modal('show');  
    });
    //test close confirm activity modal
    $("#confirmAddActivity").on("click", function(){
        $("#adminHome").show();
        $("#addNewGroupUsers").hide();
        $("#addActivity").hide();    
    });
    // test user submit login
    $("#submitUserLogin").on("click", function(e){
        $("#homePage").hide();
        $("#userGroupSelect").show();
    });
    $("#userGroup1").on("click", function(e){
        $("#userGroupSelect").hide();
        $("#userActivitySelect").show();
    });
    
});
