//================================ SELECT SCREEN LOGIC ============================================
var selection1 = "";
var selection2 = "";
var selection3 = "";
var lie = "";
var userDataSet;

var optionsarr1 = [
    "I am a vegetarian",
    "I like to go camping",
    "I prefer movies over TV",
    "I like to play video games",
    "I enjoy running"
];

var optionsarr2 = [
    "I have been skydiving",
    "I like to go hunting",
    "I like to go to bars",
    "I have never had an alcoholic drink",
    "I enjoy hiking"
];

var optionsarr3 = [
    "I like to golf",
    "I have a fear of water",
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
       $("#selectionError").modal("show");
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
var answer;
firstRandom = userDataSet.first;
secondRandom = userDataSet.second;
thirdRandom = userDataSet.third;

function loadGame() {
$("#random1").text(firstRandom);
$("#random2").text(secondRandom);
$("#random3").text(thirdRandom);
// console.log(firstRandom);
// console.log(secondRandom);
// console.log(thirdRandom);
// console.log(lie);

$(".begin-game").hide();

    card.append("<labe><input type='radio' id='game-radio' name='game-select' value='" + firstRandom + "'>" + firstRandom + "</label><br>");
    card.append("<labe><input type='radio' name='game-select' value='" + secondRandom + "'>" + secondRandom + "</label><br>");
    card.append("<labe><input type='radio' name='game-select' value='" + thirdRandom + "'>" + thirdRandom + "</label><br><br>");
    card.append("<button class='btn twoTruthsBtn end-game'>Submit</button>");
    $(".end-game").click(function(){
        successChecker();
    });
};

function successChecker(){
    answer = $("input[name = game-select]:checked").val();
    lie = firstRandom;
    if (lie == ""){
        $("#selectionError").modal("show");
             return;
    } else if (answer == lie){
        $("#victory-modal").modal("show");
    } else {
        $("#lose-modal").modal("show");
    }
    console.log(answer);
};

$(".begin-game").click(function(){
    loadGame();
    console.log(lie);
});

