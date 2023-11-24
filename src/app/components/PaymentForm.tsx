"use client";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Product, StateProps } from "../../../types";
import FormattedPrice from "./FormattedPrice";
import { loadStripe } from "@stripe/stripe-js";
import { useSession } from "next-auth/react";
import { resetCart, saveOrder } from "@/redux/shoppingSlice";

const PaymentForm = () => {
  const dispatch = useDispatch();
  const { productData, userInfo } = useSelector(
    (state: StateProps) => state?.shopping
  );
  const [totalAmt, setTotalAmt] = useState(0);
  useEffect(() => {
    let amt = 0;
    productData.map((item: Product) => {
      amt += item.price * item.quantity;
      return;
    });
    setTotalAmt(amt);
  }, [productData]);

  // =============  Stripe Payment Start here ==============
  const stripePromise = loadStripe(
    process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!
  );
  
  const { data: session } = useSession();
  const handleCheckout = async () => {
    const stripe = await stripePromise;
    const response = await fetch("https://ecommerce-next14.vercel.app/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        items: productData,
        email: session?.user?.email,
      }),
    });
    const data = await response.json();

    if (response.ok) {
      await dispatch(saveOrder({ order: productData, id: data.id }));
      stripe?.redirectToCheckout({ sessionId: data.id });
      dispatch(resetCart());
    } else {
      throw new Error("Failed to create Stripe Payment");
    }
  }

  return (
    <div className="w-full bg-white p-4">
      <h2>Cart Totals</h2>
      {/* Subtotal */}
      <div className="border-b-[1px] border-b-slate-300 py-2">
        <div className="max-w-lg flex items-center justify-between">
          <p className="uppercase font-medium">Subtotal</p>
          <p>
            <FormattedPrice amount={totalAmt} />
          </p>
        </div>
      </div>
      {/* Shipping */}
      <div className="border-b-[1px] border-b-slate-300 py-2">
        <div className="max-w-lg flex items-center justify-between">
          <p className="uppercase font-medium">Shipping</p>
          <p>
            <FormattedPrice amount={20} />
          </p>
        </div>
      </div>
      {/* Total with shipping */}
      <div className="border-b-[1px] border-b-slate-300 py-2">
        <div className="max-w-lg flex items-center justify-between">
          <p className="uppercase font-medium">Total Price</p>
          <p>
            <FormattedPrice amount={totalAmt + 20} />
          </p>
        </div>
      </div>
      {userInfo ? (
        <button
          className="bg-black text-slate-100 mt-4 py-3 px-6 hover:bg-orange-950 cursor-pointer duration-200"
          onClick={handleCheckout}
        >
          Proceed to checkout
        </button>
      ) : (
        <div>
          <button className="bg-black text-slate-100 mt-4 py-3 px-6 hover:bg-orange-950 cursor-not-allowed duration-200">
            Proceed to checkout
          </button>
          <p className="text-base mt-1 text-red-500 font-semibold animate-bounce">
            Please login to continue
          </p>
        </div>
      )}
    </div>
  );
};

export default PaymentForm;
