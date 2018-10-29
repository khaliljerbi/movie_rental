const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Fawn = require('fawn');
const {Rental , validate }= require('../models/rental');
const {Customer} = require('../models/customer');
const {Movie} = require('../models/movie');

Fawn.init(mongoose);

router.get('/' , async (req, res) => {

   const rentals =  await Rental.find()
        .sort('-rentDate');
   res.status(200).json(rentals);

});

router.get('/:id' , async (req, res) => {

    const rental = await Rental.findById(req.params.id);
    if(!rental) return res.status(404).send('Rental not found ! ');

    res.status(200).json(rental);

});

router.post('/' , async (req,res) => {

    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const movie = await Movie.findById(req.body.movieId);
    if(!movie) return res.status(404).send('Movie not found ! '); 

    const customer = await Customer.findById(req.body.customerId);
    if(!customer) return res.status(404).send('Customer not found ! '); 

    let rental = new Rental({
        movie: {
            _id : movie._id,
            title: movie.title, 
            dailyRentalRate: movie.dailyRentalRate

        },
        customer: {
            _id : customer._id,
            name: customer.name,
            isGold : customer.isGold,
            phone : customer.phone
        }

    });

    let task = Fawn.Task();


    task.save('rentals' , rental)
        .update('movies', {_id : movie._id} , {$inc : {numberInStock: -1}})
        .run();

    res.status(200).json(rental);

});

router.delete('/:id' , async (req,res) => {
    
    const rental = await Rental.findOneAndDelete({_id : req.params.id});
    if(!rental) return res.status(404).send('Rental not found !');

    res.status(200).json(rental);
});

module.exports = router;