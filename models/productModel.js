// para crear el modelo del producto necesitamos el schema
const mongoose = require('mongoose');

const productSchema = mongoose.Schema(
    {
        // campo de texto
       name: mongoose.Schema.Types.String,
        quantity: {
            type: Number,
            required: true,
            default:0
        },
         price: mongoose.Schema.Types.Number,
        image: {
            type: String,
            required: false
        }
    },
    {
        timestamps: true
    }
    
)

// creamos modelo product
const Product = mongoose.model('Product', productSchema);

//importamos 
module.exports = Product;