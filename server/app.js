const express=require('express');
const app=express();
const cors=require('cors');
const {cloudinary}=require('./cloudinary')

app.use(cors());
app.use(express.json({limit:'50mb'}));
app.use(express.urlencoded({limit:'50mb',extended:true}));

app.post('/api/upload',async (req,res)=>{
    try{
        const filestr=req.body.data;
        const uploadresponse=await cloudinary.uploader.upload(filestr);
        res.json({msg:"success"}); 
    }catch(err){
        res.status(500).json({
            msg:err
        })
    }
})

app.listen(8080,()=>{
    console.log('server is running on the port 8080')
})