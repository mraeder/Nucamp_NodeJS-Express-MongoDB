// This is the creation of a simple server 

const http = require('http');   // import HTTP module with req function 

const hostname = 'localhost';  // set host name to local host 
const port = 3000;              // set port to local host 3000

const server = http.createServer((req, res) => {   // set up the server, basic server object, taking request handler callback function, 2 obj as parameters =(req, res) as an arrow function, req handler is called EVERY time server receives request
    console.log(req.headers);   // so we can see what the req.headers will look like 
    res.statusCode = 200;   // response = everything is okay 
    res.setHeader('Content-Type', 'text/html');  // set up a header for response obj w setHeader method, Content-Type passed as first argument in string to indicate to client what kind of data to expect in response body. Second argument text/html (a string) because we're setting up html response 
    res.end('<html><body><h1>Hello World!</h1></body></html>');  // set up respnose body and close the response string using res.end method. Put response right in method as a string with inline HTML
});

server.listen(port, hostname, () => {  // start the server using server variable and calling listen method on it. Arguments = port, hostname, () 
    console.log(`Server running at http://${hostname}:${port}/`);  // console that server is running, to let us know 
});