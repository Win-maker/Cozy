type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  discount: number | null;
  color?: string;
};

type CartState = {
  items: CartItem[];
  shipping: number; 
  couponCode: string | null;
};
