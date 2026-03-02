import { FacturaService } from "../../application/facturaService.js";
import { FacturaRepository  } from "../database/mongodb/facturaRepository.js";
import { FacturaController } from "./facturaController.js";


const facturaRepository = new FacturaRepository();
const serviceFactura = new FacturaService(facturaRepository);
export const facturaController = new FacturaController(serviceFactura);