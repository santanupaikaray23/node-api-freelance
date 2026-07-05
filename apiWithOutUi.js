// const express = require('express')
// const app = express();
// const port = process.env.PORT || 9601;
// const mongoose = require('mongoose');
// const MongoClient = require('mongodb').MongoClient;
// const bodyParser = require('body-parser');


// const cors = require('cors')
// app.use(cors())
// const mongoUri = 'mongodb://127.0.0.1:27017/usedvehicles';
// let db;
// let col_name1 = "col1"



// app.use(bodyParser.urlencoded({extended:true}))
// app.use(bodyParser.json())

// app.get('/health',(req,res)=>{
//     res.status(200).send('Health Check')
// })
require('dotenv').config();
const express = require('express')
const app = express();
const port = process.env.PORT || 9601;
const mongo = require('mongodb');
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
// const SibApiV3Sdk = require('sib-api-v3-sdk');
const path = require('path');
const nodemailer = require('nodemailer');

require('dotenv').config({
  path: path.join(__dirname, '.env')
});
const cors = require('cors')
app.use(cors())
const mongourl = "mongodb+srv://portfolio:portfolio1996@cluster0.yf62c.mongodb.net/?retryWrites=true&w=majority";
let db;
// let col_name1 = "col1"
// let col_name2 = "col2"
let col_name3 = "col3"
// let col_name4 = "col4"
// let col_name5 = "col5"
// let col_name6 = "col6"
// let col_name7 = "col7"
// let col_name8 = "col8"
// let col_name9 = "col9"
// let col_name10 = "col10"

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/health',(req,res)=>{
    res.status(200).send('Health Check')
})



//Read
app.get('/contacts',(req,res)=>{
    db.collection(col_name3).find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

// Insert
// app.post('/addcontacts', async (req, res) => {
//     try {
//         console.log('Request Body:', req.body);

//         // Save contact to MongoDB
//         const result = await db.collection(col_name3).insertOne(req.body);

//         console.log('MongoDB Insert Success:', result.insertedId);

//         // Check API Key
//         if (!process.env.BREVO_API_KEY) {
//             throw new Error('BREVO_API_KEY is missing in .env file');
//         }

//         // Configure Brevo
//         const client = SibApiV3Sdk.ApiClient.instance;
//         const apiKey = client.authentications['api-key'];

//         apiKey.apiKey = process.env.BREVO_API_KEY;

//         console.log(
//             'Brevo API Key Loaded:',
//             process.env.BREVO_API_KEY.substring(0, 10) + '...'
//         );

//         const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

//         // Create Email Object
//         const sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

//         sendSmtpEmail.sender = {
//             email: 'santanupaikaray1996@gmail.com',
//             name: 'Santanu Paikaray'
//         };

//         sendSmtpEmail.to = [
//             {
//                 email: req.body.email
//             }
//         ];

//         sendSmtpEmail.subject = 'Thank you for Contacting Me !!';

//         sendSmtpEmail.textContent = `
// Hi,

// I got your message.

// I will contact you soon.

// Thanks & Regards,
// Santanu Paikaray
// Phone no. 8917310896
// `;

//         // Send Email
//         const emailResponse =
//             await apiInstance.sendTransacEmail(sendSmtpEmail);

//         console.log('Email Sent Successfully:', emailResponse);

//         return res.status(200).json({
//             success: true,
//             message: 'Data Added and Email Sent',
//             data: {
//                 insertedId: result.insertedId
//             }
//         });

//     } catch (err) {

//         console.error(
//             'Brevo/Mongo Error:',
//             err.response?.body || err.response || err
//         );

//         return res.status(500).json({
//             success: false,
//             message: 'Error adding data or sending email',
//             error:
//                 err.response?.body ||
//                 err.response ||
//                 err.message
//         });
//     }
// });

app.post('/addcontacts', async (req, res) => {
    try {

        console.log(req.body);

        await db.collection(col_name3).insertOne(req.body);

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'santanupaikaray1996@gmail.com',
                pass: 'ymrh tdwq edes acgv'
            },
        });

        const mailOptions = {
            from: 'santanupaikaray1996@gmail.com',
            to: req.body.email,
            subject: 'Thank you for Contacting Santanu Paikaray !!',
            text: `Hi,

I got your message.

I will contact you soon.

Thanks & Regards,
Santanu Paikaray`
        };

        const info = await transporter.sendMail(mailOptions);

        console.log('Email sent:', info.response);

        res.send('Data Added and Email Sent');

    } catch (error) {

        console.log(error);

        res.status(500).send(error.message);
    }
});


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




// MongoClient.connect((err,client)=>{
//     if(err) console.log('Error while connecting');
//     db=client.db('usedvehicles');
//     app.listen(port,(err) => {
//         if (err) {
//             console.log('Error in server setup', err);
//             return; // Added return to stop execution in case of error
//         }
//         console.log(`Server is running on port ${port}`);
//     });
// });
