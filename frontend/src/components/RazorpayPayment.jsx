import React from "react";

// Make sure to add Razorpay's script in your public/index.html:
// <script src="https://checkout.razorpay.com/v1/checkout.js"></script>

export default function RazorpayPayment({ amount, userEmail, onSuccess, onFailure }) {
  const handlePayment = async () => {
    // 1. Create order on backend
    const res = await fetch("http://localhost:9090/api/payment/create-order", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount }), // amount in rupees
    });
    const data = await res.json();
    if (!data["Razorpay order id"]) {
      alert("Payment order creation failed: " + data.error);
      if (onFailure) onFailure(data.error);
      return;
    }

    // 2. Launch Razorpay checkout
    const options = {
      key: "YOUR_RAZORPAY_KEY", // Replace with your Razorpay key
      amount: data.amount, // amount in paise, as returned by backend
      currency: data.currency,
      name: "Microgreens Shop",
      description: "Order Payment",
      order_id: data["Razorpay order id"],
      handler: function (response) {
        // Payment success
        alert("Payment successful! Payment ID: " + response.razorpay_payment_id);
        if (onSuccess) onSuccess(response);
      },
      prefill: {
        email: userEmail,
      },
      theme: { color: "#3399cc" },
    };
    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <button onClick={handlePayment} style={{ padding: "10px 20px", background: "#3399cc", color: "#fff", border: "none", borderRadius: 4 }}>
      Pay Now
    </button>
  );
}
