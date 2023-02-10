import { Center, Flex, Group, Text } from "@mantine/core";
import React from "react";
import { Link } from "react-router-dom";
import { ShoppingBag } from "tabler-icons-react";
import { CartContext } from "../contexts/CartContext";
import CartPreview from "./CartPreview";

const styles = {
  indicator: {
    width: "25px",
    height: "25px",
    borderRadius: "50%",
    backgroundColor: "yellow",
  },
};

const NavigationBar = () => {
  const { cart } = React.useContext(CartContext);

  return (
    <Flex
      align={"center"}
      justify={"space-between"}
      px={"xl"}
      bg={"black"}
      style={{
        height: "100%",
      }}
    >
      <Text fz={"xl"} fw={"bold"} color="white">
        <Link to="/">OnlineShop</Link>
      </Text>
      <Group>
        <CartPreview>
          <ShoppingBag size={30} color="white" />
        </CartPreview>
        <Center style={styles.indicator}>
          <Text fw="bolder">{cart.length}</Text>
        </Center>
      </Group>
      <Group>
        <Text color={"white"}>Login</Text>
        <Text color={"white"}>Sign Up</Text>
      </Group>
    </Flex>
  );
};

export default NavigationBar;
