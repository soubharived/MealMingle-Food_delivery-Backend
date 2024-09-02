const express = require('express')
const app = express()
const mongoDB = require("./db")
const dotenv = require('dotenv')
const cors = require('cors')

dotenv.config();

const port = 8000
mongoDB();


// app.use((req, res, next)=>{
//   res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000")
//   res.header(
//     "Access-Control-Allow-Headers",
//     "Origin, X-Requested-with, Content-Type, Accept"
//   );
//   next();
// })

app.use(cors())


app.use(express.json())
app.use("/api", require("./Routes/CreateUser"))
app.use("/api", require("./Routes/DisplayData"))
app.use("/api",require("./Routes/OrderData"))
app.use("/api",require("./Routes/DisplayOrders"))

app.get('/', (req, res) => {
  res.send('Hello World!')
})


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
  // console.log(baseurl)
})
