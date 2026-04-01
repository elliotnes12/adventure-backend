import express from "express";
import http from "http";
import morgan from "morgan";
import cors from 'cors';
import dotenv from 'dotenv';
import { facturaRoutes } from "./routes/factura.js";
import swaggerUi from "swagger-ui-express";
import { swaggerSpec } from "./swagger.js";
import { v2 as cloudinary } from 'cloudinary';


dotenv.config();

const app = express();
const server = http.createServer(app);
app.use(express.json());

app.use(cors({
    origin: '*', // Permite peticiones desde cualquier lugar (incluyendo tu IP 34.70.191.84)
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

app.set('trust proxy', true);


app.use(express.urlencoded({ extended: true }));

app.use(express.static("uploads"));


app.use(cors());


app.use(morgan("dev"));

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
app.get("/api-docs.json", (req, res) => {
	res.setHeader("Content-Type", "application/json");
	res.send(swaggerSpec);
});


app.use("/api/v1/factura", facturaRoutes);

//Cloudinary

cloudinary.config({
    cloud_name: 'dlbyt2oob',
    api_key: '693789867285246',
    api_secret: 'Vt6T0jjVnI81jUGYBkbFDS6Hqa8'
})


export { server };
