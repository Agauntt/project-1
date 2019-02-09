// Initialize Firebase
var config = {
  apiKey: "AIzaSyDWuA0J2rffhNNunnrf8CrM9jwNku2t0jg",
  authDomain: "first-group-project-users.firebaseapp.com",
  databaseURL: "https://first-group-project-users.firebaseio.com",
  projectId: "first-group-project-users",
  storageBucket: "first-group-project-users.appspot.com",
  messagingSenderId: "709505113322"
  };
  firebase.initializeApp(config);


  var signIn ="";
  var signInSuccess = "";
//Provider defult Google
  var provider = new firebase.auth.GoogleAuthProvider();
 


 $(document).on("click","#googleLogin",function(){
    signIn=JSON.parse(localStorage.getItem('userDetail'));
    if (signIn==null)
    {
     provider = new firebase.auth.GoogleAuthProvider();
    
      provider.addScope('https://www.googleapis.com/auth/plus.login');
    webAuth();
    }
    else
    redirectToLoginSuccessPage();
  
 })

 $(document).on("click","#facebookLogin",function(){

    signIn=JSON.parse(localStorage.getItem('userDetail'));
    if (signIn==null)
    {
        provider = new firebase.auth.FacebookAuthProvider();
      
    webAuth();
    }
    else
    redirectToLoginSuccessPage();
  
 });

function webAuth() {
    if (!firebase.auth().currentUser) {
      // [START createprovider]
      
      // [END addscopes]
      // [START signin]
      firebase.auth().signInWithPopup(provider).then(function(result) {
        // This gives you a Google Access Token. You can use it to access the Google API.
        var token = result.credential.accessToken;
        // The signed-in user info.
        var user = result.user;
        // The signed-in user info.
        localStorage.setItem('userDetail', JSON.stringify(user))
        // [START_EXCLUDE]
        console.log("user :", user);
        signInSuccess = "true";
        redirectToLoginSuccessPage();
        // [END_EXCLUDE]
      }).catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
        // The email of the user's account used.
        var email = error.email;
        // The firebase.auth.AuthCredential type that was used.
        var credential = error.credential; 
        signInSuccess = "false";
        // [START_EXCLUDE]
        if (errorCode === 'auth/account-exists-with-different-credential') {
          alert("You have already signed up with a different auth provider for that email.");
          // If you are using multiple auth providers on your app you should handle linking
          // the user's accounts here.
        }
    else if (errorCode === 'auth/auth-domain-config-required') {
      alert("An auth domain configuration is required"); 
        }
        else if (errorCode === 'auth/cancelled-popup-request') {
            alert("Popup Google sign in was canceled");
        }
        else if (errorCode === 'auth/operation-not-allowed') {
            alert("Operation is not allowed");
        }
        else if (errorCode === 'auth/operation-not-supported-in-this-environment') {
            alert("Operation is not supported in this environment");
        }
        else if (errorCode === 'auth/popup-blocked') {
            alert("Sign in popup got blocked");
        }
        else if (errorCode === 'auth/popup-closed-by-user') {
            alert("Google sign in popup got cancelled");
        }
        else if (errorCode === 'auth/unauthorized-domain') {
            alert("Unauthorized domain");
        }
         else {
          console.error(error);
        }
        // [END_EXCLUDE]
      });
      // [END signin]
    } else {
      // [START signout]
      firebase.auth().signOut();
      // [END signout]
    }
  
  }


  firebase.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
  function redirectToLoginSuccessPage(){
    if (signInSuccess == "true") {
        window.location.replace( "../project-1/continueAs.html");
       }
  }