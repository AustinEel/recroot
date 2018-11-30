var database = firebase.database();
const settings = {timestampsInSnapshots: true};

function getFormattedDate(date) {
  var year = date.getFullYear();
  /// Add 1 because JavaScript months start at 0
  var month = (1 + date.getMonth()).toString();
  month = month.length > 1 ? month : '0' + month;
  var day = date.getDate().toString();
  day = day.length > 1 ? day : '0' + day;
  return month + '/' + day + '/' + year;
}

function writeUserData(msgsubject, msgbody) {
  var sentDate= new Date();
  var formattedDate = getFormattedDate(sentDate);
  console.log(formattedDate)
  database.ref('inbox/').push({
    subject: msgsubject,
    body: msgbody,
    date: formattedDate
  });
}

function registerNewUser() {
  var name = $("#name").val();
  var email = $("#email").val();
  var pwd1 = $("#pwd1").val();
  database.ref('users/').push({
    name: name,
    email: email,
    password: pwd1,
  });
}

function validateInput() {
  var name = $("#name").val();
  var email = $("#email").val();
  var pwd1 = $("#pwd1").val();
  var pwd2 = $("#pwd2").val();

  if (name == "") {
    $("#name_invalid").show();
    return false;
  }
  if (email == "" || !email.includes("@")) {
    $("#email_invalid").show();
    return false;
  }
  if (pwd1 == "" || pwd2 == "" || pwd1 != pwd2) {
    $("#pwd_invalid").show();
    return false;
  }
  return true;
}

$( document ).ready(function () {
  database.ref('inbox').once('value', snapshot => {
    snapshot.forEach(snap => {
        $('#inboxdiv').after("<tr><td>" + snap.val().subject + "</td><td>" + snap.val().body + "</td><td>" + snap.val().date + "</td>");
   });
  });

  $("#signupbtn").click(function() {
    $("#name_invalid").hide();
    $("#email_invalid").hide();
    $("#pwd_invalid").hide();
    registerNewUser();
    if (validateInput()) {
      window.location.href = "resume.html";
    }
  });

  $("#loginbtn").click(function() {
    console.log("log in");
    var name = $("#l_name").val();
    var pwd = $("#l_pwd").val();
    var match_found = false;

    database.ref('users/').once('value').then(function(snapshot) {
      snapshot.forEach(function(data) {
        console.log("name", name, "pwd", pwd);
        console.log(data.val().name, data.val().password);
        if (name == data.val().name && pwd == data.val().password) {
          match_found = true;
          window.location.href = "home.html";
        }
      });
      if (!match_found) {
        $("#login_invalid").show();
      }
    });
  });

  $("#profile").click(function() {
    console.log("profile click");
  })
});