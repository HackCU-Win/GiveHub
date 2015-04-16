var express = require('express');
var app = express();
var config = require('./config.json');
var orgs = require('./data/orgs.json');

env = process.env.NODE_ENV || 'development';

var forceSsl = function (req, res, next) {
  if (req.headers['x-forwarded-proto'] !== 'https') {
    return res.redirect(['https://', req.get('Host'), req.url].join(''));
  }
  return next();
};

if (env === 'production') {
  app.use(forceSsl);
  var stream = require('./controllers/twitter')();
} else{
  console.log("no twitter || forcessl");
}

// use jade as the view engine
app.set('view engine', 'jade');

// set where the static contents are (e.g., css, js)
app.use(express.static(__dirname + '/public'));

app.get('/', function (req, res) {
  res.render('index.jade', {
    orgs: orgs
  })
});

app.get('/donate', function(req, res){
  res.render('donate.jade',
    {
      "organization" : req.query.handle,
      "amount" : req.query.amount
    }
  );
});

app.set('port', (process.env.PORT || 3000))

var server = app.listen(app.get('port'), function() {


    var host = server.address().address
    var port = server.address().port
    console.log('App listening at http://%s:%s', host, port)
})

var stripe = require("stripe")("sk_test_BQokikJOvBiI2HlWgH4olfQ2");
var bodyParser = require('body-parser')

app.use(bodyParser());
app.post('/payment', function(request, response){
  // (Assuming you're using express - expressjs.com)
  // Get the credit card details submitted by the form
  var token = request.body.token;
  var amount = request.body.amount;

  console.log(token);
  console.log(amount);
  var charge = stripe.charges.create({
    amount: amount, // amount in cents, again
    currency: "usd",
    source: token,
    description: "Example charge"
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      // The card has been declined
    } else if (err){
      console.log("An error occured with payment");
      console.log(JSON.stringify(err));
    } else {
      // Okay
      console.log("successful txn");
    }
  });
});

