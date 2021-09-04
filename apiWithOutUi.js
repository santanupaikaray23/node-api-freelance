const express = require ('express');
const app = express();

var router = express.Router();
const port = process.env.PORT || 9800;
const mongo = require ('mongodb')
const MongoClient = mongo.MongoClient;
const bodyParser = require ('body-parser')
const cors = require ('cors');
 app.use(cors())
const mongourl = "mongodb://localhost:27017";

let db;
let col_name = "freelanceapi"
// let db;
 let col_name2="freelanceapi2"
 let col_name3="freelanceapi3"
 let col_name4="freelanceapi4"
 let col_name5="freelanceapi5"

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/health',(req,res)=>{
    res.status(200).send('Health Check')

});

//Read
app.get('/service',(req,res)=>{
    var query ={}
    if(req.query.service){
        query={service:req.query.service,isActive:true}
    }else{
        query = {isActive:true}   
    }
  
    db.collection(col_name).find(query).toArray((err,result)=>{
        if(err)throw err;
        res.send(result)
    })
})
//userDetails
app.get('/Service/:id',(req,res)=>{
    var id = mongo.ObjectId(req.params.id)
    db.collection(col_name).find({_id:id}).toArray((err,result)=>{
        if(err)throw err;
        res.send(result)
    })
})
//Insert
app.post('/addService',(req,res)=>{
    console.log(req.body)
    db.collection(col_name).insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send('Data Added')
    })
})
//update
app.put('/updateService',(req,res)=>{
    db.collection(col_name).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
                _id:req.body._id,
                service_name:req.body. service_name,
                service:req.body.service,
                isActive: true
            }
        },(err,result)=>{
            if(err)throw err;
            res.send('Data Updated')
        }
    )
})
//delet
app.delete('/deleteService',(req,res)=>{
    db.collection(col_name)
    .remove({_id:mongo.ObjectId(req.body._id)},(err,result)=>{
        if(err) throw err;
        res.send('Data Deleted')
    })
})
//softDelete(deactivate)
app.put('/deactivateService',(req,res)=>{
    db.collection(col_name).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
                isActive:false
            }
        },(err,result)=>{
            if(err)throw err;
            res.send('Service Deactivated')
        }
    )
})
//softDelete(activate)
app.put('/activateService',(req,res)=>{
    db.collection(col_name).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
                isActive:true
            }
        },(err,result)=>{
            if(err)throw err;
            res.send('Service Activated')
        }
    )
})

// services type
// Read
app.get('/types',(req,res)=>{
    var query={}
    if(req.query.service){
        query={service:req.query.service,isActive:true}
    }else{
        query={isActive:true}

    }
    
    db.collection(col_name2).find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })

})

//userDetails
app.get('/types/:id',(req,res)=>{
    var id = mongo.ObjectId(req.params.id)
    db.collection(col_name2).find({_id:id}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })

})
//Add
app.post('/addType',(req,res)=>{
    console.log(req.body)
    db.collection(col_name2).insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send('Data Added')
    })
})
//update
app.put('/updateType',(req,res)=>{
    db.collection(col_name2).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
                name:req.body.name,
                service_name: req.body.service_name,
                service:req.body.service,
                thumb: req.body.thumb,
                about:req.body.about,

                cost: req.body.cost,

                isActive: true

            }
        },(err,result)=>{
            if(err) throw err;
            res.send('Data Updated')
        }
    )
})

//delet
app.delete('/deleteType',(req,res)=>{
    db.collection(col_name2)
    .remove({_id:mongo.ObjectId(req.body._id)},(err,result)=>{
      if(err)throw err;
      res.send('Data Deleted')
    })
})
//softDelete(deactivate)
app.put('/deactivateType',(req,res)=>{
    db.collection(col_name2).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
              

                isActive: false

            }
        },(err,result)=>{
            if(err) throw err;
            res.send('Type Deactivated')
        }
    )
})
//activateDelete(activate)
app.put('/activateType',(req,res)=>{
    db.collection(col_name2).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
              

                isActive: true

            }
        },(err,result)=>{
            if(err) throw err;
            res.send('Type Activated')
        }
    )
})

