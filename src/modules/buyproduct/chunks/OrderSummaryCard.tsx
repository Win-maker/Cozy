import { FC } from "react";
import { Button } from "@/components/ui/button";
import { useAppDispatch, useAppSelector } from "@/store";
import { clearCart, selectCartItems } from "@/store/features/Card/cardSlice";
import coupon from "@/assets/CartView/Vector.svg";
import { useNavigate, useLocation } from "react-router-dom";
import { clearOrder } from "@/store/features/Order/orderSlice";

interface OrderSummaryCardProps {
  onCheckout?: () => void;
  isFormValid?: boolean;
}

const OrderSummaryCard: FC<OrderSummaryCardProps> = ({
  onCheckout,
  isFormValid,
}) => {
  const cartItems = useAppSelector(selectCartItems);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const location = useLocation();

  const localStorageCart = JSON.parse(
    localStorage.getItem("orderCart") || "[]"
  );
  const displayCartItems = cartItems.length > 0 ? cartItems : localStorageCart;

  const subtotal = displayCartItems.reduce(
    (acc: number, item: CartItem) => acc + item.price * item.quantity,
    0
  );
  const discount = displayCartItems.reduce(
    (acc: number, item: CartItem) => acc + (item.discount || 0) * item.quantity,
    0
  );
  const couponDiscount = 0;
  const shipping = subtotal > 0 ? 0 : 0;
  const total = subtotal - discount - couponDiscount + shipping;

  let buttonText = "";
  let handleClick = () => {};

  if (location.pathname === "/cart") {
    buttonText = "Proceed to Checkout";
    handleClick = () => navigate("/checkout");
  } else if (location.pathname === "/checkout") {
    buttonText = "Buy";
    handleClick = () => {
      if (onCheckout) onCheckout();

      const cart = [...cartItems];
      localStorage.setItem("orderCart", JSON.stringify(cart));

      dispatch(clearCart());
      navigate("/order");
    };
  } else if (location.pathname === "/order") {
    buttonText = "Save Gallery";
    handleClick = () => {
      dispatch(clearCart());
      dispatch(clearOrder());

      localStorage.removeItem("orderCart");

      navigate("/");
    };
  }

  return (
    <div
      className="border w-full md:w-[80%] h-full px-4 py-2"
      style={{ borderColor: "rgba(209, 209, 216, 1)" }}
    >
      <div className="px-4 py-3">
        <h2 className="font-bold text-[24px]">Order Summary</h2>
      </div>

      <div className="flex flex-col justify-between h-full px-4 py-4 space-y-4">
        <div className="space-y-4">
          <div className="space-y-4">
            <div className="flex justify-between text-cadet">
              <span>Price</span>
              <span>${subtotal.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-cadet">
              <span>Discount</span>
              <span>${discount.toFixed(2)}</span>
            </div>
            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-[rgba(58,163,159,1)]">
                {shipping === 0 ? "Free" : `$${shipping}`}
              </span>
            </div>
            <div className="flex justify-between text-cadet">
              <span>Coupon Applied</span>
              <span>${couponDiscount.toFixed(2)}</span>
            </div>
          </div>

          <hr className="border-[rgba(209,209,216,1)]" />

          <div className="flex justify-between items-center">
            <p className="text-[rgba(23,24,59,1)]">TOTAL</p>
            <p className="font-semibold text-[rgba(23,24,59,1)]">
              ${total.toFixed(2)}
            </p>
          </div>

          <div className="flex justify-between items-center">
            <p className="text-[rgba(23,24,59,1)]">Estimated Delivery by</p>
            <p className="font-semibold text-[rgba(23,24,59,1)]">
              01 Feb, 2023
            </p>
          </div>
        </div>

        <div className="space-y-4">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Coupon Code"
              className="w-full border border-[rgba(209,209,216,1)] rounded-md px-3 py-3 pr-10 
                 bg-transparent outline-none text-[rgba(23,24,59,1)] placeholder:text-[rgba(162,163,177,1)]"
            />
            <img
              src={coupon}
              alt="coupon"
              className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5"
            />
          </div>
        </div>

        <Button
          className="w-full mt-4 py-3 font-secondary font-semibold cursor-pointer"
          size="lg"
          style={{
            backgroundColor: "rgba(58, 163, 159, 1)",
            color: "rgba(255, 255, 255, 1)",
          }}
          disabled={location.pathname === "/checkout" ? !isFormValid : false}
          onClick={handleClick}
        >
          {buttonText}
        </Button>
      </div>
    </div>
  );
};

export default OrderSummaryCard;
