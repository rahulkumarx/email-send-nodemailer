var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer'),
    bodyParser = require('body-parser');
	
    var app = express();
    app.set('view engine', 'ejs');
    app.use(express.static('public'));
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());
    var port = 4000;
    app.get('/', function (req, res) {
      res.render('index');
    });


    app.post('/send-email', function (req, res) {
		let transporter = nodeMailer.createTransport({
          host: 'smtp.mailgun.org',
          //port: 465,
          secure: true,
          auth: {
              user: 'postmaster@sandboxc02d804096a14e628a2ca5a6ea656179.mailgun.org',
              pass: '8df8aa6353b34774a42170f3cf5b9238-a3d67641-0d10035a'
          },
		  tls:{
        rejectUnauthorized: false
      }
      }); 
      let mailOptions = {
          from: '"Rahul Kumar" <rahulkumarx@gmail.com>', // sender address
          to: req.body.to, // list of receivers
		  replyTo:'rahulkumarx@gmail.com',
          subject: req.body.subject, // Subject line
          text: req.body.body, // plain text body          
      
      };
	  
      transporter.sendMail(mailOptions, (error, info) => {
          if (error) {
              return console.log(error);
          }
          console.log('Message %s sent: %s', info.messageId, info.response);
              res.render('index');
          });
      });
          app.listen(port, function(){
            console.log('Server is running at port: ',port);
          });
