import mongoose from "mongoose";
import { DB_URI, IP_SERVER, PORT } from "./constants.js";

export function connectDB() {
    mongoose
        .connect(DB_URI)
        .then(() => {

            console.log("#########################");
            console.log("######### API ###########");
            console.log(`http://${IP_SERVER}:${PORT}/api`);
            console.log("##INICIO CORRECTAMENTE... ##");
            console.log("#########################");


        })
        .catch((error) => {
            throw error;
        });

}