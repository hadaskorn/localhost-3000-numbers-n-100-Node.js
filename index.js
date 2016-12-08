//Lets require/import the HTTP module
var http = require('http');

//Lets define a port we want to listen to
const PORT=3000; 
const SUBSTITUTION = [[3, "Node"], [5, "Java"], [7, "Scala"], [11, "Python"]] ;

//We need a function which handles requests and send response
function handleRequest(request, response){
 	var array = require('url').parse(request.url,true);
 	var answer = null;
 	if (array["pathname"] == '/numbers'){
 		var n = array["query"] ["n"];
 		answer = numbers(n, response);
 	}
    response.end(answer);
   
}

//Create a server
var server = http.createServer(handleRequest);

//Lets start our server
server.listen(PORT, function(){
    //Callback triggered when server is successfully listening. Hurray!
    console.log("Server listening on: http://localhost:%s", PORT);
});

function numbers(number, response){
	var ret = "";
	for (var i = 1; i <= number; i++){
		ret += substitution(i) + '\n';
	}
	// return "wowow i got a number "+number;
	return ret;
}

function substitution(number){
	var sub = "";
	SUBSTITUTION.forEach(function (value){
		var first = value[0];
		// console.log("current "+ current + " first :" + first);	
		// console.log(current % first === 0);
		if(number % first === 0){
			sub += value[1];
		}
		// console.log(sub);
	});
	if(sub == ""){
		sub = number;
	}
	return sub;
}