const express = require("express");
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const productsRoutes = require('./routes/products-routes');
const usersRoutes = require('./routes/users-routes');
const ordersRoutes = require('./routes/orders-routes');

const HttpError = require("./models/http-error");
const app = express();

app.use(bodyParser.json());

app.use((req,res,next)=>{
  res.setHeader('Access-Control-Allow-Origin','*');
  res.setHeader('Access-Control-Allow-Headers','*');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS'
  );
  next();
})

app.use('/api/products',productsRoutes);
app.use('/api/users',usersRoutes);
app.use('/api/orders',ordersRoutes);


app.use((error,req,res,next)=>{
    if(res.headerSent){
        return next(error);
    }
    res.status(error.code || 500)
    res.json({message: error.message || 'An unknown error occurred!'});
})

app.use((req,res,next)=>{
  const error = new HttpError('Could not find this route!',404);
  throw error;
})

mongoose.connect(`mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.eo3fa.gcp.mongodb.net/${process.env.DB_NAME}?retryWrites=true&w=majority`,
{useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true})
.then(()=>{
  app.listen(5000);
}
).catch(err =>{
  console.log(err);
});
