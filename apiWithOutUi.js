const express = require('express')
const app = express();
const port = process.env.PORT || 9601;
const mongo = require('mongodb');
// const MongoClient = mongo.MongoClient;
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const cors = require('cors')
app.use(cors())
const mongourl = "mongodb+srv://portfolio:portfolio1996@cluster0.yf62c.mongodb.net/?retryWrites=true&w=majority";
let db;
let col_name3 = "col3"



app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/health',(req,res)=>{
    res.status(200).send('Health Check')
})

app.get('/contacts',(req,res)=>{
    db.collection(col_name3).find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

// Insert
app.post('/addcontacts',(req,res)=>{
    console.log(req.body)
    db.collection(col_name3).insert(req.body,(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).send('Error adding data');
        }
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: 'santanupaikaray1996@gmail.com',
                pass: 'ipjd xccp vczb zxca'
            }
        })
        var mailOptions = {
            from: 'santanupaikaray1996@gmail.com',
            to: req.body.email,
            subject: 'Thank You for Contacting Me!!',
            text: 'Hi There, \n \n I got your message. \n \n I will contact you as soon as possible. \n \n \n Thanks & Regards,\n Santanu Paikaray \n Phone no. 8917310896',
            
        };
        transporter.sendMail(mailOptions, function(error, info){
        if(error){
            console.log(error);
            return res.status(500).send('Error sending email');
        }else{
            console.log("email sent" + info.response);
            return res.send('Data Added and Email Sent')
        }
        })
    })
})



MongoClient.connect(mongourl,(err,client)=>{
    if(err) console.log('Error while connecting');
    db=client.db('village_node_app');
    app.listen(port,(err) => {
        if (err) {
            console.log('Error in server setup', err);
            return; // Added return to stop execution in case of error
        }
        console.log(`Server is running on port ${port}`);
    });
});
