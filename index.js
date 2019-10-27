let express = require('express')
let app = express();
let bodyParser = require('body-parser');
let path = require('path');
let util = require('util');
const router = express.Router();
const fs = require('fs');
const readFile = util.promisify(fs.readFile);

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false })) // middleware

// parse application/json
app.use(bodyParser.json()) // middleware

//let playerRoutes = require('./routes/players');

app.use(express.static(path.join(__dirname,'public')));


app.get('/', (req,res) => {
    console.log(req.me); // this was added via our custom middleware
    res.sendFile(path.join(__dirname,'views','home.html'));
});


app.post('/addplayer', (req,res) => {
    let data = req.body;

    let artist = {
        name: data[0].name,
        about: data[0].about,
        url: data[0].url
    }

    // read everybody
    fs.readFile(path.join(__dirname + '/artist.txt'), (err, data) => {
        if (err) {
            obj_arr = [];
        } else {
            // append new body
            obj_arr = JSON.parse(data);
        }
        obj_arr.push(artist);
        // save everybody again
        fs.writeFileSync("artist.txt", JSON.stringify(obj_arr));
        res.redirect(301, '/');
    });
});

app.get('/getData',(req,res) => {
    var data = fs.readFileSync(path.join(__dirname + '/artist.txt'));
    var obj = JSON.parse(data);
    res.json(obj);
})

app.post('/artist/delete/:id',(req,res) => {
    // read everybody
    fs.readFile(path.join(__dirname + '/artist.txt'), (err, data) => {
        if (err) {
            obj_arr = [];
        } else {
            // append new body
            obj_arr = JSON.parse(data);
        }
        obj_arr.splice(req.param.id, 1);
        // save everybody again
        fs.writeFileSync("artist.txt", JSON.stringify(obj_arr));
        /* Need to add some code here */
        res.redirect(301, '/');
    });
})

app.listen(3000, () => console.log('Server ready'))
