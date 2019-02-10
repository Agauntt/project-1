//Initialize Firebase
var db = firebase.database();
// add new group modal functions 
var group={
  id:'',
  name:'',
  desc:'',
  Createdby:'',
  createdOn:'',
  questions:[],
  groupUser:[],
  
}
var question={
  qId:'',
  qText:'',
 }

 //Group Users
 var groupUser={
   id:'',
  name:'',
  emaidId:'',
  photoURL:'',
  userQuestions:[],
  userPlayedHistories:[]
 }
var userQuestion={
  qText:'',
  qAnswer:''
}
 var userPlayedHistory={
   playerEmailId:'',
   Name:'',
   score:''
 }



var addGroup =function(name,desc){
  console.log(name);
  var myRef = db.ref().push();
  var key = myRef.key;
  var data = { 
          group_id: key,                                 
          group_long_desc : desc,
          createdBy : user.uid,
          createdOn : firebase.database.ServerValue.TIMESTAMP                  
             
  };
  db.ref('groups').child(name).set(data)
      .then(function (snap) {
          console.log("Success!");
      }, function (err) {
          console.log(err + " error");
      });

}








 