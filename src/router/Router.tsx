import DefaultLayout from '@/layouts/DefaultLayout';
import CartView from '@/modules/buyproduct/cart/CartView';
import CheckoutView from '@/modules/buyproduct/cart/customerInfo/CheckoutView';
import OrderInfoView from '@/modules/buyproduct/cart/orderInfo/OrderInfoView';
import ErrorView from '@/modules/error/ErrorView';

import HomeView from '@/modules/home/HomeView';
import { RouterProvider, createBrowserRouter } from 'react-router-dom';

const Router = () => {
	const router = createBrowserRouter([
		{
			path: '/',
			element: <DefaultLayout />,
			errorElement:<ErrorView/>,
			children: [
				{
					path: '',
					element: <HomeView />
				},
				{
					path:'cart',
					element:<CartView />
				},
				{
					path:"checkout",
					element:<CheckoutView/>
				},
				{
					path:"order",
					element:<OrderInfoView/>
				}
			]
		}
	]);
	return <RouterProvider router={router}></RouterProvider>;
};

export default Router;
