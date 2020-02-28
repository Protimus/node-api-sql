const paypal_config = require("../config/paypal.config");

// configure paypal with the credentials you got when you created your paypal app
paypal.configure({
    'mode': 'sandbox', //sandbox or live 
    'client_id': paypal_config.paypal_client_id, // please provide your client id here 
    'client_secret': paypal_config.paypal_client_secret // provide your client secret here 
});

// Buy a item.
exports.buy = (req, res) => {
	// create payment object 
    var payment = {
        "intent": "authorize",
        "payer": {
            "payment_method": "paypal"
        },
        "redirect_urls": {
            "return_url": "http://google.com",
            "cancel_url": "http://google.com"
        },
        "transactions": [{
            "amount": {
                "total": 5.00,
                "currency": "USD"
            },
            "description": ""
        }]
    }
    // call the create Pay method 
    createPay( payment ).then( ( transaction ) => {
        var id = transaction.id; 
        var links = transaction.links;
        var counter = links.length; 
        while( counter -- ) {
            if ( links[counter].method == 'REDIRECT') {
                // redirect to paypal where user approves the transaction 
                return res.redirect( links[counter].href )
            }
        }
    })
    .catch( ( err ) => { 
        console.log( err ); 
        res.message("Something is wrong");
    });
};

  