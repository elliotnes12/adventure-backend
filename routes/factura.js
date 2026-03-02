

import express from "express";
import { facturaController } from "../factura/infraestructura/web/index.js";
import { mdAuth } from "../factura/infraestructura/middlewares/FacturaMiddleware.js";

const api = express.Router();

/**
 * @swagger
 * /api/v1/factura/create:
 *   post:
 *     summary: create Factura
 *     requestBody:
 *      required: true
 *      content:
 *        multipart/form-data:
 *          schema:
 *             type: object
 *     responses:
 *       200:
 *         description: Factura created successfully
 */

api.post("/create",[mdAuth.upload.single('fileImage')], facturaController.createFactura);

export const facturaRoutes = api;