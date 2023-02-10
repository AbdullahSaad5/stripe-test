import React from "react";

export const CartContext = React.createContext();

export default function CartProvider({ children }) {
  const [cart, setCart] = React.useState([]);

  const addToCart = (item) => {
    setCart([...cart, item]);
  };

  const removeFromCart = (item) => {
    setCart(cart.filter((cartItem) => cartItem.id !== item.id));
  };

  const calculateTotal = () => {
    return cart.reduce((acc, item) => acc + item.price, 0);
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, calculateTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}
