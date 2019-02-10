var user={
    displayName:'',
    emailId:'',
    photoUrl:'',
    uid:''
  }
function getUserDetailsFromCookies(){
    
    signIn=Cookies.getJSON('userDetail')
    if(signIn==null){
        window.location.replace( "../project-1/index.html");
    }
    else{
    user.displayName=signIn.displayName;
    user.emailId=signIn.email;
    user.photoUrl=signIn.photoURL;
    user.uid = signIn.uid;
    
    $("#userProfileName").text(user.displayName);
    $("#userProfilePic").attr("src",user.photoUrl);
    }
   return user;
  }