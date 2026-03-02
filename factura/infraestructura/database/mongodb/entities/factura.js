import mongoose from "mongoose";

const FacturaSchema = mongoose.Schema({
    emisor: {
        yourCompany: { type: String, required: true },
        firstNameCompany: String,
        lastNameCompany: String,
        emailCompany: String,
        phoneCompany: String,
        addressCompany: String,
        cityCompany: String,
        countryCompany: String,
        websiteCompany: String,
        logoUrl: { type: String }
    },
    cliente: {
        companyClient: { type: String, required: true },
        firstNameClient: String,
        lastNameClient: String,
        emailClient: String,
        addressClient: String,
        cityClient: String,
        countryClient: String
    },
    facturaInfo: {
        invoiceNumber: { type: String, required: true },
        invoiceDate: { type: Date, default: Date.now },
        dueDate: { type: Date }
    },
    products: [{
        description: String,
        quantity: Number,
        price: Number,
        type: { type: String, enum: ['Servicio', 'Producto'], required: true }
    }],

    totales: {
        tax: Number,
        discount: Number,
        total: Number
    },

    pdfUrl: String,
    
    notes: String
}, {
    timestamps: true
});

export const Factura = mongoose.model("Factura", FacturaSchema);