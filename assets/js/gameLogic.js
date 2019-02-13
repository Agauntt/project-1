//================================ SELECT SCREEN LOGIC ============================================
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

populateDropdown();

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

function lieDetector() {
    if ($("#radio1").is(":checked")) {
        lie = selection1;
    }else if ($("#radio2").is(":checked")) {
        lie = selection2;
    }else if ($("#radio3").is(":checked")) {
        lie = selection3;
    }
};

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

compileResults();

$("#input-submit").click(function(){ 

    compileResults();
    if (lie == ""){
        alert("Please indicated which statement is a lie");
        return;
    }
    $("#input-submit").hide();
    $("#hide-play-button").show();
    console.log(userDataSet);
    // console.log(selection1);
    // console.log(selection2);
    // console.log(selection3);
    // console.log(lie);
});

//============================ ACTUAL GAME LOGIC ==============================================
var firstRandom;
var secondRandom;
var thirdRandom;
var card = $(".play-area");

function loadGame() {
firstRandom = userDataSet.first;
secondRandom = userDataSet.second;
thirdRandom = userDataSet.third;
$("#random1").text(firstRandom);
$("#random2").text(secondRandom);
$("#random3").text(thirdRandom);
console.log(firstRandom);
console.log(secondRandom);
console.log(thirdRandom);
console.log(lie);

$(".begin-game").hide();

    card.append("<labe><input type='radio' name='game-select' value='" + firstRandom + "'>" + firstRandom + "</label><br>");
    card.append("<labe><input type='radio' name='game-select' value='" + secondRandom + "'>" + secondRandom + "</label><br>");
    card.append("<labe><input type='radio' name='game-select' value='" + thirdRandom + "'>" + thirdRandom + "</label><br><br>");
    card.append("<button type='submit' class='btn btn-primary' id='end-game'>Make Selection</button>");
};

$(".begin-game").click(function(){
    loadGame();

});