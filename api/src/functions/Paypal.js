
const { app } = require("@azure/functions");


  const port = process.env.PORT || 4280;
  const clientId = process.env.CLIENT_ID;
  const clientSecret = process.env.CLIENT_SECRET;
  const paypalBaseUrl = "https://api-m.sandbox.paypal.com";

function generateUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
        var r = Math.random() * 16 | 0,
            v = c === 'x' ? r : (r & 0x3 | 0x8);
        return v.toString(16);
    });
}
  function getAccessToken() {
    const auth = `${clientId}:${clientSecret}`;
    const data = "grant_type=client_credentials";
    return fetch(`${paypalBaseUrl}/v1/oauth2/token`, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
        Authorization: `Basic ${Buffer.from(auth).toString("base64")}`,
      },
      body: data,
    })
      .then((res) => res.json())
      .then((data) => data.access_token);
  }
  app.post("create", async (context, req) => {
    getAccessToken().then((token) => {
        let order_data_json = {
            'intent': 'CAPTURE',
            'purchase_units': [
                {
                    'amount': {
                        'currency_code':'USD',
                        'value': '100.00'
                    }
                }]
        };
        const data = JSON.stringify(order_data_json);

        fetch(`${paypalBaseUrl}/v2/checkout/orders`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${token}`,
                'PayPal-Request-Id': generateUUID()
            },
            body: data,
        })
            .then((response) => response.json())
            .then((data) => {
                context.res = { status: 200, body: data };
            })
            .catch((error) => {
                context.res = { status: 500, body: error };
            })
    })
});

app.post('complete_order', (context, req) => {  
    getAccessToken()
        .then((token) => {
            fetch(paypalBaseUrl + '/v2/checkout/orders/' + req.body.orderID + '/'+ req.body.intent, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify(req.body)
            })
                .then((response) => response.json())
                .then((data) => {
                    context.res = { status: 200, body: data };
                })
                .catch((error) => {
                    context.res = { status: 500, body: error };
                })
    })
});