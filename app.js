const express = require('express');
const path = require('path'); //connect ejs template
const mongoose = require('mongoose')
// const Camoground = require('./models/campground');
const campground = require('./models/campground');

mongoose.connect('mongodb://localhost:27017/yelp-camp', {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on('error', console.error.bind(console, "connection error:")); //if change report me
db.once('open', () => { //just report me one time
    console.log("Database connected")
});

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views')) //__dirname is to take current dir name where file is located

app.get('/', (req, res) => { //request http / represent send to http
    res.render('home')
})

app.get('/makecampground', async (req, res) => {
    const camp = new campground({ title: 'My backyard', description: 'cheap camp' });
    await camp.save();
    res.send(camp)
})

app.listen(3000, () => {
    console.log('Serving on port 3000')
})