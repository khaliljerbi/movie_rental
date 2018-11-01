const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');

const {User, validateLogin } = require('../models/user');

router.post('/login' , async (req,res) => {

    const {error} = validateLogin(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    const user = await User.findOne({email : req.body.email});
    if(!user) return res.status(400).send('Invalid Email or Password .');

    const isValid = await bcrypt.compare(req.body.password , user.password);
    if(!isValid) return res.status(400).send('Invalid Email or Password .');

    const token = user.generateAuthToken();
    res.send(token);
    
    

});

module.exports = router;