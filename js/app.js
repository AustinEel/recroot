var database = firebase.database();
var cloud = firebase.storage().ref();
const settings = {timestampsInSnapshots: true};

// function getFormattedDate(date) {
//   var year = date.getFullYear();
//   /// Add 1 because JavaScript months start at 0
//   var month = (1 + date.getMonth()).toString();
//   month = month.length > 1 ? month : '0' + month;
//   var day = date.getDate().toString();
//   day = day.length > 1 ? day : '0' + day;
//   return month + '/' + day + '/' + year;
// }

// function writeMessageData(msgsubject, msgbody) {
//   var sentDate= new Date();
//   var formattedDate = getFormattedDate(sentDate);
//   console.log(formattedDate)
//   database.ref('inbox/').push({
//     subject: msgsubject,
//     body: msgbody,
//     date: formattedDate
//   });
// }

// function writeApplicationData(appcompany, approle, appstatus) {
//     var sentDate= new Date();
//     var formattedDate = getFormattedDate(sentDate);
//     console.log(formattedDate)
//     database.ref('applications/').push({
//       company: appcompany,
//       role: approle,
//       date: formattedDate,
//       status: appstatus
//     });
//   }

//   function writeDecisionData(appcompany, approle, appstatus) {
//     var sentDate= new Date();
//     var formattedDate = getFormattedDate(sentDate);
//     console.log(formattedDate)
//     database.ref('decisions/').push({
//       company: appcompany,
//       role: approle,
//       date: formattedDate,
//       status: appstatus
//     });
//   }

function uploadResume() {
  console.log("resume");
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

function readURL(input) {
  if (input.files && input.files[0]) {
      var reader = new FileReader();

      reader.onload = function (e) {
          $('#blah')
              .attr('src', e.target.result)
              .width(150)
              .height(200);
      };

      reader.readAsDataURL(input.files[0]);
  }
}

function viewProfileModal() {
  var modal = document.getElementById("profile_modal");
  modal.style.display = "block";

  var close = document.getElementsByClassName("close")[0];
  close.onclick = function() {
    modal.style.display = "none";
  }
} 

$( document ).ready(function () {
//POPULATE INBOX VIEW
  database.ref('inbox').once('value', snapshot => {
    snapshot.forEach(snap => {
        $('#inboxdiv').after("<tr class='clickable-row' data-target='modal1'><td>" + snap.val().subject + "</td><td>" + snap.val().body + "</td><td>" + snap.val().date + "</td><td><button class='edit_data btn orange modal-trigger' data-toggle='modal' data-target='modal1'>Open</button></td></tr>");
   });
  });
  // POPULATE APPLICATION VIEW
  database.ref('applications').once('value', snapshot => {
    snapshot.forEach(snap => {
        $('#applicationsdiv').after("<tr><td>" + snap.val().company + "</td><td>" + snap.val().role + "</td><td>" + snap.val().date + "</td><td class='" + snap.val().status + "'>" + snap.val().status + "</td></tr>");
   });
  });

  database.ref('decisions').once('value', snapshot => {
    snapshot.forEach(snap => {
        $('#decisionsdiv').after("<tr><td>" + snap.val().company + "</td><td>" + snap.val().role + "</td><td>" + snap.val().date + "</td><td class='" + snap.val().status + "'>" + snap.val().status + "</td><td><button class='edit_data btn orange modal-trigger' data-toggle='modal' data-target='modal2'>Open</button></td></tr>");
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