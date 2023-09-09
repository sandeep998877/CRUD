const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const ProductModel = require('./models/Products')
const fileUpload = require('express-fileupload')

const app = express()
app.use(cors())
app.use(express.json())

mongoose.connect("mongodb://127.0.0.1:27017/crud")
app.use(
    fileUpload({
        useTempFiles: true,
        safeFileNames: true,
        preserveExtension: true,
        tempFileDir: `${__dirname}/public/files/temp`
    })
);

app.use('/Uploads', express.static(`${__dirname}/Uploads`));

app.get('/', (req, res) => {
    ProductModel.find({})
        .then(products => res.json(products))
        .catch(err => res.json(err))
})

app.get('/getProduct/:id', (req, res) => {
    const id = req.params.id;
    ProductModel.findById({ _id: id })
        .then(products => res.json(products))
        .catch(err => res.json(err))
})

app.put('/updateProduct/:id', (req, res) => {
    const id = req.params.id;
    let uploadFile = req.files.image;
    const name = uploadFile.name;
    const md5 = uploadFile.md5;
    const saveAs = `${md5}_${name}`;
    uploadFile.mv(`${__dirname}/Uploads/${saveAs}`, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            ProductModel.findByIdAndUpdate({ _id: id },
                {
                    productName: req.body.productName,
                    description: req.body.description,
                    price: req.body.price,
                    image: `http://localhost:3001/Uploads/${saveAs}`
                })
                .then(products => res.json(products))
                .catch(err => res.json(err))
        }
    });


})

app.delete('/deleteProduct/:id', (req, res) => {
    const id = req.params.id;
    ProductModel.findByIdAndDelete({ _id: id })
        .then(response => res.json(response))
        .catch(err => res.json(err))

})

app.post("/createProduct", (req, res) => {
    let uploadFile = req.files.image;
    const name = uploadFile.name;
    const md5 = uploadFile.md5;
    const saveAs = `${md5}_${name}`;
    uploadFile.mv(`${__dirname}/Uploads/${saveAs}`, function (err) {
        if (err) {
            return res.status(500).send(err);
        }
        else {
            req.body.image = `http://localhost:3001/Uploads/${saveAs}`;
            ProductModel.create(req.body)
                .then(products => res.json(products))
                .catch(err => res.json(err))
        }
    });

})


app.listen(3001, () => {
    console.log("Server is running")
})