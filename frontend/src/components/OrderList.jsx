import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { API_URL } from "../config";
import { AuthContext } from "../context/AuthContext";

export default function OrderList() {
  const { user } = useContext(AuthContext);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (user && user.email && user.password) {
      axios.get(`${API_URL}/orders`, {
        auth: {
          username: user.email,
          password: user.password
        }
      }).then(res => setOrders(res.data));
    } else {
      axios.get(`${API_URL}/orders`).then(res => setOrders(res.data));
    }
  }, [user]);

  return (
    <div>
      <h2>Orders</h2>
      {orders.map(order => (
        <div key={order.id} style={{border:"1px solid #ddd",margin:"1rem",padding:"1rem"}}>
          <div>Order #{order.id} - {order.status}</div>
          <div>Placed: {order.orderTime}</div>
          <ul>
            {order.items.map(item => (
              <li key={item.id}>
                {item.product.name} x {item.quantity}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}