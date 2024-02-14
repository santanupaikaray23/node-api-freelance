const express = require ('express');
const app = express()
var router = express.Router();
const port = process.env.PORT || 9800;
const mongo = require ('mongodb')
const MongoClient = mongo.MongoClient;
const bodyParser = require ('body-parser')
const nodemailer = require('nodemailer');
const cors = require ('cors');

 app.use(cors())
 const mongourl = "mongodb+srv://portfolio:portfolio1996@cluster0.yf62c.mongodb.net/?retryWrites=true&w=majority";
let db;
let col_name = "information"

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/health',(req,res)=>{
    res.status(200).send('Health Check')
});

//Read
app.get('/users',(req,res)=>{
    db.collection(col_name).find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
//Insert
app.post('/addUsers',(req,res)=>{
    console.log(req.body)
    db.collection(col_name).insert(req.body,(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).send('Error adding data');
        }
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: 'santanupaikaray1996@gmail.com',
                pass: 'eikz fekq ktju zpxx'
            }
        })
        var mailOptions = {
            from: 'santanupaikaray1996@gmail.com',
            to: req.body.email,
            subject: 'Thank you for Contacting me',
            text: 'Hi, \n \n I got your Message. \n \n I will get back you after some time. \n \n \n Regards,\n Santanu Paikaray \n Phone no. 8917310896',
        

             
    
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


   




app.use("/",router)
//Db Connection
// MongoClient.connect(mongourl,(err,client)=>{
//     if(err) console.log('Error while connecting')
//     db= client.db('november');
//     app.listen(port,(err)=>{
//         console.log(`Server is running on port ${port}`)
//     })
// })

MongoClient.connect(mongourl,(err,client)=>{
    if(err) console.log('Error while connecting');
    db=client.db('portfolio');
    app.listen(port,(err)=>{
        console.log(`Server is running on port ${port}`)
    })
})
