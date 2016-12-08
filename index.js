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
 		if(n != null){
 			answer = numbers(n, response);
 		}
 	}
 	if (answer==null){
 		answer = "Expects URLs of the type \nhttp://localhost:3000/numbers?n=37 \nto return "+
 		"the numbers from 1 to n , and whenever a number is divided by ";
 		SUBSTITUTION.forEach(function (value){
 			answer += value[0] + ", ";
		});

 		answer += "then substitute it with words representing this number, as Node for 3 and more specificaly : \n";
 		SUBSTITUTION.forEach(function (value){
 			answer += value[0] + " --> "+ value[1]+ "\n";
		});
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
	return ret;
}

function substitution(number){
	var sub = "";
	SUBSTITUTION.forEach(function (value){
		var first = value[0];
		if(number % first === 0){
			sub += value[1];
		}
	});
	if(sub == ""){
		sub = number;
	}
	return sub;
}