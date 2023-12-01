import axios from "axios";
import {
  ProductsResponse,
  ProductResponse,
  TagResponse,
  TagProductsResponse,
} from "../types/Product.types";
import { Order, OrderResponse } from "../types/Order.types";

const BASE_URL = "https://www.bortakvall.se/api/v2";

const instance = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

const get = async <T>(endpoint: string) => {
  const response = await instance.get<T>(endpoint);
  return response.data;
};

export const getAllProducts = () => {
  return get<ProductsResponse>(`/products`);
};

export const getProduct = (id: number) => {
  return get<ProductResponse>(`/products/${id}`);
};

export const getAllTags = () => {
  return get<TagResponse>(`/tags`);
};

export const getTag = (id: number) => {
  return get<TagProductsResponse>(`/tags/${id}`);
};

const post = async <Payload, Response>(endpoint: string, data: Payload) => {
  const response = await instance.post<Response>(endpoint, data);
  return response.data;
};

export const postOrder = (order: Order) => {
  return post<Order, OrderResponse>(`/users/21/orders`, order);
};
