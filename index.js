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
	messageText = parseQuestion(messageText);
	messageTextArray = messageText.split(" ");
	
	for (x = 0; x<messageTextArray.length; x++){

		// if the word ends in any of the following characters, remove it: , . ?
		if (messageTextArray[x].charAt(messageTextArray[x].length-1) === "," || messageTextArray[x].charAt(messageTextArray[x].length-1) === "." || messageTextArray[x].charAt(messageTextArray[x].length-1) === "?"){
			messageTextArray[x] = messageTextArray[x].substr(0, messageTextArray[x].length-1);
		}
	
		// if the word starts with a / character, is an "OR", or is blank. Remove it from the array		
		if (messageTextArray[x].length === 0 || messageTextArray[x].charAt(0) === "/" || messageTextArray[x].toUpperCase() === "OR"){ 	 
			messageTextArray.splice(x,1);
			x = x - 1;
		}
	}
	
	randomNumber = Math.floor((Math.random() * messageTextArray.length));
	randomWord = messageTextArray[randomNumber];
	
	json = JSON.stringify({"color":"gray","message":randomWord,"notify":false,"message_format":"text"});
		
	response.writeHead(200, {"Content-Type": "application/json"});
	response.end(json);
});

function parseQuestion(originalText){
	var originalTextArray = originalText.split(" ");
	for (x = 0; x<originalTextArray.length; x++){

		// if the word ends in any of the following characters, remove the character: . 
		if (originalTextArray[x].charAt(originalTextArray[x].length-1) === "."){
			originalTextArray[x] = originalTextArray[x].substr(0, originalTextArray[x].length-1);
		}
	
		// if the word is blank. Remove it from the array		
		if (originalTextArray[x].length === 0){ 	 
			originalTextArray.splice(x,1);
			x = x - 1;
		}
	}
	
	var slashSpot = 0;
	
	for (x = 0; x<originalTextArray.length; x++){
		// if the word starts with a / character record its position.		
		if (originalTextArray[x].charAt(0) === "/"){ 	 
			slashSpot = x;
		}
	}
	
	if (slashSpot != 0 || slashSpot != originalTextArray.length ){
		originalTextArray.splice(0, slashSpot + 1);
	}
	
	var cleanText = "";
	for (x = 0; x<originalTextArray.length; x++){
		cleanText = cleanText + originalTextArray[x];
		if (x === originalTextArray.length-1){
			break;
		}
		cleanText = cleanText + " ";
	}

	return cleanText;
	
}

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


