const jwt = require('jsonwebtoken');
const config = require('config');
module.exports = (req, res , next) => {

   const token =  req.header('x-auth-token');
   if(!token) return res.status(401).send('Access denies. Invalid token.');

   try {
    const payload = jwt.verify(token,config.get('jwtkey'));
    req.user = payload;
    next();
   }
    catch(exp) {
        res.status(400).send('Invalid Token.')
    } 

}