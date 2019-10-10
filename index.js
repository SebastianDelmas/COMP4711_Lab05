let express = require('express')
let app = express();
let bodyParser = require('body-parser');
let path = require('path');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // middleware

// parse application/json
app.use(bodyParser.json()) // middleware

//let playerRoutes = require('./routes/players');

app.use(express.static(path.join(__dirname,'public')));


app.get('/', (req,res) => {
    console.log(req.me); // this was added via our custom middleware
    res.sendfile(path.join(__dirname,'views','home.html'));
});


app.listen(3000, () => console.log('Server ready'))