import "./App.css";

import { useState } from "react";

import StripeCheckout from "react-stripe-checkout";

import axios from "axios";

import { toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

function App() {

  toast.configure()

  const [product] = useState({
    name: "Sample Book",
    price: 120,
    description: "This is a sample book",
  });

  async function handleToken(token, addresses) {
    const response = await axios.post(
      "http://localhost:8080/checkout",
      { token, product }
    );

    console.log(response.status)

    if (response.status === 200) {
      toast("Success! Check email for details", { type: "success" });
    } else {
      toast("Something went wrong", { type: "error" });
    }
  }

  return (
    <div className="App">
      <div className="container">
        <br />
        <br />
        <h1 className="text-center">Stripe Checkout</h1>
        <br />
        <h2 className="text-center">Product Info</h2>
        <h3 className="text-center">Product Name: {product.name}</h3>
        <h3 className="text-center">Product Price: {product.price}</h3>
        <h3 className="text-center">
          Product Description: {product.description}
        </h3>
        <br />
        <div className="form-group container">
          <StripeCheckout
             style={{border:'1px solid #000'}}
            className="center"
            stripeKey="##yourpublishablekey##"
            token={handleToken}
            amount={product.price * 100}
            name="Sample Book"
            billingAddress
            shippingAddress
          >
             <button className="btn">Add Credits</button>
          </StripeCheckout>
        </div>
      </div>
    </div>
  );
}

export default App;