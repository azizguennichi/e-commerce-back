const route = require('express').Router()
const productModel = require('../models/product.model')

route.get('/',(req,res,next)=>{
    productModel.getThreeProducts().then(products=>{
        res.render('home',{products:products})
    })
})

module.exports = route