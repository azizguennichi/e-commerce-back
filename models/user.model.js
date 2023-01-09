const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

var userSchema = mongoose.Schema({
    email:String,
    userName:String,
    password:String
})

var User = mongoose.model('user',userSchema)
var url = "mongodb://127.0.0.1/e-commerce"

exports.register = (email,userName,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            return User.findOne({email:email})
        }).then((user)=>{
            if(user){
                mongoose.disconnect()
                reject('this email already exist')
            }else{
                bcrypt.hash(password,10).then((hashPassword)=>{
                    let user = new User({
                        email:email,
                        userName:userName,
                        password:hashPassword
                    })
                    return user.save().then((save)=>{
                        mongoose.disconnect()
                        resolve(save)
                    }).catch((err)=>{
                        mongoose.disconnect()
                        reject(err)
                    })
                }).catch((err)=>{
                    mongoose.disconnect()
                        reject(err)
                })
            }
        })
    })
}

exports.login=(email,password)=>{
    return new Promise((resolve,reject)=>{
        mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(()=>{
            return User.findOne({email:email})
        }).then((user)=>{
            if(!user){
                mongoose.disconnect()
                reject('we dont have this email')
            }else{
                bcrypt.compare(password,user.password).then((same)=>{
                    if(!same){
                        mongoose.disconnect()
                        reject('invalid password')
                    }else{
                        mongoose.disconnect()
                        resolve(same)
                    }
                }).catch((err)=>{
                    mongoose.disconnect()
                    reject(err)
                })
            }
        })
    })
}