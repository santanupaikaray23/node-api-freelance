const express = require('express')
const app = express();
const port = process.env.PORT || 9600;
const mongo = require('mongodb');
// const MongoClient = mongo.MongoClient;
const MongoClient = require('mongodb').MongoClient;
const bodyParser = require('body-parser');
const nodemailer = require('nodemailer');

const cors = require('cors')
app.use(cors())
const mongourl = "mongodb+srv://portfolio:portfolio1996@cluster0.yf62c.mongodb.net/?retryWrites=true&w=majority";
let db;
let col_name1 = "col1"
// let col_name2 = "col2"
let col_name3 = "col3"
let col_name4 = "col4"
let col_name5 = "col5"

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
                pass: 'umxv mlbz qlgb qcdb'
            }
        })
        var mailOptions = {
            from: 'santanupaikaray1996@gmail.com',
            to: req.body.email,
            subject: 'Thank You for Contacting Us!!',
            text: 'Hi, \n \n We got Your Message. \n \n One of your Authority will contact you as soon as possible. \n \n \n Regards,\n Nature With Code Team \n Phone no. 9668348106',
            
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

//Read
app.get('/users',(req,res)=>{
    db.collection(col_name5).find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

// Insert
app.post('/addUsers',(req,res)=>{
    console.log(req.body)
    db.collection(col_name5).insert(req.body,(err,result)=>{
        if(err){
            console.log(err);
            return res.status(500).send('Error adding data');
        }
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth:{
                user: 'santanupaikaray1996@gmail.com',
                pass: 'umxv mlbz qlgb qcdb'
            }
        })
        var mailOptions = {
            from: 'santanupaikaray1996@gmail.com',
            to: req.body.email,
            subject: 'You Registered Successfully !!',
            text: 'Hi, \n \n Thank you for choosing your Service. \n \n You have Registered Successfully. \n \n One of your Authority will contact you as soon as possible. \n \n \n Regards,\n Nature With Code Team \n Phone no. 9668348106',




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

//Read
app.get('/services',(req,res)=>{
    db.collection(col_name1).find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

//Insert
app.post('/addservices',(req,res)=>{
    console.log(req.body)
    db.collection(col_name1).insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send('Data Added')
    })
})

 app.get('/servicesdetails',(req,res)=>{
     var query = {}
    query= {isActivate:true}
     db.collection(col_name4).find().toArray((err,result)=>{
        if(err) throw err;
         res.send(result)
     })
 })

//serviceDetails
app.get('/servicesdetail/:servicetypeId', (req, res) => {
    // Convert personId from string to number as it's stored as a number in your data
    const servicetypeId = parseInt(req.params.servicetypeId);

    db.collection(col_name4).find({"servicetype._id": servicetypeId}).toArray((err, result) => {
        if (err) {
            res.status(500).send('Error fetching data');
            return;
        }
        res.send(result);
    });
});


//Insert
app.post('/addservicesdetail',(req,res)=>{
    console.log(req.body)
    db.collection(col_name4).insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send('Data Added')
    })
})




// //Read

// app.get('/separatetype',(req,res)=>{
//      db.collection(col_name3).find().toArray((err,result)=>{
//          if(err) throw err;
//          res.send(result)
//      })
//  })

//  //Insert
//  app.post('/addseparatetype',(req,res)=>{
//      console.log(req.body)
//      db.collection(col_name3).insert(req.body,(err,result)=>{
//          if(err) throw err;
//          res.send('Data Added')
//      })
//  })

//  app.get('/check/:separatetypeId', (req, res) => {
//     // Convert personId from string to number as it's stored as a number in your data
//     const separatetypeId = parseInt(req.params.separatetypeId);

//     db.collection(col_name3).find({"separatetype._id": separatetypeId}).toArray((err, result) => {
//         if (err) {
//             res.status(500).send('Error fetching data');
//             return;
//         }
//         res.send(result);
//     });
// });

// //update
// app.put('/updateservices',(req,res)=>{
//     db.collection(col_name1).updateOne(
//         {_id:mongo.ObjectID(req.body._id)},
//         {
//             $set:{
//     service: req.body.service,         
//     name: req.body.name,
//     image: req.body.image
//             }
//         },(err,result)=>{
//             if(err) throw err;
//             res.send('Data Updated')
//         }
//     )
// })

//delete
app.delete('/deleteservices',(req,res)=>{
    db.collection(col_name1).remove({_id:mongo.ObjectID(req.body._id)},(err,result)=>{
        if(err) throw err;
        res.send('Data Deleted')

    })

})
//softDelete(deactivate)
app.put('/deactivateservices',(req,res)=>{
    db.collection(col_name1).updateOne(
        {_id:mongo.ObjectID(req.body._id)},
        {
            $set:{
    isActivate: false
            }
        },(err,result)=>{
            if(err) throw err;
            res.send('service deactivated')
        }
    )
})
//activateDelete(activate)
app.put('/deactivateservices',(req,res)=>{
    db.collection(col_name1).updateOne(
        {_id:mongo.ObjectID(req.body._id)},
        {
            $set:{
    isActivate: true
            }
        },(err,result)=>{
            if(err) throw err;
            res.send('service activated')
        }
    )
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
