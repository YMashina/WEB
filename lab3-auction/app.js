const express = require('express');
const server = express();
const fs = require('fs')
const port = 3000;

const https = require('https');
const httpsOptions = {
    cert: fs.readFileSync('./ssl/server.csr'),
    key: fs.readFileSync('./ssl/server.key')
}

const routes = require("./routes");
server.use("/", routes);

const bodyParser = require("body-parser");

server.set("view engine", "pug"); 
server.set("views", `views`);
server.use(bodyParser.json());
server.use(bodyParser.urlencoded({extended: true}));

https.createServer(httpsOptions, server).listen(port, (err) => {
    if (err)
        console.log("Error while starting server");
    else
        console.log(`Server started at https://localhost:${port}`); 
        // https://localhost:3000
});

// module.exports = port;