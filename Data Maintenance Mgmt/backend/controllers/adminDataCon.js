// const mongoose = require('mongoose')
// const express = require('express')
// const cors = require('cors')
// const dataModel = require('./models/Data')

// const app = express()
// app.use(express.json())
// app.use(cors())
 
// mongoose.connect("mongodb://localhost:27017/signup-login")


// app.post('/Login' ,(req,res)=>{
//     const {Email, Password} = req.body;
//     dataModel.findOne({Email: Email})
//     .then(user=>{
//         if(user){
//             if(user.Password === Password){
//                 res.json("success")
//             }
//             else{
//                 res.json("Incorrect password")
//             }
//         }
//         else{
//             res.json("No user found")
//         }
//     })
// })

// app.post('/Signup' ,(req,res)=>{
//     dataModel.create(req.body)
//     .then(signUpdata => res.json(signUpdata))
//     .catch(err => res.json(err))

// })
// module.exports = router;