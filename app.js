const express = require('express');
const app = express();
const path = require('path');
const router = express.Router();
const fs = require('fs');
const http = require('http');
const https = require('https');
const privateKey = fs.readFileSync('/etc/letsencrypt/live/arifhdev.me/fullchain.pem', 'utf8');
const certificate = fs.readFileSync('/etc/letsencrypt/live/arifhdev.me/privkey.pem', 'utf8');
const credentials = {
    key: privateKey,
    cert: certificate
};

router.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

//add the router
app.use('/', router);
const httpServer = http.createServer(app);
const httpsServer = https.createServer(credentials, app);

httpServer.listen(80);
httpsServer.listen(443);

console.log('Running at Port 80');