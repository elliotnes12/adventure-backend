
import PDFDocument from 'pdfkit';

export class FacturaService {

    constructor(facturaRepository) {
        this.facturaRepository = facturaRepository;
    }


    /**
     *  Calcula el total, impuestos y descuentos de la factura, guarda la factura en la base de datos y genera un PDF en base64 
     * @param {*} payLoad 
     * @returns 
     */
 
    async saveFactura(payLoad) {

        let total = 0;
        let totalTax = 0;
        let discount = 0;

        const {datosFactura, products, logoUrl } = payLoad;
    
        for(const product of JSON.parse(products)) {

            if(product.type === 'Servicio') {
                const discountRate = 0.10;
                const quantity = Number(product.quantity) || 0;
                const unitPrice = Number(product.price) || 0;
                const baseSubtotal = unitPrice * quantity;
                const discountAmount = baseSubtotal * discountRate;
                const subtotalWithDiscount = baseSubtotal - discountAmount;
                const taxRate = 0.12;
                const taxAmount = subtotalWithDiscount * taxRate;
                
                discount += discountAmount;
                total += subtotalWithDiscount + taxAmount;
                totalTax += taxAmount;

            } else if(product.type === 'Producto') {
                const discountRate = 0.05;
                const quantity = Number(product.quantity) || 0;
                const unitPrice = Number(product.price) || 0;
                const baseSubtotal = unitPrice * quantity;
                const discountAmount = baseSubtotal * discountRate;
                const subtotalWithDiscount = baseSubtotal - discountAmount;
                const taxRate = 0.12;
                const taxAmount = subtotalWithDiscount * taxRate;
                
                 
                discount += discountAmount;
                total += subtotalWithDiscount + taxAmount;
                totalTax += taxAmount;

            }
        }   

        await this.facturaRepository.saveFactura({datosFactura, products, logoUrl,total, discount, totalTax });

        const pdfBase64 = await this.generatePDF(payLoad,  { total, totalTax, discount });
       
        return { message: "Factura creada exitosamente", total, discount, totalTax, pdf: pdfBase64 };
    };
    

    /**
     * Genera un PDF de la factura
     * @param {} payLoad 
     * @param {*} totals 
     * @returns 
     */

    generatePDF(payLoad, totals) {
        return new Promise((resolve, reject) => {
            const doc = new PDFDocument({ margin: 50 });
            const { datosFactura, products } = payLoad;
            const parsedProducts = JSON.parse(products);
            const chunks = [];

            doc.on('data', chunk => chunks.push(chunk));
            doc.on('end', () => {
                const pdfBuffer = Buffer.concat(chunks);
                resolve(pdfBuffer.toString('base64'));
            });
            doc.on('error', reject);

            doc.fontSize(20).text('Factura', { align: 'center' });
            doc.moveDown();

            doc.fontSize(12).text(`Cliente: ${datosFactura.companyClient}`);
            doc.text(`Fecha: ${new Date().toLocaleDateString()}`);
            doc.moveDown();

            doc.text('##################################################################');
            doc.text('Producto | Cant. | Precio | Tipo');
            doc.text('##################################################################');
            parsedProducts.forEach(p => {
                doc.text(`${p.name || 'Item'} | ${p.quantity} | $${p.price} | ${p.type}`);
            });

            doc.text('##################################################################');
            doc.moveDown();

            doc.fontSize(14).text(`Descuento Total: $${totals.discount}`, { align: 'right' });
            doc.text(`Impuestos (IVA): $${totals.totalTax}`, { align: 'right' });
            doc.fontSize(16).text(`TOTAL A PAGAR: $${totals.total}`, { align: 'right' });

            doc.end();
        });
    }

}