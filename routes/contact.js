var express = require('express');
var nodemailer = require('nodemailer')
var router = express.Router();

router.get('/', function(req, res) {
    res.render('contact');
});
router.get('/review', function(req, res) {
    res.render('contactReview');
});
router.post('/post', function(req, res) {
    var data = req.body;
    console.log(data)
    var transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          type: 'oauth2',
          user: "cathayminiapp@gmail.com",
          clientId: "650738593509-7u7u78ap1v82qugfa50ggrhbf94fkdsq.apps.googleusercontent.com",
          clientSecret: "po1Nk3TBRAUAcMMbmBZZtbZ7",
          refreshToken: "1//043wSu2tITesxCgYIARAAGAQSNwF-L9IrhDMBogvWFkYDzeErSKbOeMAJuuRz3mFEU-0_Bvof0jEnoYORcHhznoO0aOagsbDDQks",
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
