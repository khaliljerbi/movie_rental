const express = require('express');
const router = express.Router();
const authorization = require('../middlewares/authorization');
const checkAdmin = require('../middlewares/admin');
const {Genre , validate } = require('../models/genre');


router.get('/' , async (req, res) => {
   const list =  await Genre.find()
        .sort('name');
   res.status(200).json(list);     
});


//Posting genre 
router.post('/' ,authorization, async (req,res) => {
    const {error} = validate(req.body);
    const newGenre = new Genre({
        name: req.body.name
    })
    if (error) {
        return res.status(400).send(error.details[0].message);
    }
    try {
        const genre = await newGenre.save();  

         res.status(200).json(genre);
    }

    catch(ex) {
        res.status(400).send('Genre is already saved !')
    }
   
    
});

router.delete('/:id' ,[authorization, checkAdmin], async(req, res) => {
    try {
        const genre =  await Genre.findOneAndDelete({_id : req.params.id});

     if(!genre) {
      return res.status(404).send('Genre not found');
     }

     res.status(200).json(genre);
   
      }

    catch(ex) {
        console.log(ex.message);
    }
   

});

router.put('/:id' , async (req,res) => {
    const {error } = validate(req.body);

    if(error) return res.status(400).send(error.details[0].message);
    
   const genre = await Genre.findOneAndUpdate({_id : req.params.id }, { name : req.body.name} , {new : true});
    
    if(!genre) {
       return res.status(400).send('Genre not Found');
    }

    res.status(200).json(genre);

});


module.exports = router;