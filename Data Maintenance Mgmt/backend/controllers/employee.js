
const express = new require('express')
const router = express.Router()

const EmployeeDataSchema = require('../schema/employeeSchema')

router.post("/submitData" , async(req,res)=>{
    try{

        const {userName , userEmail , userAddress,  userContact} = req.body;

        console.log("req.body = " , req.body)

        console.log("userName = " , userName)
        console.log("userEmail = " , userEmail)
        console.log("userAddress = " , userAddress)
        console.log("userContact = " , userContact)

        const newemployee = new EmployeeDataSchema({
            name : userName,
            email : userEmail,
            address : userAddress,
            contact : userContact
        })

        const response = await newemployee.save();

        
        if(response){
            console.log("response = " , response)

            res.send({message : "Success"})
        }
        



    }catch(err){
        res.send({message : "Faliure"})
    }
})


module.exports = router;