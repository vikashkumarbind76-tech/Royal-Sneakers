
export type Category = 'All' | 'Sneakers' | 'Shoes' | 'Apparel';

export interface Product {
  id: string;
  name: string;
  price: number;
  category: Category;
  image: string;
  isFeatured?: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface InstagramPost {
  id: string;
  imageUrl: string;
  likes: number;
  comments: number;
}

export interface User {
  name: string;
  email: string;
  isAdmin?: boolean;
}

export interface Order {
  id: string;
  customerName: string;
  date: string;
  total: number;
  status: 'Pending' | 'Shipped' | 'Delivered' | 'Cancelled';
  items: CartItem[];
}
