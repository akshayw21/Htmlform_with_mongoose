const express=require('express');
const { registerPartials } = require('hbs');
const bodyParser=require('body-parser')
require("./db/conn")
const hbs=require('hbs');
const path=require('path');
const User = require('./models/usermessage');
const { request } = require('http');
const bodyparser = require('body-parser');
const app=express();
const port=process.env.PORT || 3000;


//setting the path
const staticpath =path.join(__dirname, "../public");
const templatepath=path.join(__dirname,"../templates/views");
const partialpath=path.join(__dirname,"../templates/partials");



// middleware
app.use('/css',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/js',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));
app.use('/jq',express.static(path.join(__dirname,"../node_modules/bootstrap/dist/css")));

app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.static(staticpath))
app.set("view engine" , "hbs");
app.set("views",templatepath);
hbs.registerPartials(partialpath);


app.get('/',(req,res,next)=>{
    
    //res.send(req.body)
    res.render('index');
});

app.get('/contact',(req,res)=>{
     User.find({}).sort({_id:-1}).then(result=>{
         res.status(200).json({
             userSchema:result
         });
     })
     .catch(err=>{
         console.log(err);
    res.status(500).json({
             error:err
         });
    });
    
});

app.get('/contact/:id',(req,res)=>{
    User.findById(req.params.id).then(result=>{
        res.status(200).json({
            userSchema:result
        });
    })
    .catch(err=>{
        console.log(err);
        res.status(500).json({
            error:err
        });
    });
});

app.get('/my/sort',async(req,res)=>{
    
    try{
        const result=await User.find({}).select({name:1,email:1,phone:1,message:1}).sort({name:1});
        
        res.json(result)

    }catch(err){
        res.send(err)
        
    }


})

app.post('/contact',async(req,res)=>{
    try{
        //res.send(req.body);
        const userData=new User(req.body);
        await userData.save();
        //res.render('index');
    }catch(error){
        res.status(500).send(error);
    }
})

//server create
app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})