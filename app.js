var express = require('express');
var app = express();
var config = require('./config.json');
var orgs = require('./data/orgs.json');
if (config.twitter.stream){
  var stream = require('./controllers/twitter')();
} else {
  console.log('Twitter not being run on server');
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
  var stripeToken = request.body.stripeToken;

  var charge = stripe.charges.create({
    amount: 1000, // amount in cents, again
    currency: "usd",
    source: stripeToken,
    description: "Example charge"
  }, function(err, charge) {
    if (err && err.type === 'StripeCardError') {
      // The card has been declined
    }
  });
});

