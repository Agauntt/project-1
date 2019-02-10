// start particles.js
particlesJS.load('particles-js', 'assets/js/particles.json');
 
$(document).ready(function(){
   
$("#submitNewGroupName").on("click", function(){
    // add new group validation
console.log("Add Grp");
    var value = $("#newGroupName").val().trim();
    if(value == ""){
       $("#newGroupNameError").show();
    // else grab values and fire db function - hide/show necessary sections
    } else {
       var newGroupName = $("#newGroupName").val();
       var newGroupNameDesc = $("#newGroupNameDesc").val();
       addGroup(newGroupName, newGroupNameDesc);
       $("#addGroupModal").modal('hide');
       $("#adminHome").hide();
       $("#addNewGroupUsers").show();       
    }
   });
    
  // populateMyGroups("Trent Davis");
});
