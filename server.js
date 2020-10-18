// goal is now to connect server to static html files in public folder 

const http = require('http');   // import HTTP module with req function 

const hostname = 'localhost';  // set host name to local host 
const port = 3000;              // set port to local host 3000

const path = require('path');  // core module in node, so doesn't need to be installed 
const fs = require('fs');      // core module in node, so doesn't need to be installed 

const server = http.createServer((req, res) => {   // set up the server, basic server object, taking request handler callback function, 2 obj as parameters =(req, res) as an arrow function, req handler is called EVERY time server receives request
    console.log(`Request for ${req.url} by method ${req.method}`);  // c log url and http method

    if (req.method === 'GET') {   // only want server to response to get requests 
        let fileUrl = req.url;   // this is to handle if it is a GET req, look at req URL. local var named let fileURL, get file's contents
        if (fileUrl === '/') {   // if true, set fileURL to /index.html
            fileUrl = '/index.html';  
        }

        const filePath = path.resolve('./public' + fileUrl);  // get absolute path of file being requested. path.resolve() method to chnage from relative to absolute path. Req file in public folder, relative path = ./public + fileURL. Gives us full absolute path and we'll store it in filePath
        const fileExt = path.extname(filePath);  // server only grabs req from HTML files. Check if req file = HTML by const fileExt extension  

        if (fileExt === '.html') {    // if it's an HTML file 
            fs.access(filePath, err => {  // use this method to check if file even exists on server using fs.access() method. Let's us know if file is accessible. Take 2 arguments, filePath, callback argument named Error 
                if (err) {                  // if an error
                    res.statusCode = 404;   // send Not Found to client 
                    res.setHeader('Content-Type', 'text/html');
                    res.end(`<html><body><h1>Error 404: ${fileUrl} not found</h1></body></html>`);  // message = file URL not found
                    return;     // add return so code after this does not execute 
                }
                res.statusCode = 200;       // this situation is when we didn't hit any errors; successful 
                res.setHeader('Content-Type', 'text/html');   // tells client to expect HTML document 

                fs.createReadStream(filePath).pipe(res);       // send HTML file. createReadStream() method, reads contents of file it's given in small chucks, doesn't load whole file into memory. Basically lazy loading file.  take contents and pipe it, .pipe() method to send it over to response object   
            });
        } else {            // if req file is not HTML, then we enter this else block.              
            res.statusCode = 404;         // status Not Found 
            res.setHeader('Content-Type', 'text/html');  // header to text/html
            res.end(`<html><body><h1>Error 404: ${fileUrl} is not an HTML file</h1></body></html>`);   // file URL is not HTML file 
        }
    } else {                 // set up else block to handle request when anything other than GET req
        res.statusCode = 404;   // status code prop to Not Found message to response object 
        res.setHeader('Content-Type', 'text/html');   // header to text/html
        res.end(`<html><body><h1>Error 404: ${req.method} not supported</h1></body></html>`);  // end response string that says whatever this request is is not supported 
    }
});

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
});