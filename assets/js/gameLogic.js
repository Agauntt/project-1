//================================ SELECT SCREEN LOGIC ============================================
//Personal Trues and Lie screen variables
var selection1 = "";
var selection2 = "";
var selection3 = "";
var lie = "";
var userDataSet;

var optionsarr1 = [
    "I am a vegetarian",
    "I am a vegan",
    "I have never been outside the US",
    "I like to go camping",
    "I enjoy anime",
    "I prefer movies over TV",
    "I like to play video games",
    "My favorite color is blue",
    "I like to build computers",
    "I enjoy running"
];

var optionsarr2 = [
    "I have been skydiving",
    "I live on my own",
    "I know how to drive a manual transmission",
    "I enjoy lifting weights",
    "I was born outside the US",
    "I like to go hunting",
    "I play World of Warcraft",
    "I like to go to bars",
    "I have never had an alcoholic drink",
    "I enjoy hiking"
];

var optionsarr3 = [
    "I enjoy Javascript more than HTML",
    "I am more interested in front-end design than backend",
    "I prefer writing notes over typing them",
    "I can do my own vehicle maintanence",
    "I have a fear of water",
    "I wear glasses/contacts",
    "I prefer Marvel over DC",
    "I dislike horror movies",
    "I know how to ride a motorcycle"
];

// Play Game Variables
var firstRandom;
var secondRandom;
var thirdRandom;
var lie;
var card = $(".play-area");
var divId='';
var selectedUser = "";
var options = [];
var userExist = false;


//Function to populate dropdown for user personal trues and lie
function populateDropdown(){
    for (i = 0; i < optionsarr1.length; i++) {
        a = $("<option value='" + optionsarr1[i] + "'>" + optionsarr1[i] + "</option>");
        $("#option1").append(a);
     }
    for (i = 0; i < optionsarr1.length; i++) {
        b = $("<option value='" + optionsarr2[i] + "'>" + optionsarr2[i] + "</option>");
        $("#option2").append(b);
    }
    for (i = 0; i < optionsarr1.length; i++) {
        c = $("<option value='" + optionsarr3[i] + "'>" + optionsarr3[i] + "</option>");
        $("#option3").append(c);
    }
};

//Lie detector
function lieDetector() {
    if ($("#radio1").is(":checked")) {
        lie = selection1;
    }else if ($("#radio2").is(":checked")) {
        lie = selection2;
    }else if ($("#radio3").is(":checked")) {
        lie = selection3;
    }
};

//Checking the Results
function compileResults() {
    if (selection1 == ""){
        selection1 = optionsarr1[0];
    }

    if (selection2 == ""){
        selection2 = optionsarr2[0];
    }

    if (selection3 == ""){
        selection3 = optionsarr3[0];
    }
    lieDetector();
    userDataSet = {
        first: selection1,
        second: selection2,
        third: selection3,
        lie: lie
    };

};

// Function will execute if the user is joining any group for the first time
function firstTimeUser(){
    $("#playAgainBtn").hide();
    $(".resultDiv").hide();

    populateDropdown();
    setUsersFromCookies();
    console.log("in Game logic");

    $("#option1").change(function(){
        selection1 = this.value;
        // console.log(this.value);
    })
    
    $("#option2").change(function(){
        selection2 = this.value;
        // console.log(this.value);
    })
    
    $("#option3").change(function(){
        selection3 = this.value;
        // console.log(this.value);
    })

    compileResults();
}


// This function will load the game for selected user
function loadGame() {

    $("#playAgainBtn").hide();
    $(".resultDiv").hide();
    selectedUser=  localStorage.getItem("selectedUser");
    console.log(selectedUser)
    db.ref('groupUsers/'+selectedUser+'/True-and-Lie').on("value", function (snap) {
          
        console.log("database reference call:")
        var i =0;
        snap.forEach(function (child) {      
            options[i] = child.val();  
            i++;  
        });    
            firstRandom = options[0];
            secondRandom = options[2];
            thirdRandom = options[3];;
            lie = options[1];
               
       
           $(".begin-game").hide();

           card.append("<labe><input type='radio' name='game-select' id ='radio1' value=" + firstRandom + ">" + firstRandom + "</label><br>");
           card.append("<labe><input type='radio' name='game-select' id ='radio2' value=" + secondRandom + ">" + secondRandom + "</label><br>");
           card.append("<labe><input type='radio' name='game-select' id ='radio3' value=" + thirdRandom + ">" + thirdRandom + "</label><br><br>");
           card.append("<button type='submit' class='btn btn-primary' id='end-game'>Make Selection</button>");
        })
};

