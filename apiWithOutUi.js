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

app.use("/",router)

//Db Connection
MongoClient.connect(mongourl,(err,client)=>{
    if(err) console.log('Error while connecting');
    db=client.db('octobernode');
    app.listen(port,(err)=>{
        console.log(`Server is running on port ${port}`)
    })
})