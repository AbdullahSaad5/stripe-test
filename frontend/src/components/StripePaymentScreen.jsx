import axios from "axios";
import React, { useContext, useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { CartContext } from "../contexts/CartContext";
import Checkout from "./Checkout";

const STRIPE_PUBLIC_KEY =
  "pk_test_51MZ7cmDxPJi0oNYwc1vfMZnc81wNbGeTIgLsFmfHIdQjp375WdZ4xPsWluVWblfi3BXoFkdVJjVU5TtW2GTCFFSj00rVAGJ7PL";
const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const StripePaymentScreen = () => {
  const [clientSecret, setClientSecret] = useState("");
  const { calculateTotal } = useContext(CartContext);

  // Create a client Secret for the payment intent
  useEffect(() => {
    axios
      .post("http://localhost:3000/create-split-payment-intent", {
        amount: calculateTotal() * 100,
      })
      .then((res) => {
        setClientSecret(res.data.clientSecret);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  return (
    <>
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <Checkout />
        </Elements>
      )}
    </>
  );
};

export default StripePaymentScreen;
