const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const { check,validationResult } = require('express-validation')
const User  = require("../../models/User")
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')
router.post("/",async(req,res) =>{
  
  
    const { name, email, password} = req.body
    // See if the user exists
    try{

        let user = await User.findOne({email});
        if(user){
            res.status(400).json({
                errors:[{msg:'User already exists'}]
            })
        }
        console.log(req.body)
        
        

    // Get users gravatar
    const avatar = gravatar.url(email,{
        s:'200',
        r:'pg',
        d:'mm'
    })
    user = new User({
        name,email,avatar,password
    })

    // Encrypt password
    const salt = await bcrypt.genSalt(10)
    user.password = await bcrypt.hash(password,salt)
    await user.save()
    const payload = {
        user:{
            id:user.id
        }
    }
    jwt.sign(payload,config.get('jwtSecret'),{expiresIn:360000},(err, token)=>{
        if(err) throw err;
        res.json({token})
    })
    

    }catch(err){
        console.error(err.message)
        res.status(500).send("server error")

    }
    
    
    // Return jsonwebtoken
   
} )

module.exports = router;