// Populate All users
var getUsers=function(){
    setUsersFromCookies();
    db.ref('groupUsers').on("value", function(snap) { 

     var i=0;
     $("#usersList").empty();    
     snap.forEach(function(child) {
        var name = child.key;
        var cv = child.val();

        divId = name;
       
        if (divId != user.userKey)
        {       
            var userObj=$("<div>")
            userObj.addClass("userDiv col-3")
            userObj.css({'display': 'inline-block'})

            //user Iamge
            var selectuserImg = $("<img>");
            selectuserImg.addClass("userPic");
            selectuserImg.attr("src",cv.photoUrl);
            selectuserImg.attr("id",divId);
            selectuserImg.attr("data-image-id",name);
            selectuserImg.css({ 'height': '100px', 'width': '100px' });

            //Header part of the user object
            var userHeader =$("<div>");
            userHeader.addClass("content top");

            //user Name
            var userName=$("<h6>");
            userName.text(cv.displayName);
            userHeader.append(userName);
                
            //Adde to DIV
            userObj.append(userHeader);
            userObj.append(selectuserImg);
            
            //Add to Main Div
            $("#usersList").append(userObj);
        }
            
        i++;
     });
  
    }); 
 
  }
  //check if the user exist for verifying first time user
  function hasUserSetTrueLies(){
    setUsersFromCookies();
   var UserSetTrueLies =false;
   console.log("userkey",user.userKey);
     var query = db.ref('groupUsers/'+ user.userKey +'/True-and-Lie');
     console.log("query", query)

     query.once('value',function(snapshot) {
        snapshot.forEach(function (child) { 
          //+'/True-and-Lie'     
            UserSetTrueLies=true;
            console.log("HasUserSetTrueLies  IN")
            $("#input-submit").hide();
            getUsers();
            $("#truthOrLieSubmitBox").hide();
            $("#gameIns").hide();
            $(".truth-lie-instructions").show();
            $("#gameHeading").text("Select any users to Play !!");
            $("#playAgainBtn").hide();
            $(".resultDiv").hide();
          
           
        });});   
        console.log('out'); 
    return UserSetTrueLies;
}
//*********************
//Main Processing Area
//*********************
  
   // var userExist= isUserExist();
    //console.log("userExist1", userExist);
    //if user exist navigate to the select users to play screen
    function startSubmitScreen(){
        var hasUserset= Cookies.get('userStatus');
        console.log("user status1:",hasUserset);
        if (hasUserset=='trueAndLiesSelected')
        {
            console.log("HasUserSetTrueLies  IN")
            $("#input-submit").hide();
            getUsers();
            $("#truthOrLieSubmitBox").hide();
            $(".truth-lie-instructions").show();
            $("#gameIns").hide();
            $("#gameHeading").text("Select any users to Play !!");
            $("#playAgainBtn").hide();
            $(".resultDiv").hide();
         

        }
        else{
            firstTimeUser();
        }
    }
    
 
   
    //eventlistener for input submit button for personal trues and lie screen
    $("#input-submit").click(function(){ 
        compileResults();
        if (lie == ""){
            alert("Please indicated which statement is a lie");
            return;
        }
        $("#input-submit").hide();
        getUsers();
        $("#truthOrLieSubmitBox").hide();
        $(".truth-lie-instructions").show();
        $("#gameIns").hide();
        $("#gameHeading").text("Select any users to Play !!");
        $("#playAgainBtn").hide();
        $(".resultDiv").hide();
     
              
         
            db.ref('groupUsers').child(user.userKey).child('True-and-Lie' ).set(userDataSet)
         .then(function (snap) {
             console.log("Success!");
             Cookies.set("userStatus","trueAndLiesSelected");
         }, function (err) {
             console.log(err + " error");
         });
    
        
        
        
   
    });

 
    // on click event to select user to play will redirect to twoTruthsGame
    $(document).on("click",".userPic",function(e){
    
        console.log("image click");
        selectedUser = $(this).attr("data-image-id");
        console.log(selectedUser);
        localStorage.setItem("selectedUser", selectedUser);

        window.location.replace( "../project-1/twoTruthsGame.html");
        loadGame();
        

    });

    //eventlistener for make selection button for game play
    $(document).on("click","#end-game",function(){
        var userAns = '';
        console.log("end game");
        console.log(firstRandom);
        console.log(secondRandom);
        console.log(thirdRandom);
        console.log(lie);
        if ($("#radio1").is(":checked")) {
            userAns = firstRandom;
        }else if ($("#radio2").is(":checked")) {
            userAns = secondRandom;
        }else if ($("#radio3").is(":checked")) {
            userAns = thirdRandom;
        }
        $("#end-game").hide();
        
        $("#truthOrLieGameBox").hide();
        $(".truth-lie-instructions").hide();
        $("#gameIns").hide();
        $("#gameResults").text("Results");
        $(".resultDiv").show();
        $("#playAgainBtn").show();
        if (userAns === lie)
        {
            console.log("Correct !!")
            $("#true-lie-Result").text("You are Correct !!");
            
        }
         else
        {
            console.log("InCorrect !!")
            $("#true-lie-Result").text("Sorry !! Your answer is Incorrect!!");
        }
    });

    //Play Again button click to restart the game
    $("#playAgainBtn").on("click", function(){
        window.location.replace( "../project-1/submitScreen.html");
        $("#input-submit").hide();
        getUsers();
        $("#truthOrLieSubmitBox").hide();
        $(".truth-lie-instructions").show();
        $("#gameIns").hide();
        $("#gameHeading").text("Select any users to Play !!");
        $("#playAgainBtn").hide();
        $(".resultDiv").hide();
       
    });
