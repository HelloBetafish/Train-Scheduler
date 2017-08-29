// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCD3lucnWA4ixjVTGW__27r8L2VHIwGWEA",
    authDomain: "train-scheduler-28563.firebaseapp.com",
    databaseURL: "https://train-scheduler-28563.firebaseio.com",
    projectId: "train-scheduler-28563",
    storageBucket: "",
    messagingSenderId: "509739508633"
  };
  firebase.initializeApp(config);

 // Initialize variables
var database=firebase.database();
var tName="";
var destination="";
var firstTrainTime="";
var frequency="";

 //Grab user input
$("input[type='submit']").on("click", function(event){
  event.preventDefault();
  tName=$("#input-name").val().trim();
  destination=$("#input-destination").val().trim();
  firstTrainTime=moment($("#input-1stTrainTime").val().trim(), "HH:mm").format("X");
  frequency=$("#input-Frequency").val().trim();

  var newTrain = {
    tName: tName,
    destination: destination,
    firstTrainTime: firstTrainTime,
    frequency: frequency
  }

  database.ref().push(newTrain);

  //Clear all the text-boxes
  $("#input-name").val("");
  $("#input-destination").val("");
  $("#input-1stTrainTime").val("");
  $("#input-Frequency").val("");
});

database.ref().on("child_added", function(childSnapShot) {
  var tName = childSnapShot.val().tName;
  var destination = childSnapShot.val().destination;
  var frequency = childSnapShot.val().frequency;
  var firstTrainTime = childSnapShot.val().firstTrainTime;

  var timeDifference = moment().diff(moment.unix(firstTrainTime), "m");
  var remainder = timeDifference % frequency;
  var minAway = frequency - remainder;
  var nextArrival = moment().add(minAway, "m").format("HH:mm");
  // Grab Child key
  var childKey = childSnapShot.key;
  var deleteBtn = $("<button class='delete'>").text("Delete").attr("data-index", childKey);

  $("#schedule > tbody").prepend(deleteBtn);
  $("#schedule > tbody").prepend("<tr id='" + childKey + "'><td>" + tName +
  	"</td><td>" + destination + "</td><td>" + frequency +
  	"</td><td>" + nextArrival + "</td><td>" + minAway +
  	"</td></tr>");
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});

//Function to remove buttons from array when delete button clicked
$(document.body).on("click", "button.delete", function(){
  var currentKey = $(this).attr("data-index");
  database.ref().child(currentKey).remove()
  .then(function() {
    console.log("Remove succeeded.")
  })
  .catch(function(error) {
    console.log("Remove failed: " + error.message)
  });
  $(this).prev("tr").remove();
  $(this).remove();
});