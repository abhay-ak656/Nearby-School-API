
const {SchoolSchema}=require('../Schema');
const valiadteSchema=(req,res,next)=>{
   let {error}=SchoolSchema.validate(req.body);
   try{
   if(error){
     throw error;
   }
   else{
      next();
   }
}catch(err){
   res.json(err.message);
}
}


module.exports=valiadteSchema;