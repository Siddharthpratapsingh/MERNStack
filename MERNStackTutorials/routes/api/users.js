const express = require('express')
const router = express.Router()
const { check,validationResult } = require('express-validation/check')
router.post("/",[check('name','Name is required').not().isEmpty(),
    check('email','Please include a valid email').isEmail(),
check(
    'password','Please enter a password with 6 or more characters'
)],(req,res) =>{
    const errors = validationResult(req)
    if(!errors.isEmpty()){
        return res.status(400).json({errors:errors.array() })
    }
    
    // See if the user exists

    // Get users gravatar


    // Encrypt password

    // Return jsonwebtoken
    console.log(req.body)
    res.send("User route")
} )

module.exports = router;