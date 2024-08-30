const express = require('express')
const router = express.Router();

router.post('/foodData', (req, res)=>{
    try {
        // console.log(global.food_items, global.food_category)
        res.send([global.food_items, global.food_category])// here food_items are availabel from
    } catch (error) {
        console.log(error)
        res.send("server error")
        
    }
})

module.exports = router;
