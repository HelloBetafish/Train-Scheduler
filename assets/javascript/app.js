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
var nextArrival="";
var minAway="";

 //Grab user input
$("input[type='submit']").on("click", function(event){
  event.preventDefault();
  tName=$("#input-name").val().trim();
  destination=$("#input-destination").val().trim();
  firstTrainTime=$("#input-1stTrainTime").val().trim();
  frequency=$("#input-Frequency").val().trim();

  database.ref().push({
  tName: tName,
  destination: destination,
  firstTrainTime: firstTrainTime,
  frequency: frequency
  });
});

database.ref().on("child_added", function(childSnapShot) {
  $("#tName").html(childSnapShot.val().tName);
  $("#destination").html(childSnapShot.val().destination);
  $("#frequency").html(childSnapShot.val().frequency);
  $("#nextArrival").html(childSnapShot.val().firstTrainTime);
  }, function(errorObject) {
    console.log("The read failed: " + errorObject.code);
});