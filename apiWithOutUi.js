const express = require ('express');
const app = express();
const port = process.env.PORT || 9800;
const mongo = require ('mongodb')
const MongoClient = mongo.MongoClient;
const bodyParser = require ('body-parser')
const cors = require ('cors');
// app.use(cors)
const mongourl = "mongodb://localhost:27017";

let db;
let col_name = "freelanceapi"

app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.get('/health',(req,res)=>{
    res.status(200).send('Health Check')

});
//Read
app.get('/services',(req,res)=>{
    var query = {}
    if(req.query.type){
        query={type:req.query.type,isActive:true}
    }else if(req.query.role){
        query={type:req.query.role,isActive:true}

    }
    else{
        query={isActive:true}
    }
    db.collection(col_name).find(query).toArray((err,result)=>{
        if(err)throw err;
        res.send(result)
    })
})
///serviceDetails
app.get('/service/:id',(req,res)=>{
    var id = mongo.ObjectId(req.params.id)
    db.collection(col_name).find(id).toArray((err,result)=>{
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
             name:req.body.name,
             type:req.body.type,
             role:req.body.role,
             isActive:true
            }
            },(err,result)=>{
                if(err) throw err;
                res.send('Data Updated')

            }
        
    )
})
//delete
app.delete('/deleteService',(req,res)=>{
    db.collection(col_name).remove({_id:mongo.ObjectId(req.body._id)},(err,result)=>{
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
                if(err) throw err;
                res.send('User Deactivated')

            }
        
    )
})

//activateDelete(activate)
app.put('/activateService',(req,res)=>{
    db.collection(col_name).updateOne(
        {_id:mongo.ObjectId(req.body._id)},
        {
            $set:{
           
             isActive:true
            }
            },(err,result)=>{
                if(err) throw err;
                res.send('User Activated')

            }
        
    )
})

//Db Connection
MongoClient.connect(mongourl,(err,client)=>{
    if(err) console.log('Error while connecting');
    db=client.db('octobernode');
    app.listen(port,(err)=>{
        console.log(`Server is running on port ${port}`)
    })
})