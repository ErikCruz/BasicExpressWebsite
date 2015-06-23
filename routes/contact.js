var express = require('express');
var router = express.Router();
var nodemailer = require('nodemailer');
var GmailCredentials = require('../config');

router.get('/', function(req, res, next){
    res.render('contact', {title: 'Contact'});
});

router.post('/send', function(req, res, next){
   var transporter = nodemailer.createTransport({
      service: 'Gmail',
      auth: {
          user: GmailCredentials.user,
          pass: GmailCredentials.pass
      }
   });
   var mailOptions = {
       from: req.body.email,
       to: GmailCredentials.to,
       subject: 'Website Submission',
       text: 'You have a new submission!',
       html: '<p>You got a new submission with the following details...</p><ul><li>Name: '+req.body.name+'</li><li>Email: '+req.body.email+'</li><li>Message: '+req.body.message+'</li></ul>'
   };
   
   transporter.sendMail(mailOptions, function(err, info){
       if(err) {
           console.log(err);
           res.redirect('/');
       }
       else {
           console.log('Messege Sent: ' + info.response);
           res.redirect('/');
       }
   });
});

module.exports = router;