const express = require('express');
const path = require('path');

const app = express();

app.use(express.static(__dirname + '/Prueba1/<src>'));

app.get('/*', function (req, res) {
    res.sendFile(path.join(__dirname+'/Prueba/<src>/index.html'));  
})

app.listen(process.env.PORT || 8080);