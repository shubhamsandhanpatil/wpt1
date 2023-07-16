const express=require('express')
const router=express.Router();
const  connection=require('../db/dbconnect')


router.get("/products",(req,resp)=>{
connection.query("select * from products",(err,data)=>{
if(err){
    resp.status(500).send("error occured",JSON.stringify)
}
else{
    resp.send(data)
}
})
})

router.get("/products/:pid",(req,resp)=>{
    connection.query("select * from products where pid=?",[req.params.pid],(err,data)=>{
        if(err){
            resp.status(500).send("error occured"+JSON.stringify(err))
        }
        else{
            resp.send(data[0])
        }
    })
})

router.get("/products/delete/:pid",(req,resp)=>{
    connection.query("delete from products where pid=?",[req.params.pid],(err,data)=>{
        if(err){
            resp.status(500).send("error occured"+JSON.stringify(err))
        }
        else{
            resp.send("products deleted sucessfully")
        }
    })
})

router.post("/products/add",(req,resp)=>{
    var pid=req.body.pid;
    var name=req.body.name;
    var price=req.body.price;

    connection.query("insert into products values(?,?,?)",[pid,name,price],(err,data)=>{
        if(err){
            resp.status(500).send("product not added"+JSON.stringify(err))
        }else{
            resp.send("inserted data sucessfully")
        }
    })
})

router.put("/products/update/:pid",(req,resp)=>{
    
    var pid=req.body.pid
    var pname=req.body.pname;
    var price=req.body.price;
    connection.query("update products set pname=?,price=? where pid=?",[pname,price,pid],(err,data)=>{
        if(err){
            resp.status(500).send("products not updated"+JSON.stringify(err))
        }else{
            
            resp.send("updated sucessfully")

        }
    })
   
})
module.exports=router;