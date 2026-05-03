export interface Product {
  id: number;
  name: string;
  price: number;
  oldPrice?: number;
  rating: number;
  reviews: number;
  image: string;
  category: string;
  stock: number;
}

export enum OrderStatus {
  PENDING = 'Pending',
  SHIPPED = 'Shipped',
  DELIVERED = 'Delivered',
  CANCELLED = 'Cancelled',
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  amount: number;
  status: OrderStatus;
  date: string;
  items: number;
}

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  totalOrders: number;
  totalSpent: number;
}

export interface SalesData {
  name: string;
  sales: number;
}
