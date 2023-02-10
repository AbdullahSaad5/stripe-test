import { Button, Center, Menu, Text } from "@mantine/core";
import React from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../contexts/CartContext";

const styles = {
  cartItem: {
    display: "flex",
    alignItems: "center",
    gap: 10,
    paddingInline: 20,
    paddingBlock: 10,
  },
};

const CartPreview = ({ children }) => {
  const { cart, calculateTotal } = React.useContext(CartContext);

  const navigate = useNavigate();

  const proceedToCheckout = () => {
    navigate("/payment");
  };

  return (
    <Menu shadow="md">
      <Menu.Target>
        <Button variant="subtle" px={0}>
          {children}
        </Button>
      </Menu.Target>

      <Menu.Dropdown>
        {cart?.length === 0 ? (
          <div>
            <Text fz={"xl"}>Cart is empty</Text>
          </div>
        ) : (
          <>
            {cart.map((item) => (
              <>
                <div key={item.id} style={styles.cartItem}>
                  <img src={item.image} alt={item.name} width={40} />
                  <div>
                    <Text fz={"xl"}>{item.name}</Text>
                    <Text fz={"sm"} align="left">
                      ${item.price}
                    </Text>
                  </div>
                </div>
                <Menu.Divider />
              </>
            ))}
            <div>
              <Text fz={"lg"} py={10} fw="bold" align="center">
                Total: ${calculateTotal()}
              </Text>
            </div>
            <Menu.Divider />

            <Center>
              <Button
                variant="subtle"
                py={10}
                px={5}
                onClick={proceedToCheckout}
              >
                Checkout
              </Button>
            </Center>
          </>
        )}
      </Menu.Dropdown>
    </Menu>
  );
};

export default CartPreview;
