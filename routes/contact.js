var express = require('express');
var nodemailer = require('nodemailer')
var router = express.Router();
var csrf = require('csurf');
var csrfProtection = csrf({cookie: true})
require('dotenv').config()
router.get('/', csrfProtection, function(req, res) {
    res.render('contact', { csrfToken: req.csrfToken() });
});
router.get('/review', function(req, res) {
    res.render('contactReview');
});
router.post('/post', csrfProtection, function(req, res) {
    var data = req.body;
    console.log(data)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'oauth2',
          user: process.env.GMAIL_USER,
          clientId: process.env.GMAIL_CLIENT_ID,
          clientSecret: process.env.GMAIL_SECRET,
          refreshToken: process.env.GMAIL_REFLASH_TOKEN,
          accessToken: process.env.GMAIL_ACCESS_TOKEN
        }
      });

    var mailOptions = {
        from: '"國泰小程序"<cathayminiapp@gmail.com>',
        to :'cathayminiapp@gmail.com',
        subject: req.body.username +'寄了一封信',
        text: req.body.description
    }
    transporter.sendMail(mailOptions,function(error,info){
        if(error){
            return console.log(error);
        }
        res.redirect('review');
    })
});
module.exports = router;
