
const {setGlobalOptions} = require("firebase-functions");
const {onRequest} = require("firebase-functions/https");
const logger = require("firebase-functions/logger");

const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
dotenv.config();
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);
const app = express();

app.use(express.json());
app.use(cors({origin: true}));

app.post("/payments/create", async (req, res) => {
  const total =parseInt(req.query.total);
  logger.info("Payment Request Received for this amount >>> ", total);
  if(total > 0) {
       
         const paymentIntent = await stripe.paymentIntents.create({
           amount: total,
           currency: "usd",
         });
         res.status(201).send({
           clientSecret: paymentIntent.client_secret,
         });
}else {
    res.status(400).send({  error: "Invalid amount. Total must be greater than 0."});
}
});

app.get("/", (req, res) => {
  res.status(200).send("Hello World!");
});

exports.api = onRequest(app);
// setGlobalOptions({ maxInstances: 10 });

