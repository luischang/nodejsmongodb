const express = require('express');
const mongoose = require('mongoose');
const url = "mongodb+srv://uesan:RI53mBtqBQL8PIji@cluster0.m1jmi.mongodb.net/dawdb?retryWrites=true&w=majority"
mongoose.connect(url);
const Customer = mongoose.model('Customer',
  mongoose.Schema({
    firstName: { type: String },
    lastName: { type: String },
    age: { type: Number },
    createdAt: { type: Date, default: Date.now }
  },{versionKey: false})
);


const app = express();
app.use(express.json())
app.use(express.urlencoded())
//Create customer
app.post('/api/v1/customer/create', async (req, res) => {
  try {
    await Customer.create(req.body);
    return res.status(200).send("Success");
  } catch (err) {
    return res.status(400).send("Error " + err)
  }
});
//Get all customer
app.get('/api/v1/customer/getall', async (req, res) => {

  try {
    const customers = await Customer.find({});
    return res.status(200).send(customers);
  } catch (err) {
    return res.status(400).send("Error " + err)
  }
});
//Update customer
app.put('/api/v1/customer/update', (req, res) => {
  try {
    Customer.findByIdAndUpdate(req.body._id.toString(),req.body,(err,result)=>{
      if(err)  return res.status(400).send("Error " + err) 
      return res.status(200).send("Success");
    })
    //return res.status(200).send("Success");
  } catch (err) {
    return res.status(400).send("Error " + err)
  }
});

//Delete customer
app.delete('/api/v1/customer/delete/:customerid', (req, res) => {
  const customerId = req.params.customerid;  
  try {
    Customer.deleteOne({_id: customerId},(err,result)=>{
      if(err)  return res.status(400).send("Error " + err) 
      return res.status(200).send("Success");
    })
    //return res.status(200).send("Success");
  } catch (err) {
    return res.status(400).send("Error " + err)
  }
});

//Comment Hello World
app.get('/', (req, res) => {
  res.send('Hello Express app!')
});

app.listen(3000, () => {
  console.log('server started');
});

//add comment v1