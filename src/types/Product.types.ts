import { ResponseData } from "../types/Response.types";

export type Tag = { id: number; name: string; slug: string };

export type Product = {
  id: number;
  name: string;
  description?: string;
  price: number;
  on_sale: boolean;
  images: {
    thumbnail: string;
    large: string;
  };
  stock_status: string;
  stock_quantity: number | null;
  tags: Tag[];
};

export type CartProduct = Product & {
  amount: number;
  total_price: number;
};

export type TagProducts = Partial<Product> & {
  products: Product[];
  slug: string;
};

export type ProductsResponse = ResponseData<Product[]>;
export type ProductResponse = ResponseData<Product>;
export type TagResponse = ResponseData<Tag[]>;
export type TagProductsResponse = ResponseData<TagProducts>;
