const express = require('express')
const app = express()
const mongoDB = require("./db")
const dotenv = require('dotenv')
// const { query, matchedData, validationResult } = require('express-validator');
dotenv.config()
const port = process.env.BASE_URL
mongoDB();


app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-with, Content-Type, Accept"
  );
  next();
})

app.use(express.json())
app.use("/api", require("./Routes/CreateUser"))
app.use("/api", require("./Routes/DisplayData"))
app.use("/api",require("./Routes/OrderData"))
app.use("/api",require("./Routes/DisplayOrders"))

app.get('/', (req, res) => {
  res.send('Hello World!')
})
// app.use(express.json())
// app.use("/api", require("./Routes/CreateUser"))

//express...

// app.use(express.json());
// app.get('/', query('person').notEmpty().escape(), (req, res) => {
//   const result = validationResult(req);
//   if (result.isEmpty()) {
//     const data = matchedData(req);
//     return res.send(`Hello, ${data.person}!`);
//   }

//   res.send({ errors: result.array() });
// });
// app.use("/api", require("./Routes/CreateUser"))


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})
