

  function SignIn() {
    if (firebase.auth().currentUser) {

      firebase.auth().signOut();

    } else {
      var email = document.getElementById('email').value;
      var password = document.getElementById('password').value;
      if (email.length < 4) {
        alert('Please enter an email address.');
        return;
      }
      if (password.length < 4) {
        alert('Please enter a password.');
        return;
      }

      firebase.auth().signInWithEmailAndPassword(email, password).catch(function(error) {


        var errorCode = error.code;
        var errorMessage = error.message;

        if (errorCode === 'auth/invalid-email') {
          alert('invalid E-mail');
        }

        if (errorCode === 'auth/wrong-password') {
          alert('Wrong password.');
        } else {
          alert("E-mail or Password invalid");
          var email = "";
        }
        console.log(error);
        });

    }

  }




  function initApp() {

    firebase.auth().onAuthStateChanged(function(user) {

      if (user) {
        // User is signed in.
        var displayName = user.displayName;
        var email = user.email;
        var emailVerified = user.emailVerified;
        var photoURL = user.photoURL;
        var isAnonymous = user.isAnonymous;
        var uid = user.uid;
        var providerData = user.providerData;


        window.location.href="main.html";

        
      } else {

      }

    });

  }
  window.onload = function() {
    initApp();
  };
