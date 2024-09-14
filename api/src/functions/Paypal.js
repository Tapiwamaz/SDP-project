const { app } = require("@azure/functions");
// const fetch = require("node-fetch");

const port = process.env.PORT || 4280;
const clientId = process.env.REACT_APP_CLIENT_ID;
const clientSecret = process.env.CLIENT_SECRET;
const paypalBaseUrl = "https://api-m.sandbox.paypal.com";

function generateUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    var r = (Math.random() * 16) | 0,
      v = c === "x" ? r : (r & 0x3) | 0x8;
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
// const fetch = require('node-fetch');
app.http("create_order", {
  methods: ["POST"],
  authLevel: "anonymous",
  handler: async (request, context) => {
    context.log("JavaScript HTTP trigger function processed a request.");

    try {
      let body = "";
      for await (const chunk of request.body) {
        body += chunk;
      }
      const charCodes = body.split(",").map(Number);
      const jsonString = String.fromCharCode(...charCodes);
      const json = JSON.parse(jsonString); // Parse the JSON string into an objec
      const token = await getAccessToken();
      let order_data_json = {
        intent: "CAPTURE",
        purchase_units: [
          {
            amount: {
              currency_code: "USD",
              value: (json.amount * 0.056307095).toFixed(2),
            },
          },
        ],
      };
      const data = JSON.stringify(order_data_json);
      // context.log(data);
      const response = await fetch(`${paypalBaseUrl}/v2/checkout/orders`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
          "PayPal-Request-Id": generateUUID(),
        },
        body: data,
      });
      const responseData = await response.json();
      context.log(responseData);
      return {
        status: 200,
        body: JSON.stringify(responseData),
        headers: {
          "Content-Type": "application/json",
        },
      };
    } catch (error) {
      context.log(error);
      return {
        status: 500,
        body: JSON.stringify({ error: error.toString() }),
        headers: {
          "Content-Type": "application/json",
        },
      };
    }
  },
});
app.post("complete_order", async (req, res) => {
  try {
    let body = "";
    for await (const chunk of req.body) {
      body += chunk;
    }
    const charCodes = body.split(",").map(Number);
    const jsonString = String.fromCharCode(...charCodes);
    const json = JSON.parse(jsonString); // Parse the JSON string into an object
    const token = await getAccessToken();
    const response = await fetch(
      `${paypalBaseUrl}/v2/checkout/orders/${json.order_id}/${json.intent}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    ).then((res) => res.json())
    .then((data) => data);

    
      const data = await response;
      return {
        status: 200,
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
      };
   
  } catch (error) {
    console.error(error);
    return {
      status: 500,
      body: JSON.stringify({ error: error.toString() }),
      headers: {
        "Content-Type": "application/json",
      },
    };
  }
});
