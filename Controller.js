const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

const models=require('./models');
const QRCode = require('qrcode');
const { response } = require('express');


const app=express();
app.use(cors());
app.use(bodyParser.urlencoded({extended:false}));
app.use(express.static('assets'));
app.use(bodyParser.json());

let user=models.User;
let tracking=models.Tracking;
let product=models.Product;

app.post('/login',async(req,res)=>{
    let response=await user.findOne({
    where:{name:req.body.name,password:req.body.password}
    })
    if(response==null){
        res.send(JSON.stringify("Error"));
    }else{
        res.send(response);
    }
});
app.post('/verifyPass',async(req,res)=>{
    let response=await user.findOne({
    where:{id:req.body.id,password:req.body.sanhaAntiga}
    })
    if(response==null){
        res.send("Senha antiga não confere");
    }else{
        if(req.body.novaSenha === req.body.confNovaSenha){
            response.password=req.body.novaSenha;
            response.save();
            res.send("Senha Atualizada com sucesso!");
        }else{
            res.send(JSON.stringify("Nova senha e confirmação de senha, não conferem"));
        }
       
    }
});
app.post('/create',async(req,res)=>{
    let trackingId="";
     await  tracking.create({
                userId:req.body.userId,
                code:req.body.code,
                product:req.body.product,
                local:req.body.local

     }).then((response)=>{
         trackingId+=response.id;
     });
     
     await product.create({
                trackingId:trackingId,
                name:req.body.product,
     });
     QRCode.toDataURL(req.body.code).then(url=>{
         QRCode.toFile(
             './assets/img/code.png',
             req.body.code
         );
         res.send(JSON.stringify(url));
     }) ;      
 });

 // buscar produto
 app.post('/searchProduct',async(req,res)=>{
    let response=await tracking.findOne({
               where:{code:req.body.code}
    });
    let response2 = await product.findOne({
        where:{trackingId:response.id}
    })
   
  res.send(JSON.stringify(response2));
 });

// app.get('/create' ,async(req,res)=>{
//     let create = await user.create({
//         name:"JOÃO",
//         password: "abc",
//         createdAt: new Date(),
//         upadetedAt: new Date()
//     });
//     res.send('Usuário criado com sucesso!');
// });
app.get('/listProduct' ,async(req,res)=>{
    let read=await product.findAll(
        {
            options: {
              raw: true
           }
         }
         
   );
  //  console.log(read); 
  res.send(read);
//res.send(JSON.stringify(read));
    
});

app.get('/read' ,async(req,res)=>{
     let read=await user.findAll(
         {
             options: {
               raw: true
            }
          }
          
    );
    console.log(read); 
     
 });

// app.get('/update' ,async(req,res)=>{
//         let update = await user.findByPk(1).then((response)=>{
//                 response.name="THIAGOSSSSS";
//                response.password="123abc456";
//                response.save();
//         });
// });

// app.get('/update' ,async(req,res)=>{
//      Post.destroy({

//      });
// });

let port = process.env.PORT || 3000;
app.listen(port,(red, res)=>{
    console.log('Servidor rodando');
});



