// routes/ordersRoutes.js
import express from "express";
import { getOrderHistory } from "../controllers/ordersController.js";

const router = express.Router();

// Rota: Histórico de pedidos por ID do usuário
router.get("/orders/history/:userId", getOrderHistory);

export default router;
