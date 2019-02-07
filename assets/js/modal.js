// Modal functionality
$(document).ready(function(){
    // testing only
    function showAddUsers() {
        $("#adminHome").hide();
        $("#addNewGroup").show();
        $("#loremSelectedUsers").hide();
    }
    function initAdmin(){
        $("#adminHome").show();
        $("#addNewGroup").hide();
    }
    showAddUsers();
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
});