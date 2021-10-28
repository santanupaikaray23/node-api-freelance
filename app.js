const express = require('express');
const app = express()
const db = require('./db')
const port = process.env.PORT || 9800;
const cors = require('cors');
app.use(cors());



const ApiWithOutUi = require('./apiWithOutUi');
app.use("/",ApiWithOutUi);

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})