
 // JS LOCAL FILE

var config = {
  apiKey: "AIzaSyBLKNbQv8QTCy9lGSNNQYEdpXcQ4AkbWNI",
  authDomain: "trains-7b9d7.firebaseapp.com",
  databaseURL: "https://trains-7b9d7.firebaseio.com",
  projectId: "trains-7b9d7",
  storageBucket: "trains-7b9d7.appspot.com",
  messagingSenderId: "460164022917",
  appId: "1:460164022917:web:6491688363c64ac47b9fec"
};

firebase.initializeApp(config);

var database = firebase.database();

$("#submit-add-train").on("click", function(event) {
  event.preventDefault();
  console.log("submit button click");
  // Grabs user input
  var trainName = $("#train-name-input").val().trim();
  var trainDest = $("#train-destination-input").val().trim();
  var trainStartTime = $("#train-start-time-input").val().trim()
  var trainFrequency = $("#train-frequency-input").val().trim();
  
  var newTrain = {
    tName: trainName,
    tDest: trainDest,
    tStart: trainStartTime,
    tFreq: trainFrequency
  };

  // Uploads data to the database
  //database.ref().child("train").push(newTrain);
  database.ref().push(newTrain);
    console.log(newTrain.tName);
  console.log(newTrain.tDest);
  console.log(newTrain.tStart);
  console.log(newTrain.tFreq);

  // Clears all of the text-boxes
  
  $("#train-name-input").val("");
  $("#train-destination-input").val("");
  $("#train-start-time-input").val("");
  $("#train-frequency-input").val("");
 console.log("end of push") 
});

// Adding to DB and updating HTML
database.ref().on("child_added", function(childSnapshot) {
  console.log("database ref child Added");

  // Store everything into a variable.
  var addTrainName = childSnapshot.val().tName;
  var addDest = childSnapshot.val().tDest;
  var addStart = childSnapshot.val().tStart;
  var addFreq = childSnapshot.val().tFreq;
  console.log(childSnapshot.val().tName);
 
   var startTime =  moment(addStart, "hh:mm");
   console.log(startTime);
   var diffTime = moment().diff(moment(startTime), "minutes");
   console.log(diffTime);
   var timeDiff = diffTime % addFreq;
   console.log(timeDiff);
   var timeRemainder = addFreq - timeDiff;
   console.log(timeRemainder)
   var nextArrival = moment().add(timeRemainder, "minutes").format("hh:mm A"); 
   console.log(nextArrival);

  var newRow = $("<tr>").append(
    $("<th>").text(addTrainName),
    $("<th>").text(addDest),
    $("<th>").text(addFreq),
    $("<th>").text(nextArrival),
    $("<th>").text(timeRemainder),
   );

  // Append the new row to the table
  $("#train-table > tbody").append(newRow);
});
function updateTrainData() {
  console.log("updataTrainData");
  database.ref().child("train").on("value", function(snapshot) {
    $("#train-table > tbody").empty();
    console.log("updataTrainData 1");
  snapshot.forEach(function(childSnapshot) {
    console.log("Inside forEach snapshot");
  var addTrainName = childSnapshot.val().tName;
  var addDest = childSnapshot.val().tDest;
  var addStart = childSnapshot.val().tStart;
  var addFreq = childSnapshot.val().tFreq;

 
   var startTime =  moment(addStart, "hh:mm");
   var diffTime = moment().diff(moment(startTime), "minutes");
   var timeDiff = diffTime % addFreq;
   var timeRemainder = addFreq - timeDiff;
   var nextArrival = moment().add(timeRemainder, "minutes").format("hh:mm A"); 


  var newRow = $("<tr>").append(
    $("<th>").text(addTrainName),
    $("<th>").text(addDest),
    $("<th>").text(addFreq),
    $("<th>").text(nextArrival),
    $("<th>").text(timeRemainder),
   )
    // Append the new row to the table
  $("#train-table > tbody").append(newRow);
  });
});
console.log("end of function");
}



function secondsCheck(){ 
  vartime = moment().format("h:mm:ss a");
  varSeconds = moment().format("ss");
  console.log(vartime);
  $("#current-time").text(vartime);
  
    if (varSeconds === "00") {
      console.log("runUpdateArrival");
    // This was the attempt to refresh and recalculate minutes away to be run on the 00 seconds
    // Tried using the forEach child method but could not get it to work
   //   updateTrainData();
    }
}
var timeInterval1 = setInterval(secondsCheck, 1000);
