import {server } from "./app.js";
import { PORT } from "./constants.js";
import { connectDB } from "./DataBaseMongo.js";

/**
 * Arquitectura Hexagonal
 *
 */

server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  connectDB();
});