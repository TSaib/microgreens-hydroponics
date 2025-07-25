import React from "react";

export default function Cart({ cart, setCart, onCheckout }) {
  const remove = id => setCart(cart.filter(item => item.id !== id));
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Cart</h2>
      {cart.length === 0 && <div>Your cart is empty.</div>}
      {cart.map(item => (
        <div key={item.id}>
          <span>{item.name} - ₹{item.price} x {item.quantity}</span>
          <button onClick={() => remove(item.id)}>Remove</button>
        </div>
      ))}
      <div>Total: ₹{total}</div>
      <button onClick={onCheckout} disabled={!cart.length}>Checkout</button>
    </div>
  );
}