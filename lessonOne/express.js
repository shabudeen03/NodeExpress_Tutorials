//npm install express

//import express module
const express = require("express");
const app = express(); //create an express application, traditionally named app
/*
    app has methods for:
        routing HTTP requests
        configuring middleware --> used extensively in Express apps (serving static files, error handling, compressing http responses)
            usually order depends on app developer, but some middleware require certain order
                Ex: session middleware requires cookie middlware/handler to be added first
                Almost always call middleware before setting routes or there may be broken functionality
                Difference between middleware & route handler: middleware contain "next" keyword
        rendering HTML views
        registering a template engine 
        modifying application settings
*/

const port = 3000;

/* Exporting modules & importing

exports.objectToExport = function(param) {
    ... //function code
}

const obj = require("./fileName"); The .js extension is optional

You can also group route handlers of a part of site together and access using common prefix (ex: /wiki/help, /wiki/home)
    This is done using express.Router()

*/

/*
    Sample custom middleware
*/
const my_middleware = function(req, res, next) {
    //perform some operations
    console.log("Middleware added.");
    next(); // So express calls next middleware in the chain
};

/*
app.use(my_middleware); //for all routes & verbs
app.use("/wiki", my_middleware); //for a specific route /wiki
*/
app.get("/module", my_middleware); //for specific route /wiki & specific http verb 'get'


/*
    Special routing method app.all() can be called in response to ANY http (valid) method, useful
    for loading middleware functions at particular path for ALL request methods (get, put, post etc)
    The following is a handler for the path "/"
*/
app.all("/", function(req, res, next) {
    console.log("Accessing the / section ...");
    next(); //pass control to next handler
});

//this shows a "route definition" aka route handlers. Callback invoked whenever a request with path '/' relative to site root made
app.get("/", function(req, res) {
    res.send("Hello, world!\nI am experimenting with you...");
});


/*
    How to access the routes:

    /module/  
    /module/about
*/
const practiceModule = require("./practiceModule.js");
app.use("/module", practiceModule); //call .use to add the middleware handling path

//The function callback is optional in this app.listen(port, callback);
app.listen(port, function() {
    console.log(`Example app listening on port ${port}`);
});