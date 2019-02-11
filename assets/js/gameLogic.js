var selection1;
var selection2 = "";
var selection3 = "";
var lie = "";

$("#option1").change(function(){
    selection1 = this.value;
    console.log(this.value);
})

$("#option2").change(function(){
    selection2 = this.value;
})

$("#option3").change(function(){
    selection3 = this.value;
})

$("#input-submit").click(function(){
    console.log(selection1);
    console.log(selection2);
    console.log(selection3);
})