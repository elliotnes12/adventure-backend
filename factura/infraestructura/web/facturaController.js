import { v2 as cloudinary } from 'cloudinary';



export class FacturaController {
  constructor(facturaService) {
    this.facturaService = facturaService;
  }

  createFactura = async (req, resp) => {
    const { products, ...datosFactura } = req.body;
    const logoFile = req.file;

    let logoUrl = "";

    console.log("Productos:", products);
    console.log("Datos de la factura:", datosFactura);

    if (logoFile) {
      const uploadResult = await cloudinary.uploader.upload(logoFile.path, {
        folder: "logos_facturas",
        resource_type: "image",
      });
      logoUrl = uploadResult.secure_url;
    }

    try{
         const result = await this.facturaService.saveFactura({datosFactura, products, logoUrl });
         return resp.status(201).send(result);
    } catch (error) {
      console.error("Error al crear la factura:", error);
        return resp.status(500).send({ error: "Error al crear la factura" });
    }
  };
};
