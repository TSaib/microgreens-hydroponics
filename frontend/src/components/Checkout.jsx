import React, { useContext, useState } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { AuthContext } from "../context/AuthContext";

export default function Checkout({ cart, clearCart }) {
  const { user } = useContext(AuthContext);
  const [status, setStatus] = useState("");

  const handleOrder = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/orders`,
        { items: cart.map(i => ({ productId: i.id, quantity: i.quantity })) },
        { headers: { Authorization: `Bearer ${user?.token}` } }
      );
      if (res.data.success) {
        setStatus("Order placed!");
        clearCart();
      } else {
        setStatus("Order failed.");
      }
    } catch {
      setStatus("Server error.");
    }
  };

  return (
    <div>
      <h2>Checkout</h2>
      {status && <div>{status}</div>}
      <button onClick={handleOrder} disabled={!cart.length}>Place Order</button>
    </div>
  );
}