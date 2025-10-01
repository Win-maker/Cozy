import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { Suspense, lazy } from "react";

import DefaultLayout from "@/layouts/DefaultLayout";
import ErrorView from "@/modules/error/ErrorView";

import HomeView from "@/modules/home/HomeView";

const CartView = lazy(() => import("@/modules/buyproduct/cart/CartView"));
const CheckoutView = lazy(() =>
  import("@/modules/buyproduct/cart/customerInfo/CheckoutView")
);
const OrderInfoView = lazy(() =>
  import("@/modules/buyproduct/cart/orderInfo/OrderInfoView")
);

const Router = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <DefaultLayout />,
      errorElement: <ErrorView />,
      children: [
        {
          path: "",
          element: <HomeView />, 
        },
        {
          path: "cart",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <CartView />
            </Suspense>
          ),
        },
        {
          path: "checkout",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <CheckoutView />
            </Suspense>
          ),
        },
        {
          path: "order",
          element: (
            <Suspense fallback={<div>Loading...</div>}>
              <OrderInfoView />
            </Suspense>
          ),
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
};

export default Router;
