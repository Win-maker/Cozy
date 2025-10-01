import { useState } from "react";
import c1 from "@/assets/Chairs/img1.svg";
import c2 from "@/assets/Chairs/img2.svg";
import c3 from "@/assets/Chairs/img3.svg";
import c4 from "@/assets/Chairs/img4.svg";
import c5 from "@/assets/Chairs/img5.svg";
import stars from "@/assets/BodyLayout/Stars.svg";
import productImage from "@/assets/BodyLayout/Product Image.svg";
import plus from "@/assets/BodyLayout/plus.svg";
import minus from "@/assets/BodyLayout/minus.svg";
import heart from "@/assets/SocialApps/heart.svg";
import facebook from "@/assets/SocialApps/facebook.svg";
import instagram from "@/assets/SocialApps/instagram.svg";
import pinterest from "@/assets/SocialApps/pinterest.svg";
import twitter from "@/assets/SocialApps/twitter.svg";

import {
  addItem,
  decreaseQty,
  increaseQty,
  selectCartItems,
} from "@/store/features/Card/cardSlice";
import { useAppDispatch, useAppSelector } from "@/store";
import { useNavigate } from "react-router-dom";

const sampleProduct = {
  id: "chair-1",
  name: "Meryl Lounge Chair",
  description:
    "The gently curved lines accentuated by sewn details are kind to your body and pleasant to look at. Also, there’s a tilt and height-adjusting mechanism that’s built to outlast years of ups and downs.",
  price: 149.99,
  discount: 12,
  color: "Lyse bright green",
  rating: 4.6,
  reviews: 556,
  images: [c1, c2, c3, c4, c5],
  mainImage: productImage,
  shippingInfo: "Free 3-5 day shipping • Tool-free assembly • 30-day trial",
};

const HomeView = () => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector(selectCartItems);

  const cartItem = cartItems.find((i) => i.id === sampleProduct.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  const handleAddToCart = () => {
    if (cartItems.length >= 1) {
      navigate("/cart");
    }
  };

  const handleIncrease = () => {
    const item = cartItems.find((i) => i.id === sampleProduct.id);

    if (item) {
      dispatch(increaseQty(sampleProduct.id));
    } else {
      dispatch(
        addItem({
          id: sampleProduct.id,
          name: sampleProduct.name,
          price: sampleProduct.price,
          quantity: 1,
          discount: sampleProduct.discount,
          color: sampleProduct.color,
        })
      );
    }
  };

  const handleDecrease = () => {
    if (cartItem && cartItem.quantity > 0) {
      dispatch(decreaseQty(sampleProduct.id));
    }
  };

  return (
    <main className="grid grid-cols-1 md:grid-cols-2 h-auto md:h-screen px-4 md:px-0 gap-6 md:gap-0 
    ">

      <div className="flex flex-col h-full justify-around md:justify-center md:gap-5 lg:gap-0 lg:justify-around lg:w-[520px] mx-auto md:mx-0 px-2 md:px-8 py-4 md:py-0">
        <div className="flex flex-col justify-center ">
          <h1 className="text-2xl md:text-3xl font-bold mb-4 font-primary">
            {sampleProduct.name}
          </h1>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-6 sm:mb-8">
            <span className="text-lg md:text-xl font-semibold font-secondary mb-2 sm:mb-0">
              ${sampleProduct.price}
            </span>
            <div className="flex items-center space-x-2">
              <img src={stars} alt="rating stars" className="h-4 md:h-5" />
              <span className="font-third text-sm md:text-base">
                {sampleProduct.rating} / 5.0{" "}
                <span className="text-[rgba(162,163,177,1)]">
                  ({sampleProduct.reviews})
                </span>
              </span>
            </div>
          </div>

          <p className="text-[rgba(23, 24, 59, 1)] mb-4 md:mb-6 font-third text-left text-sm md:text-base line-clamp-4">
            {sampleProduct.description}
          </p>


          <div className="flex items-stretch gap-2 md:gap-4 mb-4 w-full sm:max-w-[250px] lg:max-w-[350px]">
            <div
              className="w-1/2 flex items-center justify-between border rounded-sm overflow-hidden px-3 py-2 cursor-pointer"
              style={{ borderColor: "rgba(162, 163, 177, 1)" }}
            >
              <img
                src={minus}
                onClick={handleDecrease}
                className="w-3 h-3 md:w-4 md:h-4 cursor-pointer"
              />
              <span className="px-2 md:px-4">{quantity}</span>
              <img
                src={plus}
                onClick={handleIncrease}
                className="w-3 h-3 md:w-4 md:h-4 cursor-pointer"
              />
            </div>

            <button
              className={`w-1/2 flex items-center justify-center rounded-sm text-sm md:text-base 
    ${
      cartItems.length > 0
        ? "bg-[rgba(58,163,159,1)] text-white cursor-pointer"
        : "bg-gray-300 text-gray-500 cursor-not-allowed"
    }`}
              onClick={handleAddToCart}
              disabled={cartItems.length === 0}
            >
              Add to Cart
            </button>
          </div>

          <p className="font-third text-[12px] md:text-[16px] mb-4">
            {sampleProduct.shippingInfo}
          </p>
        </div>

 
        <div className="flex justify-between lg:pt-20">
          <div className="flex items-center">
            <img src={heart} className="w-4 h-4 md:w-5 md:h-5" />
            <p className="text-[rgba(58,163,159,1)] ml-2 text-sm md:text-base">
              Add to Wishlist
            </p>
          </div>

          <div className="flex items-center">
            <img src={facebook} alt="facebook" className="w-3 h-3 md:w-4 md:h-4" />
            <img src={twitter} alt="twitter" className="w-3 h-3 md:w-4 md:h-4 ml-2" />
            <img src={pinterest} alt="pinterest" className="w-3 h-3 md:w-4 md:h-4 ml-2" />
            <img src={instagram} alt="instagram" className="w-3 h-3 md:w-4 md:h-4 ml-2" />
          </div>
        </div>
      </div>

 
      <div className="flex flex-col items-center justify-start md:justify-center h-full md:h-full md:ml-auto px-2 md:px-0 py-4 md:py-0">
        <div className="w-full flex flex-col items-center">
          <img
            src={sampleProduct.mainImage}
            alt={sampleProduct.name}
            className="w-full h-auto object-contain mb-4 md:mb-6"
          />
        </div>


        <p className="mb-2 font-semibold text-sm md:text-base">
          <span className="-translate-y-[1px] inline-block text-[rgba(23, 24, 59, 1)]">
            {String(selectedIndex + 1).padStart(2, "0")}
          </span>
          <span className="color-gray mx-1">/</span>
          <span className="color-gray">
            {String(sampleProduct.images.length).padStart(2, "0")}
          </span>
        </p>


        <div className="flex flex-wrap gap-2 md:gap-4 justify-center">
          {sampleProduct.images.map((img, i) => (
            <button
              key={i}
              onClick={() => setSelectedIndex(i)}
              className={`border-2 rounded-md p-1 ${
                i === selectedIndex
                  ? "border-transparent"
                  : "border-transparent"
              }`}
            >
              <img
                src={img}
                alt={`thumbnail-${i}`}
                className="w-12 h-12 md:w-16 md:h-16 object-contain cursor-pointer"
              />
            </button>
          ))}
        </div>
      </div>
    </main>
  );
};

export default HomeView;
