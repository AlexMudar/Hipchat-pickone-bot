var express = require('express');
var bodyParser = require('body-parser');
var request = require('request');
var app = express();

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// views is directory for all template files
app.set('views', __dirname + '/views');
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
	response.render('pages/index');
});

 app.post('/test',function(request,response){
	var messageText;
	var messageTextArray = [];
	var json;
	var randomWord;
	var randomNumber;
	
	messageText = request.body["item"]["message"]["message"].toString();
	messageTextArray = messageText.split(" ");
	
	for (x = 0; x<messageTextArray.length; x++){
		// if the word starts with a / character
		if (messageTextArray[x].substr(0, 1) === "/"){ 	
			messageTextArray.splice(x, 1);
			x = x - 1;
		}
	}
	
	randomNumber = Math.floor((Math.random() * messageTextArray.length));
	randomWord = messageTextArray[randomNumber];
	
	json = JSON.stringify({"color":"gray","message":randomWord,"notify":false,"message_format":"text"});
	
	response.writeHead(200, {"Content-Type": "application/json"});
	response.end(json);
});

/*				
	var bodyJson = JSON.parse(body);
	var athleteID = bodyJson[a]["athlete"]["id"].toString();
	athleteRanking.push( {id: athleteID, distanceInMiles: distanceInMiles, name: name});
	stravaResponse = stravaResponse + (athleteRanking[c].name).toString() + ": " + ((athleteRanking[c].distanceInMiles).toFixed(1)).toString() + "mi \r"; 
	response.writeHead(200);
	response.end();
*/
	
app.listen(app.get('port'), function() {
	console.log('Node app is running on port', app.get('port'));
});


