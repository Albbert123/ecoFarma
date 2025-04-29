import { Order } from "@/types/orderTypes";
import { api } from "./api";

export const createOrder = async (orderData: Order) => {
  try {
    //console.log("Creating order with data:", orderData);
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}