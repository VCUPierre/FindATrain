// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyB2ZycZea1jLZFy1yaVrINNQxMQf8vLsR0",
    authDomain: "findatrain-uofr.firebaseapp.com",
    databaseURL: "https://findatrain-uofr.firebaseio.com",
    projectId: "findatrain-uofr",
    storageBucket: "",
    messagingSenderId: "491624846736",
    appId: "1:491624846736:web:94f3d45424e44e7d0fcf15"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

$(document).on('click', 'button', function(event){
    event.preventDefault();
    let input1, input2, input3, input4;
    input1 = $('#Input1').val();
    input2 = $('#Input2').val();
    input3 = $('#Input3').val();
    input4 = $('#Input4').val();
    console.log(input1 +' - '+ input2 +' - '+ input3 +' - '+ input4);
    var object = { 
        TrainName: input1,
        Destination: input2,
        StartingTrainTime: input3,
        Frequency: input4,
        timeStamp: firebase.database.ServerValue.TIMESTAMP
    }
    addUser2DB(object);
});

function addUser2DB(object){
    database.ref().push(object);
    alert("Added a New Train");
    $('#Input1').val("");
    $('#Input2').val("");
    $('#Input3').val("");
    $('#Input4').val("");

    database.ref().limitToLast(1).on("child_added", function(childSnapshot) {
        console.log(childSnapshot.val());
        lastEntry = childSnapshot.val();
        var startTime = childSnapshot.StartingTrainTime;
        var timeStamp1 = moment.unix(lastEntry.timeStamp).format('LT')

        //var empMonths = moment().diff(moment(startTime, "X"), "months");
        var minsAway = startTime - timeStamp1; 
        console.log(startTime);
        console.log(minsAway);
        //console.log(billed);
        var tr = $('<tr>');
        var td1 = $('<td>');
        td1.text(lastEntry.TrainName);
        var td2 = $('<td>');
        td2.text(lastEntry.Destination);
        var td3 = $('<td>');
        td3.text(lastEntry.Frequency);
        var td4 = $('<td>');
        td4.text(startTime);
        var td5 = $('<td>');
        td5.text(minsAway)
        tr.append(td1,td2,td3,td4,td5);

        $('tbody').append(tr);
    });
}
