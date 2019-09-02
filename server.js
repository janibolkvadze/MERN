const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path')

// Items route
const items = require('./routes/api/items');

const app = express();

// Bodyparser Middleware

app.use(bodyParser.json());

// DB Config

const db = require('./config/keys').mongoUri;

mongoose.connect(db, { useNewUrlParser: true } )
    .then(connection => {
        console.log('Connected');
    })
    .catch(error => {
        console.log(error);
    });


// Use routes

app.use('/api/items', items);



// Serve static assets if we are in production

if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
}



// App port listen configuration
const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server started on port ${port}`));