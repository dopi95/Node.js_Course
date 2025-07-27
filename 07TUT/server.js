const express = require('express');
const app = express();
const path = require('path');
const cors = require('cors')
const {logger}= require('./middleware/logEvents');
const errorHandler= require('./middleware/errorHandler');


const PORT = process.env.PORT || 3500;

// custom middleware logger
app.use(logger);

//Cross origin resource sharing

const whitelist=['http://www.mysite.com', 'http://127.0.0.1:5500', 'http://localhost:3500']
const corsOption = {
    origin: (origin, callback) =>{
        if(whitelist.indexOf(origin)!==-1 || !origin){
            callback(null,true)
        } else{
            callback(new Error('Not allowed by CORS'));
        }
    },
    optionsSucessStatus: 200
}

app.use(cors(corsOption));

//builtin middleware to handle urlencoded data
//in other words, form data:
//`content-type: application/x-www-form-urlencoded`
app.use(express.urlencoded({extended: false}));

//built-in middleware for json
app.use(express.json());

//serve static files
app.use(express.static(path.join(__dirname, '/public')));


app.get('/', (req, res) => {
    // res.sendFile('./views/index.html', {root: __dirname});
        res.sendFile(path.join(__dirname,'views', 'index.html'));

});

app.get('/new-page.html', (req, res) => {
        res.sendFile(path.join(__dirname,'views', 'new-page.html'));

});

app.get('/old-page.html', (req, res) => {
        res.redirect(301, '/new-page.html');

});

//Route handlers
app.get('/hello.html', (req,res,next)=>{
    console.log('attempt to load hello.html');
    next()
    
}, (req,res)=>{
    res.send('Hello World!');
});

//changing functions
const one = (req,res,next) =>{
    console.log('one');
    next();
    
}

const two = (req,res,next) =>{
    console.log('two');
    next();
    
}
const three = (req,res) =>{
    console.log('three');
    res.send('Finished!')
    
}

app.get('/chain.html', [one,two,three]);


//app.use('/)

app.all('/', (req, res) => {

    if(req.accepts('html')){
        res.status(404).sendFile(path.join(__dirname, 'views', '404.html'));

    }

    else if(req.accepts('json')){
        res.json({error: "404 Not Found"});

    } else{
        res.type('txt').send("404 Not Found");
    }

});

app.use(errorHandler);



app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); 