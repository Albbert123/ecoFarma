import { Order } from "@/types/orderTypes";
import { api } from "./api";

export const createOrder = async (orderData: Order) => {
  try {
    const response = await api.post('/orders', orderData);
    return response.data;
  } catch (error) {
    console.error("Error creating order:", error);
    throw error;
  }
}

export const getAllOrders = async () => {
    try {
        const response = await api.get('/orders');
        return response.data;
    } catch (error) {
        console.error("Error fetching all orders:", error);
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

export const getOrderById = async (id: string) => {
    try {
        const response = await api.get(`/orders/id/${id}`);
        return response.data;
    } catch (error) {
        console.error("Error fetching order by ID:", error);
        throw error;
    }
}

export const getOrderByUserDate = async (user: string, date: string) => {
    try {
        const response = await api.get(`/orders/by-user-and-date`, {
            params: { user, date }
        });
        return response.data;
    } catch (error) {
        console.error("Error fetching order by user and date:", error);
        throw error;
    }
};

export const sendConfirmationEmails = async (orderData: Order) => {
    try {
        const response = await api.post('/orders/confirmation', orderData);
        return response.data;
    } catch (error) {
        console.error("Error sending confirmation email:", error);
        throw error;
    }
}

export const updateOrderStatus = async (orderId: string, status: string) => {
    try {
        const response = await api.put(`/orders/${orderId}`, { status });
        return response.data;
    } catch (error) {
        console.error("Error updating order status:", error);
        throw error;
    }
}

export const deleteOrder = async (orderId: string) => {
    try {
        const response = await api.delete(`/orders/${orderId}`);
        return response.data;
    } catch (error) {
        console.error("Error deleting order:", error);
        throw error;
    }
}
