
// Author: Tristan Prater- CEO of TrisC0
// Usage: Used for managing the stockboard of wishlist. WITHOUT BACKEND


/* LINKS
https://www.npmjs.com/package/express
https://www.npmjs.com/package/body-parser
https://www.npmjs.com/package/yahoo-stock-prices
https://getbootstrap.com/docs/5.0/examples/sign-in/
https://getbootstrap.com/docs/5.0/examples/cover/
*/ 

const alpha = require('alphavantage')({key: 'OFRT5SP86CHK0KW7'}); 
const apikey = 'OFRT5SP86CHK0KW7'
const express = require('express');
const app   = express();
const https = require('https');
const ejs   = require('ejs')
const bodyParser = require('body-parser');
const stocks = require('yahoo-stock-prices');
const port = 3000;

app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static('public')); 

app.get('/', function(req,res) {
    res.sendFile(__dirname + "/index.html");
});

app.post('/', function(req, res) {

    
    const username = req.body.username;
    const password = req.body.password;
    stocks.getCurrentPrice('AAPL', (err, price) => {
        const AAPL = price
        stocks.getCurrentPrice('TXN', (err, prices) => {
            const TXN =  prices
            stocks.getCurrentPrice('DIS', (err, pricess) => {
                const DIS = pricess
                stocks.getCurrentPrice('AMC', (err, pricesss) => {
                   const AMC = pricesss
                   
                   if (username === "trisc0" && password === "alpine") {
                       res.render(__dirname + "/stockFace.ejs", {
                           stock1: AAPL,
                            stock2: TXN,
                            stock3: DIS,
                            stock4: AMC
                        
                       });
                   } else {
                       res.sendFile(__dirname + "/failure.html");
                   
                   };
                });
            });
        });
    });
    
       
    
        
});


app.get('/stockBoard', function(req,res){
    
    res.render(__dirname + '/stockFace.ejs');

}); 

app.post("/stockBoard", function(req, res){
    res.redirect(__dirname + "/index.html");
});

app.post('/failure', function(req, res) {
    res.redirect('/');
});

app.listen(port, function() {
    console.log("server is running on port " + port);
});

