const express = require("express")
const router = express.Router()
const user = require("../models/Users")
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const dotenv = require('dotenv')
dotenv.config()
const jwtsecret = process.env.jwtSecret //env data

 




const baseEmailChain = [body('email', "invalid email").isEmail(), body('password', "invalid password").isLength({ min: 5 })];
router.post("/createuser", baseEmailChain, async (req, res) => {
   const errors = validationResult(req); 
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), error: "Credentials are invalid"   });
   }
   
   
   let emailExist = await user.findOne( {email:req.body.email} );
   if (emailExist){
      return res.status(400).json({ error: "Email already exists"});
   }
   
   let saltRounds = 10;

   try {
        bcrypt.hash(req.body.password, saltRounds, async function(err, hash) {
         // Store hash in your password DB.
         if(err) console.log(err);
         else{
            await user.create({
               name: req.body.name,
               location: req.body.location,
               password: hash,
               email: req.body.email
            }).then(res.json({ success: true }))

         }
         
         
      });

      

   } catch (error) {
      console.log("INTERNAL SERVER ERROR")
      console.log(error)
      res.json({ success: false })
   }
})

router.post("/loginuser", baseEmailChain, async (req, res) => {

   const errors = validationResult(req);
   if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array(), error: "Email or Password are not valid" });
   }

   let email = req.body.email
   try {
      let userdata = await user.findOne( {email} );
      if (!userdata) {
         return res.status(400).json({ error: "User not exist please try to login with correct credentials" })
      }

      //jwt token
      const data = {
         user: {
            id: userdata.id
         }
      }
      
      // matching hashed password 
       bcrypt.compare(req.body.password, userdata.password, function (err, result) {
         if(err) console.log(err)

            if (result == false)  {
               return res.status(400).json({ error: "Wrong password please Try to login with correct credentials" })
      
            }
            else{
               const authToken = jwt.sign(data, jwtsecret)
               return res.json({ success: true, authToken: authToken})
            }
      

      });
      

      //without password hashing 
      // if (req.body.password !== userdata.password) {
      //    return res.status(400).json({ error: "Try to login with correct credentials" })
      // }

      // return res.json({ success: true })

   } catch (error) {
      console.log("INTERNAL SERVER ERROR")
      console.log(error)
      
      res.json({ success: false })
      
   }
})

module.exports = router;