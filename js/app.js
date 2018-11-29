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

$(document).ready(function () {
  database.ref('inbox').once('value', snapshot => {
    snapshot.forEach(snap => {
        $('#inboxdiv').after("<tr><td>" + snap.val().subject + "</td><td>" + snap.val().body + "</td><td>" + snap.val().date + "</td>");
   });
  });
});