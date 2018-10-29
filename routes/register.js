const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const _ = require('lodash');

const {User , validateRegister } = require('../models/user');

router.post('/register' , async (req,res) => {

    const {error} = validateRegister(req.body);
    if(error) return res.status(400).send(error.details[0].message);

    let user = await User.findOne({email : req.body.email});
    if (user) return res.status(400).send('User already exists !');

    user = new User(_.pick(req.body, ['name' , 'email', 'password']));
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password,salt);
    
    await user.save();

    res.status(200).json(_.pick(user, ['_id', 'name', 'email']));

});

module.exports = router;