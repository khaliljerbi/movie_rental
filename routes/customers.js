const express = require("express");
const router = express.Router();

const {Customer , validate }= require("../models/customer");

router.get("/", async (req, res) => {
  const list = await Customer.find().sort("name");

  res.status(200).json(list);
});

router.get("/:id", async (req, res) => {
  const customer = await Customer.findById(req.params.id);

  if (!customer) return res.status(404).send("Customer not found !");

  res.status(200).json(customer);
});

router.post("/", async (req, res) => {
  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const newCustomer = new Customer({
      name : req.body.name , 
      phone : req.body.phone,
      isGold : req.body.isGold
  });

  const customer = await newCustomer.save();

  res.status(200).json(customer);
});

router.put('/:id' , async (req,res) => {

  const { error } = validate(req.body);

  if (error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findOneAndUpdate({_id : req.params.id} , { 
    name : req.body.name,
    isGold : req.body.isGold,
    phone: req.body.phone
  } , {new : true});

  if (!customer) return res.status(404).send('Customer not found !');

  res.status(200).json(customer);

});

router.delete('/:id' , async (req,res) => {

  const { error } = validate(req.body);

  if(error) return res.status(400).send(error.details[0].message);

  const customer = await Customer.findOneAndDelete({_id : req.params.id});

  if(!customer) return res.status(404).send('Customer not found !');

  res.status(200).json(customer);

});

module.exports = router;