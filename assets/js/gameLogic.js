var selection1 = "1-1";
var selection2 = "2-1";
var selection3 = "3-1";
var lie;

$("#option1").click(function(){
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

$("#input-submit").click(function(){
    console.log(selection1);
    console.log(selection2);
    console.log(selection3);
})