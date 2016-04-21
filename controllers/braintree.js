var brain = function(req, res) {
  var braintree = require( 'braintree' );

  var gateway = braintree.connect( {
    environment: braintree.Environment.Sandbox,
    merchantId: "x",
    publicKey: "x",
    privateKey: "x"
  } );

  gateway.clientToken.generate( {}, function( err, response ) {
    var clientToken = response.clientToken
  } );

  app.post( "/purchases", function( req, res ) {
    var nonce = req.body.payment_method_nonce;
    gateway.transaction.sale({
      amount: "0.50",
      //merchantAccountId: CORRECT_ACCOUNT,
      paymentMethodNonce: nonce,
      options: {
        submitForSettlement: true
      }
    }, function (err, result) {
    });
  } );
}

module.exports = brain;
