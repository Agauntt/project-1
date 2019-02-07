// Modal functionality
$(document).ready(function(){
    function initAdmin(){
        $("#adminHome").show();
        $("#addNewGroup").hide();
    }
    initAdmin();
    $("#submitNewGroupName").on("click", function(){
        $("#adminHome").hide();
        $("#addNewGroup").show();
    });
});