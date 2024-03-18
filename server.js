// .Trabajaremos con la casbeza y las manos
const express = require('express')
const mongoose = require('mongoose')
const Product = require('./models/productModel')

const app = express();

// .para analizar el cuerpo de la solicitud
app.use(express.json())

app.get('/', (req, res) =>{
  res.send('Hello World')
})

app.get('/products', async (req, res) =>{
try{
    const productos = await Product.find({})
    res.status(200).json(productos)
}catch(error){
    res.status(500).json({message: error.message})
}
    
});

// .id
app.get('/products/:id', async(req, res) => {
    try {
        // .si la promesa se resuelve
        const {id} = req.params;
        const product = await Product.findById(id);
        res.status(200).json(product)
        
    }catch(error){
        res.status(500).json({message: error.message})
    }
})



app.post('/products', async(req, res) => {
    try {
        const product = await Product.create(req.body);
        res.status(200).json(product)

    } catch(error){
        console.log(error.message);
        res.status(500).json({message: error.message})
    }
});

// actualizar product

app.put('/products/:id', async (req, res) => {
    try{
        const {id} = req.params;
        const product = await Product.findByIdAndUpdate(id, req.body);

        if(!product){
            return res.status(404).json({message: `no se encontro product con id ${id}`})
        }
        res.status(200).json(product)

    }catch(error) {
        res.status(500).json({message: error.message})
    }
});
// .eliminar producto
app.delete('/products/:id', async (req, res) => {
    try {
        // guarda en un objeto el id que viene del id y lo consultamos con un req.params
        const {id} = req.params;
        const product = await Product.findByIdAndDelete(id);
        if(!product){
            return res.status(404).json({message: `no se encontro producto ${id}`})
        }
        res.status(200).json(product)

    }catch (error){
        res.status(200).json({message: error.message})
    }
})


mongoose.set('strictQuery', false)
mongoose.
connect('mongodb+srv://admin:admin@devtaminapi.so4sbfb.mongodb.net/Node-API?retryWrites=true&w=majority&appName=DevtaminAPI')
.then(() =>{
    app.listen(3000, () => {
    console.log('corriendo en el puerto 3000')
      console.log('conectado a base datos mongo')
});
}).catch((error) => {
    console.log(error)
})
