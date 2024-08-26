const express = require("express")
const app = express()

app.get("/", (req, res)=>{
    res.send("Hello, I am from Nexus")
})

app.listen(3000, ()=>{
    console.log(`The server is running on port 3000`)
})