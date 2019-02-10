var user={
  displayName:'',
  emailId:'',
  photoUrl:'',
  uid:''
}
function setUsersFromCookies(){
  
  signIn=Cookies.getJSON('userDetail')
  if(signIn==null){
      return false;
  }
  else{
  user.displayName=signIn.displayName;
  user.emailId=signIn.email;
  user.photoUrl=signIn.photoURL;
  user.uid = signIn.uid;
  
  $("#userProfileName").text(user.displayName);
  $("#userProfilePic").attr("src",user.photoUrl);
  }
 return true;
}