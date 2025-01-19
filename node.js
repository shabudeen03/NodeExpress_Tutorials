/*
    Sample review of node
    
    Routes:
        localhost:8080
        localhost:8080/about
        localhost:8080/contact
        * Any other route should be a 404 error
*/

const http = require('http');
const url = require('url');
const fs = require('fs');

const hostname = '127.0.0.1';
const port = 8080;

//Create HTTP server
const server = http.createServer((req, res) => {
    let q = url.parse(req.url, true);
    let fileName = "./index.html";
    let statusCode = 200;

    console.log(`Requested: ${q.pathname}`);
    if(q.pathname === "/about") {
        fileName = "./about.html";
    } else if(q.pathname === "/contact") {
        fileName = "./contact.html";
    } else {
        console.log("Error! Page not found.");
        fileName = "./404.html";
        statusCode = 404;
    }

    fs.readFile(fileName, (err, data) => {
        //Set response HTTP header with HTTP status and content type
        res.writeHead(statusCode, {'Content-Type': 'text/html'});

        res.write(data);
        return res.end(); //likewise you can skip res.write(data) and do res.end(data)
    });
});

//prints log once server starts listening
server.listen(port, hostname, function() {
    console.log(`Serving on ${hostname}:${port}!`);
});


/*
    When it comes to:
        handling http verbs (get, post, delete, etc)
        handling requests at different url paths separately
        server static files
        use templates to create response
    Node is not of much use. Then, use express which is unopinionated (multiple ways of doing something)
*/