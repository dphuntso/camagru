
const express = require('express');
const app = express();

const bodyParser = require('body-parser')
const cors = require('cors');


// routes 
const post = require('./routes/api/post');
const comment = require('./routes/api/comment');
const login = require('./routes/api/login');
const logout = require('./routes/api/logout');
const profiles = require('./routes/api/profiles');
const activates = require('./routes/api/activateAccount');


// express middleware
app.use(cors());
app.use(express.json());

// mongodb
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:9200/camagru', {useNewUrlParser: true});

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('\n\n**************************\nmongodb connected......\n***************************\n');
});

app.use('/camagru/login', login);
app.use('/camagru/logout', logout);

// Use routes
app.use('/camagru/post', post);
app.use('/camagru/comment', comment);
app.use('/camagru/profile', profiles);
app.use('/camagru/activate', activates);
app.use('/camagru/public/logos', express.static(`${__dirname}/public/logos`));
app.use('/camagru/public/images', express.static(`${__dirname}/public/images`));

const port = process.env.PORT || 9100;
app.listen(port, () => {
    console.log('\n      backend listening on port => ' + port + '\n')
})

function verifyToken(req, res, next) {
    const bearerHeader = req.headers['authorization'];

    if (typeof bearerHeader !== 'undefined') {
        const bearer = bearerHeader.split(' ');

        const bearerToken = bearer[1];
    } else {
        res.status(403).json({
            message: 'please login'
        })
    }
}


