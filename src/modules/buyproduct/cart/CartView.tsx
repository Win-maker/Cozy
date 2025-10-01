import { Button } from "@/components/ui/button";
import chair from "@/assets/CartView/img.svg";
import percent from "@/assets/CartView/percent.svg";
import plus from "@/assets/BodyLayout/plus.svg";
import minus from "@/assets/BodyLayout/minus.svg";
import {
  clearCart,
  decreaseQty,
  increaseQty,
  selectCartItems,
} from "@/store/features/Card/cardSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { useNavigate } from "react-router-dom";
import OrderSummaryCard from "../chunks/OrderSummaryCard";

const CartView = () => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);
  const navigate = useNavigate();


  const handleIncrease = (id: string) => {
    const item = cartItems.find((i) => i.id === id);
    if (item) dispatch(increaseQty(id));
  };

  const handleDecrease = (id: string) => {
    const item = cartItems.find((i) => i.id === id);
    if (item && item.quantity > 0) dispatch(decreaseQty(id));
  };

  const handleRemoveCart = () => {
    dispatch(clearCart());
    navigate("/");
  };

  return (
    <div className="w-full min-h-screen p-4 md:py-10 flex flex-col md:flex-row justify-center items-start">
      <div className="w-full md:w-[50%] lg:w-[55%] flex flex-col space-y-10 mb-6">
        <div className="flex flex-row space-x-4 items-baseline mb-6 md:mb-10">
          <h1 className="font-bold font-third text-[32px]">Cart</h1>
          <p className="text-[20px] text-[rgba(162,163,177,1)] font-semibold">
            {cartItems.length} {cartItems.length === 1 ? "ITEM" : "ITEMS"}
          </p>
        </div>

        {cartItems.length === 0 ? (
          <div className="flex flex-col items-center space-y-4">
            <p className="text-center text-gray-500">Your cart is empty.</p>
            <button
              onClick={() => navigate("/")}
              style={{
                backgroundColor: "rgba(58, 163, 159, 1)",
                color: "rgba(255, 255, 255, 1)",
              }}
              className="px-3 py-2 rounded-sm cursor-pointer"
            >
              Shop Now
            </button>
          </div>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="mb-6 flex flex-col lg:flex-row justify-between items-end lg:items-start w-full border-b border-[rgba(209,209,216,1)] pb-6"
            >
              <div className="flex w-full md:w-auto">
                <div className="w-full md:w-32 h-32 flex items-center justify-center mb-4 md:mb-0">
                  <img
                    src={chair}
                    className="w-full h-full object-contain"
                    alt={item.name}
                  />
                </div>

                <div className="flex flex-col space-y-5 justify-between h-auto min-w-[250px] font-secondary md:ml-4">
                  <h3 className="font-semibold text-[20px]">{item.name}</h3>
                  <p className="text-[16px]">
                    <span className="text-[rgba(162,163,177,1)]">Color:</span>{" "}
                    <span className="font-semibold text-[rgba(23,24,59,1)]">
                      {item.color}
                    </span>
                  </p>

                  <div className="flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-3 items-start sm:items-center">
                    <div
                      className="w-full sm:w-[130px] flex items-center justify-between border rounded-sm overflow-hidden px-3 py-2 cursor-pointer"
                      style={{ borderColor: "rgba(162, 163, 177, 1)" }}
                    >
                      <img
                        src={minus}
                        onClick={() => handleDecrease(item.id)}
                        className="w-3 h-3 md:w-4 md:h-4 cursor-pointer"
                      />
                      <span className="px-2 md:px-4">{item.quantity}</span>
                      <img
                        src={plus}
                        onClick={() => handleIncrease(item.id)}
                        className="w-3 h-3 md:w-4 md:h-4 cursor-pointer"
                      />
                    </div>

                    <Button
                      variant="ghost"
                      className="text-[rgba(239,68,68,1)] cursor-pointer p-0 h-auto hover:no-underline focus:no-underline active:no-underline"
                      onClick={handleRemoveCart}
                    >
                      Remove
                    </Button>
                  </div>
                </div>
              </div>

              <div className="text-right p-2 sm:mr-10 text-[20px] text-[rgba(23,24,59,1)] font-semibold mt-4 md:mt-0">
                ${item.price * item.quantity}
              </div>
            </div>
          ))
        )}

        {cartItems.length > 0 && (
<div
  className="flex space-x-3 items-center text-[rgba(23,24,59,1)] w-full md:w-fit p-3 py-4 rounded-sm border bg-[rgba(242,242,247,1)] border-[rgba(58,163,159,1)]"
>
  <img src={percent} alt="percent" className="w-4 h-4" />
  <span>
    10% Instant Discount with Federal Bank Debit Cards on a min spend
    of $150. TCA
  </span>
</div>

        )}
      </div>

      <div className="w-full md:w-[50%] lg:w-[45%] flex sm:justify-center sm:items-start md:justify-end lg:justify-center px-0 md:px-4 mt-6 md:mt-0">
        <OrderSummaryCard/>
      </div>
    </div>
  );
};

export default CartView;
