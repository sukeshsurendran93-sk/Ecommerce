import Order from "../models/order.js";

const createOrder = async (req, res) => {
    try {
        const order = await Order.create({ ...req.body, user: req.user.id });
        res.status(201).json(order);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
}

const getMyOrders = async (req, res) => {
    const orders = await Order.find({ user: req.user.id });
    res.json(orders);
};

const getAllOrders = async (req, res) => {
    const orders = await Order.find().populate("user", "name email");
    res.json(orders);
};

export { createOrder, getMyOrders, getAllOrders };