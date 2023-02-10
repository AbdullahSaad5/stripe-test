import { Button } from "@mantine/core";
import {
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import React from "react";

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  formStyles: {
    display: "flex",
    width: "500px",
    flexDirection: "column",
  },
};

const Checkout = () => {
  const stripe = useStripe();
  const elements = useElements();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!stripe || !elements) {
      // Stripe.js has not yet loaded.
      // Make sure to disable form submission until Stripe.js has loaded.
      return;
    }

    const { error } = await stripe.confirmPayment({
      elements,
      confirmParams: {
        // Make sure to change this to your payment completion page
        return_url: `${window.location.origin}/completion`,
      },
      redirect: "if_required",
    });

    if (error) {
      if (error.type === "card_error" || error.type === "validation_error") {
        alert(error.message);
      } else {
        alert("An unexpected error occured.");
      }
    } else {
      alert("Payment successful!");
    }
  };

  return (
    <main style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.formStyles}>
        <PaymentElement />
        <Button type="submit" disabled={!stripe} my={20}>
          Pay Now
        </Button>
      </form>
    </main>
  );
};

export default Checkout;
