import { ResponseData } from "./Response.types";

export type OrderProduct = {
  product_id: number;
  qty: number;
  item_price: number;
  item_total: number;
};

export type Customer = {
  customer_first_name: string;
  customer_last_name: string;
  customer_address: string;
  customer_postcode: string;
  customer_city: string;
  customer_email: string;
  customer_phone?: string;
};

export type Order = Customer & {
  order_total: number;
  order_items: OrderProduct[];
};

type Items = {
  id: number;
  order_id: number;
  product_id: number;
  qty: number;
  item_price: number;
  item_total: number;
};

export type OrderData = Omit<Order, "order_items"> & {
  id: number;
  user_id: number;
  order_date: string;
  created_at: string;
  updated_at: string;
  items: Items[];
};

export type OrderResponse = ResponseData<OrderData>;
