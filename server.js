const express = require("express");
const cors = require("cors");
const stripe = require("stripe")(
  "sk_test_51IOJ4cDP76eqBtD9qoBIyjmlE1w4sYWLllruh51SM1NB5vzdbmWgrZHMVG3K1VY1TH1ptq1FN4JxMFBGbWghecDW003NxAUHGo"
);
const port = process.env.PORT || 9000;

//App Config
const app = express();

//Middlewares
app.use(cors({ origin: true }));
app.use(express.json());

//API routes
app.get("/", (req, res) => {
  res.status(200).send("Hello world");
});
app.post("/payments/create", async (req, res) => {
  const total = req.query.total;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: total,
    currency: "inr",
  });
  res.status(201).send({
    clientSecret: paymentIntent.client_secret,
  });
});
//Listener
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
