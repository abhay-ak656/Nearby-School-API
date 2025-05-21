if(process.env.NODE_ENV!='production'){
    require('dotenv').config();
}

const express=require('express');
const app=express();
const mysql=require('mysql2');
const valiadteSchema = require('./middleware/middleware');
const {v4:uuidv4}=require('uuid');
const geolib=require('geolib');

const port=3003;

const connection=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:process.env.SQL_PASSWORD,
     database:process.env.SQL_DATABASE_NAME
})

app.use(express.urlencoded({extended:true}));
app.use(express.json());


app.post('/addSchool',valiadteSchema,(req,res)=>{
    let obj=[uuidv4().toString(),req.body.name,req.body.address,req.body.latitude,req.body.longitude];
    let q=`insert into school(id,name,address,latitude,longitude) values(?,?,?,?,?)`;
    try{
    connection.query(q,obj,(error)=>{
       if(error){
        throw error
       }
       else{
        res.json("successfully added school");
       }
    })
}catch(error){
    res.json(error);
}
})




function getsortSchool(distance){
   //bubble sort
    let sort=new Array(distance.length);
    for(let i=0;i<distance.length;i++){
        for(let j=0;j<distance.length-i-1;j++){
            if(distance[j][1]>distance[j+1][1]){
                let temp=distance[j];
                distance[j]=distance[j+1];
                distance[j+1]=temp;
            }
        }
    }
}

app.get('/listSchools',(req,res)=>{
   let {longitude,latitude}=req.query;
 if(!longitude || !latitude){
    return  res.json("please provide the latitude and longitude of the user");
 }
    let q='select*from school';

    try{
    connection.query(q,(error,result)=>{
        if(error) throw error;
        
        if(result.length==0) return res.json("Please first add school");

        let distance=result.map(school =>{
             let dist=geolib.getDistance(
                {latitude:school.latitude,longitude:school.longitude},
                {latitude:latitude,longitude:longitude}
             )
             return [{...school},dist/1000];
        })
 

        getsortSchool(distance);
     
        let sortlist=distance.map(dis=> dis[0]);

        res.json(sortlist);
    })
}
catch(err){
   res.send(err);
}

})
app.all('/*splat',(req,res,next)=>{
    res.json("Page not found or wrong endpoint");
    next();
})


app.listen(port,(req,res)=>{
    console.log("server is listen");
})

