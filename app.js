const express = require("express");
const body_parser = require("body-parser");

const app = express(); 

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");



app.use(body_parser.urlencoded({ extended: true }));

app.use('/admin',adminRoutes);
app.use(shopRoutes);

app.use((req,res,next)=>{
    res.status(404).send('<h1>PAGE NOT FOUND</h1>')
})

app.listen(3001);
