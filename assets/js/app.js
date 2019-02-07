//Array of question objects
var queArr = [q1,q2,q3,q4,q5];

//variable declarations
var noOfQueToDisp = 5;
var loadedQue = [];

var Truth1="";
var Truth2="";
var lie="";
var correctAnsCount=0;
var incorrectAnsCount=0;
var unansweredCount=0;

//Load random question from array 
function loadQuePage(){
    var tempArr =[];
    for(var i=0;i<queArr.length;i++){
        tempArr[i] = queArr[i];
    }
    var qNo;
    for(var i=0;i<noOfQueToDisp;i++){
       qNo  = Math.floor(Math.random()*tempArr.length);
       loadedQue[i] = tempArr[qNo];
       tempArr.splice(qNo,1);
    }
}
