const route = require('express').Router()
const productModel = require('../models/product.model')
const multer = require('multer')

route.post('/admin',multer({
    storage : multer.diskStorage({
        destination:function(req, file, cb){
          cb(null, 'assets/uploads')
        },
        filename:function(req, file, cb){
            cb(null,  Date.now()+'-' +file.originalname )
        }
    })
    }).single('image'),(req,res,next)=>{
    productModel.postProduct(req.body.name,req.body.description,req.body.price,req.file.filename)
    .then(()=>res.redirect('/admin'))
    .catch((err)=>res.status(400).send(err))
})


route.get('/products',(req,res,next)=>{
    productModel.getAllProducts().then(products=>{
        res.render('products',{products:products})
    })
})


module.exports = route