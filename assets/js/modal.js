// Modal functionality
$(document).ready(function(){
    // testing only
    function showAddUsers() {
        $("#adminHome").hide();
        $("#addNewGroup").show();       
        $("#loremSelectedUsers").hide();
        $(".group").hide();
        
    }
    function initAdmin(){
        $("#adminHome").show();
        $("#addNewGroup").hide();
        $("#loremSelectedUsers").hide();
        $(".group").hide();
    }
    initAdmin();
    $("#submitNewGroupName").on("click", function(){
        $("#adminHome").hide();
        $("#addNewGroup").show();
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
        $("#addNewGroup").hide();
        $("#adminHome").show();
    });
    // test show group modal
    $("#group1").on("click", function(){
        $('#showGroupModal').modal('show');  
    });
      
});