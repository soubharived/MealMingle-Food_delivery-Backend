const mongoose = require("mongoose");
const dotenv = require("dotenv")

dotenv.config()
const mongoUri = process.env.MONGO

const mongoDB = async () => {
    try {
        const mongo = await mongoose.connect(mongoUri);
        // console.log("connected");
        const fetchedData = await mongoose.connection.db.collection("Fooditems");
        const data = await fetchedData.find({}).toArray();
        const foodCategory = await mongoose.connection.db.collection("foodCategory")
       const catData = await foodCategory.find({}).toArray();
        global.food_category =  catData;
        // console.log(food_category)
        global.food_items = data;
        // console.log(global.food_items)


    } catch (error) {
        console.log("some error")

    }



}

module.exports = mongoDB;