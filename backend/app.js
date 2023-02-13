const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");

const dotenv = require("dotenv");
dotenv.config();

const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

const cors = require("cors");
const app = express();
const products = require("./StoreData.js");

app.use(cors());

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// app.post("/create-checkout-session", async (req, res) => {
//   const items = req.body.items;
//   const session = await stripe.checkout.sessions.create({
//     mode: "payment",
//     line_items: items.map((item) => {
//       const product = products.find((product) => product.id === item.id);
//       return {
//         price_data: {
//           currency: "usd",
//           product_data: {
//             name: product.name,
//           },
//           unit_amount: product.price * 100,
//         },
//         quantity: 1,
//       };
//     }),
//     success_url: process.env.FRONTEND_URL + "/success",
//     cancel_url: process.env.FRONTEND_URL + "/cancel",
//   });

//   res.json({ url: session.url });
// });

app.post("/create-connect-account", async (req, res) => {
  const account = await stripe.accounts.create({ type: "express" });

  const accountLinks = await stripe.accountLinks.create({
    account: account.id,
    refresh_url: process.env.FRONTEND_URL + "/refresh",
    return_url: process.env.FRONTEND_URL + "/return",
    type: "account_onboarding",
  });

  res.json({ url: accountLinks.url });
});

app.post("/create-payment-intent", async (req, res) => {
  const { amount } = req.body;
  try {
    const paymentIntent = await stripe.paymentIntents.create({
      currency: "USD",
      amount: amount,
      application_fee_amount: amount * 0.2,
      description: "Fake Apple Store",
      automatic_payment_methods: { enabled: true },
      transfer_data: {
        destination: "acct_1MZCz4DHqXbRARLk",
      },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    return res.status(400).json({
      message: error.message,
      success: false,
    });
  }
});

app.post("/create-split-payment-intent", async (req, res) => {
  const { amount } = req.body;
  const paymentIntent = await stripe.paymentIntents.create({
    amount: amount,
    currency: "usd",
    payment_method_types: ["card"],
    transfer_group: "{ORDER10}",
  });

  const firstTransfer = await stripe.transfers.create({
    amount: amount * 0.8,
    currency: "usd",
    destination: "acct_1MawfpRfdKPaijb3",
    transfer_group: "{ORDER10}",
  });

  const secondTransfer = await stripe.transfers.create({
    amount: amount * 0.1,
    currency: "usd",
    destination: "acct_1MZCtJDB9HDFAh7T",
    transfer_group: "{ORDER10}",
  });

  res.json({ clientSecret: paymentIntent.client_secret });
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render("error");
});

module.exports = app;
