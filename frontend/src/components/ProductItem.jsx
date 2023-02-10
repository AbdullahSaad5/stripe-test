import { Button, Flex } from "@mantine/core";
import React from "react";

import { CartContext } from "../contexts/CartContext";

const styles = {
  container: {
    width: "400px",
    backgroundColor: "white",
    padding: "2rem",
    borderRadius: "10px",
    boxShadow: "0 0 10px 0 rgba(0,0,0,0.1)",
  },
  productImage: {
    display: "block",
    maxWidth: "100%",
    height: "auto",
  },
};

const ProductItem = ({ item = null, inCart = false }) => {
  const { cart, addToCart, removeFromCart } = React.useContext(CartContext);

  const [isInCart, setIsInCart] = React.useState(
    cart.find((cartItem) => cartItem.id === item.id)
  );

  const manageCart = () => {
    if (isInCart) {
      removeFromCart(item);
      setIsInCart(false);
    } else {
      addToCart(item);
      setIsInCart(true);
    }
  };

  return (
    <Flex direction={"column"} style={styles.container}>
      <h2>{item?.name}</h2>
      <img src={item?.image} alt="product image" style={styles.productImage} />
      <Flex align={"center"} justify={"space-between"}>
        <p>{item?.description}</p>
        <h4>${item?.price}</h4>
      </Flex>
      <Button color={isInCart ? "red" : "blue"} onClick={manageCart}>
        {isInCart ? "Remove from Cart" : "Add to Cart"}
      </Button>
    </Flex>
  );
};

export default ProductItem;
