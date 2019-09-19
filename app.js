const express = require("express");
const body_parser = require("body-parser");

const app = express(); 

const adminRoutes = require("./routes/admin");
const shopRoutes = require("./routes/shop");



app.use(body_parser.urlencoded({ extended: true }));

app.use(adminRoutes);
app.use(shopRoutes);



app.listen(3001);
