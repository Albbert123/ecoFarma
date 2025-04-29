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

export const getUserOrders = async (user: string) => {
    try {
        const response = await api.get(`/orders/${user}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
    }
}

export const sendConfirmationEmail = async (orderData: Order) => {
    try {
        const response = await api.post('/orders/confirmation', orderData);
        return response.data;
    } catch (error) {
        console.error("Error sending confirmation email:", error);
        throw error;
    }
}