// Booking type
app.get('/booking',(req,res)=>{
    db.collection(col_name3).find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
//Insert
app.post('/addBooking',(req,res)=>{
    console.log(req.body)
    db.collection(col_name3).insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send('Data Added')
    })
})
//servicelist
//Read
// app.get('/servicelist',(req,res)=>{
//     var query = {}
//     query = {isActive:true}
//     db.collection(col_name4).find(query).toArray((err,result)=>{
//         if(err) throw err;
//         res.send(result)
//     })
// })
// //servicelist Details
// app.get('/servicelist/:id',(req,res)=>{
//   var id = mongo.ObjectId (req.params.id)
//     db.collection(col_name4).find({_id:id}).toArray((err,result)=>{
//         if(err) throw err;
//         res.send(result)
//     })

// })
// //Insert
// app.post('/addServicelist',(req,res)=>{
//     console.log(req.body)
//     db.collection(col_name4).insert(req.body,(err,result)=>{
//         if(err) throw err;
//         res.send('Data Added')
//     })
// })
//update
// app.put('updateServicelist',(req,res)=>{
//     db.collection(col_name4).updateOne(
//         {_id:mongo.ObjectId (req.body._id)},
//         {
//             $set:{
               
//                 name: req.body.name,
//                 service_name:req.body.service_name,
//                 service:req.body.service,
//                 thumb:req.body.thumb,
//                 about:req.body.about,
//                 cost:req.body.cost ,
//                 "isActive": true
//             }
//         },(err,result)=>{
//             if(err)throw err;
//             res.send('Data Updated')

//         }
//     )
// })
//softDelete(deactivate)
// app.put('/deactivateServicelist',(req,res)=>{
//     db.collection(col_name4).updateOne(
//         {_id:mongo.ObjectId (req.body._id)},
//         {
//             $set:{
               
               
//                 "isActive": false
//             }
//         },(err,result)=>{
//             if(err)throw err;
//             res.send('Servicelist Deactivate')

//         }
//     )
// })
// //softDelete(activate)
// app.put('/activateServicelist',(req,res)=>{
//     db.collection(col_name4).updateOne(
//         {_id:mongo.ObjectId (req.body._id)},
//         {
//             $set:{
               
               
//                 "isActive": true
//             }
//         },(err,result)=>{
//             if(err)throw err;
//             res.send('Servicelist Activated')

//         }
//     )
// })
//Read
app.get('/servicedetails',(req,res)=>{
    var query={}
    query = {isActive:true}
    db.collection(col_name5).find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })

})
app.get('/servicedetails/:id',(req,res)=>{
    var id = mongo.ObjectId(req.params.id)
    db.collection(col_name5).find({_id:id}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })

})
//Insert
app.post('/addServicedetail',(req,res)=>{
    console.log(req.body)
    db.collection(col_name5).insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send('Data Added')
    })
})
//update
app.put('/updateServicedetail',(req,res)=>{
    db.collection(col_name5).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
                
                    name:req.body.name,
                    service_name: req.body.service_name,
                    service:req.body.service,
                    thumb:req.body.thumb ,
                    about:req.body.about,
                    cost:req.body.cost,
                    isActive: true
                  
            }
        },(err,result)=>{
            if(err) throw err;
            res.send('Data Updated')
        }
    )
})
//softDelete(deactivate)
app.put('/deactivateServicedetail',(req,res)=>{
    db.collection(col_name5).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
                
                    isActive: false
                  
            }
        },(err,result)=>{
            if(err) throw err;
            res.send('Servicedetails Deactivated')
        }
    )
})
//activateDelete(activate)
app.put('/activateServicedetail',(req,res)=>{
    db.collection(col_name5).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
                
                    isActive: true
                  
            }
        },(err,result)=>{
            if(err) throw err;
            res.send('User Activated')
        }
    )
})
app.use("/",router)

//Db Connection
MongoClient.connect(mongourl,(err,client)=>{
    if(err) console.log('Error while connecting');
    db=client.db('octobernode');
    app.listen(port,(err)=>{
        console.log(`Server is running on port ${port}`)
    })
})