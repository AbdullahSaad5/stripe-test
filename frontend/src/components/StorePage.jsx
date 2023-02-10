import { Center, Grid } from "@mantine/core";
import React from "react";
import ProductItem from "./ProductItem";
import { products } from "./StoreData";

const StorePage = () => {
  return (
    <Grid justify={"center"}>
      <Grid.Col span={12}>
        <h1>New Arrivals</h1>
      </Grid.Col>
      {products.map((product) => (
        <Grid.Col span={4}>
          <Center>
            <ProductItem item={product} />
          </Center>
        </Grid.Col>
      ))}
    </Grid>
  );
};

export default StorePage;
