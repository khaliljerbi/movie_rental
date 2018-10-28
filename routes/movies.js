const express = require('express');
const router = express.Router();

const {validate , Movie} = require('../models/movie');
const { Genre } = require('../models/genre');

router.get('/' , async (req,res) => {

   const list =  await Movie.find();
   res.status(200).json(list);
});

router.get('/:id' , async (req,res) => {
   const movie = await Movie.findById(req.params.id);
   if(!movie) return res.status(404).send('Movie not found');

   res.status(200).json(movie);
});

router.post('/' , async (req,res) => {
    try {
        const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);
    
    const genre = await Genre.findById(req.body.genreId); 
    if(!genre) return res.status(404).send('Genre not found !');


    const newMovie = new Movie({
        name: req.body.name,
        numberInStock : req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        genre: {
            _id: genre._id,
            name: genre.name
        }
    });

   const movie =  await newMovie.save();

   res.status(200).json(movie);
    }

    catch(exp) {
        console.log(exp.message);
    }
    

});

router.put('/:id' , async(req , res) => {
    
    const {error} = validate(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const genre = await Genre.findById(req.body.genreId);
    if(!genre) return res.status(404).send('Genre not found');

    const movie = await  Movie.findOneAndUpdate({_id: req.params.id} , {
        name: req.body.name,
        numberInStock: req.body.numberInStock,
        dailyRentalRate: req.body.dailyRentalRate,
        genre: {
            _id: genre._id,
            name : genre.name
        }
    } , {new : true});

    if(!movie) return res.status(404).send('Movie not found !');

    res.status(200).json(movie);

});

router.delete('/:id' , async(req , res) => {
  const movie =  await Movie.findOneAndDelete({_id : req.params.id});
  if(!movie) return res.status(404).send('Movie not found');
  
  res.status(200).json(movie);
});



module.exports= router;