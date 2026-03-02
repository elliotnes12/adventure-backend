import { Factura } from "./entities/factura.js";

export class FacturaRepository {


    async saveFactura(facturaData) {
        const { datosFactura, products, logoUrl, total, discount, totalTax } = facturaData;

    
        const productos = JSON.parse(products).map((product) => ({
                description: product.description || "",
                quantity: Number(product.quantity) || 0,
                price: Number(product.price) || 0,
                type: product.type
            }))


        const facturaDocument = {
            emisor: {
                yourCompany: datosFactura.yourCompany,
                firstNameCompany: datosFactura.firstNameCompany,
                lastNameCompany: datosFactura.lastNameCompany,
                emailCompany: datosFactura.emailCompany,
                phoneCompany: datosFactura.phoneCompany,
                addressCompany: datosFactura.addressCompany,
                cityCompany: datosFactura.cityCompany,
                countryCompany: datosFactura.countryCompany,
                websiteCompany: datosFactura.websiteCompany,
                logoUrl
            },
            cliente: {
                companyClient: datosFactura.companyClient,
                firstNameClient: datosFactura.firstNameClient,
                lastNameClient: datosFactura.lastNameClient,
                emailClient: datosFactura.emailClient,
                addressClient: datosFactura.addressClient,
                cityClient: datosFactura.cityClient,
                countryClient: datosFactura.countryClient
            },
            facturaInfo: {
                invoiceNumber: datosFactura.invoceNumber,
                invoiceDate: datosFactura.invoiceDate,
                dueDate: datosFactura.dueDate
            },
            products: productos,
            totales: {
                tax: Number(totalTax) || 0,
                discount: Number(discount) || 0,
                total: Number(total) || 0
            }
        };


        return await Factura.create(facturaDocument);
    }
 

}