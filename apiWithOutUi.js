const express = require ('express');
// const app = express();

var router = express.Router();
// const port = process.env.PORT || 9800;
// const mongo = require ('mongodb')
// const MongoClient = mongo.MongoClient;
const bodyParser = require ('body-parser')
const Booked = require('./bookedSchema')

// const cors = require ('cors');
//  app.use(cors())
// const mongourl ="mongodb+srv://naturewithcode:nature123@cluster0.yf62c.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

let db;
let col_name = "freelanceapi"
// let db;
 let col_name2="freelanceapi2"
 let col_name3="freelanceapi3"
 let col_name4="freelanceapi4"
 let col_name5="freelanceapi5"
//  let col_name6="freelanceapi6"
 let col_name6="Booked"
//  let col_name6="freelanceapi6"

router.use(bodyParser.urlencoded({extended:true}))
router.use(bodyParser.json())

router.get('/health',(req,res)=>{
    res.status(200).send('Health Check')

});

//Read
router.get('/service',(req,res)=>{
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
router.get('/Service/:id',(req,res)=>{
    var id = mongo.ObjectId(req.params.id)
    db.collection(col_name).find({_id:id}).toArray((err,result)=>{
        if(err)throw err;
        res.send(result)
    })
})
//Insert
router.post('/addService',(req,res)=>{
    console.log(req.body)
    db.collection(col_name).insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send('Data Added')
    })
})
//update
router.put('/updateService',(req,res)=>{
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
router.delete('/deleteService',(req,res)=>{
    db.collection(col_name)
    .remove({_id:mongo.ObjectId(req.body._id)},(err,result)=>{
        if(err) throw err;
        res.send('Data Deleted')
    })
})
//softDelete(deactivate)
router.put('/deactivateService',(req,res)=>{
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
router.put('/activateService',(req,res)=>{
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
router.get('/types',(req,res)=>{
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
router.get('/types/:id',(req,res)=>{
    var id = mongo.ObjectId(req.params.id)
    db.collection(col_name2).find({_id:id}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })

})
//Add
router.post('/addType',(req,res)=>{
    console.log(req.body)
    db.collection(col_name2).insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send('Data Added')
    })
})
//update
router.put('/updateType',(req,res)=>{
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
router.delete('/deleteType',(req,res)=>{
    db.collection(col_name2)
    .remove({_id:mongo.ObjectId(req.body._id)},(err,result)=>{
      if(err)throw err;
      res.send('Data Deleted')
    })
})
//softDelete(deactivate)
router.put('/deactivateType',(req,res)=>{
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
router.put('/activateType',(req,res)=>{
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
router.get('/booking',(req,res)=>{
    db.collection(col_name3).find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})
//Insert
router.post('/addBooking',(req,res)=>{
    console.log(req.body)
    db.collection(col_name3).insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send('Data Added')
    })
})

// Read
router.get('/servicelists',(req,res)=>{
    db.collection(col_name4).find().toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})


//Add
router.post('/addServicelist',(req,res)=>{
    console.log(req.body)
    db.collection(col_name4).insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send('Data Added')
    })
  
    })


//update
router.put('/updateServicelist',(req,res)=>{
    db.collection(col_name4).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
                name:req.body.name ,
                service_name:req.body.service_name ,
                service:req.body.service,
                thumb:req.body.thumb,
                about: req.body.about,
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
router.delete('/deleteServicelist',(req,res)=>{
    db.collection(col_name4)
    .remove({_id:mongo.ObjectId(req.body._id)},(err,result)=>{
      if(err)throw err;
      res.send('Data Deleted')
    })
})


// Read
router.get('/servicedetails',(req,res)=>{
    var query={}
     query={isActive:true}
        db.collection(col_name5).find(query).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })

})
//Read
router.get('/servicedetail/:service',(req,res)=>{
    
    var service =(req.params.service)
    db.collection(col_name5).find({service:service}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })

})

//Read
router.get('/servicedetails/:id',(req,res)=>{
    var id = (req.params.id)
    db.collection(col_name5).find({_id:id}).toArray((err,result)=>{
        if(err) throw err;
        res.send(result)
    })
})

//Add
router.post('/addServicedetail',(req,res)=>{
    console.log(req.body)
    db.collection(col_name5).insert(req.body,(err,result)=>{
        if(err) throw err;
        res.send('Data Added')
    })
})
//update
router.put('/updateServicedetail',(req,res)=>{
    db.collection(col_name5).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
                name:req.body.name,
                service_name: req.body.service_name,
                service:req.body.service,
                thumb: req.body.thumb,
                about:req.body.about,

                cost: req.body.cost,
                  isActive: true,
                  "tripId":[
                      {
                          trip:req.body.trip,
                          name:req.body.name,
                         
                      }
                  ]
               
                 

                
 }
            
        },(err,result)=>{
            if(err) throw err;
            res.send('Data Updated')
        }
    )
})
//delete
router.delete('/deleteServicedetail',(req,res)=>{
    db.collection(col_name5).remove({_id:mongo.ObjectId(req.body._id)},(err,result)=>{
        if(err) throw err;
        res.send('Data Deleted')
    })
})

    
router.put('/deactivateServicedetail',(req,res)=>{
    db.collection(col_name5).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
                isActive:false
            }
        },(err,result)=>{
            if(err) throw err;
            res.send('Servicedetail Deactivated')
        }
    )
})
//softDelete(activate)
router.put('/activateServicedetail',(req,res)=>{
    db.collection(col_name5).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
                isActive:true
            }
        },(err,result)=>{
            if(err) throw err;
            res.send('Servicedetail Activated')
        }
    )
})
//Read
router.get('/placeBooking',(req,res)=>{
db.collection(col_name6).find().toArray((err,result)=>{
    if(err) throw err;
    res.send(result)
})

})
//Insert
router.post('/addPlaceBooking',(req,res)=>{
    console.log(req.body)
    db.collection(col_name6).insert(req.body,(err,result) => {
        if(err) throw err;
        res.send('Data Added')
    })
})


// app.use("/",router)

// //Db Connection
// MongoClient.connect(mongourl,(err,client)=>{
//     if(err) console.log('Error while connecting');
//     db=client.db('octobernode');
//     app.listen(port,(err)=>{
//         console.log(`Server is running on port ${port}`)
//     })
// })
module.exports = router;