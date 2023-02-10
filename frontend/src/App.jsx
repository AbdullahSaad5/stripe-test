import { AppShell, Header } from "@mantine/core";
import NavigationBar from "./components/NavigationBar";
import StorePage from "./components/StorePage";
import CartProvider from "./contexts/CartContext";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StripePaymentScreen from "./components/StripePaymentScreen";

function App() {
  return (
    <Router>
      <CartProvider>
        <AppShell
          padding="md"
          header={
            <Header height={60}>
              <NavigationBar />
            </Header>
          }
        >
          <Routes>
            <Route path="/" element={<StorePage />} />
            <Route path="/payment" element={<StripePaymentScreen />} />
          </Routes>
        </AppShell>
      </CartProvider>
    </Router>
  );
}

export default App;
