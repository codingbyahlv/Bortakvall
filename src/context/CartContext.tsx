import React from "react";
import { createContext, useState, useEffect } from "react";
import { Product, CartProduct } from "../types/Product.types";
import { Customer } from "../types/Order.types";

type CartContextType = {
  customer: Customer;
  handleCustomer: (customer: Customer) => void;
  alertMsg: AlertType;
  handleAlertMsg: (msgType: AlertType) => void;
  cart: CartProduct[] | null;
  addProduct: (newProduct: Product) => void;
  removeProduct: (productToRemove: CartProduct) => void;
  incrementAmount: (product: CartProduct) => void;
  decrementAmount: (product: CartProduct) => void;
  resetCart: () => void;
};

type CartContextProviderProps = {
  children: React.ReactNode;
};

type AlertType = "success" | "error" | "errorCart" | null;

const loadFromLocalStorage = (key: string) => {
  const data = localStorage.getItem(key);
  return data ? JSON.parse(data) : null;
};

export const CartContext = createContext<CartContextType | null>(null);

const CartContextProvider: React.FC<CartContextProviderProps> = ({
  children,
}) => {
  const initialCart = (loadFromLocalStorage("cart") as CartProduct[]) || [];
  const initialCustomer = (loadFromLocalStorage("customer") as Customer) || {};

  const [cart, setCart] = useState(initialCart);
  const [customer, setCustomer] = useState(initialCustomer);
  const [alertMsg, setAlertMsg] = useState<AlertType>(null);

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem("customer", JSON.stringify(customer));
  }, [customer]);

  const handleCustomer = (customer: Customer) => {
    setCustomer(customer);
  };

  const handleAlertMsg = (msgType: AlertType) => {
    if (msgType === "success") {
      setAlertMsg("success");
    } else if (msgType === "error") {
      setAlertMsg("error");
    } else if (msgType === "errorCart") {
      setAlertMsg("errorCart");
    } else {
      setAlertMsg(null);
    }
  };

  const addProduct = (newProduct: Product) => {
    if (cart === null) {
      setCart([{ ...newProduct, amount: 1, total_price: newProduct.price }]);
    } else {
      const exist = cart.find((item) => item.id === newProduct.id);

      if (exist) {
        const inStock =
          exist.stock_quantity !== null &&
          exist.amount + 1 <= exist.stock_quantity;

        if (!inStock) {
          handleAlertMsg("error");
          return;
        } else {
          setCart(
            cart.map((item) =>
              item.id === newProduct.id
                ? {
                    ...exist,
                    amount: exist.amount + 1,
                    total_price: (exist.amount + 1) * item.price,
                  }
                : item
            )
          );
        }
      } else {
        setCart([
          ...cart,
          { ...newProduct, amount: 1, total_price: newProduct.price },
        ]);
      }
    }
  };

  const decrementAmount = (product: CartProduct) => {
    if (cart !== null) {
      const productExist = cart?.find((item) => item.id === product.id);
      if (productExist) {
        setCart(
          cart.map((item) =>
            item.id === product.id
              ? {
                  ...productExist,
                  amount: productExist.amount + -1,
                  total_price: (productExist.amount + -1) * item.price,
                }
              : item
          )
        );

        if (productExist.amount + -1 === 0) {
          removeProduct(productExist);
        }
      }
    }
  };

  const incrementAmount = (product: CartProduct) => {
    if (cart !== null) {
      const productExist = cart?.find((item) => item.id === product.id);
      if (productExist) {
        const inStock =
          productExist.stock_quantity !== null &&
          productExist.amount + 1 <= productExist.stock_quantity;

        if (!inStock) {
          handleAlertMsg("errorCart");
          return;
        } else {
          setCart(
            cart.map((item) =>
              item.id === product.id
                ? {
                    ...productExist,
                    amount: productExist.amount + 1,
                    total_price: (productExist.amount + 1) * item.price,
                  }
                : item
            )
          );
        }
      }
    }
  };

  const removeProduct = (productToRemove: CartProduct) => {
    if (cart === null) {
      return;
    } else {
      const updatedCart = cart.filter(
        (product) => product.id !== productToRemove.id
      );
      setCart(updatedCart);
    }
  };

  const resetCart = () => {
    setCart([] as CartProduct[]);
  };

  return (
    <CartContext.Provider
      value={{
        customer,
        handleCustomer,
        alertMsg,
        cart,
        handleAlertMsg,
        addProduct,
        removeProduct,
        incrementAmount,
        decrementAmount,
        resetCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
