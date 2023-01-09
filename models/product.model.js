const mongoose = require('mongoose')


var productSchema=mongoose.Schema({
    name:String,
    description:String,
    price:Number,
    image:String
})

var Product = mongoose.model('products',productSchema)
var url = "mongodb://127.0.0.1/e-commerce"

exports.postProduct = (name,description,price,image)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
         let product = new Product({
                name:name,
                description:description,
                price:price,
                image:image
         })
         return product.save()
        }).then(()=>{
            resolve("added")
        }).catch((err)=>{
            reject(err)
        })
    })
} 

exports.getAllProducts=()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            return Product.find({})
        }).then((products)=>{
            mongoose.disconnect()
            resolve(products)
        }).catch((err)=>reject(err))
    })
}


exports.getThreeProducts = ()=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            return Product.find({}).limit(4)
        }).then((products)=>{
            mongoose.disconnect()
            resolve(products)
        }).catch((err)=>reject(err))
    })
}