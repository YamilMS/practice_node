require('dotenv').config()
let express = require('express');
const bodyParser= require('body-parser')
let app = express();

console.log("Hello World");

/* Get method for the "/" route tha send 'Hello Express
app.get('/', (req, res) => {
    res.send('Hello Express');
})
*/

//This is used to parse the body of the request and return the body as a json object or a querystring
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//This function is a middleware that log the request showing the method, route and ip of the request. We need to call the next()
// function to continue the execution of the rest of the code.
const middleware = (req, res, next) =>{
    console.log(`${req.method} ${req.path} - ${req.ip}`);
    next();
}

//With app.use we can use the middleware and for eache request we will execute the middleware function
app.use(middleware)

//This serve to public the folder public
app.use("/public",  express.static(__dirname + "/public"));

//Get method that serve a file to the endpoint
app.get('/', (req, res) => {
    absolutePath = __dirname + "/views/index.html"
    res.sendFile(absolutePath);
})

//In this case we will use the middleware to log the request time and using it in the response.
app.get('/now', function(req, res, next) {
    req.time = new Date().toString();
    next();
}, function(req, res) {
    res.json({time: req.time});
})

//This serve json to the endpoint /json
app.get('/json', (req, res) => {
    if (process.env.MESSAGE_STYLE === "uppercase") {
        res.json({"message": "HELLO JSON"});
    } else {
        res.json({"message": "Hello json"});
    }
})

//Create an echo endpoint that will return the route parameter
app.get('/:word/echo', (req, res) => {
    res.json({echo: req.params.word});
})

//Getting parameters input from the query string, in this case url/name?first=XXXXX&last=YYYYY
app.get('/name', (req, res) => {
    const firstName = req.query.first; // first is the name of the parameter
    const lastName = req.query.last; // last is the name of the parameter
   //another way: const {first: firstName, last: lastName} = req.query
    res.json({name: `${firstName} ${lastName}`});
})

//Here is the post request, in order to access to the body we need to use the body-parser and after we can manage with req.body
app.post('/name', (req, res) => {
    const {first: firstName, last: lastName} = req.body
    res.json({name: `${firstName} ${lastName}`});
})
































 module.exports = app;
